import axios from "axios";
import db from "../db/index";
import { URL } from ".././constants";
import { ApiContest, Contest } from "@/types";

function formatDuration(ms: number): string {
  const hours = Math.floor(ms / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${hours}h ${minutes}m ${seconds}s`;
}

function formatTime(time: number): Date {
  return new Date(time);
}

const addUpcoming = async () => {
  const now = new Date();
  const res = (await axios.get(URL)).data;
  const upcomingContest = res.map((contest: ApiContest) => {
    return {
      site: contest.site,
      title: contest.title,
      startTime: formatTime(contest.startTime),
      endTime: formatTime(contest.endTime),
      duration: formatDuration(contest.duration),
      url: contest.url,
    };
  });
//   await db.contest.createMany({
//     data: upcomingContest,
//     skipDuplicates: true,
//   });
  await Promise.all(
    upcomingContest.map((contest: Contest) =>
      db.contest.upsert({
        where: { url: contest.url },
        create: { ...contest, isPast: false },
        update: {
          startTime: contest.startTime,
          endTime: contest.endTime,
          duration: contest.duration,
          isPast: contest.endTime < now,
        },
      })
    )
  );
};

const togglePastContest = async () => {
  const now = new Date();
  await db.contest.updateMany({
    where: {
      endTime: {
        lt: now,
      },
      isPast: false,
    },
    data: {
      isPast: true,
    },
  });
};

export const updateContestTable = async (): Promise<boolean> => {
  try {
    await togglePastContest();
    await addUpcoming();
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};