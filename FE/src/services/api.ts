// src/services/api.ts
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;
const API_URL = `${API_BASE_URL}`;

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
export const fetchAllVideos = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log('API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching videos:', error);
    throw error;
  }
};