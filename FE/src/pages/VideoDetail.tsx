// src/pages/VideoDetail.tsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useVideo, usePageVideos } from '../hooks/useVideos';

export const VideoDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: video, isLoading, isError } = useVideo(slug || '');
  // Lấy ngẫu nhiên một trang video để sử dụng làm gợi ý liên quan.
  // Đầu tiên, lấy trang 1 để lấy thông tin totalPages, sau đó chọn ngẫu nhiên một trang.
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
    // Kết hợp hai mảng video từ trang ngẫu nhiên và trang đầu tiên
    const arr1 = Array.isArray(randomPageResp.videos) ? randomPageResp.videos : [];
    const arr2 = Array.isArray(firstPage.videos) ? firstPage.videos : [];
    const combined = [...arr1, ...arr2];
    if (!combined || combined.length === 0) return [];
    if (!video?.id) return [];

    // Lọc trùng và loại bỏ video hiện tại
    const seen = new Set<string | number>();
    const unique: any[] = [];
    for (const v of combined) {
      if (!v || !v.id) continue;
      // khác các video hiện tại
      if (v.id === video.id) continue;
      if (!seen.has(v.id)) {
        seen.add(v.id);
        unique.push(v);
      }
    }

    if (unique.length === 0) return [];
    // xáo trộn và trả về tối đa 12 (đủ cho 3 hàng trên màn hình )
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
  <div className="container mx-auto px-5 md:px-16 pt-8 pb-20">
      <div className="grid grid-cols-12 gap-6">
      {/* Cột bên trái: chia thành hai thẻ, bên trên: video, phía dưới: các video liên quan */}
        <div className="col-span-12 lg:col-span-10 space-y-10">
          {/* Top card: Video */}
          <div className="bg-white rounded-lg shadow p-2 md:p-5 overflow-hidden">
            {/* Thu nhỏ video bằng cách hạn chế chiều rộng tối đa và căn giữa và giữ nguyên tỷ lệ khung hình */}
            <div className="mx-auto w-full max-w-xs bg-black rounded-lg overflow-hidden aspect-video">
              <video
                src={video.video}
                controls
                autoPlay
                className="w-full h-full"
              />
            </div>
          </div>

          {/* Bottom card: Related Videos */}
          <div className="bg-white rounded-lg shadow p-3 md:p-6">
            <h2 className="text-xl font-semibold mb-4">Related Videos</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {relatedVideos.map((relatedVideo) => (
                <Link 
                  to={`/video/${relatedVideo.slug}`}
                  key={relatedVideo.id}
                  className="block"
                >
                  <div className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-[16/11] bg-gray-200 relative">
                      <img 
                        src={relatedVideo.thumbnail || 'https://via.placeholder.com/300x169'} 
                        alt={relatedVideo.title}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-2 right-2 bg-black/75 text-white text-[10px] px-1 py-0.5 rounded">
                        {Math.floor(Math.random() * 10) + 1}:{('0' + Math.floor(Math.random() * 60)).slice(-2)}
                      </span>
                    </div>
                    <div className="p-2">
                      <h3 className="font-medium text-sm line-clamp-2">{relatedVideo.title}</h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {Math.floor(Math.random() * 1000) + 1} views
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
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
  );
};