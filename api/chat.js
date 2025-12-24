// Vercel Serverless Function for LLM Chat with Gemini and RAG
// This file should be in the /api directory for Vercel to recognize it

import { rateLimit, getClientIdentifier } from './rate-limit.js';

// Knowledge Base about Lidor Pahima (RAG)
const lidorKnowledgeBase = `
LIDOR PAHIMA - PROFESSIONAL PROFILE

PERSONAL INFORMATION:
- Name: Lidor Pahima
- Email: Lidorpahima28@gmail.com
- Phone: +972-52-570-3797
- Location: Israel
- Website: https://lidorpahima.com
- LinkedIn: https://linkedin.com/in/lidor-pahima
- GitHub: https://github.com/Lidorpahima

PROFESSIONAL TITLE:
Full-Stack Developer & AI Engineer

EDUCATION:
- B.Sc. in Computer Science (Specialization: Artificial Intelligence)
- Institution: SCE - Shamoon College of Engineering
- GPA: 84
- Period: October 2022 - June 2025

CURRENT POSITION:
Full-Stack Developer at StealthCode (Software Development Firm)
- Started: May 2025 - Present
- Tech Stack: Next.js, React, Node.js, TypeScript, PostgreSQL, MongoDB, Redis, Docker, DigitalOcean, Jira

KEY PROJECTS & ACHIEVEMENTS:

1. "Magical Book" (GenAI Platform):
   - Reduced processing time by 83% (3 min → 30 sec) by refactoring synchronous workflows to parallel asynchronous
   - Scaled system capacity to support 17,000+ requests/day (36x improvement) using concurrent multi-provider architecture
   - Cut API costs by 30% by implementing intelligent provider routing with 4-tier failover mechanism
   - Eliminated timeout failures (previously 15-20% of requests) through async processing and robust error handling

2. "Alma Flowers" (E-commerce):
   - Improved database query performance, reducing admin dashboard load time by 91.7% (58.1s → 4.7s)
   - Handled production infrastructure on DigitalOcean including Docker container orchestration and live updates

3. AI Trip Planner Platform (Oct 2024 - June 2025):
   - Tech Stack: Django REST Framework, Next.js, TypeScript, Redis, PostgreSQL, Docker, JWT
   - Reduced API costs by 93% ($0.05 → $0.003 per request) by implementing hybrid LLM architecture
   - Optimized token usage (750 → 50) by routing complex queries to Gemini and static content to Llama
   - Improved response time by 78% (3 min → 40 sec) through intelligent model orchestration
   - Fused real-time event data with static geo-info into a unified JSON structure for frontend rendering

4. Seismic Event Classification (ML Research) - Elbit Systems Capstone:
   - Tech Stack: Python, PyTorch, CNN, NumPy, SciPy, Scikit-learn
   - Built end-to-end ML pipeline using a Hybrid Dilated Convolutional Autoencoder
   - Achieved 94.95% accuracy vs 50.3% baseline - 44.65pp improvement
   - Presented results to Elbit engineers; met production deployment requirements

TECHNICAL SKILLS:

Languages:
- JavaScript, Python, TypeScript, SQL, HTML, CSS

Frameworks & Libraries:
- Next.js, React, Node.js, Django REST Framework, Tailwind CSS

Databases:
- PostgreSQL, MongoDB, Redis

Tools & DevOps:
- Docker, Git, Linux, DigitalOcean, Jira

AI/ML:
- PyTorch, TensorFlow, LLM Integration, CNN, Model Optimization, N8N

PROFESSIONAL FOCUS:
- Full-Stack Development (Frontend & Backend)
- AI/ML Engineering and LLM Integration
- Performance Optimization and Scalability
- Cost Optimization
- System Architecture
- GenAI Platform Development

KEY STRENGTHS:
- Performance optimization (achieved 83% latency reduction, 91.7% load time improvement)
- Cost optimization (achieved 93% cost reduction)
- System scaling (scaled to 17,000+ requests/day)
- ML/AI expertise (94.95% accuracy in research project)
- Full-stack development across multiple tech stacks

AWARDS & HONORS:
- Benin Fellows Scholarship | UJA Federation of New York
  - Includes participation in the Benin Fellows STEM Program and comprehensive enrichment workshops (focusing on technology/leadership)

ASPIRATION:
Aspiring to become a Full-Stack / AI Engineer, combining expertise in software development with advanced AI/ML capabilities.
`;

export default async function handler(req, res) {
  // 1. הגדרת CORS Headers כבר בהתחלה
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // 2. טיפול ב-OPTIONS (Preflight)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 3. ווידוא שזה POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // 4. Rate Limiting
    const clientId = getClientIdentifier(req);
    const rateLimitConfig = {
      maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || "10"),
      windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || "60000"),
    };
    
    const rateLimitResult = rateLimit(clientId, rateLimitConfig.maxRequests, rateLimitConfig.windowMs);
    
    if (!rateLimitResult.allowed) {
      res.setHeader('Retry-After', rateLimitResult.retryAfter);
      return res.status(429).json({
        error: "Rate limit exceeded. Please try again later.",
        retryAfter: rateLimitResult.retryAfter
      });
    }

    // 5. קריאת ה-Body (ב-Vercel Node זה לרוב מגיע כבר מפורסר)
    const { messages } = req.body || {};

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid request format" });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "API key not configured" });
    }

    // Function to send notification to ntfy.sh
    async function sendNtfyNotification(name, phone, message) {
      const ntfyTopic = process.env.NTFY_TOPIC || "mysite";
      const ntfyUrl = `https://ntfy.sh/${ntfyTopic}`;
      
      const notificationMessage = `New message from portfolio website:

Name: ${name}
Phone: ${phone}
Message: ${message}

Time: ${new Date().toISOString()}`;
      
      try {
        console.log(`Sending notification to ntfy.sh topic: ${ntfyTopic}`);
        const response = await fetch(ntfyUrl, {
          method: "POST",
          headers: {
            "Content-Type": "text/plain",
            "Title": "📧 New Contact from Portfolio",
            "Priority": "default",
            "Tags": "envelope,email",
          },
          body: notificationMessage,
        });
        
        if (!response.ok) {
          const errorText = await response.text().catch(() => "Unknown error");
          console.error("Ntfy error:", response.status, response.statusText, errorText);
          return false;
        }
        
        console.log("Notification sent successfully to ntfy.sh");
        return true;
      } catch (error) {
        console.error("Error sending notification:", error);
        return false;
      }
    }

    // Build system instruction with RAG knowledge base
    const systemInstruction = `You are a professional AI assistant for Lidor Pahima's portfolio website. Your role is to help visitors learn about Lidor and answer questions about his background, experience, projects, and skills.

KNOWLEDGE BASE ABOUT LIDOR PAHIMA:
${lidorKnowledgeBase}

INSTRUCTIONS:
1. Use the knowledge base above to answer questions about Lidor accurately
2. If asked about Lidor's experience, projects, skills, or achievements, provide specific details from the knowledge base
3. Be professional, friendly, and concise
4. If you don't know something specific, say so honestly
6. When discussing achievements, mention specific numbers and metrics when available
7. Encourage visitors to check out Lidor's projects and contact him for collaboration opportunities

IMPORTANT - CONTACT REQUEST HANDLING:
If a user wants to contact Lidor, send a message, leave details, get in touch, wants to work together, or wants to hire Lidor (in any language - English or Hebrew), you should:
1. First, ask for their name in the same language they're using:
   - English: "What's your name?"
   - Hebrew: "מה השם שלך?"
2. Once you have the name, ask for their phone number in the same language:
   - English: "What's your phone number?"
   - Hebrew: "מה מספר הטלפון שלך?"
3. Once you have both name and phone, ask for their message in the same language:
   - English: "What would you like to tell Lidor?"
   - Hebrew: "מה תרצה לספר ללידור?"
4. Once you have all three pieces of information (name, phone, message), you MUST respond with EXACTLY this format: "CONTACT_REQUEST:name|phone|message" (replace name, phone, and message with the actual values the user provided)
5. Do NOT include any other text before or after the CONTACT_REQUEST line when you have all the information
6. The format must be exactly: CONTACT_REQUEST:John Doe|+1234567890|Hello, I want to work with you
7. After sending the contact request, confirm in the user's language that the message was sent successfully

Remember: You are representing Lidor professionally, so be accurate and helpful.`;

    // Prepare messages for Gemini API
    // Gemini uses a different format - we need to convert the messages
    // Only send the last few messages to avoid token limits (keep last 10 messages)
    // Filter out error messages that might confuse the AI
    console.log("Raw messages received:", JSON.stringify(messages).substring(0, 500));
    
    const cleanedMessages = messages.filter(msg => {
      if (!msg || !msg.content) return false;
      const content = String(msg.content).trim();
      if (content.length === 0) return false;
      if (content.includes("Sorry, there was an error")) return false;
      if (content.includes("Failed to get response")) return false;
      return true;
    });
    
    const recentMessages = cleanedMessages.slice(-10);
    console.log("Preparing messages, total:", messages.length, "cleaned:", cleanedMessages.length, "recent:", recentMessages.length);
    
    // Ensure we start with assistant greeting if no messages
    if (recentMessages.length === 0) {
      recentMessages.push({
        role: "user",
        content: "Hello"
      });
    }
    
    // Ensure first message is from assistant (greeting) or user
    // If first message is user, we need to add context
    const geminiMessages = recentMessages.map((msg, index) => {
      const role = msg.role === "assistant" ? "model" : "user";
      const content = String(msg.content || "").trim();
      
      if (!content) {
        console.warn(`Empty message at index ${index}, skipping`);
        return null;
      }
      
      return {
        role: role,
        parts: [{ text: content }],
      };
    }).filter(msg => msg !== null);
    
    // Validate that we have valid messages
    if (geminiMessages.length === 0) {
      console.error("No valid messages after processing, using default");
      geminiMessages.push({
        role: "user",
        parts: [{ text: "Hello" }],
      });
    }
    
    console.log("Gemini messages count:", geminiMessages.length);
    console.log("All messages roles:", geminiMessages.map(m => m.role).join(", "));
    console.log("First message:", geminiMessages[0]?.parts[0]?.text?.substring(0, 100));
    console.log("Last message:", geminiMessages[geminiMessages.length - 1]?.parts[0]?.text?.substring(0, 100));
    
    // Validate messages format
    for (let i = 0; i < geminiMessages.length; i++) {
      const msg = geminiMessages[i];
      if (!msg.role || !msg.parts || !msg.parts[0] || !msg.parts[0].text) {
        console.error(`Invalid message at index ${i}:`, msg);
      }
    }

    // Ensure we have at least one user message and conversation makes sense
    const hasUserMessage = geminiMessages.some(msg => msg.role === "user");
    const hasModelMessage = geminiMessages.some(msg => msg.role === "model");
    
    // Filter out messages that are too short (likely corrupted)
    const validGeminiMessages = geminiMessages.filter(msg => {
      const text = msg.parts[0]?.text || "";
      // Filter out messages shorter than 2 characters (likely corrupted)
      if (text.length < 2) {
        console.warn("Filtering out message too short:", text);
        return false;
      }
      return true;
    });
    
    // If we filtered out too many messages, reset
    if (validGeminiMessages.length === 0 || (!hasUserMessage && validGeminiMessages.length > 0)) {
      console.warn("No valid user messages found, resetting conversation");
      geminiMessages.length = 0;
      geminiMessages.push({
        role: "user",
        parts: [{ text: "Hello" }],
      });
    } else {
      // Use filtered messages
      geminiMessages.length = 0;
      geminiMessages.push(...validGeminiMessages);
    }
    
    // Ensure conversation alternates properly (user -> model -> user -> model)
    // If last message is from model, we need a user message
    if (geminiMessages.length > 0 && geminiMessages[geminiMessages.length - 1].role === "model") {
      console.warn("Last message is from model, conversation might be incomplete");
    }
    
    // Call Gemini API with system instruction
    const requestBody = {
      contents: geminiMessages,
      systemInstruction: {
        parts: [{ text: systemInstruction }],
      },
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
    };
    
    console.log("Request body size:", JSON.stringify(requestBody).length, "characters");
    console.log("System instruction length:", systemInstruction.length);
    console.log("Contents count:", requestBody.contents.length);

    async function getCheapestModel(apiKey) {
        // Use environment variable if set, otherwise try to fetch
        const envModel = process.env.GEMINI_MODEL;
        if (envModel) {
          console.log("Using model from GEMINI_MODEL env:", envModel);
          return envModel;
        }
        
        // Default to gemini-1.5-flash (most reliable free tier model)
        // Skip model fetching to avoid delays and potential errors
        console.log("Using default model: gemini-2.0-flash");
        return "gemini-2.0-flash";
        
        /* Commented out to avoid delays - uncomment if you want to fetch available models
        try {
          const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`,
            { signal: AbortSignal.timeout(3000) } // 3 second timeout
          );
          
          if (!response.ok) {
            throw new Error(`Failed to fetch models: ${response.statusText}`);
          }
          
          const data = await response.json();
          
          // Try to find flash-lite models first
          const liteModels = data.models
            ?.filter(model => 
              model.supportedGenerationMethods?.includes('generateContent') &&
              model.name?.includes('-flash-lite')
            )
            .map(model => model.name.replace('models/', '')) || [];  
          
          if (liteModels.length > 0) {
            // Sort by version number
            const sortedModels = liteModels
              .map(model => {
                const match = model.match(/gemini-(\d+\.\d+)-flash-lite/);
                return {
                  name: model,
                  version: match ? parseFloat(match[1]) : 0
                };
              })
              .filter(model => model.version > 0) // Only keep models with valid version
              .sort((a, b) => a.version - b.version);
            
            if (sortedModels.length > 0) {
              console.log("Using cheapest model:", sortedModels[0].name);
              return sortedModels[0].name;
            }
          }
          
          // Fallback to gemini-1.5-flash if no lite models found
          console.log("No flash-lite models found, using gemini-1.5-flash as fallback");
          return "gemini-1.5-flash";
        } catch (error) {
          console.error("Error fetching models:", error);
          // Fallback to default model
          return "gemini-1.5-flash";
        }
        */
      }     

      
      console.log("Getting model...");
      const model = await getCheapestModel(apiKey);
      console.log("Model selected:", model);
      
      console.log("Calling Gemini API...");
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      
      // Add timeout to prevent hanging (Vercel has 10s timeout for free tier)
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 seconds timeout
      
      try {
        const geminiResponse = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
          signal: controller.signal,
        });
        
        clearTimeout(timeoutId);

        console.log("Gemini API response status:", geminiResponse.status);

        if (!geminiResponse.ok) {
          const errorData = await geminiResponse.json().catch(() => ({ error: { message: "Unknown error" } }));
          console.error("Gemini API error:", errorData);
          throw new Error(errorData.error?.message || "Gemini API error");
        }

        console.log("Parsing Gemini response...");
        const data = await geminiResponse.json();
        console.log("Gemini response structure:", JSON.stringify(data).substring(0, 200));
        console.log("Gemini response received, extracting text...");
        
        // Check if response has candidates
        if (!data.candidates || data.candidates.length === 0) {
          console.error("No candidates in Gemini response:", data);
          throw new Error("No response candidates from Gemini API");
        }
        
        // Check if candidate has content
        if (!data.candidates[0].content || !data.candidates[0].content.parts) {
          console.error("No content parts in Gemini response:", data.candidates[0]);
          throw new Error("Invalid response structure from Gemini API");
        }
        
        let responseText = data.candidates[0].content.parts[0]?.text || "Sorry, I couldn't generate a response.";
        console.log("Response text length:", responseText.length);
        console.log("Response text preview:", responseText.substring(0, 100));

        // Check if this is a contact request
        if (responseText.includes("CONTACT_REQUEST:")) {
          console.log("Contact request detected, processing...");
          const contactMatch = responseText.match(/CONTACT_REQUEST:([^|]+)\|([^|]+)\|(.+)/);
          
          if (contactMatch) {
            const [, name, phone, message] = contactMatch;
            console.log("Contact details:", { name, phone, message: message.substring(0, 50) });
            
            // Send notification to ntfy.sh
            const notificationSent = await sendNtfyNotification(
              name.trim(),
              phone.trim(),
              message.trim()
            );
            
            if (notificationSent) {
              // Replace the CONTACT_REQUEST with a confirmation message
              responseText = `Thank you ${name}! Your message has been sent successfully. Lidor will get back to you soon at ${phone}.`;
            } else {
              responseText = "Thank you for your message! However, there was an issue sending it. Please try contacting Lidor directly through the contact page.";
            }
          }
        }

        console.log("Sending response, text length:", responseText.length);
        console.log("Response text preview:", responseText.substring(0, 100));

        // 6. החזרת התשובה בצורה תקינה ל-Vercel Node
        return res.status(200).json({ message: responseText });
      } catch (fetchError) {
        clearTimeout(timeoutId);
        if (fetchError.name === 'AbortError') {
          console.error("Request timeout after 8 seconds");
          throw new Error("Request timeout. The API took too long to respond.");
        }
        throw fetchError;
      }
  } catch (error) {
    console.error("Server Error:", error);
    return res.status(500).json({ 
      error: error.message || "Internal Server Error" 
    });
  }
}
