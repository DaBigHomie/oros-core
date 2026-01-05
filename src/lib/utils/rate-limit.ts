/**
 * Rate Limiting Utility
 * Implements token bucket algorithm for API rate limiting
 */

interface RateLimitConfig {
  interval: number; // Time window in milliseconds
  maxRequests: number; // Maximum requests per interval
}

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

// In-memory store for rate limiting (use Redis in production)
const rateLimitStore = new Map<string, RateLimitRecord>();

/**
 * Rate limit checker
 * @param identifier - Unique identifier (user ID, IP address, etc.)
 * @param config - Rate limit configuration
 * @returns Object with allowed status and reset time
 */
export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig = { interval: 60000, maxRequests: 100 }
): { allowed: boolean; resetTime: number; remaining: number } {
  const now = Date.now();
  const record = rateLimitStore.get(identifier);

  // If no record exists or reset time has passed, create new record
  if (!record || now >= record.resetTime) {
    const newRecord: RateLimitRecord = {
      count: 1,
      resetTime: now + config.interval,
    };
    rateLimitStore.set(identifier, newRecord);

    return {
      allowed: true,
      resetTime: newRecord.resetTime,
      remaining: config.maxRequests - 1,
    };
  }

  // Check if limit exceeded
  if (record.count >= config.maxRequests) {
    return {
      allowed: false,
      resetTime: record.resetTime,
      remaining: 0,
    };
  }

  // Increment count
  record.count++;
  rateLimitStore.set(identifier, record);

  return {
    allowed: true,
    resetTime: record.resetTime,
    remaining: config.maxRequests - record.count,
  };
}

/**
 * Rate limit middleware for API routes
 */
export function withRateLimit(
  handler: (request: Request) => Promise<Response>,
  config?: RateLimitConfig
) {
  return async (request: Request): Promise<Response> => {
    // Get identifier from request (IP or user ID)
    const identifier = request.headers.get('x-forwarded-for') || 'anonymous';

    const { allowed, resetTime, remaining } = checkRateLimit(identifier, config);

    // Add rate limit headers
    const headers = new Headers({
      'X-RateLimit-Limit': config?.maxRequests.toString() || '100',
      'X-RateLimit-Remaining': remaining.toString(),
      'X-RateLimit-Reset': new Date(resetTime).toISOString(),
    });

    if (!allowed) {
      return new Response(
        JSON.stringify({
          error: 'Too many requests',
          message: 'Rate limit exceeded. Please try again later.',
          resetTime: new Date(resetTime).toISOString(),
        }),
        {
          status: 429,
          headers: {
            ...Object.fromEntries(headers),
            'Content-Type': 'application/json',
          },
        }
      );
    }

    const response = await handler(request);

    // Add rate limit headers to successful response
    headers.forEach((value, key) => {
      response.headers.set(key, value);
    });

    return response;
  };
}

// Predefined rate limit configurations
export const RATE_LIMITS = {
  // Strict limit for authentication endpoints
  AUTH: { interval: 60000, maxRequests: 5 }, // 5 requests per minute

  // Standard limit for general API endpoints
  API: { interval: 60000, maxRequests: 100 }, // 100 requests per minute

  // Relaxed limit for read-only endpoints
  READ: { interval: 60000, maxRequests: 200 }, // 200 requests per minute

  // Very strict limit for resource-intensive operations
  INTENSIVE: { interval: 60000, maxRequests: 10 }, // 10 requests per minute
};
