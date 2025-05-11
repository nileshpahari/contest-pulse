"use client";
import { X } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { Contest } from "@/types";
import { composeLeaderboardURL, composeSolURL } from "@/app/actions/composeURL";
import { useEffect, useState } from "react";

interface ContestLinksProps {
  contest: Contest;
  setShowLinks: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ContestLinks({ contest, setShowLinks }: ContestLinksProps) {
  const [solURL, setSolURL] = useState<string>("");
  const [leaderboardURL, setLeaderboardURL] = useState<string>("");
  useEffect(() => {
    composeSolURL(contest).then((url) =>{ setSolURL(url)});
    composeLeaderboardURL(contest).then((url) =>{ setLeaderboardURL(url)});
  }, []);
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
          onClick={() => setShowLinks(false)}
          className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-800 dark:hover:text-white"
        >
          <X />
        </button>

        <div className="flex flex-col gap-4 mt-6">
          <Link href={leaderboardURL} target={"_blank"}>
            <Button size="lg" className="w-full">
              Leaderboard
            </Button>
          </Link>
          <Link href={solURL} target="_blank">
            <Button size="lg" className="w-full">
              Solution
            </Button>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}
