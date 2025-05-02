"use client";
import { WavyBackground } from "@/components/ui/wavy-background";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {

    return (<WavyBackground>
      <div className="relative mx-auto my-10 flex max-w-7xl flex-col items-center justify-center">
     

        <div className="px-4 py-10 md:py-20">
          <h1 className="relative z-10 mx-auto max-w-4xl text-center text-3xl font-bold text-slate-700 md:text-5xl lg:text-7xl dark:text-slate-300">
            {"Contest Pulse"
              .split(" ")
              .map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                  animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="mr-2 inline-block"
                >
                  {word}
                </motion.span>
              ))}
          </h1>
          <h2 className="relative z-10 mx-auto max-w-4xl text-center text-xl font-bold text-slate-700 md:text-2xl lg:text-3xl dark:text-slate-300">
            {"Stay Ahead, Stay Prepared"
              .split(" ")
              .map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                  animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="mr-2 inline-block"
                >
                  {word}
                </motion.span>
              ))}
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 1 }}
            className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal text-neutral-900 dark:text-neutral-400"
          >
            Track upcoming coding contests across all major platforms. Bookmark, set reminders, and stay ahead.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 1.2 }}
            className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <Link href="/upcoming" className="w-52 rounded-lg bg-indigo-600 px-6 py-2 text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-700 dark:bg-white dark:text-black dark:hover:bg-gray-200 text-center">
              Explore Contests
            </Link>
            <Link href="/about" className="w-52 rounded-lg border border-gray-300 bg-white px-6 py-2 text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100 dark:border-gray-700 dark:bg-black dark:text-white dark:hover:bg-gray-900 text-center">
              Learn More
            </Link>
          </motion.div>
        </div>
      </div>
    </WavyBackground>)
}
