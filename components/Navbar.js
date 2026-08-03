"use client";
import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Logo from "../public/logo.svg";
import { MessageSquare, Users, Home, Menu, X, ArrowRight } from "lucide-react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Forums", href: "/forums", icon: Users },
    { name: "Chats", href: "/chats", icon: MessageSquare },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm py-3"
          : "bg-[#eef0f8]/90 backdrop-blur-md border-b border-slate-200/60 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo matching user screenshot */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <Image src={Logo} width={36} height={36} alt="PieChat Logo" unoptimized className="w-9 h-9 transform group-hover:scale-105 transition duration-200" />
            <span className="text-2xl font-bold text-slate-800 tracking-tight">
              PieChat
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-base font-medium transition-all duration-200 ${
                    isActive
                      ? "text-indigo-600 font-semibold"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Auth & Actions */}
          <div className="hidden md:flex items-center gap-4">
            <SignedIn>
              <div className="p-0.5 rounded-full bg-slate-100 border border-slate-200">
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "w-8 h-8 rounded-full",
                    },
                  }}
                />
              </div>
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm shadow-sm transition duration-200">
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </SignInButton>
            </SignedOut>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-3">
            <SignedIn>
              <UserButton />
            </SignedIn>
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-slate-900 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-3 p-4 rounded-2xl bg-white border border-slate-200 shadow-xl flex flex-col gap-2 transition-all">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition ${
                    isActive
                      ? "bg-indigo-50 text-indigo-600 font-semibold"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <span>{link.name}</span>
                </Link>
              );
            })}
            <SignedOut>
              <SignInButton mode="modal">
                <button className="w-full mt-2 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-indigo-600 text-white font-medium text-base">
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </SignInButton>
            </SignedOut>
          </div>
        )}
      </div>
    </nav>
  );
}


