import { auth } from "@clerk/nextjs/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  if (!query) return new Response(JSON.stringify([]), { status: 400 });

  try {
    const response = await fetch(`https://api.clerk.dev/v1/users?query=${query}`, {
      headers: { Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}` },
    });

    const users = await response.json();
    const formattedUsers = users.map((user) => ({
      id: user.id,
      name: user.first_name || user.username,
    }));

    return new Response(JSON.stringify(formattedUsers), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch users" }), { status: 500 });
  }
}
