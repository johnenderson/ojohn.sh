'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

import { PreferencesPanel } from './PreferencesPanel';

const navLinks = [
  { href: '/writings', label: 'Artigos' },
  { href: '/sobre', label: 'Sobre mim' },
];

export const Navbar = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`navbar fixed top-0 left-0 z-40 h-16 w-full px-6 transition-colors duration-300 md:h-20 lg:px-0${scrolled ? ' scrolled' : ''}`}
    >
      <div className="mx-auto flex size-full max-w-5xl items-center">
        <Link
          href="/"
          className="flex items-center gap-1.5 no-underline hover:opacity-70 transition-opacity text-white light:text-[#333]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM16.4645 15.5355L20 12L16.4645 8.46447L15.0503 9.87868L17.1716 12L15.0503 14.1213L16.4645 15.5355ZM6.82843 12L8.94975 9.87868L7.53553 8.46447L4 12L7.53553 15.5355L8.94975 14.1213L6.82843 12ZM11.2443 17L14.884 7H12.7557L9.11597 17H11.2443Z" />
          </svg>
          <span className="text-2xl font-normal">
            johnenderson
          </span>
        </Link>

        <div className="ml-auto flex items-center h-full">
          <nav className="hidden md:flex items-center h-full">
            {navLinks.map(({ href, label }) => {
              const isActive =
                href === '/' ? pathname === '/' : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex h-full items-center px-3 font-normal no-underline transition-colors duration-200 ${
                    isActive
                      ? 'text-[#a78bfa] light:text-[#7c3aed]'
                      : 'text-[#555] hover:text-[#c4b5fd] light:text-[#888] light:hover:text-[#7c3aed]'
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          <div className="ml-2">
            <PreferencesPanel />
          </div>
        </div>
      </div>
    </header>
  );
};
