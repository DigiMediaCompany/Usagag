// src/pages/VideoDetail.tsx
import { useParams, Link } from 'react-router-dom';
import { useVideo, useRelatedVideos } from '../hooks/useVideos';

export const VideoDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: video, isLoading, isError } = useVideo(slug || '');
  const { data: relatedVideos = [] } = useRelatedVideos(video?.id);
  
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
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-16 py-16">
      {/* Hàng 1: Video chính + Right Ad */}
      <div className="grid grid-cols-12 gap-6 mb-6">
        {/* Video chính */}
        <div className="col-span-12 lg:col-span-10 bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-200/50">
          <div className="max-w-xs mx-auto">
            <div className="w-full bg-black rounded-lg overflow-hidden aspect-video">
              <video
                src={video.video}
                controls
                autoPlay
                className="w-full h-full"
              />
            </div>
          </div>
        </div>

        {/* Right Ad */}
        <div className="hidden lg:block lg:col-span-2">
          <AdBanner size="large" />
        </div>
      </div>

      {/* Hàng 2: Related Videos */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-10 bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-200/50">
          <h2 className="text-lg font-semibold mb-3">Related Videos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {relatedVideos.map((relatedVideo: any) => (
              <Link 
                to={`/video/${relatedVideo.slug}`}
                key={relatedVideo.id}
                className="block"
              >
                <div className="bg-white rounded-md shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-video bg-gray-200 relative">
                    <img 
                      src={relatedVideo.thumbnail || 'https://via.placeholder.com/200x113'} 
                      alt={relatedVideo.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-1 right-1 bg-black/75 text-white text-xs px-1.5 py-0.5 rounded text-[10px]">
                      {Math.floor(Math.random() * 10) + 1}:{('0' + Math.floor(Math.random() * 60)).slice(-2)}
                    </span>
                  </div>
                  <div className="p-2">
                    <h3 className="font-medium line-clamp-2 text-sm">{relatedVideo.title}</h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {Math.floor(Math.random() * 1000) + 1} views
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Placeholder để giữ cân đối layout */}
        <div className="hidden lg:block lg:col-span-2"></div>
      </div>

      {/* Bottom Ad */}
      <div className="mt-12">
        <AdBanner size="large" />
      </div>
    </div>
  );
};