import db from "@/lib/db/db";
import * as jose from 'jose';
import { hashPassword } from "@/lib/isValidPassword";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
        return NextResponse.json(
            { error: "Password and username are required" },
            { status: 400 }
        );
    }

    const user = await db.users.findFirst({
        where: { username: username as string },
    });

    if (!user) {
        return NextResponse.json(
            { error: "The system can't find the user" },
            { status: 404 }
        );
    }

    const hashedPassword = await hashPassword(password);
    if (hashedPassword !== user.password) {
        return NextResponse.json(
            { error: "Invalid password" },
            { status: 401 }
        );
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const alg = "HS512";

    const jwt = await new jose.SignJWT({})
        .setProtectedHeader({ alg })
        .setExpirationTime("72h")
        .setSubject(user.username.toString())
        .sign(secret);

    return NextResponse.json({ token: jwt }, { status: 200 });
}