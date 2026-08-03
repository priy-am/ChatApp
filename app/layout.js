import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "PieChat - Next-Gen Realtime Messaging & Developer Forums",
  description: "Connect, collaborate, and chat instantly with PieChat. Real-time messaging, group channels, and developer forums.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" className="light scroll-smooth">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#eef0f8] text-slate-800 min-h-screen flex flex-col`}
        >
          <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(99,102,241,0.08),rgba(255,255,255,0))] pointer-events-none z-0" />
          <div className="relative z-10 flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">{children}</main>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}


