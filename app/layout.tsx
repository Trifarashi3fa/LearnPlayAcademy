import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: {
    default: "LearnPlay Academy | Learning Through Play",
    template: "%s | LearnPlay Academy",
  },
  description:
    "LearnPlay Academy helps children aged 7 to 12 build school-friendly skills through interactive games, quizzes, rewards, and visible progress.",
  openGraph: {
    title: "LearnPlay Academy | Learning Through Play",
    description:
      "Interactive games, quizzes, rewards, and progress visibility for children aged 7 to 12.",
    siteName: "LearnPlay Academy",
    type: "website",
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}