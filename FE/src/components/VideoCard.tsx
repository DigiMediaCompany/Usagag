import { Link } from 'react-router-dom';
import { PlayIcon } from '@heroicons/react/24/solid';

interface VideoCardProps {
  video: {
    id: number;
    title: string;
    slug: string;
    thumbnail?: string;
  };
  highlightOnHover?: boolean;
  large?: boolean;
  compact?: boolean;
  noBackground?: boolean;
}

export const VideoCard = ({ video, highlightOnHover = false, large = false, compact = false, noBackground = false }: VideoCardProps) => {
  return (
    <Link
      to={`/video/${video.slug}`}
      className={`group relative overflow-visible rounded-lg ${noBackground ? '' : 'bg-white'} transition-all duration-200`}>

      <div className={`relative overflow-hidden ${large ? 'md:h-72' : compact ? 'h-28' : 'h-48'} rounded-lg`}> 
        <img
          src={video.thumbnail || 'https://via.placeholder.com/640x360'}
          alt={video.title}
          className="w-full h-full object-cover"
        />

        {/* persistent small play indicator bottom-left */}
        <div className="absolute bottom-2 left-2 pointer-events-none">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center ring-2 ring-yellow-400">
              <PlayIcon className="h-4 w-4 text-indigo-600" />
            </div>
          </div>
        </div>

        {/* hover yellow frame appears only when highlightOnHover is true */}
        {highlightOnHover && (
          <div className="absolute inset-0 pointer-events-none rounded-lg opacity-0 transition-opacity duration-150 group-hover:opacity-100 z-20">
            <div className="w-full h-full border-4 border-yellow-400 rounded-lg" />
          </div>
        )}
      </div>

      <div className="p-3">
        <h3 className={`line-clamp-2 ${compact ? 'text-sm' : 'text-base'} font-medium`}>{video.title}</h3>
      </div>
    </Link>
  );
};