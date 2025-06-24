import db from "@/db";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import auth from "@/lib/auth";
import { Prisma } from "@prisma/client";
export async function POST(req: NextRequest){
  try {
  const session = await getServerSession(auth)
  if(!session){
    return NextResponse.json({success: false, message: "Unauthorized"}, {status: 401});
  }
  const email = session.user?.email as string
  const {contest} = await req.json();
  await db.notification.create({
    data: {
      notifyAt: new Date(contest.startTime),
      notified: false,
      userEmail: email,
      contestId: contest.id,
    }
  }) 
  console.log(contest)
  return NextResponse.json({success: true, message: "Email reminder added"}, {status: 200});
  } catch (error) {
    console.log(error)
    if(error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002"){
      return NextResponse.json({success: false, message: "Email reminder for this contest already exists"}, {status: 409});
    }
    return NextResponse.json({success: false, message: "Failed to add email reminder"}, {status: 500});
  }
}