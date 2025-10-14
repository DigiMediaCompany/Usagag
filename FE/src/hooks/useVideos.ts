import { useQuery } from '@tanstack/react-query';
import { fetchVideos, fetchVideoBySlug, fetchAllVideos } from '../services/api';

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
export const useAllVideos = () => {
  return useQuery({
    queryKey: ['allVideos'],
    queryFn: fetchAllVideos,
    staleTime: 5 * 60 * 1000,
  });
};