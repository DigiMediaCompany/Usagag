// src/services/api.ts
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;
const API_URL = `${API_BASE_URL}/videos`;

export const fetchVideos = async (page = 1, limit = 12) => {
  try {
    const response = await axios.get(API_URL);
    const allVideos = response.data;
    const total = allVideos.length;
    const start = (page - 1) * limit;
    const paginatedVideos = allVideos.slice(start, start + limit);

    return {
      videos: paginatedVideos,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    };
  } catch (error) {
    console.error('Error fetching videos:', error);
    throw error;
  }
};

export const fetchVideoBySlug = async (slug: string) => {
  try {
    const response = await axios.get(API_URL);
    return response.data.find((video: any) => video.slug === slug);
  } catch (error) {
    console.error('Error fetching video by slug:', error);
    throw error;
  }
};
/**
 * NOTE: fetchAllVideos is deprecated because fetching the entire dataset is costly.
 * Ideally the backend should expose paginated endpoints like `/videos?page=1&limit=12`
 * or an endpoint to return a single random video. Current implementation returns
 * the full array since the backend does not provide server-side paging.
 */
export const fetchAllVideos = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching videos:', error);
    throw error;
  }
};

/**
 * Helper that picks a random page and returns the page result using fetchVideos.
 * This function still requests the full list from the backend because the
 * current backend API returns all videos. For a real performance win, add
 * server-side pagination or a dedicated random video endpoint.
 */
export const fetchRandomPage = async (limit = 12) => {
  const first = await fetchVideos(1, limit);
  const totalPages = first.totalPages || 1;
  const randomPage = Math.floor(Math.random() * totalPages) + 1;
  if (randomPage === 1) return first;
  return await fetchVideos(randomPage, limit);
};