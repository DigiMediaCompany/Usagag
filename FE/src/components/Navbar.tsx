import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const [mobileSearchOpen, setMobileSearchOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  React.useEffect(() => {
    const prev = document.body.style.overflow;
    const isMobileModal = open && window.innerWidth < 640;
    if (isMobileModal) document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [open]);


  React.useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 640) {
        setMobileSearchOpen(false);
      }
    };
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const doSearch = () => {
    const q = query.trim();
    if (!q) return;
    navigate(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <nav className="bg-white shadow-md border-b">
  <div className="container mx-auto px-5 md:px-16 py-3 flex items-center justify-between">
        {mobileSearchOpen ? (
         // khi bấm vào tìm kiếm trên đt thì ẩn logo và sections
          <div className="w-full sm:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileSearchOpen(false)}
              className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
              aria-label="Close search"
            >
              ←
            </button>
            <input
              type="search"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') { doSearch(); setMobileSearchOpen(false); }
                if (e.key === 'Escape') setMobileSearchOpen(false);
              }}
              className="flex-1 rounded-md border px-3 py-2 text-sm bg-white"
              autoFocus
            />
            <button
              onClick={() => { doSearch(); setMobileSearchOpen(false); }}
              className="p-2 rounded-md bg-indigo-600 text-white"
              aria-label="Search"
            >
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 19l-4.35-4.35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="8.5" cy="8.5" r="5" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
          </div>
        ) : (
          <>
            <Link to="/" className="text-2xl font-extrabold text-indigo-600 tracking-tight">
              USAGAG
            </Link>

            <div className="flex items-center gap-4">
              {/* thanh tìm kiếm mở rộng  */}
              <div className="hidden sm:flex relative rounded-full bg-gray-50 border border-gray-200 flex items-center overflow-hidden shadow-sm">
                <input
                  type="search"
                  placeholder="Search..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') doSearch(); }}
                  className="w-48 md:w-64 bg-transparent px-4 py-2 text-sm outline-none"
                />
                <button
                  onClick={doSearch}
                  aria-label="Search"
                  className="px-3 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors"
                >
                  <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 19l-4.35-4.35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="8.5" cy="8.5" r="5" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </button>
              </div>
              <button
                className="sm:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
                onClick={() => setMobileSearchOpen(true)}
                aria-label="Open search"
              >
                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 19l-4.35-4.35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="8.5" cy="8.5" r="5" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>

              {/* Sections dropdown */}
              <div className="relative" ref={ref}>
                <button
                  onClick={() => setOpen(o => !o)}
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm bg-white hover:bg-gray-50 border border-gray-200 shadow-sm"
                  aria-haspopup="true"
                  aria-expanded={open}
                >
                  Sections
                  <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.293l3.71-4.06a.75.75 0 111.08 1.04l-4.25 4.65a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                  </svg>
                </button>

                {open && (
                  <>
                    <div className="sm:hidden fixed inset-0 z-50">
                      <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
                      <div className="absolute inset-0 bg-white overflow-auto" style={{ animation: 'sectionsIn 200ms ease-out' }}>
                        <style>{`@keyframes sectionsIn { from { opacity: 0; transform: translateY(8px) } to { opacity: 1; transform: translateY(0) } }`}</style>
                        <div className="h-full w-full px-5 pt-4">
                        <div className="flex items-center justify-between p-3 border-b">
                            <h2 className="text-base font-semibold">Sections</h2>
                            <button onClick={() => setOpen(false)} className="p-1 rounded text-gray-600 hover:bg-gray-100">✕</button>
                          </div>
                          <div className="py-2">
                            <div className="flex flex-col gap-1">
                              {[
                                ['Crypto', '/sections/'],
                                ['NFTs', '/sections/'],
                                ['Game', '/sections/'],
                                ['Photos', '/sections/'],
                                ['Entertainment', '/sections/'],
                                ['Sports', '/sections/'],
                                ['Business', '/sections/'],
                                ['Opinion', '/sections/'],
                                ['Science', '/sections/'],
                                ['UsaGAG Style', '/sections/'],
                                ['UsaGAG News', '/sections/'],
                                ['Contact', '/'],
                              ].map(([label, href]) => (
                                <Link key={String(label)} to={String(href)} onClick={() => setOpen(false)} className="w-full block py-2 px-3 bg-gray-50 hover:bg-gray-100 rounded-sm text-left text-sm font-medium">
                                  {label}
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="hidden sm:block absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50" role="menu" aria-orientation="vertical">
                      <style>{`@keyframes sectionsIn { from { opacity: 0; transform: translateY(-6px) } to { opacity: 1; transform: translateY(0) } }`}</style>
                      <div className="p-3" style={{ animation: 'sectionsIn 160ms ease-out' }}>
                        {[
                          ['Crypto', '/sections/'],
                          ['NFTs', '/sections/'],
                          ['Game', '/sections/'],
                          ['Photos', '/sections/'],
                          ['Entertainment', '/sections/'],
                          ['Sports', '/sections/'],
                          ['Business', '/sections/'],
                          ['Opinion', '/sections/'],
                          ['Science', '/sections/'],
                          ['UsaGAG Style', '/sections/'],
                          ['UsaGAG News', '/sections/'],
                          ['Contact', '/'],
                        ].map(([label, href]) => (
                          <Link key={String(label)} to={String(href)} onClick={() => setOpen(false)} className="block w-full text-left px-3 py-3 rounded hover:bg-gray-100 text-sm font-medium">
                            {label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};