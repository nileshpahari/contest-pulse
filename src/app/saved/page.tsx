"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link as LinkIcon, BookmarkX, AwardIcon } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

type Site = "codechef" | "leetcode" | "codeforces";
interface Contest {
  site: Site;
  title: string;
  startTime: number;
  duration: number;
  endTime: number;
  url: string;
}

export default function SavedContests() {
  const { data: session, status } = useSession();
  const [bookmarks, setBookmarks] = useState<Contest[]>([]);

  useEffect(() => {
    const laodSaved = async () => {
      let saved;
      if (status !== "authenticated") {
        saved = JSON.parse(localStorage.getItem("contests") || "[]");
      } else {
        try {
          const res = await fetch("/api/saved");
          if (!res.ok) throw new Error("Failed to fetch from API");
          saved = await res.json();
        } catch (error) {
          console.log(error);
          saved = JSON.parse(localStorage.getItem("contests") || "[]");
        }
      }
      setBookmarks(saved);
    };
    laodSaved();
  }, []);

  const removeBookmark = async (title: string) => {
    const updated = bookmarks.filter((c) => c.title !== title);
    setBookmarks(updated);
    localStorage.setItem("contests", JSON.stringify(updated));
    if (status === "authenticated") {
      await fetch("/api/saved", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });
    }
  };

  const formatDuration = (ms: number) => {
    const h = Math.floor(ms / 3600000);
    const m = Math.floor((ms % 3600000) / 60000);
    const s = Math.floor((ms % 60000) / 1000);
    return `${h}h ${m}m ${s}s`;
  };

  const formatTime = (t: number) => new Date(t).toLocaleString();

  if (bookmarks.length === 0) {
    return (
      <h1 className="text-2xl font-semibold text-center flex h-screen justify-center items-center">
        No saved contests
      </h1>
    );
  }

  return (
    <div className="py-20">
      <div className="text-2xl font-bold mb-5 mt-2 w-full text-center">
        Saved Contests
      </div>
      <div className="max-w-3/4 m-auto border rounded-md px-4 py-1">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Site</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Start Time</TableHead>
              <TableHead>End Time</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>URL</TableHead>
              <TableHead className="text-right">Remove</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookmarks.map((contest) => (
              <TableRow key={contest.title}>
                <TableCell>{contest.site}</TableCell>
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
                  <BookmarkX
                    onClick={() => removeBookmark(contest.title)}
                    className="hover:text-red-500 cursor-pointer"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
