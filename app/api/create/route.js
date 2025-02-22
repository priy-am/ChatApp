import { StreamChat } from "stream-chat";
import { clerkClient } from "@clerk/nextjs/server";

const api_key = process.env.API_KEY;
const api_secret = process.env.API_SECRET;
// const user_id = "user_2sUla0VcgQpOhyyaoL4Fj3TyJVj";

export async function POST(request) {
  const serverClient = StreamChat.getInstance(api_key, api_secret);
  // Create User Token
  const user = await request.json();
  const token = serverClient.createToken(user.data.id);
  console.log(`A NEW USER HAS BEEN CREATED WITH TOKEN :-  ${token}`);

  const client = await clerkClient();
  await serverClient.upsertUser({id:user.data.id})

  await client.users.updateUserMetadata(user.data.id, {
    publicMetadata: {
      token: token,
    },
  });
  console.log(user.data.id);

  //give access to the this user to the public chats like forums
  const slugs = [
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
  slugs.forEach(async (slug) => {
    const channel = serverClient.channel("messaging", slug, {
      image: "https://getstream.io/random_png/?name=react",
      name: ` ${slug.toUpperCase()} Discussing `,
      created_by_id: user.data.id
    });
    await channel.create()
    channel.addMembers([user.data.id])
  });

  return Response.json({ message: "Hello " });
}

