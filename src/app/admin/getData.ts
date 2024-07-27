"use server";
import { cookies } from "next/headers";
import * as jose from 'jose';
import db from "@/lib/db/db";

export default async function getData() {
  try {
    // Get JWT from cookies and decode it to get user information
    const cookieStore = cookies();
    const token = cookieStore.get('Authorization')?.value;

    if (!token) {
      throw new Error("Invalid token");
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jose.jwtVerify(token, secret);

    const username = payload.sub; // Ensure that the username is correctly extracted from the payload
    console.log('Username from token:', username);

    if (!username) {
      throw new Error('Invalid token payload');
    }

    const uniUser = await db.users.findFirst({
      where: {
        username: username as string
      }
    });

    if (!uniUser) {
      throw new Error('User not found');
    }
    console.log('User from DB:', uniUser);
    return uniUser;
  } catch (error: any) {
    console.error('Error decoding token:', error.message);
    throw new Error("Error decoding token: " + error.message);
  }
}