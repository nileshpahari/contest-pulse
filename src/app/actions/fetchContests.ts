"use server";
import db from "@/db";
import { Contest } from "@/types";

export async function fetchUpcomingContests() {
  const contests: Contest[] = await db.contest.findMany({
    where: {
      isPast: false
    }
  });
  return contests;
}
export async function fetchPastContests() {
  const contests: Contest[] = await db.contest.findMany({
    where: {
      isPast: true
    }
  });
  return contests;
}