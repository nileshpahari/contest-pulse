"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Calendar,
  Clock,
  Users,
  Github,
  ArrowLeft,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { BackgroundBeams } from "@/components/background-beams";

export default function About() {
  const accentColor = "text-orange-500 dark:text-orange-600";
  const accentBgColor = "bg-orange-500/20 dark:bg-orange-600/20";
  const accentBorderColor = "border-orange-500/50";
  const accentShadowColor = "shadow-orange-500/10 dark:shadow-orange-600/10";
  const buttonBgColor =
    "bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700";

  const sections = [
    {
      icon: <Users className={`h-6 w-6 ${accentColor}`} />,
      title: "Our Mission",
      text:
        "Contest Pulse helps programmers stay ahead of the competitive‑programming curve by aggregating contests, sending timely reminders, and surfacing high‑quality solutions once the dust settles.",
    },
    {
      icon: <Calendar className={`h-6 w-6 ${accentColor}`} />,
      title: "What We Offer",
      text:
        "All‑in‑one dashboard for Codeforces, LeetCode and CodeChef, smart email notifications & bookmarking, crowdsourced editorial links, and a blazing‑fast UX built with Next.js & shadcn/ui.",
    },
    {
      icon: <Github className={`h-6 w-6 ${accentColor}`} />,
      title: "Open Source & Creator",
      text:
        "Contest Pulse is open-source and built by Nilesh Pahari. You can explore the project on GitHub and connect via his portfolio for collaborations and ideas.",
    },
    {
      icon: <Clock className={`h-6 w-6 ${accentColor}`} />,
      title: "Future Plans",
      text:
        "Personalised contest recommendations using AI, email notifications, synchronization of saved contests between devices and calendar view are coming soon.",
    },
  ];

  return (
    <main className="min-h-screen">
      {/* <BackgroundBeams /> */}
      <div className="relative mx-auto pt-18 pb-16 flex max-w-5xl flex-col items-center justify-center px-4">
        <motion.h1
          initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative z-10 mb-6 text-center text-4xl font-bold text-foreground md:text-6xl"
        >
          About Contest Pulse
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="relative z-10 mx-auto max-w-2xl text-center text-lg text-muted-foreground mb-8"
        >
          Contest Pulse is your one‑stop hub for discovering programming contests, setting timely reminders, and revisiting editorial solutions once the contest is over — all wrapped in a clean, distraction‑free interface.
        </motion.p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {sections.map((section, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 + idx * 0.1 }}
              className={`rounded-xl border border-border bg-card/40 p-6 backdrop-blur-sm hover:${accentBorderColor} hover:shadow-md hover:${accentShadowColor} transition-all duration-300`}
            >
              <div
                className={`mb-4 inline-flex rounded-full p-2 ${accentBgColor}`}
              >
                {section.icon}
              </div>
              <h3 className="mb-2 text-lg font-semibold text-card-foreground">
                {section.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {section.text}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.8 }}
          className="relative z-10 mt-8 text-center text-muted-foreground text-sm w-full"
        >
          <div className="w-full rounded-md border border-border bg-card p-4">
            <p>
              GitHub: <a href="https://github.com/nileshpahari/contest-pulse" className="underline hover:text-foreground transition-colors" target="_blank" rel="noopener noreferrer">nileshpahari/contest-pulse</a>
            </p>
            <p>
              Creator: <a href="https://nileshkrpahari.xyz/" className="underline hover:text-foreground transition-colors" target="_blank" rel="noopener noreferrer">nileshkrpahari.xyz</a>
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 1 }}
          className="relative z-10 mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Button asChild size="lg" className={`${buttonBgColor} text-white w-52`}>
            <Link href="/upcoming">
              Explore Contests <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-border bg-card/50 backdrop-blur-sm hover:bg-card/80 text-card-foreground w-52"
          >
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" /> Home
            </Link>
          </Button>
        </motion.div>
      </div>
    </main>
  );
}
