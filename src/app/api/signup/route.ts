import client from "@/db";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { email, password, firstName, lastName } = await req.json();

    const trimmedEmail = email?.trim();
    const trimmedFirstName = firstName?.trim();

    if (!(trimmedEmail && trimmedFirstName && password.trim()))
      return NextResponse.json(
        { error: "required fields are missing" },
        { status: 400 }
      );
    const user = await client.user.findUnique({ where: { email } });
    if (user)
      return NextResponse.json(
        { error: "user with the provided email already exists" },
        { status: 409 }
      );
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = await client.user.create({
      data: {
        email: trimmedEmail,
        password: hashedPassword,
        firstName: trimmedFirstName,
        lastName: lastName.trim() ?? null,
      },
    });
    if (!createdUser)
      return NextResponse.json(
        { error: "failed to create user" },
        { status: 500 }
      );
    return NextResponse.json(
      { message: "user created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.log("user creation failed with error: ", error);
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    );
  }
}
