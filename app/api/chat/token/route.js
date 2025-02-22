import { StreamChat } from "stream-chat";

const api_key = process.env.API_KEY;
const api_secret = process.env.API_SECRET;

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url, "http://localhost"); // Ensure valid URL
    const userId = searchParams.get("user_id");

    if (!userId) {
      return new Response(JSON.stringify({ error: "User ID is required" }), { status: 400 });
    }

    const serverClient = StreamChat.getInstance(api_key, api_secret);

    // Ensure the user exists before generating a token
    const userQuery = await serverClient.queryUsers({ id: userId });

    if (!userQuery.users.length) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    const token = serverClient.createToken(userId);

    return new Response(JSON.stringify({ token, userId }), { status: 200 });
  } catch (error) {
    console.error("Error generating user token:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
