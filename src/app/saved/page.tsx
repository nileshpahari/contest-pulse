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
import { BookmarkX, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Contest } from "@/types";
import { SiteIcon } from "@/components/SiteIcon";
import {  LoadDuration } from "@/components/LoadDuration";
import { Filter } from "@/components/Filter";

export default function SavedContests() {
  const { status } = useSession();
  const [bookmarks, setBookmarks] = useState<Contest[]>([]);
  const [siteFilter, setSiteFilter] = useState<string>("all");

  useEffect(() => {
    const loadSaved = async () => {
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
    loadSaved();
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
    <div className="p-18">
      <div className="text-2xl font-bold mb-5 mt-2 w-full text-center">
        Saved Contests
      </div>
      <div className="mb-4">
              <Filter siteFilter={siteFilter} setSiteFilter={setSiteFilter}/>
      </div>
      <div className="max-w-3/4 m-auto border rounded-md px-4 py-1">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Site</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Start Time</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Link</TableHead>
              <TableHead className="text-center">Remove</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookmarks.filter((c) => siteFilter === "all" || c.site.toLowerCase() === siteFilter.toLowerCase()).map((contest) => (
              <TableRow key={contest.id}>
                <TableCell><SiteIcon site={contest.site}/></TableCell>
                <TableCell>{contest.title}</TableCell>
                <TableCell>{new Date(contest.startTime).toLocaleString()}</TableCell>
                <TableCell><LoadDuration contest={contest} /></TableCell>
                <TableCell>
                  <Link target="_blank" className="hover:text-blue-500" href={contest.url}>
                    <ArrowUpRight />
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
