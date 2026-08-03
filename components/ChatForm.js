"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Hash, Users, Sparkles, Loader2 } from "lucide-react";
import {
  useCreateChatClient,
  Chat,
  Channel,
  ChannelHeader,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";

import "stream-chat-react/dist/css/v2/index.css";

const ChatForm = ({ clerkUser, slug }) => {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const userId = clerkUser.id;
  const userName = clerkUser.name;
  const userToken = clerkUser.token;

  const user = {
    id: userId,
    name: userName,
    image: `https://getstream.io/random_png/?name=${userName}`,
  };

  const [channel, setChannel] = useState();
  const client = useCreateChatClient({
    apiKey,
    tokenOrProvider: userToken,
    userData: user,
  });

  useEffect(() => {
    if (!client) return;

    const channel = client.channel("messaging", slug, {
      image: `https://getstream.io/random_png/?name=${slug}`,
      name: `${slug.toUpperCase()} Forum Discussion`,
      members: [userId],
    });

    setChannel(channel);
  }, [client, slug, userId]);

  if (!client || !channel) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="glass-panel p-12 rounded-3xl text-center flex flex-col items-center justify-center min-h-[400px]">
          <Loader2 className="w-10 h-10 text-indigo-400 animate-spin mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Connecting to #{slug.toUpperCase()} Room</h3>
          <p className="text-slate-400 text-sm max-w-sm">
            Initializing your real-time chat connection with GetStream server...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex flex-col h-[calc(100vh-90px)]">
      {/* Top Forum Channel Header with Back Button */}
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-3.5 sm:p-4 rounded-2xl border border-slate-200 flex-shrink-0 shadow-sm">
        <div className="flex items-center gap-4">
          <Link
            href="/forums"
            className="p-2 sm:p-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition shadow-sm"
            title="Back to Forums"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <Hash className="w-5 h-5 text-indigo-600" />
              <h1 className="text-base sm:text-xl font-extrabold text-slate-900 capitalize">
                {slug} Forum
              </h1>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                Live Channel
              </span>
            </div>
            <p className="text-slate-500 text-xs mt-0.5 font-normal">
              Public community discussion room for {slug.toUpperCase()} developers.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-700 font-medium">
            <Users className="w-4 h-4 text-indigo-600" />
            <span>Public Discussion</span>
          </div>
        </div>
      </div>

      {/* Stream Chat Window Container (Light Mode Viewport) */}
      <div className="flex-1 glass-panel p-1.5 sm:p-3 rounded-3xl border border-slate-200 shadow-md overflow-hidden flex flex-col min-h-0 bg-white">
        <Chat client={client}>
          <Channel channel={channel}>
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput />
            </Window>
            <Thread />
          </Channel>
        </Chat>
      </div>
    </div>
  );
};

export default ChatForm;

