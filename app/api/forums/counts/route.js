import { StreamChat } from "stream-chat";

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
    const serverClient = StreamChat.getInstance(api_key, api_secret);

    const channels = await serverClient.queryChannels(
      {
        type: "messaging",
        id: { $in: forumSlugs },
      },
      {},
      { state: true }
    );

    const counts = {};

    channels.forEach((ch) => {
      const count = ch.state.member_count || Object.keys(ch.state.members || {}).length || 0;
      counts[ch.id] = count;
    });

    // Provide default fallback 1 for any channel not yet created
    forumSlugs.forEach((slug) => {
      if (!(slug in counts)) {
        counts[slug] = 1;
      }
    });

    return new Response(JSON.stringify(counts), { status: 200 });
  } catch (error) {
    console.error("Error fetching live forum member counts:", error);
    return new Response(JSON.stringify({}), { status: 500 });
  }
}
