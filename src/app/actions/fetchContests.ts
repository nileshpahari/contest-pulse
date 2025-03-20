"use server";
import { URL } from "@/constants";
import axios from "axios";

type Site = "codechef" | "leetcode" | "codeforces";
interface Contest {
  site: Site;
  title: string;
  startTime: number;
  duration: number;
  endTime: number;
  url: string;
  id?: number;
}

export async function fetchContests(): Promise<Contest[]> {
  const contests: Contest[] = (await axios.get(URL)).data;
  
  return contests;
}
