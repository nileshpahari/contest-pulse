"use server";
import db from "@/db";
import { Contest } from "@/types";

export async function fetchContests() {
  const contests: Contest[] = await db.contest.findMany();
  return contests;
}