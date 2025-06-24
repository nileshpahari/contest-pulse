"use client";
import { X } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { Contest } from "@/types";
import axios from "axios";
import { toast } from "react-hot-toast";
import { composeCalURL } from "@/lib/composeCalURL";

interface AddReminderProps {
  contest: Contest;
  setShowAddReminder: React.Dispatch<React.SetStateAction<boolean>>;
  onToggleBookmark: (contest: Contest) => void;
  bookmarks: Contest[];
}

export function AddReminderAndBookmark({ contest, setShowAddReminder, onToggleBookmark, bookmarks }: AddReminderProps) {
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
            {bookmarks.some((bookmark) => bookmark.id === contest.id) ? (
                <Button
                    onClick={() => onToggleBookmark(contest)}
                    size="lg"
                    className="w-full"
                >
                    Remove Bookmark
                </Button>
            ) : (
                <Button
                    onClick={() => onToggleBookmark(contest)}
                    size="lg"
                    className="w-full"
                >
                    Add Bookmark
                </Button>
            )}
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
