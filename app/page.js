import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/logo.svg";
import { MessageSquare, Users, Zap, Shield, Sparkles, ArrowRight, Lock, CheckCircle2 } from "lucide-react";

export default function Home() {
  return (
    <div className="bg-[#eef0f8] min-h-screen text-slate-800">
      {/* Hero Section matching User Screenshot */}
      <section className="py-16 md:py-24 px-6 md:px-12 lg:px-24 bg-[#dedeed] border-b border-slate-300/60">
        <div className="max-w-7xl mx-auto">
          <div className="md:flex md:items-center md:justify-between gap-12">
            {/* Left Content Column */}
            <div className="md:w-1/2 text-center md:text-left">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight mb-6 tracking-tight">
                PieChat: Connect, Share, and Chat
              </h1>
              <p className="text-lg md:text-xl text-slate-600 mb-8 font-normal leading-relaxed">
                Experience seamless communication with PieChat. Instant messaging,
                group chats, and more, all in one place. Join the conversation today!
              </p>
              <div className="flex items-center justify-center md:justify-start gap-4">
                <Link
                  href="/chats"
                  className="bg-indigo-600 text-white py-3.5 px-7 rounded-xl font-semibold hover:bg-indigo-700 shadow-md shadow-indigo-600/20 transition duration-300 inline-flex items-center gap-2"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/forums"
                  className="bg-transparent border border-indigo-500 text-indigo-600 py-3.5 px-7 rounded-xl font-semibold hover:bg-indigo-50 hover:text-indigo-700 transition duration-300"
                >
                  Learn More
                </Link>
              </div>
            </div>

            {/* Right Column: PieChat Logo Illustration Card directly loaded from logo.svg */}
            <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center">
              <div className="relative p-6 sm:p-10 rounded-3xl bg-[#e6e8f4]/80 border border-slate-300/80 shadow-lg flex items-center justify-center max-w-lg w-full">
                <Image
                  src={Logo}
                  alt="PieChat Illustration"
                  width={420}
                  height={420}
                  unoptimized
                  className="w-72 sm:w-96 h-auto drop-shadow-md hover:scale-105 transition duration-300"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section (Light Mode) */}
      <section className="py-20 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">
            Key Features
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Everything built for fast real-time developer communication.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-card p-8 rounded-3xl transition duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-6">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Instant Messaging</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Send and receive messages in real-time with instant connection delivery.
            </p>
          </div>

          <div className="glass-card p-8 rounded-3xl transition duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center mb-6">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Group Forums</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Create and manage topic-focused group discussions for Python, React, Next.js, and more.
            </p>
          </div>

          <div className="glass-card p-8 rounded-3xl transition duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center mb-6">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Direct 1-on-1 DMs</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Search for any user to launch clean, private 1-on-1 conversations instantly.
            </p>
          </div>
        </div>
      </section>

      {/* Light Mode Footer */}
      <footer className="bg-slate-900 py-8 text-center text-slate-300 text-sm">
        <p>© {new Date().getFullYear()} PieChat. All rights reserved.</p>
      </footer>
    </div>
  );
}

export const metadata = {
  title: 'Home - PieChat',
  description: 'PieChat: Connect, Share, and Chat in real time.',
};
