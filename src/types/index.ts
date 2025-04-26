export interface Contest {
  id: number;
  site: string;
  title: string;
  startTime: Date;
  endTime: Date;
  duration: string;
  url: string;
}

export type Site = "codechef" | "leetcode" | "codeforces";
