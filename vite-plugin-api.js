// Vite plugin to handle API routes in development
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { pathToFileURL } from "url";
import { readFileSync } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env file manually
function loadEnv() {
  try {
    const envPath = join(process.cwd(), ".env");
    const envContent = readFileSync(envPath, "utf-8");
    const envVars = {};
    
    envContent.split("\n").forEach((line) => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith("#")) {
        const [key, ...valueParts] = trimmed.split("=");
        if (key && valueParts.length > 0) {
          const value = valueParts.join("=").trim().replace(/^["']|["']$/g, "");
          envVars[key.trim()] = value;
        }
      }
    });
    
    // Set environment variables
    Object.assign(process.env, envVars);
  } catch (error) {
    // .env file doesn't exist or can't be read - that's okay
    console.warn("Warning: Could not load .env file:", error.message);
  }
}

export function apiPlugin() {
  // Load env vars when plugin is initialized
  loadEnv();
  
  return {
    name: "api-plugin",
    configureServer(server) {
      server.middlewares.use("/api/chat", async (req, res, next) => {
        if (req.method !== "POST") {
          res.statusCode = 405;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "Method not allowed" }));
          return;
        }

        try {
          // Read request body
          let body = "";
          req.on("data", (chunk) => {
            body += chunk.toString();
          });

          req.on("end", async () => {
            try {
              const requestBody = body ? JSON.parse(body) : {};
              
              // Import and call the chat handler
              // Use dynamic import with file:// protocol for absolute path
              const chatModulePath = join(process.cwd(), "api", "chat.js");
              const chatModuleUrl = pathToFileURL(chatModulePath).href;
              const chatModule = await import(chatModuleUrl);
              const chatHandler = chatModule.default;

              // Create a Vercel-like request object with headers for rate limiting
              const vercelReq = {
                method: "POST",
                json: async () => requestBody,
                headers: req.headers || {},
                ip: req.socket?.remoteAddress || req.connection?.remoteAddress || "unknown",
              };

              // Call the handler
              const response = await chatHandler(vercelReq);
              const responseData = await response.json();

              res.statusCode = response.status;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify(responseData));
            } catch (error) {
              console.error("API error:", error);
              console.error("Error stack:", error.stack);
              res.statusCode = 500;
              res.setHeader("Content-Type", "application/json");
              res.end(
                JSON.stringify({
                  error: error.message || "Internal server error",
                })
              );
            }
          });
        } catch (error) {
          console.error("Middleware error:", error);
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "Internal server error" }));
        }
      });
    },
  };
}

