import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const categories = ['CRYPTO', 'NFTS', 'GAME', 'OPINION', 'BUSINESS', 'SPORTS', 'GAG STYLE', 'GAG NEWS', 'PHOTOS'];

  return (
    <footer className="">
      <div className="container mx-auto px-5 md:px-16 py-6 text-center text-gray-600">
        <div className="border-t border-gray-200 mb-4" />

        <p className="text-xs text-gray-500 mb-3">© 2020 USAGAG, INC. ALL RIGHTS RESERVED | TERMS OF USE | PRIVACY POLICY | ABOUT US | CONTACT</p>

        <div className="text-xs font-semibold tracking-wider uppercase flex flex-wrap justify-center items-center gap-x-3 gap-y-2">
          {categories.map((c, i) => (
            <React.Fragment key={c}>
              <Link to={`/section/${c.toLowerCase().replace(/\s+/g, '-')}`} className="text-gray-700 hover:underline px-1">
                {c}
              </Link>
              {i < categories.length - 1 && <span className="text-gray-300">|</span>}
            </React.Fragment>
          ))}
          <span className="text-gray-700 ml-1">SITEMAP</span>
        </div>
      </div>
    </footer>
  );
};

// removed redundant default export; use the named `Footer` export
