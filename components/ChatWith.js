"use client";
import React, { useState, useEffect } from "react";
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

  return hashHex.substring(0, 32); // Keep it under 64 characters
};

const ChatWith = ({ clerkUser, talkwith }) => {
  const [receiverName, setReceiverName] = useState("Loading...");
  const [channelId, setChannelId] = useState(null);

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
  }, [talkwith]);

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
      image: "https://getstream.io/random_png/?name=react",
      name: `Chat between ${userName} & ${receiverName}`,
      members: [userId, talkwith],
    });

    setChannel(channel);
  }, [client, receiverName, channelId]);

  if (!client) return <div>Setting up client & connection...</div>;

  return (
    <Chat client={client}>
      <Channel channel={channel}>
        <Window>
          <ChannelHeader title={`Chat with ${receiverName}`} />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </Chat>
  );
};

export default ChatWith;
