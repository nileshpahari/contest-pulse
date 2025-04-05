import client from "@/db";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email)
      return NextResponse.json(
        { error: "unauthorized request" },
        { status: 401 }
      );
    const { oldPassword, newPassword } = await req.json();
    const user = await client.user.findUnique({
      where: { email: session?.user?.email },
    });
    if (!user)
      return NextResponse.json(
        { error: "failed to find user" },
        { status: 404 }
      );
    const isPassValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPassValid)
      return NextResponse.json(
        { error: "unauthorized request" },
        { status: 401 }
      );
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await client.user.update({
      where: { email: session.user.email },
      data: { password: hashedPassword },
    });
    return NextResponse.json(
      { message: "Password updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "failed to change user password" },
      { status: 500 }
    );
  }
}
