"use client";

import Link from "next/link";
import {
  Calendar,
  Clock,
  Users,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { FaGithub as Github } from "react-icons/fa";
import { Button } from "@/components/ui/button";

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
      title: "What is Contest Pulse?",
      text: "Contest Pulse is a web application that helps programmers stay ahead of the competitive‑programming curve by aggregating upcoming contests, sending timely reminders, and surfacing solutions once the dust settles.",
    },
    {
      icon: <Calendar className={`h-6 w-6 ${accentColor}`} />,
      title: "What We Offer",
      text: "All‑in‑one dashboard for Codeforces, LeetCode and CodeChef, smart email notifications, ability to add contests to your calendar, bookmarking, saving contests for future reference, leaderboard and solution links after the contest, and a blazing‑fast, clean and modern user experience.",
    },
    {
      icon: <Github className={`h-6 w-6 ${accentColor}`} />,
      title: "Open Source & Creator",
      text: "Contest Pulse is open-source and built by Nilesh Pahari. You can explore the project on GitHub and connect via his portfolio for collaborations and ideas.",
    },
    {
      icon: <Clock className={`h-6 w-6 ${accentColor}`} />,
      title: "Feel free to contribute",
      text: "Since the project is open source, feel free to contribute to it in any way you can, from reporting bugs to submitting pull requests and feature requests. You can find the repository on GitHub.",
    },
  ];

  return (
    <main className="min-h-screen">
      <div className="relative mx-auto pt-8 flex max-w-5xl flex-col items-center justify-center px-4">
        <h1 className="relative z-10 mb-6 text-center text-4xl font-bold text-foreground md:text-6xl">
          About Contest Pulse
        </h1>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {sections.map((section, idx) => (
            <div
              key={idx}
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
            </div>
          ))}
        </div>

        <div className="relative z-10 mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button
            asChild
            size="lg"
            className={`${buttonBgColor} text-white w-52`}
          >
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
        </div>
      </div>
    </main>
  );
}
