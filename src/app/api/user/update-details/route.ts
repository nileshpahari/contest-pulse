import { NextRequest, NextResponse } from "next/server";
import client from "@/db";
import { getServerSession } from "next-auth";

export async function PATCH(req: NextRequest) {
    try {
      const session = await getServerSession();

      if(!session?.user?.email) {
        return NextResponse.json({error: "unauthorized request"},{status: 401})
      }
    const { firstName, lastName, email } = await req.json();
    await client.user.update({
      where: {email: session?.user?.email},
      data: {
        email,
        lastName,
        firstName,
      },
    });
    return NextResponse.json({message:"user details updated successfully"}, {status: 200})

  } catch (error) {
    console.log(error) ;
    return NextResponse.json({error: "failed to update user details"},{status: 500})
  }
}
