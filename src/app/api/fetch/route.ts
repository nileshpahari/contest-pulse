import { NextResponse } from 'next/server';
import { updateContestTable } from '@/lib/updateContestTable'; // move your script code to /lib

export async function GET() {
  await updateContestTable();
  return NextResponse.json({ success: true });
}