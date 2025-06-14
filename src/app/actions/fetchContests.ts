"use server";
import db from "@/db";
import { Contest } from "@/types";

export async function fetchUpcomingContests() {
  const contests: Contest[] = await db.contest.findMany({
    where: {
      isPast: false
    }
  });
  contests.sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime())
  return contests;
}
export async function fetchPastContests() {
  const contests: Contest[] = await db.contest.findMany({
    where: {
      isPast: true
    }
  });
  contests.sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime())
  return contests;
}