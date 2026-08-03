"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Loader2, Lock } from "lucide-react";
import { fetchUserName } from "@/app/actions/getuser";
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

// Function to generate a short, unique channel ID
const generateChannelId = async (userId1, userId2) => {
  const sortedIds = [userId1, userId2].sort().join("_");

  const encoder = new TextEncoder();
  const data = encoder.encode(sortedIds);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((byte) => byte.toString(16).padStart(2, "0")).join("");

  return hashHex.substring(0, 32);
};

const ChatWith = ({ clerkUser, talkwith }) => {
  const [receiverName, setReceiverName] = useState("Loading...");
  const [channelId, setChannelId] = useState(null);
  const [isReceiverOnline, setIsReceiverOnline] = useState(false);

  useEffect(() => {
    async function getReceiver() {
      const name = await fetchUserName(talkwith);
      setReceiverName(name);
    }
    getReceiver();

    async function setChatId() {
      const id = await generateChannelId(clerkUser.id, talkwith);
      setChannelId(id);
    }
    setChatId();
  }, [talkwith, clerkUser.id]);

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
    if (!client || !channelId) return;

    const channel = client.channel("messaging", channelId, {
      image: `https://getstream.io/random_png/?name=${receiverName}`,
      name: `Chat with ${receiverName}`,
      members: [userId, talkwith],
    });

    setChannel(channel);
  }, [client, receiverName, channelId, userId, talkwith]);

  // Real-time Online Presence Tracking
  useEffect(() => {
    if (!client || !channel) return;

    const updatePresence = () => {
      const member = channel.state.members[talkwith];
      if (member && member.user) {
        setIsReceiverOnline(!!member.user.online);
      }
    };

    updatePresence();

    const handlePresenceChange = (event) => {
      if (event.user && event.user.id === talkwith) {
        setIsReceiverOnline(!!event.user.online);
      }
    };

    client.on("user.presence.changed", handlePresenceChange);
    return () => {
      client.off("user.presence.changed", handlePresenceChange);
    };
  }, [client, channel, talkwith]);

  if (!client || !channel) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="glass-panel p-12 rounded-3xl text-center flex flex-col items-center justify-center min-h-[400px]">
          <Loader2 className="w-10 h-10 text-indigo-400 animate-spin mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Connecting to Chat with {receiverName}</h3>
          <p className="text-slate-400 text-sm max-w-sm">
            Establishing end-to-end encrypted direct messaging channel...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex flex-col h-[calc(100vh-90px)] relative">
      {/* Top Recipient Header with Back Button */}
      <div className="mb-4 flex items-center justify-between glass-panel p-3.5 sm:p-4 rounded-2xl border border-slate-200 flex-shrink-0 shadow-sm">
        <div className="flex items-center gap-3.5">
          <Link
            href="/chats"
            className="p-2 sm:p-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition shadow-sm"
            title="Back to chats"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-600 to-pink-500 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                {receiverName ? receiverName.substring(0, 2).toUpperCase() : "DM"}
              </div>
              {/* Dynamic Online/Offline Badge */}
              <span
                className={`w-3.5 h-3.5 rounded-full border-2 border-white absolute -bottom-0.5 -right-0.5 ${
                  isReceiverOnline ? "bg-emerald-500" : "bg-slate-400"
                }`}
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                  {receiverName}
                </h1>
                <ShieldCheck className="w-4 h-4 text-indigo-600" />
              </div>
              <p className="text-xs text-slate-500 flex items-center gap-1.5 font-normal">
                {isReceiverOnline ? (
                  <span className="text-emerald-600 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    Online
                  </span>
                ) : (
                  <span className="text-slate-500 font-medium">Offline</span>
                )}
                <span>• Direct DM</span>
              </p>
            </div>
          </div>
        </div>

        {/* Header Right Status Badge */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
            <Lock className="w-3.5 h-3.5" />
            <span>Encrypted</span>
          </div>
        </div>
      </div>

      {/* Stream Chat Window Container (Light Mode Viewport) */}
      <div className="flex-1 glass-panel p-1.5 sm:p-3 rounded-3xl border border-slate-200 shadow-md overflow-hidden flex flex-col min-h-0 bg-white">
        <Chat client={client}>
          <Channel channel={channel}>
            <Window>
              <ChannelHeader title={`Direct Message with ${receiverName}`} />
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

export default ChatWith;




