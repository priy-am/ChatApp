"use client";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import Logo from "../public/logo.svg";
// import { useUser } from "@clerk/nextjs";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  // const user = useUser()
  // console.log(`user is ${user.user?.id}`)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
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

  return (
    <nav
      className={`p-4 sticky top-0 backdrop-blur-lg shadow-lg transition-all duration-300 ${
        isScrolled
          ? "bg-gray-500 bg-opacity-70" // Darker background when scrolled
          : "bg-[#F0F0F5] bg-opacity-90" // Light gray matching hero, slightly more opaque
      }`}
    >
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <Link
          href="/"
          className="flex items-center text-gray-800 text-2xl font-bold" // Darker text for logo
        >
          <Image src={Logo} width={40} height={40} alt="piechat" />
          <span className="ml-2">PieChat</span> {/* Added some spacing */}
        </Link>

        <button
          onClick={toggleMobileMenu}
          className="md:hidden text-white hover:text-gray-300 focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        <div
          className={`${
            isMobileMenuOpen ? "block" : "hidden"
          }  md:flex md:items-center w-full md:w-auto`}
        >
          <ul className="text-base text-gray-600 md:flex md:items-center md:justify-between"> {/* Darker text for links */}
            <Link href={"/"}>
            <li className="block py-2 px-4 md:inline-block hover:bg-gray-200 md:hover:bg-transparent md:border-0 md:hover:text-gray-800 transition duration-300"> {/* Added hover effect and transitions */}
              <span>Home</span>
            </li>
            </Link>
            <Link href={"/forums"}>
            <li className="block py-2 px-4 md:inline-block hover:bg-gray-200 md:hover:bg-transparent md:border-0 md:hover:text-gray-800 transition duration-300">
              <span>Forums</span>
            </li>
            </Link>
            <Link href={"/chats"}>
            <li className="block py-2 px-4 md:inline-block hover:bg-gray-200 md:hover:bg-transparent md:border-0 md:hover:text-gray-800 transition duration-300">
              <span>Chats</span>
            </li>
            </Link>

            <li className="block py-2 px-4 md:inline-block">
              <UserButton />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
