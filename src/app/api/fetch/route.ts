import { NextResponse } from 'next/server';
import { updateContestTable } from '@/lib/updateContestTable'; 

export async function GET() {
  const succeeded:boolean = await updateContestTable();
  return NextResponse.json({ success: succeeded });
}