"use client";
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link as LinkIcon, Bookmark } from "lucide-react";
import Link from "next/link";
import { fetchContests } from "@/app/actions/fetchContests";

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

export default function ContestTable({
  classname = "",
}: {
  classname: string;
}) {
  const [loading, setLoading] = useState(true);
  const [contests, setContests] = useState<Contest[]>([]);
  const [bookmarks, setBookmarks] = useState<Contest[]>([]);

  // useEffect(() => {
  //   fetchContests().then((contests) => {
  //     if (contests) {
  //       setContests(contests);
  //       setLoading(false);
  //     }
  //   });
  //   const savedContests = JSON.parse(localStorage.getItem("contests") || "[]");
  //   console.log(savedContests);
  //   setBookmarks(savedContests);
  // }, []);
  useEffect(() => {
    const lastFetch = localStorage.getItem("lastFetch");
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;

    if (!lastFetch || now - parseInt(lastFetch) > oneDay) {
      fetchContests().then((contests) => {
        if (contests) {
          setContests(contests);
          localStorage.setItem("cachedContests", JSON.stringify(contests));
          localStorage.setItem("lastFetch", now.toString());
          setLoading(false);
        }
      });
    } else {
      const cached = JSON.parse(localStorage.getItem("cachedContests") || "[]");
      setContests(cached);
      setLoading(false);
    }

    const savedContests = JSON.parse(localStorage.getItem("contests") || "[]");
    setBookmarks(savedContests);
  }, []);

  function formatDuration(ms: number): string {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${hours}h ${minutes}m ${seconds}s`;
  }

  function formatTime(time: number): string {
    return new Date(time).toLocaleString();
  }

  const toggleBookmark = (contest: Contest) => {
    const saved = JSON.parse(localStorage.getItem("contests") || "[]");

    if (saved.some((c: Contest) => c.title === contest.title)) {
      const updated = saved.filter((c: Contest) => c.title !== contest.title);
      localStorage.setItem("contests", JSON.stringify(updated));
      setBookmarks(updated);
    } else {
      const updated = [...saved, contest];
      localStorage.setItem("contests", JSON.stringify(updated));
      setBookmarks(updated);
    }
  };

  if (loading) {
    return (
      <h1 className="text-3xl font-bold min-w-screen flex justify-center items-center">
        Fetching contest details...
      </h1>
    );
  }
  if (!loading)
    return (
      <div className={classname}>
        <Table>
          <TableHeader className="font-semibold  -500">
            <TableRow>
              <TableHead className="w-[100px]">Site</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Start Time</TableHead>
              <TableHead>End Time</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>URL</TableHead>
              <TableHead className="text-right">Bookmark</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className=" -300">
            {contests.map((contest) => (
              <TableRow key={contest.title}>
                <TableCell className="font-medium">{contest.site}</TableCell>
                <TableCell>{contest.title}</TableCell>
                <TableCell>{formatTime(contest.startTime)}</TableCell>
                <TableCell>{formatTime(contest.endTime)}</TableCell>
                <TableCell>{formatDuration(contest.duration)}</TableCell>
                <TableCell>
                  <Link href={contest.url}>
                    <LinkIcon />
                  </Link>
                </TableCell>
                <TableCell className="w-full flex justify-center">
                  <Bookmark
                    onClick={() => {
                      toggleBookmark(contest);
                      console.log(contest);
                    }}
                    className={
                      bookmarks.some((c) => c.title === contest.title)
                        ? "fill-yellow-500"
                        : ""
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
}
