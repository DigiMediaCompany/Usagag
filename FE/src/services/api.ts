// src/services/api.ts
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;
const API_URL = `${API_BASE_URL}`;

export const fetchVideos = async (page = 1, limit = 12) => {
  try {
    const response = await axios.get(`${API_URL}/videos/`);
    const a = response.data;
    console.log(limit)
    // const total = allVideos.length;
    // const start = (page - 1) * limit;
    // const paginatedVideos = allVideos.data.slice(start, start + limit);

    return {
      videos: a.data,
      total: a.total_items,
      totalPages: a.total_pages,
      currentPage: page
    };
  } catch (error) {
    console.error('Error fetching videos:', error);
    throw error;
  }
};

export const fetchVideoBySlug = async (slug: string) => {
  try {
    const response = await axios.get(`${API_URL}/videos/?slug=${slug}`);
    return response.data.data[0];
  } catch (error) {
    console.error('Error fetching video by slug:', error);
    throw error;
  }
};

export const fetchAllVideos = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching videos:', error);
    throw error;
  }
};

export const fetchRandomPage = async (limit = 12) => {
  const first = await fetchVideos(1, limit);
  const totalPages = first.totalPages || 1;
  const randomPage = Math.floor(Math.random() * totalPages) + 1;
  if (randomPage === 1) return first;
  return await fetchVideos(randomPage, limit);
};