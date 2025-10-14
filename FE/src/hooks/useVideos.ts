import { useQuery } from '@tanstack/react-query';
import { fetchVideos, fetchVideoBySlug } from '../services/api';

export const useVideos = (page = 1) => {
  return useQuery({
    queryKey: ['videos', page],
    queryFn: () => fetchVideos(page, 12),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
  } as any);
};

export const usePageVideos = (page = 1, limit = 12) => {
  return useQuery({
    queryKey: ['videos', 'page', page, limit],
    queryFn: () => fetchVideos(page, limit),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
  } as any);
};

export const useVideo = (slug: string) => {
  return useQuery({
    queryKey: ['video', slug],
    queryFn: () => fetchVideoBySlug(slug),
    enabled: !!slug,
  });
};
