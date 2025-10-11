import { useState, useEffect } from 'react';
import { useVideos } from '../hooks/useVideos';
import { VideoCard } from '../components/VideoCard';
import { motion } from 'framer-motion';

export const Home = () => {
  const [page, setPage] = useState(1);
  const [allVideos, setAllVideos] = useState<any[]>([]);
  const { data, isLoading, isError, error } = useVideos(page);

  useEffect(() => {
    if (data?.videos) {
      if (page === 1) {
        setAllVideos(data.videos);
      } else {
        setAllVideos(prev => [...prev, ...data.videos]);
      }
    }
  }, [data, page]);

  const loadMore = () => {
    if (data && page < data.totalPages) {
      setPage(prev => prev + 1);
    }
  };

  if (isLoading && page === 1) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Failed to load videos. Please try again later.</p>
          <pre className="text-sm text-gray-600 mt-2">{error instanceof Error ? error.message : 'Unknown error'}</pre>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6 sm:px-8 sm:py-10 md:px-12 md:py-12 lg:px-16 lg:py-16">
        {allVideos.length > 0 ? (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4 xl:gap-8"
            >
              {allVideos.map((video) => (
                <VideoCard key={`${video.id}-${video.createdAt}`} video={video} />
              ))}
            </motion.div>

            {data && page < data.totalPages && (
              <div className="mt-8 text-center">
                <button
                  onClick={loadMore}
                  disabled={isLoading}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Loading...' : 'Load More'}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No videos found</p>
          </div>
        )}
      </div>
    </div>
  );
};