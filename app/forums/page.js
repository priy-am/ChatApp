"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Users, ArrowRight, Flame, MessageSquare, Terminal, ArrowLeft, Loader2 } from "lucide-react";

const topics = [
  {
    text: "Python",
    img: "/python.svg",
    desc: "Python is a programming language that lets you work quickly and integrate systems effectively.",
    slag: "python",
    category: "Languages",
    trending: true,
  },
  {
    text: "JavaScript",
    img: "/js.svg",
    desc: "JavaScript is a versatile web programming language enabling dynamic & interactive web apps.",
    slag: "javascript",
    category: "Languages",
    trending: true,
  },
  {
    text: "TypeScript",
    img: "/ts.svg",
    desc: "TypeScript adds static typing to JavaScript, enhancing maintainability and enterprise scale.",
    slag: "typescript",
    category: "Languages",
    trending: true,
  },
  {
    text: "React",
    img: "/react.svg",
    desc: "React is a popular JavaScript library for building component-based, high-performance UIs.",
    slag: "react",
    category: "Frontend",
    trending: true,
  },
  {
    text: "Next.js",
    img: "/next.svg",
    desc: "The React framework for full-stack web applications, SSR, SSG, and server actions.",
    slag: "nextjs",
    category: "Frontend",
    trending: true,
  },
  {
    text: "Node.js",
    img: "/node.svg",
    desc: "Node.js is an event-driven JavaScript runtime designed for scalable network servers.",
    slag: "nodejs",
    category: "Backend",
    trending: false,
  },
  {
    text: "MongoDB",
    img: "/db.svg",
    desc: "MongoDB is a flexible, document-oriented NoSQL database for modern cloud applications.",
    slag: "mongodb",
    category: "Databases",
    trending: false,
  },
  {
    text: "Express.js",
    img: "/express.svg",
    desc: "A minimal and unopinionated web application framework for Node.js backends.",
    slag: "express",
    category: "Backend",
    trending: false,
  },
  {
    text: "Svelte",
    img: "/svelte.svg",
    desc: "Svelte compiles components to lean, fast vanilla JavaScript with minimal boilerplate.",
    slag: "svelte",
    category: "Frontend",
    trending: false,
  },
  {
    text: "Tailwind CSS",
    img: "/tail.svg",
    desc: "A utility-first CSS framework for rapidly building custom, responsive UI designs.",
    slag: "tailwind",
    category: "Frontend",
    trending: false,
  },
];

const categories = ["All", "Frontend", "Backend", "Languages", "Databases"];

const Forums = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [memberCounts, setMemberCounts] = useState({});
  const [loadingCounts, setLoadingCounts] = useState(true);

  // Fetch Live Member Counts from Stream Chat API
  useEffect(() => {
    async function fetchCounts() {
      try {
        const response = await fetch("/api/forums/counts");
        if (response.ok) {
          const data = await response.json();
          setMemberCounts(data);
        }
      } catch (error) {
        console.error("Failed to load forum member counts:", error);
      } finally {
        setLoadingCounts(false);
      }
    }
    fetchCounts();
  }, []);

  const filteredTopics = topics.filter((topic) => {
    const matchesSearch =
      topic.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || topic.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
      {/* Top Navigation Bar with Back Button */}
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50 font-medium text-sm shadow-sm transition duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold mb-3">
          <Terminal className="w-3.5 h-3.5" />
          <span>Developer Discussion Hubs</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-3">
          Explore Tech <span className="gradient-text">Forums</span>
        </h1>
        <p className="text-slate-600 text-sm sm:text-base font-normal">
          Join active discussion channels on your favorite languages, frameworks, and tools.
        </p>
      </div>

      {/* Search & Filter Section */}
      <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-4 glass-panel p-4 rounded-2xl">
        {/* Search Bar */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search topic or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:border-indigo-500 transition shadow-sm"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                selectedCategory === category
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Topics Grid */}
      {filteredTopics.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTopics.map((topic, index) => {
            const joinedCount = memberCounts[topic.slag] ?? 1;
            return (
              <div
                key={index}
                className="group glass-card p-6 rounded-3xl flex flex-col justify-between hover:border-indigo-400 transition-all duration-300 hover:-translate-y-1"
              >
                <div>
                  {/* Header Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="relative p-2.5 rounded-2xl bg-slate-50 border border-slate-200 group-hover:scale-105 transition">
                      <Image
                        src={topic.img}
                        alt={topic.text}
                        width={40}
                        height={40}
                        className="w-10 h-10 object-contain"
                      />
                    </div>
                    {topic.trending ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-[11px] font-semibold">
                        <Flame className="w-3 h-3 text-amber-500" /> Trending
                      </span>
                    ) : (
                      <span className="px-2 py-1 rounded-full bg-slate-100 text-slate-600 text-[11px] font-medium border border-slate-200">
                        {topic.category}
                      </span>
                    )}
                  </div>

                  {/* Title & Description */}
                  <h2 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition">
                    {topic.text}
                  </h2>
                  <p className="text-slate-600 text-xs leading-relaxed line-clamp-3 mb-6 font-normal">
                    {topic.desc}
                  </p>
                </div>

                {/* Card Footer Action with Actual Live Member Count */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                    <Users className="w-3.5 h-3.5 text-indigo-600" />
                    {loadingCounts ? (
                      <Loader2 className="w-3 h-3 animate-spin text-indigo-500" />
                    ) : (
                      <span>{joinedCount} {joinedCount === 1 ? 'member' : 'members'}</span>
                    )}
                  </div>

                  <Link href={`/forum/${topic.slag}`}>
                    <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-600 text-indigo-600 hover:text-white border border-indigo-200 text-xs font-semibold transition-all duration-200">
                      <span>Join</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 glass-panel rounded-3xl">
          <MessageSquare className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800 mb-1">No forums found</h3>
          <p className="text-slate-500 text-xs">Try searching for another topic or selecting a different category.</p>
        </div>
      )}
    </div>
  );
};

export default Forums;



