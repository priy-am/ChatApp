import { auth } from "@clerk/nextjs/server";
import { StreamChat } from "stream-chat";
import { clerkClient } from "@clerk/clerk-sdk-node";

const api_key = process.env.API_KEY || process.env.NEXT_PUBLIC_API_KEY;
const api_secret = process.env.API_SECRET;

const forumSlugs = [
  "python",
  "javascript",
  "typescript",
  "react",
  "nextjs",
  "nodejs",
  "mongodb",
  "express",
  "svelte",
  "tailwind",
];

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new Response(JSON.stringify([]), { status: 401 });
    }

    const serverClient = StreamChat.getInstance(api_key, api_secret);

    // Query messaging channels where current user is a member
    const filter = {
      type: "messaging",
      members: { $in: [userId] },
    };
    const sort = [{ last_message_at: -1 }];

    const channels = await serverClient.queryChannels(filter, sort, {
      watch: false,
      state: true,
    });

    const recentChats = [];

    for (const channel of channels) {
      // Exclude public forum channels
      if (forumSlugs.includes(channel.id)) continue;

      const members = Object.keys(channel.state.members || {});
      const otherUserId = members.find((id) => id !== userId);

      if (!otherUserId) continue;

      // Get last message snippet if available
      const messages = channel.state.messages || [];
      const lastMsg = messages.length > 0 ? messages[messages.length - 1] : null;

      // Fetch user name from Clerk
      let otherName = "Chat Partner";
      try {
        const userObj = await clerkClient.users.getUser(otherUserId);
        otherName =
          userObj.firstName ||
          userObj.username ||
          userObj.emailAddresses?.[0]?.emailAddress?.split("@")[0] ||
          "Chat Partner";
      } catch (err) {
        console.error("Error fetching user for recent chat:", err);
      }

      recentChats.push({
        id: otherUserId,
        name: otherName,
        lastMessage: lastMsg ? lastMsg.text : "No messages yet",
        lastMessageAt: channel.state.last_message_at || new Date(),
        channelId: channel.id,
      });
    }

    return new Response(JSON.stringify(recentChats), { status: 200 });
  } catch (error) {
    console.error("Error fetching recent chats:", error);
    return new Response(JSON.stringify([]), { status: 500 });
  }
}
