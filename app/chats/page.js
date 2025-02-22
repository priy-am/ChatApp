"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useClerk } from "@clerk/nextjs";
import { Input } from "@/components/ui/input";

const ChatSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const { client } = useClerk();
  const router = useRouter();

  const searchUsers = async () => {
    if (!searchQuery.trim()) return;
    
    try {
      const response = await fetch(`/api/search?query=${searchQuery}`);
      const users = await response.json();
      setResults(users);
    } catch (error) {
      console.error("Error searching users:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Find a user to chat</h1>
      <Input
        type="text"
        placeholder="Search user by name..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button className="mt-2 p-2 bg-blue-500 text-white rounded" onClick={searchUsers}>
        Search
      </button>

      {results.length > 0 && (
        <ul className="mt-4 border p-2 rounded">
          {results.map((user) => (
            <li
              key={user.id}
              className="p-2 border-b hover:bg-gray-100 cursor-pointer"
              onClick={() => router.push(`/chat/${user.id}`)}
            >
              {user.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChatSearch;
