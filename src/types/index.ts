export interface Contest {
  id: number;
  site: string;
  title: string;
  startTime: Date;
  endTime: Date;
  duration: string;
  url: string;
}

export interface ApiContest {
  id: number;
  site: string;
  title: string;
  startTime: number;
  endTime: number;
  duration: number;
  url: string;
}

export type Site = "codechef" | "leetcode" | "codeforces";

export const Sites = ["CodeChef", "LeetCode", "CodeForces"]
