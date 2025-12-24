// Simple in-memory rate limiter
// Note: In production with multiple serverless instances, consider using Redis or Vercel KV

const rateLimitStore = new Map();

// Clean up old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of rateLimitStore.entries()) {
    if (value.resetTime < now) {
      rateLimitStore.delete(key);
    }
  }
}, 5 * 60 * 1000);

export function rateLimit(identifier, maxRequests = 10, windowMs = 60000) {
  // maxRequests: maximum number of requests
  // windowMs: time window in milliseconds (default: 1 minute)
  
  const now = Date.now();
  const key = identifier;
  
  const record = rateLimitStore.get(key);
  
  if (!record || record.resetTime < now) {
    // New window or expired
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + windowMs,
    });
    return { allowed: true, remaining: maxRequests - 1, resetTime: now + windowMs };
  }
  
  if (record.count >= maxRequests) {
    // Rate limit exceeded
    return { 
      allowed: false, 
      remaining: 0, 
      resetTime: record.resetTime,
      retryAfter: Math.ceil((record.resetTime - now) / 1000)
    };
  }
  
  // Increment count
  record.count++;
  rateLimitStore.set(key, record);
  
  return { 
    allowed: true, 
    remaining: maxRequests - record.count, 
    resetTime: record.resetTime 
  };
}

export function getClientIdentifier(req) {
  // Handle both Web API Headers object and plain object
  let headers;
  if (req.headers instanceof Headers) {
    // Web API Headers object (Vercel production)
    headers = {
      'x-forwarded-for': req.headers.get('x-forwarded-for'),
      'x-real-ip': req.headers.get('x-real-ip'),
      'cf-connecting-ip': req.headers.get('cf-connecting-ip'),
    };
  } else {
    // Plain object (local development)
    headers = req.headers || {};
  }
  
  // Try to get IP from various headers (for Vercel/proxies)
  const forwarded = headers['x-forwarded-for'];
  const realIp = headers['x-real-ip'];
  const cfConnectingIp = headers['cf-connecting-ip'];
  
  // Get IP from headers (Vercel sets x-forwarded-for)
  const ip = forwarded?.split(',')[0]?.trim() || 
             realIp || 
             cfConnectingIp || 
             req.ip || 
             'unknown';
  
  return ip;
}

