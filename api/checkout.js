"use server"
import { clerkClient } from "@clerk/nextjs/server";

export async function getAddress(userId) {
    console.log(userId,'bbjbj');
    
  
return await clerkClient.users.getUser(userId);
}

