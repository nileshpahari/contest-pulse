import { Contest } from "@/types";
export const composeSolURL = (contest: Contest): string => {
  const site = contest.site!=="codeforces" ? contest.site.charAt(0).toUpperCase() + contest.site.slice(1) : "";
  const title =contest.title.split(" ").join("+");
  const query = site + "+" + title + "+solution";
  return `https://www.youtube.com/results?search_query=${query}`;
};

export const composeLeaderboardURL = (contest: Contest): string => {
  const trimSlash = (url: string) => url.replace(/\/+$/, "");
  const base = trimSlash(contest.url);

  if (contest.site === "leetcode") {
    return `${base}/ranking/`;
  }

  if (contest.site === "codeforces") {
    return `${base}/standings`;
  }

  if (contest.site === "codechef") {
    // CodeChef doesn't expose public leaderboards anymore
    return base;
  }
  return base;
};
