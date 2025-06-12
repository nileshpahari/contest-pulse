import { NextResponse } from 'next/server';
import { updateContestTable } from '@/lib/updateContestTable'; 

export async function GET() {
  const succeeded:boolean = await updateContestTable();
   console.log("Scheduled job ran at", new Date().toISOString());
  return NextResponse.json({ success: succeeded });
}