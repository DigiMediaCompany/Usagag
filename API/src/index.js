import { drizzle } from 'drizzle-orm/d1';
import { videos } from './db/video.js';
import { eq } from 'drizzle-orm';
function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*", 
      "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization"
    }
  });
}

export default {
  async fetch(request, env) {
    const db = drizzle(env.DB); 
    const url = new URL(request.url);
    const pathname = url.pathname;

    // Handle preflight OPTIONS (CORS)
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization"
        }
      });
    }

    // GET /videos
    if (request.method === 'GET' && pathname === '/videos') {
      const rows = await db.select().from(videos).all();
      return jsonResponse(rows);
    }

    // GET /videos/:id
    if (request.method === 'GET' && pathname.startsWith('/videos/')) {
      const id = parseInt(pathname.split('/')[2], 10);
      const row = await db.select().from(videos).where(eq(videos.id, id)).get();
      if (!row) return jsonResponse({ error: "Not found" }, 404);
      return jsonResponse(row);
    }

    // POST /videos
    if (request.method === 'POST' && pathname === '/videos') {
      const body = await request.json();
      const result = await db.insert(videos).values({
        title: body.Title ?? body.title,
        slug: body.Slug ?? body.slug,
        thumbnail: body.Thumbnail ?? body.thumbnail,
        page: body["Page Link"] ?? body.page,
        video: body["Video Link"] ?? body.video
      }).returning().get();

      return jsonResponse(result, 201);
    }

    // PUT /videos/:id
    if (request.method === 'PUT' && pathname.startsWith('/videos/')) {
      const id = parseInt(pathname.split('/')[2], 10);
      const body = await request.json();
      const result = await db.update(videos).set({
        title: body.Title ?? body.title,
        slug: body.Slug ?? body.slug,
        thumbnail: body.Thumbnail ?? body.thumbnail,
        page: body["Page Link"] ?? body.page,
        video: body["Video Link"] ?? body.video,
        updatedAt: new Date().toISOString()
      }).where(eq(videos.id, id)).returning().get();

      return jsonResponse(result ?? {}, result ? 200 : 404);
    }

    // DELETE /videos/:id
    if (request.method === 'DELETE' && pathname.startsWith('/videos/')) {
      const id = parseInt(pathname.split('/')[2], 10);
      const result = await db.delete(videos).where(eq(videos.id, id)).returning().get();
      return jsonResponse(result ?? {}, result ? 200 : 404);
    }

    return jsonResponse({ error: "Not found" }, 404);
  }
};
