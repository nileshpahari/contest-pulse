import db from "@/db";
import { sendEmail } from "@/lib/send";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse){
  return NextResponse.json({success:false}, {status: 500})
  try {
  const {contest} = await req.json();
  // await sendEmail(contest.email, contest);
  await db.reminder.create({
    data: {
      notifyAt: new Date(contest.startTime),
      notified: false,
      user: {
        connect: {
          email: contest.email
        }
      },
      contest: {
        connect: {
          id: contest.id
        }
      }
    }
  }) 
  console.log(contest)
  return NextResponse.json({success: true}, {status: 200});
  } catch (error) {
    console.log(error);
    return NextResponse.json({success: false}, {status: 500});
  }
}