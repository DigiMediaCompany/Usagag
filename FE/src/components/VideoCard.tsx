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
      className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-xl"
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 transition-opacity group-hover:opacity-100">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white bg-opacity-80">
            <PlayIcon className="h-6 w-6 text-indigo-600" />
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="line-clamp-2 font-medium text-gray-900" title={video.title}>
          {video.title}
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          {new Date(video.createdAt).toLocaleDateString()}
        </p>
      </div>
    </Link>
  );
};