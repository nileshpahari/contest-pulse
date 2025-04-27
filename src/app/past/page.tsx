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
import { Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import { fetchPastContests } from "@/app/actions/fetchContests"; // create this
import {Contest }from "@/types";
import { SiteIcon } from "@/components/SiteIcon";

export default function PastContestTable() {
  const [loading, setLoading] = useState(true);
  const [contests, setContests] = useState<Contest[]>([]);

  useEffect(() => {
    fetchPastContests().then((data) => {
      if (data) {
        setContests(data);
        setLoading(false);
      }
    });
  }, []);

  if (loading) {
    return (
      <h1 className="text-3xl font-bold min-w-screen flex justify-center items-center mt-20">
        Fetching past contest data...
      </h1>
    );
  }

  if(contests.length === 0){
    return (
      <h1 className="text-3xl font-bold min-w-screen min-h-screen flex justify-center items-center">
        No past contests found
      </h1>
    );
  }
  return (
    <div className="mt-20">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Site</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Start Time</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>URL</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contests.map((contest) => (
            <TableRow key={contest.title}>
              <TableCell><SiteIcon site={contest.site} /></TableCell>
              <TableCell>{contest.title}</TableCell>
              <TableCell>{new Date(contest.startTime).toLocaleDateString()}</TableCell>
              <TableCell>{contest.duration}</TableCell>
              <TableCell>
                <Link href={contest.url}>
                  <LinkIcon />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
