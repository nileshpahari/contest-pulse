"use client";
import { X } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { Contest } from "@/types";
import { composeCalURL } from "@/lib/calendarURL";
import { enableEmailReminder } from "@/lib/enableReminder";
import { signIn, useSession } from "next-auth/react";

interface AddReminderProps {
  contest: Contest;
  setShowAddReminder: React.Dispatch<React.SetStateAction<boolean>>;
}

export function AddReminder({ contest, setShowAddReminder }: AddReminderProps) {
  const {status} = useSession();
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
          <Link href={composeCalURL(contest)} target={"_blank"}>
            <Button size="lg" className="w-full">
              Add to Calendar
            </Button>
          </Link>
          <Button
            onClick={() => status==="authenticated"?enableEmailReminder(contest, setShowAddReminder):signIn()}
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
