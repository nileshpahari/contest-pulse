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
import {
  BellRing,
  Bookmark,
  ArrowUpRight,
  Calendar,
  List,
  BellOff,
} from "lucide-react";
import Link from "next/link";
import { fetchUpcomingContests } from "@/app/actions/fetchContests";
import type { Contest } from "@/types/index";
import { SiteIcon } from "@/components/SiteIcon";
import { AnimatePresence, motion } from "framer-motion";
import { AddReminder } from "@/components/AddReminder";
import Loader from "@/components/Loader";
import { LoadDuration } from "@/components/LoadDuration";
import { Filter } from "@/components/Filter";
import { Toaster } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { ContestCalendar } from "@/components/ContestCalendar";
import { AddReminderAndBookmark } from "@/components/AddReminderAndBookmark";

export default function ContestTable() {
  const [siteFilter, setSiteFilter] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [contests, setContests] = useState<Contest[]>([]);
  const [bookmarks, setBookmarks] = useState<Contest[]>([]);
  const [showAddReminder, setShowAddReminder] = useState(false);
  const [selectedContest, setSelectedContest] = useState<Contest | null>(null);
  const [viewMode, setViewMode] = useState<"table" | "calendar">("table");

  useEffect(() => {
    fetchUpcomingContests().then((contests) => {
      if (contests) {
        setContests(contests);
        setLoading(false);
      }
    });
    const savedContests = JSON.parse(localStorage.getItem("contests") || "[]");
    setBookmarks(savedContests);
  }, []);

  useEffect(() => {
    document.body.style.overflow = showAddReminder ? "hidden" : "auto";
  }, [showAddReminder]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowAddReminder(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setShowAddReminder]);

  const notifyToggler = () => {};

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

  const handleContestClick = (contest: Contest) => {
    setSelectedContest(contest);
    setShowAddReminder(true);
  };

  if (loading) {
    return (
      <div className="h-screen min-w-screen flex justify-center items-center ">
        <Loader />
      </div>
    );
  }

  if (!loading)
    return (
      <div className="p-4">
        <AnimatePresence>
          {showAddReminder &&
            selectedContest &&
            new Date(selectedContest?.startTime || "") > new Date() &&
            viewMode === "table" && (
              <AddReminder
                setShowAddReminder={setShowAddReminder}
                contest={selectedContest}
              />
            )}
          {showAddReminder &&
            selectedContest &&
            new Date(selectedContest?.startTime || "") > new Date() &&
            viewMode === "calendar" && (
              <AddReminderAndBookmark
                contest={selectedContest}
                setShowAddReminder={setShowAddReminder}
                onToggleBookmark={toggleBookmark}
                bookmarks={bookmarks}
              />
            )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={showAddReminder ? "blurred" : "clear"}
            initial={{ filter: showAddReminder ? "blur(0px)" : "blur(4px)" }}
            animate={{ filter: showAddReminder ? "blur(4px)" : "blur(0px)" }}
            transition={{ duration: 0.3 }}
          >
            <div className={`mt-16 `}>
              <h1 className="text-2xl font-bold  -300 mb-5 mt-2 w-full text-center">
                Upcoming Contests
              </h1>

              <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4 max-w-3/4 m-auto">
                <div className="w-full">
                  <Filter
                    siteFilter={siteFilter}
                    setSiteFilter={setSiteFilter}
                    className="mb-0 max-w-full"
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    variant={viewMode === "table" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("table")}
                    className="flex items-center gap-2"
                  >
                    <List className="h-4 w-4" />
                    Table
                  </Button>
                  <Button
                    variant={viewMode === "calendar" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("calendar")}
                    className="flex items-center gap-2"
                  >
                    <Calendar className="h-4 w-4" />
                    Calendar
                  </Button>
                </div>
              </div>

              {viewMode === "calendar" ? (
                <ContestCalendar
                  contests={contests}
                  bookmarks={bookmarks}
                  siteFilter={siteFilter}
                  onToggleBookmark={toggleBookmark}
                  onContestClick={handleContestClick}
                />
              ) : (
                <div className="max-w-3/4 m-auto border rounded-md px-4 py-1">
                  <Table>
                    <TableHeader className="font-semibold  -500">
                      <TableRow>
                        <TableHead className="w-[50px]">Site</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Start Time</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Link</TableHead>
                        <TableHead className="text-center">Save</TableHead>
                        <TableHead className="text-right w-[50px]">
                          Add reminder
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody className=" -300">
                      {contests
                        .filter(
                          (c) =>
                            siteFilter === "all" ||
                            c.site.toLowerCase() === siteFilter.toLowerCase()
                        )
                        .map((contest) => (
                          <TableRow key={contest.id}>
                            <TableCell className="font-medium">
                              <SiteIcon site={contest.site} />
                            </TableCell>
                            <TableCell>{contest.title}</TableCell>
                            <TableCell>
                              {contest.startTime.toLocaleString()}
                            </TableCell>
                            <TableCell>
                              <LoadDuration contest={contest} />
                            </TableCell>
                            <TableCell>
                              <Link
                                target="_blank"
                                className="hover:text-blue-500"
                                href={contest.url}
                              >
                                <ArrowUpRight />
                              </Link>
                            </TableCell>
                            <TableCell>
                              <div className="flex justify-center">
                                <Bookmark
                                  onClick={() => {
                                    toggleBookmark(contest);
                                  }}
                                  className={
                                    bookmarks.some((c) => c.id === contest.id)
                                      ? "fill-yellow-500"
                                      : ""
                                  }
                                />
                              </div>
                            </TableCell>
                            <TableCell
                              onClick={notifyToggler}
                              className="flex justify-center w-full"
                            >
                              {/* {!reminder?<BellOff/>:<BellRing/>} */}
                              <button
                                onClick={() => {
                                  if (
                                    new Date(contest.startTime) > new Date()
                                  ) {
                                    setShowAddReminder(true);
                                    setSelectedContest(contest);
                                  }
                                }}
                                aria-label="Add reminder"
                              >
                                {" "}
                                {new Date(contest.startTime) > new Date() && (
                                  <BellRing className="hover:text-blue-500" />
                                )}
                                {new Date(contest.startTime) < new Date() && (
                                  <BellOff className="hover:text-blue-500" />
                                )}
                              </button>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
        <Toaster />
      </div>
    );
}
