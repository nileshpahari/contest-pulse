"use client";

import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.6 }}
        className="relative z-10 mt-4 w-full flex justify-center flex-end"
      >
        <div className="w-full rounded-md border border-border bg-card/60 backdrop-blur-md p-4 text-center text-sm text-muted-foreground shadow-md">
          <p className="mb-1">
            GitHub:&nbsp;
            <a
              href="https://github.com/nileshpahari/contest-pulse"
              className="underline hover:text-foreground transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              nileshpahari/contest-pulse
            </a>
          </p>
          <p className="mb-1">
            Creator:&nbsp;
            <a
              href="https://nileshkrpahari.xyz/"
              className="underline hover:text-foreground transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              nileshkrpahari.xyz
            </a>
          </p>
          <p className="italic text-xs mt-2">
            ⭐ Feel free to star the repo if you found it useful!
          </p>
        </div>
      </motion.div>
    </footer>
  );
}
