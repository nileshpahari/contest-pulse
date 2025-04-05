import client from "@/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
export async function DELETE() {
  const session = await getServerSession();
  if (!session?.user?.email) {
    return NextResponse.json(
      { error: "unauthorized request" },
      { status: 401 }
    );
  }
  try {
    await client.user.delete({
      where: { email: session?.user?.email },
    });
    return NextResponse.json(
      { message: "user deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "failed to delete user" },
      { status: 500 }
    );
  }
}
