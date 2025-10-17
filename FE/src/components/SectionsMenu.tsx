import React from 'react';
import { Link } from 'react-router-dom';

const groups: string[][] = [
  [
    'UsaGAG',
    'Crypto',
    'NFTs',
    'Game',
  ],
  [
    'Photos',
    'Entertainment',
    'Sports',
    'Business',
    'Opinion',
    'Science',
    'UsaGAG Style',
    'UsaGAG News',
  ],
];

export const SectionsMenu: React.FC<{ open: boolean }> = ({ open }) => {
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!open) return;
    // focus first link for keyboard users
    const first = containerRef.current?.querySelector<HTMLAnchorElement>('a');
    first?.focus();
  }, [open]);

  const base =
    'absolute left-0 top-full mt-0 w-56 sm:w-64 bg-white text-black rounded-sm shadow-lg ring-1 ring-black/5 z-40 transform transition-all duration-150 origin-top-left';
  const visible = open ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none';

  return (
    <div
      ref={containerRef}
      role="menu"
      aria-hidden={!open}
      className={`${base} ${visible}`}
    >
      <div className="px-2 py-2">
        {groups.map((group, gi) => (
          <div key={gi} className="py-1">
            {group.map((name) => {
              const slug = name.toLowerCase().replace(/\s+/g, '-');
              return (
                <Link
                  key={name}
                  to={`/section/${encodeURIComponent(slug)}`}
                  className="block px-2 py-1.5 text-sm font-medium text-gray-800 hover:bg-gray-100 rounded"
                  role="menuitem"
                >
                  {name}
                </Link>
              );
            })}
            {gi !== groups.length - 1 && <div className="my-2 border-t border-gray-100" />}
          </div>
        ))}

        <div className="my-2 border-t border-gray-100" />
        <Link
          to="/contact"
          className="block px-2 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded"
          role="menuitem"
        >
          Contact
        </Link>
      </div>
    </div>
  );
};

// removed redundant default export; use the named `SectionsMenu` export
