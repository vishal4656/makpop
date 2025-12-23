"use server"
import { clerkClient } from "@clerk/nextjs/server";

export async function getAddress(userId) {

return await clerkClient.users.getUser(userId);
}

