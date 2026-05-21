'use client';

import { usePathname } from 'next/navigation';

export function useCanonicalURL() {
  const pathname = usePathname() ?? '/';
  const domain = process.env.NEXT_PUBLIC_DOMAIN_URL ?? '';
  return pathname === '/' ? domain : domain + pathname;
}
