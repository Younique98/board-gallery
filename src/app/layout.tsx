import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "../../providers/ReactQueryProvider";

const inter = Inter( { subsets: [ "latin" ] } );

const SITE_URL = "https://board-gallery.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Board Gallery",
    template: "%s | Board Gallery",
  },
  description:
    "Board Gallery is a creative asset board gallery with infinite scroll, optimized image loading, and a component-driven UI, built with Next.js and TypeScript.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "Board Gallery",
    title: "Board Gallery",
    description:
      "A creative asset board gallery with infinite scroll and optimized image loading, built with Next.js and TypeScript.",
    url: SITE_URL,
  },
  twitter: {
    card: "summary",
    title: "Board Gallery",
    description:
      "A creative asset board gallery with infinite scroll and optimized image loading, built with Next.js and TypeScript.",
  },
};

export default function RootLayout( {
  children,
}: {
  children: React.ReactNode;
} ) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
