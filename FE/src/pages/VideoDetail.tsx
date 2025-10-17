// src/pages/VideoDetail.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { VideoCard } from '../components/VideoCard';
import { useVideo, usePageVideos } from '../hooks/useVideos';

export const VideoDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: video, isLoading, isError } = useVideo(slug || '');
  const { data: firstPageData } = usePageVideos(1, 12);

  const firstPage: any = firstPageData ?? {};
  const totalPages = firstPage.totalPages || 1;

  const randomPage = React.useMemo(() => {
    if (!totalPages || totalPages <= 1) return 1;
    return Math.floor(Math.random() * totalPages) + 1;
  }, [totalPages]);

  const { data: randomPageData } = usePageVideos(randomPage, 12);
  const randomPageResp: any = randomPageData ?? {};

  const relatedVideos = React.useMemo(() => {

    const arr1 = Array.isArray(randomPageResp.videos) ? randomPageResp.videos : [];
    const arr2 = Array.isArray(firstPage.videos) ? firstPage.videos : [];
    const combined = [...arr1, ...arr2];
    if (!combined || combined.length === 0) return [];
    if (!video?.id) return [];

    const seen = new Set<string | number>();
    const unique: any[] = [];
    for (const v of combined) {
      if (!v || !v.id) continue;
      if (v.id === video.id) continue;
      if (!seen.has(v.id)) {
        seen.add(v.id);
        unique.push(v);
      }
    }

    if (unique.length === 0) return [];
    for (let i = unique.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [unique[i], unique[j]] = [unique[j], unique[i]];
    }
    return unique.slice(0, 12);
  }, [randomPageData, firstPageData, video?.id]);
  
  const AdBanner = ({ size = 'normal' }: { size?: 'normal' | 'large' }) => (
    <div
      className={`bg-gray-100 border border-dashed border-gray-300 rounded-lg flex items-center justify-center
        ${size === 'large' ? 'h-[600px]' : 'h-[300px]'}`}
    >
      <span className="text-gray-400">Advertisement</span>
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent"></div>
      </div>
    );
  }

  if (isError || !video) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Failed to load video. It may not exist.</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-16 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
  <div className="min-h-screen bg-[#1f1f1f]">
  <div  className="container mx-auto px-5 md:px-16 pt-8 pb-20 bg-[#1f1f1f]" >
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-10 space-y-10">
          {/* Top card: Video */}
          <div className=" rounded-lg p-2 md:p-5 overflow-hidden">
            <div className="mx-auto w-full max-w-xs bg-black rounded-lg overflow-hidden aspect-video">
              <video
                src={video.video}
                controls
                autoPlay
                className="w-full h-full"
              />
            </div>
          </div>

          {/* Recommended header (dark bar) */}
          <div className="w-full mb-4">
            <div className="w-full bg-[#1f1f1f] text-white italic font-semibold px-4 py-2 flex items-center">
              <span className="text-lg ">RECOMMENDED</span>
              <div className="flex-1 h-px bg-gray-400 mx-4" />
              <div className="w-24 h-[2px] bg-white" />
            </div>
          </div>

          {/* Bottom card: Related Videos */}
          <div className=" rounded-lg p-3 md:p-6">
            {/* <h2 className="text-xl font-semibold mb-4">RECOMMENDED</h2> */}
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {relatedVideos.map((relatedVideo) => (
                <VideoCard
                  key={relatedVideo.id}
                  video={relatedVideo}
                  highlightOnHover={true}
                  large={false}
                  noBackground={true}
                />
              ))}
            </div>

            <div className="mt-6 text-center">
              <a href="/" className="inline-block px-6 py-3 rounded-md bg-yellow-400 text-black hover:bg-yellow-500 font-semibold">
                SEE MORE VIDEOS
              </a>
            </div>
          </div>
        </div>


        <div className="hidden lg:block lg:col-span-2">
          <div className="space-y-6">
            <AdBanner size="large" />
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};