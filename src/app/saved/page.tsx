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
import { Link as LinkIcon, BookmarkX } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Contest } from "@/types";
import { SiteIcon } from "@/components/SiteIcon";

export default function SavedContests() {
  const { status } = useSession();
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
  }, [status]);

  const removeBookmark = async (id: number) => {
    const updated = bookmarks.filter((c) => c.id !== id);
    setBookmarks(updated);
    localStorage.setItem("contests", JSON.stringify(updated));
    if (status === "authenticated") {
      await fetch("/api/saved", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
    }
  };

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
              <TableHead>Duration</TableHead>
              <TableHead>URL</TableHead>
              <TableHead className="text-right">Remove</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookmarks.map((contest) => (
              <TableRow key={contest.title}>
                <TableCell><SiteIcon site={contest.site}/></TableCell>
                <TableCell>{contest.title}</TableCell>
                <TableCell>{new Date(contest.startTime).toLocaleDateString()}</TableCell>
                <TableCell>{contest.duration}</TableCell>
                <TableCell>
                  <Link href={contest.url}>
                    <LinkIcon />
                  </Link>
                </TableCell>
                <TableCell className="w-full flex justify-center">
                  <BookmarkX
                    onClick={() => removeBookmark(contest.id)}
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
