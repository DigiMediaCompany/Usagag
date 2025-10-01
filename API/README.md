# Usagag Video API

A Cloudflare Worker API for managing video content from usagag.com. This API provides RESTful endpoints to create, read, update, and delete video entries in a D1 SQLite database.

## Features
- **Video Management**
  - List all videos with pagination
  - Get video details by ID
  - Add new videos
  - Update existing videos
  - Delete videos
- **CORS Support**
  - Pre-configured CORS headers
  - Handles preflight OPTIONS requests
## API Endpoints

### List All Videos
```
GET /videos
```
**Response:**
```json
[
  {
    "id": 1,
    "title": "Video Title",
    "slug": "video-slug",
    "thumbnail": "https://example.com/thumbnail.jpg",
    "page": "https://usagag.com/video-slug",
    "video": "https://example.com/video.mp4",
    "createdAt": "2025-10-01T14:47:01.000Z",
    "updatedAt": "2025-10-01T14:47:01.000Z"
  }
]
```

### Get Video by ID
```
GET /videos/:id
```
**Response (200 OK):**
```json
{
  "id": 1,
  "title": "Video Title",
  "slug": "video-slug",
  "thumbnail": "https://example.com/thumbnail.jpg",
  "page": "https://usagag.com/video-slug",
  "video": "https://example.com/video.mp4",
  "createdAt": "2025-10-01T14:47:01.000Z",
  "updatedAt": "2025-10-01T14:47:01.000Z"
}
```
**Response (404 Not Found):**
```json
{
  "error": "Not found"
}
```

### Create a New Video
```
POST /videos
```
**Request Body:**
```json
{
  "title": "New Video",
  "slug": "new-video-slug",
  "thumbnail": "https://example.com/thumbnail.jpg",
  "page": "https://usagag.com/new-video-slug",
  "video": "https://example.com/new-video.mp4"
}
```
**Response (201 Created):**
```json
{
  "id": 2,
  "title": "New Video",
  "slug": "new-video-slug",
  "thumbnail": "https://example.com/thumbnail.jpg",
  "page": "https://usagag.com/new-video-slug",
  "video": "https://example.com/new-video.mp4",
  "createdAt": "2025-10-01T14:50:00.000Z",
  "updatedAt": "2025-10-01T14:50:00.000Z"
}
```

### Update a Video
```
PUT /videos/:id
```
**Request Body:**
```json
{
  "title": "Updated Video Title",
  "thumbnail": "https://example.com/updated-thumbnail.jpg"
}
```
**Response (200 OK):**
```json
{
  "id": 1,
  "title": "Updated Video Title",
  "slug": "video-slug",
  "thumbnail": "https://example.com/updated-thumbnail.jpg",
  "page": "https://usagag.com/video-slug",
  "video": "https://example.com/video.mp4",
  "createdAt": "2025-10-01T14:47:01.000Z",
  "updatedAt": "2025-10-01T14:55:00.000Z"
}
```

### Delete a Video
```
DELETE /videos/:id
```
**Response (200 OK):**
```json
{
  "id": 1,
  "title": "Video Title",
  "slug": "video-slug",
  "thumbnail": "https://example.com/thumbnail.jpg",
  "page": "https://usagag.com/video-slug",
  "video": "https://example.com/video.mp4",
  "createdAt": "2025-10-01T14:47:01.000Z",
  "updatedAt": "2025-10-01T14:47:01.000Z"
}
```
**Response (404 Not Found):**
```json
{
  "error": "Not found"
}
```

## Development

### Prerequisites
- Node.js 18+
- npm or yarn
- Wrangler CLI (`npm install -g wrangler`)

### Local Development
1. Clone the repository
2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
wrangler dev
```

## Deployment

1. Build the project:
```bash
npm run build
```

2. Deploy to Cloudflare Workers:
```bash
wrangler deploy
```

## Todo
