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
import { ArrowBigLeft, ArrowUpRight, Link as LinkIcon, X } from "lucide-react";
import { fetchPastContests } from "@/app/actions/fetchContests"; // create this
import { Contest } from "@/types";
import { SiteIcon } from "@/components/SiteIcon";
import { ContestLinks } from "@/components/ContestLinks";
import { motion, AnimatePresence } from "framer-motion";

export default function PastContestTable() {
  const [loading, setLoading] = useState(true);
  const [contests, setContests] = useState<Contest[]>([]);
  const [showLinks, setShowLinks] = useState(false);

  useEffect(() => {
    fetchPastContests().then((data) => {
      if (data) {
        setContests(data);
        setLoading(false);
      }
    });
  }, []);

  useEffect(() => {
    document.body.style.overflow = showLinks ? "hidden" : "auto";
  }, [showLinks]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowLinks(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setShowLinks]);

  if (loading) {
    return (
      <h1 className="text-3xl font-bold min-w-screen flex justify-center items-center mt-20">
        Fetching past contest data...
      </h1>
    );
  }

  if (contests.length === 0) {
    return (
      <h1 className="text-3xl font-bold min-w-screen min-h-screen flex justify-center items-center">
        No past contests found
      </h1>
    );
  }

  return (
    <div className="p-4">
      <AnimatePresence>
        {showLinks && <ContestLinks setShowLinks={setShowLinks} />}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div
          key={showLinks ? "blurred" : "clear"}
          initial={{ filter: showLinks ? "blur(0px)" : "blur(4px)" }}
          animate={{ filter: showLinks ? "blur(4px)" : "blur(0px)" }}
          transition={{ duration: 0.3 }}
        >
          <div className={`mt-16 `}>
            <h1 className="text-2xl font-bold  -300 mb-5 mt-2 w-full text-center">
              Past Contests
            </h1>
            <div className="max-w-3/4 m-auto border rounded-md px-4 py-1">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Site</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Start Time</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Links</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contests.map((contest) => (
                    <TableRow key={contest.id}>
                      <TableCell>
                        <SiteIcon site={contest.site} />
                      </TableCell>
                      <TableCell>{contest.title}</TableCell>
                      <TableCell>
                        {contest.startTime.toLocaleString()}
                      </TableCell>
                      <TableCell>{contest.duration}</TableCell>
                      <TableCell>
                        <button
                          onClick={() => setShowLinks(true)}
                          aria-label="View Links"
                        >
                          <ArrowUpRight className="hover:text-blue-500" />
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
