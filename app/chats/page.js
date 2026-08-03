"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, MessageSquare, UserCheck, Sparkles, ArrowRight, Loader2, Clock, ChevronRight, X, ArrowLeft } from "lucide-react";

const ChatSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [recentChats, setRecentChats] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoadingRecent, setIsLoadingRecent] = useState(true);
  const [searched, setSearched] = useState(false);
  const router = useRouter();

  // Load Recent Conversations on mount
  useEffect(() => {
    async function fetchRecentChats() {
      try {
        const response = await fetch("/api/chat/recent");
        if (response.ok) {
          const data = await response.json();
          setRecentChats(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error("Error loading recent chats:", error);
      } finally {
        setIsLoadingRecent(false);
      }
    }
    fetchRecentChats();
  }, []);

  const searchUsers = async () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    setSearched(true);
    
    try {
      const response = await fetch(`/api/search?query=${encodeURIComponent(searchQuery)}`);
      const users = await response.json();
      setResults(Array.isArray(users) ? users : []);
    } catch (error) {
      console.error("Error searching users:", error);
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      searchUsers();
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setResults([]);
    setSearched(false);
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-6">
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

      {/* 1. TOP SEARCH BAR (WhatsApp Style Light Mode Search) */}
      <div className="glass-panel p-4 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search or start a new chat..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (!e.target.value.trim()) clearSearch();
              }}
              onKeyDown={handleKeyDown}
              className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-white border border-slate-300 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:border-indigo-500 transition shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <button
            onClick={searchUsers}
            disabled={isSearching || !searchQuery.trim()}
            className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-semibold text-sm shadow-sm transition duration-200"
          >
            {isSearching ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <span>Search</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        {/* Live Search Results Dropdown */}
        {isSearching ? (
          <div className="text-center py-6 glass-card rounded-2xl">
            <Loader2 className="w-6 h-6 text-indigo-500 animate-spin mx-auto mb-2" />
            <p className="text-slate-500 text-xs">Searching users database...</p>
          </div>
        ) : results.length > 0 ? (
          <div className="space-y-2 pt-2 border-t border-slate-200">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                Search Results ({results.length})
              </h3>
              <button onClick={clearSearch} className="text-xs text-slate-500 hover:text-slate-700">Clear</button>
            </div>
            <div className="space-y-2">
              {results.map((user) => (
                <div
                  key={user.id}
                  onClick={() => router.push(`/chat/${user.id}`)}
                  className="group glass-card p-3.5 rounded-2xl flex items-center justify-between cursor-pointer hover:bg-indigo-50/80 hover:border-indigo-300 transition duration-200"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                      {user.name ? user.name.substring(0, 2).toUpperCase() : "US"}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm group-hover:text-indigo-600 transition">
                        {user.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 font-mono">
                        ID: {user.id.substring(0, 14)}...
                      </p>
                    </div>
                  </div>
                  <span className="p-2 rounded-xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition">
                    <MessageSquare className="w-4 h-4" />
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : searched ? (
          <div className="text-center py-6 glass-card rounded-2xl border border-slate-200">
            <UserCheck className="w-8 h-8 text-slate-400 mx-auto mb-1" />
            <p className="text-sm font-semibold text-slate-800">No users found</p>
            <p className="text-xs text-slate-500">Try searching with a different name</p>
          </div>
        ) : null}
      </div>

      {/* 2. RECENT CHATS STACKED VERTICALLY (WhatsApp Light Mode Style) */}
      <div className="glass-panel p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-200">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Recent Chats</h2>
              <p className="text-xs text-slate-500 font-normal">Your ongoing direct conversations</p>
            </div>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
            {recentChats.length} Conversations
          </span>
        </div>

        {isLoadingRecent ? (
          <div className="text-center py-10">
            <Loader2 className="w-8 h-8 text-indigo-500 animate-spin mx-auto mb-2" />
            <p className="text-slate-500 text-xs">Loading conversations stack...</p>
          </div>
        ) : recentChats.length > 0 ? (
          <div className="flex flex-col gap-2">
            {recentChats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => router.push(`/chat/${chat.id}`)}
                className="group glass-card p-4 rounded-2xl flex items-center justify-between cursor-pointer hover:border-indigo-300 hover:bg-slate-50 transition-all duration-200 shadow-sm"
              >
                <div className="flex items-center gap-3.5 overflow-hidden flex-1">
                  <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-600 to-pink-500 flex items-center justify-center text-white font-bold text-base shadow-sm group-hover:scale-105 transition">
                      {chat.name ? chat.name.substring(0, 2).toUpperCase() : "DM"}
                    </div>
                    <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white absolute -bottom-0.5 -right-0.5" />
                  </div>
                  <div className="truncate flex-1">
                    <div className="flex items-center justify-between mb-0.5">
                      <h3 className="font-bold text-slate-900 text-base group-hover:text-indigo-600 transition truncate">
                        {chat.name}
                      </h3>
                      <span className="text-[11px] text-slate-400 font-medium">
                        {new Date(chat.lastMessageAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 truncate font-normal">
                      {chat.lastMessage}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                  <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-slate-700 group-hover:translate-x-0.5 transition" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 bg-slate-50 rounded-2xl border border-slate-200 p-6">
            <MessageSquare className="w-10 h-10 text-slate-400 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-700">No conversations yet</p>
            <p className="text-xs text-slate-500 mt-1">Search for any user above to start chatting!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatSearch;




