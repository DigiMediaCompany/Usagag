import { useQuery } from '@tanstack/react-query';
import { fetchVideos, fetchVideoBySlug } from '../services/api';

export const useVideos = (page = 1) => {
  return useQuery({
    queryKey: ['videos', page],
    queryFn: () => fetchVideos(page, 12),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
  });
};

export const useVideo = (slug: string) => {
  return useQuery({
    queryKey: ['video', slug],
    queryFn: () => fetchVideoBySlug(slug),
    enabled: !!slug,
  });
};
export const useRelatedVideos = (excludeId?: string) => {
  const randomPage = Math.floor(Math.random() * 10) + 1; // Random page from 1-10
  
  return useQuery({
    queryKey: ['relatedVideos', randomPage, excludeId],
    queryFn: async () => {
      const result = await fetchVideos(randomPage, 12);
      // Filter out the current video if excludeId is provided
      const filteredVideos = excludeId 
        ? result.videos.filter((video: any) => video.id !== excludeId)
        : result.videos;
      
      // Shuffle and return first 12
      return filteredVideos
        .sort(() => 0.5 - Math.random())
        .slice(0, 12);
    },
    staleTime: 5 * 60 * 1000,
    enabled: true,
  });
};