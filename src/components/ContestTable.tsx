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
import { fetchUpcomingContests } from "@/app/actions/fetchContests";
import { Contest } from "@/types/index";
import { SiteIcon } from "./SiteIcon";
export default function ContestTable({
  classname = "",
}: {
  classname: string;
}) {
  const [loading, setLoading] = useState(true);
  const [contests, setContests] = useState<Contest[]>([]);
  const [bookmarks, setBookmarks] = useState<Contest[]>([]);


  useEffect(() => {
    fetchUpcomingContests().then((contests) => {
      if (contests) {
        setContests(contests);
        setLoading(false);
      }
    });
    const savedContests = JSON.parse(localStorage.getItem("contests") || "[]");
    console.log(savedContests);
    setBookmarks(savedContests);
  }, []);

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
              <TableHead>Duration</TableHead>
              <TableHead>URL</TableHead>
              <TableHead className="text-right">Bookmark</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className=" -300">
            {contests.map((contest) => (
              <TableRow key={contest.id}>
                <TableCell className="font-medium"><SiteIcon site={contest.site}/></TableCell>
                <TableCell>{contest.title}</TableCell>
                <TableCell>{contest.startTime.toLocaleDateString()}</TableCell>
                <TableCell>{contest.duration}</TableCell>
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
