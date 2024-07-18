import db from "@/lib/db/db";
import * as jose from 'jose';
import { hashPassword } from "@/lib/isValidPassword";
import { NextResponse } from "next/server";

export async function POST(request:Request) {
    const body = await request.json();
    const { username, password } = body;

    if (username == null || password == null) {
        return new Response(
            JSON.stringify({
                error: "Password and username are required"
            }),
            { status: 400 }
        );
    }

    const user = await db.users.findFirst({
        where: {
            username,
        }
    });

    if (!user) {
        return new Response(
            JSON.stringify({
                error: "The system can't find the user"
            }),
            { status: 404 }
        );
    }

    // Hash the provided password using SHA-512
    const hashedPassword = await hashPassword(password);
    // Check if the hashed password matches the stored hashed password
    if (hashedPassword !== user.password) {
        return new Response(
            JSON.stringify({
                error: "Invalid password"
            }),
            { status: 401 }
        );
    }

    // Create JWT
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const alg = "HS512";

    const jwt = await new jose.SignJWT({})
        .setProtectedHeader({ alg })
        .setExpirationTime("72h")
        .setSubject(user.id.toString())
        .sign(secret);

    console.log(jwt);

    // return new Response(
    //     JSON.stringify({ token: jwt }),
    //     { status: 200 }
    // );
    return NextResponse.json({token: jwt},{status: 200} )
}
