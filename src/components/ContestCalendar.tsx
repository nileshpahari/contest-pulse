"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SiteIcon } from "@/components/SiteIcon";
import type { Contest } from "@/types/index";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";

interface ContestCalendarProps {
  contests: Contest[];
  siteFilter: string;
  onContestClick: (contest: Contest) => void;
}

export function ContestCalendar({
  contests,
  siteFilter,
  onContestClick,
}: ContestCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [modalDate, setModalDate] = useState<Date | null>(null);

  const filteredContests = contests.filter(
    (c) =>
      siteFilter === "all" || c.site.toLowerCase() === siteFilter.toLowerCase()
  );

  const getContestsForDate = (date: Date) => {
    return filteredContests.filter((contest) => {
      const contestDate = new Date(contest.startTime);
      return contestDate.toDateString() === date.toDateString();
    });
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const days = getDaysInMonth(currentDate);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="max-w-3/4 mx-auto">
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigateMonth("prev")}
        >
          {" "}
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-xl font-semibold">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigateMonth("next")}
        >
          {" "}
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-2">
        {dayNames.map((day) => (
          <div
            key={day}
            className="p-2 text-center font-medium text-muted-foreground"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {days.map((day, index) => {
          if (!day) return <div key={index} className="h-24"></div>;

          const dayContests = getContestsForDate(day);
          const isToday = day.toDateString() === new Date().toDateString();

          return (
            <Card
              key={day.toISOString()}
              className={`h-24 ${isToday ? "ring-2 ring-blue-500" : ""}`}
            >
              <CardContent className="p-2 h-full">
                <div className="text-sm font-medium mb-1">{day.getDate()}</div>
                <div className="space-y-1 max-h-14 overflow-y-auto pr-1 scrollbar-thin">
                  {dayContests.length > 0 && (
                    <div
                      className="flex items-center gap-1 text-xs bg-blue-100 dark:bg-blue-900 rounded px-1 py-0.5 cursor-pointer hover:bg-blue-200 dark:hover:bg-blue-800"
                      onClick={() => onContestClick(dayContests[0])}
                      title={`${dayContests[0].title} - ${new Date(
                        dayContests[0].startTime
                      ).toLocaleTimeString()}`}
                    >
                      <SiteIcon site={dayContests[0].site} />
                      <span className="truncate flex-1">
                        {dayContests[0].title.length > 15
                          ? dayContests[0].title.substring(0, 15) + "..."
                          : dayContests[0].title}
                      </span>
                      {dayContests.length > 1 && (
                        <button
                          className="text-[10px] text-muted-foreground hover:underline"
                          onClick={(e) => {
                            e.stopPropagation();
                            setModalDate(day);
                          }}
                        >
                          +{dayContests.length - 1} more
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <Dialog
        open={!!modalDate}
        onOpenChange={(open) => !open && setModalDate(null)}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Contests on {modalDate?.toDateString()}</DialogTitle>
          </DialogHeader>
          <div className="space-y-2 max-h-[60vh] overflow-y-auto">
            {modalDate &&
              getContestsForDate(modalDate).map((contest) => (
                <div
                  key={contest.id}
                  className="flex items-center gap-2 text-sm bg-muted p-2 rounded hover:bg-muted/70 cursor-pointer"
                  onClick={() => {
                    onContestClick(contest);
                    setModalDate(null);
                  }}
                >
                  <SiteIcon site={contest.site} />
                  <div className="truncate flex-1">{contest.title}</div>
                </div>
              ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
