"use client"
import { motion } from "framer-motion";
import Link from "next/link";
import { Trophy, Calendar, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
export default function Home() {
    const accentColor = "text-orange-500 dark:text-orange-600";
  const accentBgColor = "bg-orange-500/20 dark:bg-orange-600/20";
  const accentBorderColor = "border-orange-500/50";
  const accentShadowColor = "shadow-orange-500/10 dark:shadow-orange-600/10";
  const buttonBgColor = "bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700";
  return (
    <main className="min-h-screen">    
      <div className="relative mx-auto pb-16 flex max-w-7xl flex-col items-center justify-center px-4">
          <div className="px-4 py-8 md:py-12">
            <h1 className="relative z-10 mx-auto max-w-4xl text-center text-4xl font-bold text-foreground md:text-6xl lg:text-7xl">
              {"Contest Pulse".split(" ").map((word, index) => (
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

            <h2 className="relative z-10 mx-auto max-w-4xl text-center text-xl font-bold text-primary md:text-2xl lg:text-3xl mt-4">
              {"Stay Ahead, Stay Prepared".split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                  animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
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
              className="relative z-10 mx-auto max-w-xl py-6 text-center text-lg font-normal text-muted-foreground"
            >
              Track upcoming coding contests across all major platforms. Bookmark, set reminders, and never miss a
              competition again.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 1.2 }}
              className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
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
                <Link href="/about">Learn More</Link>
              </Button>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.4 }}
            className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl"
          >
            {[
              {
                icon: <Calendar className={`h-6 w-6 ${accentColor}`} />,
                title: "Multiple Platforms",
                description: "Track contests from multiple platforms like Codeforces, LeetCode, and CodeChef in one place",
              },
              {
                icon: <Clock className={`h-6 w-6 ${accentColor}`} />,
                title: "Never Miss a Contest",
                description: "Set reminders and get notifications before contests begin",
              },
              {
                icon: <Trophy className={`h-6 w-6 ${accentColor}`} />,
                title: "Personalized Dashboard",
                description: "Save your favorite contests and create a personalized schedule",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
                className={`p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border hover:${accentBorderColor} hover:shadow-md hover:${accentShadowColor} transition-all duration-300`}
              >
                <div className={`p-2 rounded-full ${accentBgColor} w-fit mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-card-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>
  );
}