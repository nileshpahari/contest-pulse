import {Contest} from "@/types/index";
export const loadDuration = (contest: Contest): string => {
  const now = new Date();
  if (contest.endTime <= now) return "Ended";
  if (contest.startTime <= now && contest.endTime > now) return "Ongoing";
  return contest.duration; 
};
