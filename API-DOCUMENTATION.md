# API Documentation - DJ-Jaytek-Music Platform

## Base URL
- Development: `http://localhost:3000`
- Production: `https://your-domain.com`

## Authentication

All protected endpoints require authentication via Supabase JWT tokens. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Rate Limits

| Endpoint Type | Limit |
|--------------|-------|
| Authentication | 5 requests/minute |
| Standard API | 100 requests/minute |
| Read-only | 200 requests/minute |
| Intensive | 10 requests/minute |

Rate limit information is returned in response headers:
- `X-RateLimit-Limit`: Maximum requests allowed
- `X-RateLimit-Remaining`: Requests remaining
- `X-RateLimit-Reset`: Reset time (ISO 8601)

## Endpoints

### Authentication

#### Sign Up

```http
POST /api/auth/signup
```

Create a new user account.

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "securepassword123",
  "role": "student",
  "displayName": "John Doe"
}
```

**Parameters:**
- `email` (string, required): Valid email address
- `password` (string, required): Minimum 8 characters
- `role` (string, required): One of: `student`, `instructor`, `dj`
- `displayName` (string, optional): User's display name

**Response (201):**

```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "user_metadata": {
      "display_name": "John Doe"
    }
  },
  "session": {
    "access_token": "jwt-token",
    "refresh_token": "refresh-token"
  }
}
```

**Error Responses:**
- `400 Bad Request`: Validation error or user already exists
- `500 Internal Server Error`: Server error

---

#### Sign In

```http
POST /api/auth/signin
```

Authenticate an existing user.

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Response (200):**

```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com"
  },
  "session": {
    "access_token": "jwt-token",
    "refresh_token": "refresh-token"
  }
}
```

**Error Responses:**
- `401 Unauthorized`: Invalid credentials
- `400 Bad Request`: Validation error

---

### Courses

#### List Courses

```http
GET /api/courses
```

Get a list of courses with optional filtering.

**Query Parameters:**
- `status` (string, optional): Filter by status (`draft`, `published`, `archived`)
- `instructor_id` (string, optional): Filter by instructor UUID
- `level` (string, optional): Filter by level (`beginner`, `intermediate`, `advanced`)
- `limit` (number, optional): Results per page (default: 20, max: 100)
- `offset` (number, optional): Pagination offset (default: 0)

**Example:**

```http
GET /api/courses?status=published&level=beginner&limit=10
```

**Response (200):**

```json
{
  "courses": [
    {
      "id": "uuid",
      "instructor_id": "uuid",
      "title": "DJ Fundamentals",
      "description": "Learn the basics of DJing",
      "short_description": "Get started with DJing",
      "level": "beginner",
      "price": 49.99,
      "currency": "USD",
      "categories": ["mixing", "basics"],
      "enrollment_count": 150,
      "average_rating": 4.5,
      "status": "published",
      "created_at": "2026-01-01T00:00:00Z"
    }
  ]
}
```

---

#### Create Course

```http
POST /api/courses
```

Create a new course (requires instructor role).

**Authentication:** Required

**Request Body:**

```json
{
  "title": "Advanced DJ Techniques",
  "description": "Master advanced mixing techniques",
  "short_description": "Take your skills to the next level",
  "level": "advanced",
  "price": 99.99,
  "categories": ["mixing", "advanced"],
  "status": "draft"
}
```

**Response (201):**

```json
{
  "course": {
    "id": "uuid",
    "instructor_id": "uuid",
    "title": "Advanced DJ Techniques",
    "status": "draft",
    "created_at": "2026-01-05T00:00:00Z"
  }
}
```

**Error Responses:**
- `401 Unauthorized`: Not authenticated
- `403 Forbidden`: User doesn't have instructor role
- `400 Bad Request`: Validation error

---

#### Get Course

```http
GET /api/courses/:id
```

Get detailed information about a specific course, including lessons.

**Response (200):**

```json
{
  "course": {
    "id": "uuid",
    "title": "DJ Fundamentals",
    "description": "...",
    "lessons": [
      {
        "id": "uuid",
        "title": "Introduction to DJ Equipment",
        "description": "...",
        "order_index": 1,
        "video_duration": 600,
        "is_preview": true
      }
    ]
  }
}
```

**Error Responses:**
- `404 Not Found`: Course doesn't exist

---

#### Update Course

```http
PATCH /api/courses/:id
```

Update an existing course (owner only).

**Authentication:** Required

**Request Body:**

```json
{
  "title": "Updated Title",
  "price": 79.99,
  "status": "published"
}
```

**Response (200):**

```json
{
  "course": {
    "id": "uuid",
    "title": "Updated Title",
    "price": 79.99,
    "status": "published"
  }
}
```

**Error Responses:**
- `401 Unauthorized`: Not authenticated
- `403 Forbidden`: Not the course owner
- `404 Not Found`: Course doesn't exist

---

#### Delete Course

```http
DELETE /api/courses/:id
```

Delete a course (owner only).

**Authentication:** Required

**Response (200):**

```json
{
  "success": true
}
```

**Error Responses:**
- `401 Unauthorized`: Not authenticated
- `403 Forbidden`: Not the course owner
- `404 Not Found`: Course doesn't exist

---

### Music Platforms

#### List Connected Platforms

```http
GET /api/music/platforms
```

Get all music platforms connected to the user's account.

**Authentication:** Required

**Response (200):**

```json
{
  "platforms": [
    {
      "id": "uuid",
      "platform": "spotify",
      "platform_user_id": "spotify_user_123",
      "connected_at": "2026-01-01T00:00:00Z",
      "last_synced_at": "2026-01-05T00:00:00Z"
    },
    {
      "id": "uuid",
      "platform": "soundcloud",
      "platform_user_id": "soundcloud_user_456",
      "connected_at": "2026-01-02T00:00:00Z",
      "last_synced_at": "2026-01-05T00:00:00Z"
    }
  ]
}
```

---

#### Get Music Analytics

```http
GET /api/music/analytics
```

Get aggregated analytics from connected music platforms.

**Authentication:** Required

**Query Parameters:**
- `platform` (string, optional): Filter by specific platform
- `metric_type` (string, optional): Filter by metric type
- `days` (number, optional): Number of days to retrieve (default: 30)

**Example:**

```http
GET /api/music/analytics?platform=spotify&days=7
```

**Response (200):**

```json
{
  "analytics": {
    "spotify": {
      "total_plays": [
        {
          "value": 1500,
          "date": "2026-01-05T00:00:00Z"
        }
      ],
      "followers": [
        {
          "value": 350,
          "date": "2026-01-05T00:00:00Z"
        }
      ]
    }
  },
  "raw_data": [...]
}
```

---

## Error Responses

All endpoints follow a consistent error response format:

```json
{
  "error": "Error message",
  "details": {} // Optional additional details
}
```

### Common HTTP Status Codes

- `200 OK`: Request successful
- `201 Created`: Resource created successfully
- `400 Bad Request`: Invalid request parameters
- `401 Unauthorized`: Authentication required or failed
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource not found
- `429 Too Many Requests`: Rate limit exceeded
- `500 Internal Server Error`: Server error

## Webhooks

### Stripe Webhooks

Stripe webhooks are handled at:

```
POST /api/webhooks/stripe
```

**Events Handled:**
- `checkout.session.completed`: Course purchase completed
- `payment_intent.succeeded`: Payment successful
- `payment_intent.payment_failed`: Payment failed

---

## Data Models

### Course

```typescript
interface Course {
  id: string;
  instructor_id: string;
  title: string;
  description?: string;
  short_description?: string;
  cover_image_url?: string;
  trailer_video_url?: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  categories: string[];
  price: number;
  currency: string;
  enrollment_count: number;
  average_rating: number;
  status: 'draft' | 'published' | 'archived';
  published_at?: string;
  created_at: string;
  updated_at: string;
}
```

### Lesson

```typescript
interface Lesson {
  id: string;
  course_id: string;
  title: string;
  description?: string;
  order_index: number;
  video_url?: string;
  video_duration?: number;
  is_preview: boolean;
  resources: Resource[];
  created_at: string;
  updated_at: string;
}
```

### Music Platform Connection

```typescript
interface MusicPlatformConnection {
  id: string;
  user_id: string;
  platform: 'spotify' | 'apple_music' | 'soundcloud' | 'beatport' | 'tidal' | 
           'youtube_music' | 'amazon_music' | 'deezer' | 'bandcamp' | 'mixcloud';
  platform_user_id: string;
  connected_at: string;
  last_synced_at?: string;
}
```

---

## SDK Examples

### JavaScript/TypeScript

```typescript
// Sign up
const response = await fetch('/api/auth/signup', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'password123',
    role: 'student'
  })
});

// List courses
const courses = await fetch('/api/courses?status=published&limit=10');
const data = await courses.json();

// Create course (with auth)
const newCourse = await fetch('/api/courses', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`
  },
  body: JSON.stringify({
    title: 'New Course',
    level: 'beginner',
    price: 49.99
  })
});
```

---

**Last Updated:** January 5, 2026  
**API Version:** 1.0
