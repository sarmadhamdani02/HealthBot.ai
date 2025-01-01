import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// Default metadata (this will apply globally unless overridden in specific pages)
export const metadata: Metadata = {
  title: "HealthBot", // Default title
  description: "HealthBot", // Default description
  keywords: "nextjs, web development, HealthBot app",
  authors: [
    { name: "Your Name", url: "https://yourwebsite.com" },
  ],
  openGraph: {
    title: "My Awesome App",
    description: "Welcome to my awesome app built with Next.js",
    url: "https://yourwebsite.com",
    images: [
      {
        url: "https://yourwebsite.com/og-image.png", // Customize with your OG image
        width: 1200,
        height: 630,
        alt: "My Awesome App Preview",
      },
    ],
    siteName: "My Awesome App",
  },
  twitter: {
    card: "summary_large_image",
    title: "My Awesome App",
    description: "Welcome to my awesome app built with Next.js",
    image: "https://yourwebsite.com/og-image.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        {/* Add dynamic title if specific title is set in the page's metadata */}
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta name="robots" content={metadata.robots.index ? "index" : "noindex"} />
        {/* Open Graph meta tags */}
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta property="og:description" content={metadata.openGraph.description} />
        <meta property="og:image" content={metadata.openGraph.images[0].url} />
        <meta property="og:url" content={metadata.openGraph.url} />
        <meta property="og:site_name" content={metadata.openGraph.siteName} />
        {/* Twitter meta tags */}
        <meta name="twitter:card" content={metadata.twitter.card} />
        <meta name="twitter:title" content={metadata.twitter.title} />
        <meta name="twitter:description" content={metadata.twitter.description} />
        <meta name="twitter:image" content={metadata.twitter.image} />
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
