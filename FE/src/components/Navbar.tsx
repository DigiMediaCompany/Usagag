import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { SectionsMenu } from './SectionsMenu';

export const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const [mobileSearchOpen, setMobileSearchOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const isDetail = location.pathname.startsWith('/video/');

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
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);


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
    <nav className="bg-black border-b border-white/20">
      <div className="container mx-auto px-5 md:px-16 py-3 relative flex items-center justify-between">
        {mobileSearchOpen && !isDetail ? (
          // mobile search UI (hides logo and sections)
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
            >
              Search
            </button>
          </div>
        ) : (
          <div className="w-full flex items-center">
            {/* left column (flexible) */}
            <div className="flex-1 flex items-center" ref={ref}>
              {!isDetail && (
                <div className="relative flex items-center">
                  <button
                    onClick={() => setOpen(o => !o)}
                    className="flex items-center gap-2 text-white text-sm font-medium rounded-md px-2 py-2 hover:bg-white/5"
                    aria-expanded={open}
                    aria-controls="sections-menu"
                  >
                    <svg className="w-5 h-5 text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 6h16M4 12h16M4 18h16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <span className="hidden sm:inline">SECTIONS</span>
                  </button>

                  {/* SEARCH: desktop navigates, mobile opens modal */}
                  <button
                    onClick={() => {
                      if (window.innerWidth >= 640) {
                        // desktop: navigate to /search (with query if present)
                        const q = query.trim();
                        if (q) {
                          navigate(`/search?q=${encodeURIComponent(q)}`);
                        } else {
                          navigate('/search');
                        }
                      } else {
                        // mobile: open modal
                        setMobileSearchOpen(true);
                      }
                    }}
                    className="hidden sm:flex items-center gap-2 ml-3 rounded-md px-3 py-2 text-white text-sm hover:bg-white/5"
                  >
                    <svg className="w-4 h-4 text-yellow-400" viewBox="0 0 20 20" fill="none"><path d="M19 19l-4.35-4.35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><circle cx="8.5" cy="8.5" r="5" stroke="currentColor" strokeWidth="1.5" /></svg>
                    <span>SEARCH</span>
                  </button>

                  <div
                    className={`fixed inset-0 z-30 bg-black transition-opacity duration-150 ${open ? 'opacity-40 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                    onClick={() => setOpen(false)}
                    aria-hidden="true"
                  />

                  <div id="sections-menu" className="z-40">
                    <SectionsMenu open={open} />
                  </div>
                </div>
              )}
            </div>

            {/* center column: always center the logo */}
            <div className="flex-none flex justify-center">
              <Link to="/" className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-yellow-400 uppercase tracking-wider leading-none">
                USA GAG
              </Link>
            </div>

            {/* right column: show mobile search icon only when not detail */}
            <div className="flex-1 flex justify-end items-center">
              {!isDetail && (
                <button
                  onClick={() => setMobileSearchOpen(true)}
                  className="sm:hidden p-2 rounded-md text-white hover:bg-white/5"
                  aria-label="Open search"
                >
                  <svg className="w-5 h-5 text-yellow-400" viewBox="0 0 20 20" fill="none"><path d="M19 19l-4.35-4.35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><circle cx="8.5" cy="8.5" r="5" stroke="currentColor" strokeWidth="1.5" /></svg>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};