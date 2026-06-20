import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ghost Browser - Unrestricted, Private & Secure Web Browser",
  description: "Download Ghost Browser, a secure and private desktop web browser built from the ground up to bypass school, work, and local network censorship restrictions.",
  keywords: [
    "Ghost Browser",
    "Download Ghost Browser",
    "Bypass firewall",
    "School browser bypass",
    "Private browser",
    "Secure browser",
    "Unblock websites",
    "Censorship bypass"
  ],
  openGraph: {
    title: "Ghost Browser - Unrestricted, Private & Secure Web Browser",
    description: "Download Ghost Browser, a secure and private desktop web browser built from the ground up to bypass school, work, and local network censorship restrictions.",
    url: "https://ghostprojects.in/ghost-browser",
    siteName: "Ghost Projects",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ghost Browser - Unrestricted, Private & Secure Web Browser",
    description: "Download Ghost Browser, a secure and private desktop web browser built from the ground up to bypass network firewalls and restrictions.",
  },
};

export default function GhostBrowserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
