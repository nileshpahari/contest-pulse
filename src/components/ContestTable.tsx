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

type Site = "codechef" | "leetcode" | "codeforces";
interface Contest {
  site: Site;
  title: string;
  startTime: number;
  duration: number;
  endTime: number;
  url: string;
  id: number;
}

export default function ContestTable({
  contests,
  classname = "",
}: {
  contests: Contest[];
  classname: string;
}) {
  const [bookmarks, setBookmarks] = useState<Contest[]>([]);

  useEffect(() => {
    const savedContests = JSON.parse(localStorage.getItem("contests") || "[]");
    console.log(savedContests);
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

    if (saved.some((c: Contest) => c.id === contest.id)) {
      const updated = saved.filter((c: Contest) => c.id !== contest.id);
      localStorage.setItem("contests", JSON.stringify(updated));
      setBookmarks(updated);
    } else {
      const updated = [...saved, contest];
      localStorage.setItem("contests", JSON.stringify(updated));
      setBookmarks(updated);
    }
  };

  return (
    <div className={classname}>
      <Table>
        <TableHeader className="font-semibold text-gray-500">
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
        <TableBody className="text-gray-300">
          {contests.map((contest) => (
            <TableRow key={contest.id}>
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
              <TableCell className="text-right">
                <Bookmark
                  onClick={() => {
                    toggleBookmark(contest);
                    console.log(contest);
                  }}
                  className={
                    bookmarks.some((c) => c.id === contest.id)
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
