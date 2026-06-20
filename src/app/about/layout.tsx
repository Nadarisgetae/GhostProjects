import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Ghost Projects - Team & Mission",
  description: "Learn about the mission, values, and the team behind Ghost Projects. We are committed to building privacy-first, lightweight, and independent technology.",
  keywords: [
    "About Ghost Projects",
    "Ghost Projects team",
    "Ghost Projects mission",
    "Ashish Goyal",
    "Daksh Mishra",
    "Aditya Nadar",
    "independent technology"
  ],
  openGraph: {
    title: "About Ghost Projects - Team & Mission",
    description: "Learn about the mission, values, and the team behind Ghost Projects. We are committed to building privacy-first, lightweight, and independent technology.",
    url: "https://ghostprojects.in/about",
    siteName: "Ghost Projects",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Ghost Projects - Team & Mission",
    description: "Learn about the mission, values, and the team behind Ghost Projects. We are committed to building privacy-first, lightweight, and independent technology.",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
