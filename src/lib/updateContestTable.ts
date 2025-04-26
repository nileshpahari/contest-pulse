import axios from "axios";
import db from "../db/index.js";
const fetchUrl = "https://competeapi.vercel.app/contests/upcoming/";

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
    const res = (await axios.get(fetchUrl)).data;
    const upcomingContest = res.map((contest: any) => {
        return {
            site: contest.site,
            title: contest.title,
            startTime: formatTime(contest.startTime),
            endTime: formatTime(contest.endTime),
            duration: formatDuration(contest.duration),
            url: contest.url,
            isPast: false
    }})
    await db.contest.createMany({
        data: upcomingContest,
        skipDuplicates: true
    })
};

    const togglePastContest= async () => {
       await db.contest.updateMany({
        where: {
            endTime: {
                lt: new Date()
            }
        },
        data: {
            isPast: true
        }
       }) 
    }
export const updateContestTable = async () => {
    await togglePastContest();
    await addUpcoming();
};