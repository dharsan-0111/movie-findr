import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Movie Roulette",
  description: "Discover your next movie adventure",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="description" content="Discover your next movie with ease! Movie Roulette helps you find random movies based on genres and make film choices fun and effortless." />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <meta name="author" content="Dharsan Seenivasan" />     
        <meta name="keywords" content="movie roulette, random movie generator, movie picker, film recommendations, movie watchlist, genre-based movie search, film finder, movie suggestions" />
        <meta property="og:title" content="Movie Roulette App" />
        <meta property="og:description" content="Discover your next movie with ease! Movie Roulette helps you find random movies based on genres and make film choices fun and effortless." />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:url" content="https://movie-roulette.vercel.app" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Movie Roulette App" />
        <meta name="twitter:description" content="Discover your next movie with ease! Movie Roulette helps you find random movies based on genres and make film choices fun and effortless." />
        <meta name="twitter:image" content="/og-image.png" />
        <meta name="twitter:site" content="@movie-roulette" />
        <meta name="twitter:creator" content="@movie-roulette" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
