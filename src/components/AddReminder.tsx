"use client";
import { X } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { Contest } from "@/types";
import axios from "axios";
import { toast } from "react-hot-toast";

interface AddReminderProps {
  contest: Contest;
  setShowAddReminder: React.Dispatch<React.SetStateAction<boolean>>;
}

export function AddReminder({ contest, setShowAddReminder }: AddReminderProps) {
  async function enableEmailReminder(contest: Contest) {
    try {
      const res = await axios.post("/api/add-reminder", { contest });
      if (res.status === 200) {
        toast("Email reminder added");
      }
    } catch (error) {
      toast("Feature Under Construction");
    }
    setShowAddReminder(false);
  }
  // const componseCalURL = (contest: Contest) => {
  //     const site = contest.site!=="codeforces" ? contest.site.charAt(0).toUpperCase() + contest.site.slice(1) : "";
  //     // codefoces title already have codeforces in them
  //    const name = site + " " + contest.title;
  //   const url = `https://calendar.google.com/calendar/u/0/r/eventedit?text=${name}&dates=${contest.startTime.toLocaleString()}/${contest.endTime.toLocaleString()}`;
  //   return url;
  // }

  // const calURL = componseCalURL(contest);

  function composeCalURL(contest: Contest) {
    // Base URL for Google Calendar event creation
    const baseUrl = "https://calendar.google.com/calendar/u/0/r/eventedit";

    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";

    // Format dates for Google Calendar
    // Google Calendar expects dates in format: YYYYMMDDTHHMMSS (no Z suffix)
    function formatDateForGCal(date: Date) {
      const year = date.getUTCFullYear();
      const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
      const day = date.getUTCDate().toString().padStart(2, "0");
      const hours = date.getUTCHours().toString().padStart(2, "0");
      const minutes = date.getUTCMinutes().toString().padStart(2, "0");
      const seconds = date.getUTCSeconds().toString().padStart(2, "0");

      return `${year}${month}${day}T${hours}${minutes}${seconds}`;
    }

    const startTimeFormatted = formatDateForGCal(contest.startTime);
    const endTimeFormatted = formatDateForGCal(contest.endTime);

    const dates = `dates=${startTimeFormatted}/${endTimeFormatted}`;

    const location = encodeURIComponent(contest.url);

    const additionalParams = "output=xml&sf=true";

    const action = "action=TEMPLATE";

    const title = encodeURIComponent(
      "Contest at " +
        contest.site.charAt(0).toUpperCase() +
        contest.site.slice(1) +
        ": " +
        contest.title
    );

    const startTimeISO = contest.startTime
      .toISOString()
      .replace(/-|:|\.\d+/g, "");
    const endTimeISO = contest.endTime.toISOString().replace(/-|:|\.\d+/g, "");

    // Create dates parameter
    // const dates = `dates=${contest.startTime}/${contest.endTime}`;
    const description = encodeURIComponent(
      `<strong>Event created from <a href="https://contestpulse.netlify.app">Contest Pulse</a></strong>\n` +
        `<hr/>` +
        `<br/>` +
        `<b>Link:</b> <a href="${contest.url}"><b>${contest.title}</b></a>\n` +
        `<b>Site:</b> ${contest.site}\n` +
        `<b>Duration:</b> ${contest.duration}`
    );

    const calendarURL = `${baseUrl}?${timezone}&${dates}&details=${description}&location=${location}&${additionalParams}&text=${title}`;

    return calendarURL;
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white dark:bg-zinc-900 rounded-xl shadow-xl w-80 p-6 space-y-4 relative"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <button
          onClick={() => setShowAddReminder(false)}
          className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-800 dark:hover:text-white"
        >
          <X />
        </button>

        <div className="flex flex-col gap-4 mt-6">
          <Link href={composeCalURL(contest)} target={"_blank"}>
            <Button size="lg" className="w-full">
              Add to Calendar
            </Button>
          </Link>
          <Button
            onClick={() => enableEmailReminder(contest)}
            size="lg"
            className="w-full"
          >
            Add Email Reminder
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}
