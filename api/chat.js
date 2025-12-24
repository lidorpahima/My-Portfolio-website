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

export default async function handler(req) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405, headers: { "Content-Type": "application/json" } }
    );
  }

  // Rate limiting
  const clientId = getClientIdentifier(req);
  // Allow 10 requests per minute per IP
  const rateLimitConfig = {
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || "10"),
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || "60000"), // 1 minute
  };
  
  const rateLimitResult = rateLimit(clientId, rateLimitConfig.maxRequests, rateLimitConfig.windowMs);
  
  if (!rateLimitResult.allowed) {
    return new Response(
      JSON.stringify({ 
        error: "Rate limit exceeded. Please try again later.",
        retryAfter: rateLimitResult.retryAfter,
        resetTime: new Date(rateLimitResult.resetTime).toISOString()
      }),
      { 
        status: 429,
        headers: { 
          "Content-Type": "application/json",
          "Retry-After": rateLimitResult.retryAfter.toString(),
          "X-RateLimit-Limit": rateLimitConfig.maxRequests.toString(),
          "X-RateLimit-Remaining": "0",
          "X-RateLimit-Reset": rateLimitResult.resetTime.toString()
        }
      }
    );
  }

  try {
    const body = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: "Invalid request format" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Get Gemini API key from environment variables
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      return new Response(
        JSON.stringify({ 
          error: "API key not configured. Please set GEMINI_API_KEY in environment variables." 
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
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
5. Always respond in English unless the user specifically asks in another language
6. When discussing achievements, mention specific numbers and metrics when available
7. Encourage visitors to check out Lidor's projects and contact him for collaboration opportunities

Remember: You are representing Lidor professionally, so be accurate and helpful.`;

    // Prepare messages for Gemini API
    // Gemini uses a different format - we need to convert the messages
    // Only send the last few messages to avoid token limits (keep last 10 messages)
    const recentMessages = messages.slice(-10);
    const geminiMessages = recentMessages.map((msg) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

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

    async function getCheapestModel(apiKey) {
        try {
          const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
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
      }     

      
      const model = await getCheapestModel(apiKey);
      
      const geminiResponse = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

    if (!geminiResponse.ok) {
      const errorData = await geminiResponse.json();
      console.error("Gemini API error:", errorData);
      throw new Error(errorData.error?.message || "Gemini API error");
    }

    const data = await geminiResponse.json();
    const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't generate a response.";

    return new Response(
      JSON.stringify({ message: responseText }),
      { 
        status: 200, 
        headers: { 
          "Content-Type": "application/json",
          "X-RateLimit-Limit": rateLimitConfig.maxRequests.toString(),
          "X-RateLimit-Remaining": rateLimitResult.remaining.toString(),
          "X-RateLimit-Reset": rateLimitResult.resetTime.toString()
        }
      }
    );
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message || "An error occurred while processing your request." 
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
