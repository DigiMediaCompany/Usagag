import { useState, useEffect } from 'react';
import { useVideos } from '../hooks/useVideos';
import { fetchVideos } from '../services/api';
import { VideoCard } from '../components/VideoCard';

export const Home = () => {
  const [page, setPage] = useState(1);
  const [allVideos, setAllVideos] = useState<any[]>([]);
  const { data, isLoading, isError, error } = useVideos(page);
  const dataResp: any = data ?? {};
  const PAGE_LIMIT = 18;
  const LOAD_BATCH = 9; 
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [visibleCount, setVisibleCount] = useState(9); 

  useEffect(() => {
    if (dataResp.videos) {
      if (page === 1) {
        setAllVideos(dataResp.videos);
      } else {
        setAllVideos(prev => {
          const existingIds = new Set(prev.map(v => v.id));
          const filtered = dataResp.videos.filter((v: any) => !existingIds.has(v.id));
          return [...prev, ...filtered];
        });
      }
    }
  }, [data, page]);

  const loadMore = async () => {
    if (!(dataResp && dataResp.totalPages) || page >= dataResp.totalPages) return;
    try {
      setIsLoadingMore(true);
      const nextPage = page + 1;
      const resp: any = await fetchVideos(nextPage, PAGE_LIMIT);
      if (resp && resp.videos && resp.videos.length > 0) {
        setAllVideos(prev => {
          const existingIds = new Set(prev.map(v => v.id));
          const filtered = resp.videos.filter((v: any) => !existingIds.has(v.id));
          return [...prev, ...filtered];
        });
        setPage(nextPage);
        setVisibleCount(prev => prev + LOAD_BATCH);
      }
    } catch (err) {
      console.error('Failed to load more videos', err);
    } finally {
      setIsLoadingMore(false);
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
            className="mt-4 rounded-md bg-indigo-600 px-16 py-2 text-white hover:bg-indigo-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 page-padding">
      <div className="container mx-auto px-5 md:px-16 py-8">
        {allVideos.length > 0 ? (
          <>
            {/* Section 1: 4 rows */}
            <section className="mb-12">
              <div className="mb-4">
                <h2 className="inline-block text-2xl md:text-3xl italic font-extrabold uppercase tracking-wide">
                  VIDEO
                </h2>
              </div>

              {/* Row 2: large video occupying 2/3 of the row; right 1/3 left empty */}
              <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Large video: spans 2 columns on md+ */}
                <div className="md:col-span-2">
                  {allVideos[0] ? (
                    <VideoCard key={allVideos[0].id} video={allVideos[0]} />
                  ) : (
                    <div className="h-64 rounded-lg border border-gray-200 bg-white shadow-sm" />
                  )}
                </div>

                <div />
              </div>

              {/* Row 3: subtitle */}
              <h3 className="text-3xl md:text-4xl font-extrabold mb-4 heading-serif">Cam Everywhere</h3>

              {/* Row 4: three videos (next items) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {allVideos.slice(1, 4).map((video) => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
            </section>

            <section>
              <div className="my-6 flex items-center">
                <div className="h-2 bg-gray-800 flex-1 rounded-sm" />
                <h2 className="mx-6 text-center text-lg italic font-semibold tracking-wider uppercase">MORE VIDEOS</h2>
                <div className="h-2 bg-gray-800 flex-1 rounded-sm" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {allVideos.slice(4, 4 + visibleCount).map((video) => (
                  <VideoCard key={video.id} video={video} highlightOnHover large />
                ))}
                {Array.from({ length: Math.max(0, visibleCount - Math.max(0, allVideos.length - 4)) }).map((_, idx) => (
                  <div key={`ph-${idx}`} className="h-48 rounded-lg border border-gray-200 bg-white shadow-sm" />
                ))}
              </div>
            </section>

            {dataResp && page < dataResp.totalPages && (
              <div className="mt-8 text-center">
                <button
                  onClick={loadMore}
                  disabled={isLoading || isLoadingMore}
                  className="px-6 py-3 rounded-md bg-yellow-400 text-black hover:bg-yellow-500 focus:ring-2 focus:ring-yellow-300 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                >
                  {isLoadingMore || isLoading ? 'Loading...' : 'SEE MORE VIDEOS'}
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