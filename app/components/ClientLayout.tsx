'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Header from './Header';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800 dark:text-gray-200">
      {!isHome && <Header />}
      <main className="flex-grow">{children}</main>
      {!isHome && (
        <footer className="text-center p-4 text-gray-500 dark:text-gray-400 text-sm">
          © {new Date().getFullYear()} Christopher Butler. All rights reserved.
        </footer>
      )}
    </div>
  );
}
