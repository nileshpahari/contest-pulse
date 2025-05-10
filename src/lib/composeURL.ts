import { Contest } from "@/types";
import axios from "axios";
import { YT_KEY } from "@/constants";

const getFirstVideoURL = async (query: string): Promise<string | null> => {
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
    query
  )}&key=${YT_KEY}&maxResults=1&type=video`;
  const res = await axios.get(url, {
    timeout: 5000,
  });
  const data = res.data;
  const videoId = data.items?.[0]?.id?.videoId;
  console.log(`https://www.youtube.com/watch?v=${videoId}`); // Log the video ID here (e.g., console.log(videoId);
  return videoId ? `https://www.youtube.com/watch?v=${videoId}` : null;
};

export const composeSolURL = async (contest: Contest): Promise<string> => {
  const site =
    contest.site !== "codeforces"
      ? contest.site.charAt(0).toUpperCase() + contest.site.slice(1)
      : "";
  const title = contest.title.split(" ").join("+");
  const query = site + "+" + title + "+solution";
  const url = await getFirstVideoURL(query);
  if (url) {
    console.log(url);
    return url;
  }
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
    return base;
  }
  return base;
};

//

// import {google} from "googleapis";
// const youtube = google.youtube({
//   version: 'v3',
//   auth: process.env.YOUTUBE_API_KEY,
// });

// async function searchVideo(query: string) {
//   const res = await youtube.search.list({
//     part: 'snippet',
//     q: query,
//     type: 'video',
//     maxResults: 1,
//   });

//   const videoId = res.data.items?.[0]?.id?.videoId;
//   return videoId ? `https://www.youtube.com/watch?v=${videoId}` : null;
// }
