import { useQuery } from '@tanstack/react-query';
import { fetchVideos, fetchVideoBySlug } from '../services/api';

export const useVideos = (page = 1) => {
  return useQuery({
    queryKey: ['videos', page],
  // request 18 items per page so a 3-column grid shows one additional row
  queryFn: () => fetchVideos(page, 18),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
  } as any);
};

export const usePageVideos = (page = 1, limit = 18) => {
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
