import { Link } from 'react-router-dom';
import { PlayIcon } from '@heroicons/react/24/solid';

interface VideoCardProps {
  video: {
    id: number;
    title: string;
    slug: string;
    thumbnail: string;
    createdAt: string;
  };
}

export const VideoCard = ({ video }: VideoCardProps) => {
  return (
    <Link
      to={`/video/${video.slug}`}
      className="block group relative overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl hover:transform hover:-translate-y-1"
    >
      <div className="relative aspect-video overflow-hidden rounded-t-xl">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 transition-opacity group-hover:opacity-100">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white bg-opacity-90 shadow-lg">
            <PlayIcon className="h-7 w-7 text-indigo-600" />
          </div>
        </div>
      </div>
      <div className="p-5">
        <h3 className="line-clamp-2 font-semibold text-gray-900 text-base leading-tight mb-2" title={video.title}>
          {video.title}
        </h3>
        <p className="text-sm text-gray-500 font-medium">
          {new Date(video.createdAt).toLocaleDateString('vi-VN')}
        </p>
      </div>
    </Link>
  );
};