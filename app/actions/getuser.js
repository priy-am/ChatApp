"use server";
import { clerkClient } from "@clerk/clerk-sdk-node";

export async function fetchUserName(userId) {
  try {
    const user = await clerkClient.users.getUser(userId); // Fetch user by ID
    return user?.firstName || user?.username || "Unknown User"; // Return best available name
  } catch (error) {
    console.error("Error fetching user:", error);
    return "Unknown User";
  }
}
