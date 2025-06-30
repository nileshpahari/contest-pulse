import { NextResponse } from 'next/server';
import main from '@/lib/send';

export async function GET() {
  const succeeded:boolean = await main();
   console.log("Scheduled job ran at", new Date().toISOString());
  return NextResponse.json({ success: succeeded });
}