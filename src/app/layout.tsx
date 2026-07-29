"use client";

import 'bootstrap/dist/css/bootstrap.min.css';
import { Header, HeaderItem } from "@/components/header/page";
import { Footer } from '@/components/footer/page';
import { ListActionProvider } from '@/contexts/listActionContext';
import { usePathname } from 'next/navigation';
import { useAuthStatus } from '@/hooks/useAuthStatus';
import { isAdmin } from '@/utils/jwtDecoder';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const pathname = usePathname();
  const hideHeaderFooter = ["/login","/signup"];
  const shouldHideHeaderFooter = hideHeaderFooter.includes(pathname);

  return (
    <html lang="en">
      <head>
        <title>Yu-Gi-Oh! Deck Builder</title>
        <link rel="icon" type="image/x-icon" href="logo.png" />
      </head>
      <body className="d-flex flex-column min-vh-100">
        {!shouldHideHeaderFooter && <Header/>}
        <main className="flex-grow-1">
          <ListActionProvider>
            {children}
          </ListActionProvider>
        </main>
        {!shouldHideHeaderFooter && <Footer />}
      </body>
    </html>
  );
}
