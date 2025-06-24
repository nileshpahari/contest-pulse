
"use client"
import { useState } from "react"
import { ChevronLeft, ChevronRight, Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SiteIcon } from "@/components/SiteIcon"
import type { Contest } from "@/types/index"

interface ContestCalendarProps {
  contests: Contest[]
  bookmarks: Contest[]
  siteFilter: string
  onToggleBookmark: (contest: Contest) => void
  onContestClick: (contest: Contest) => void
}

export function ContestCalendar({
  contests,
  bookmarks,
  siteFilter,
  onToggleBookmark,
  onContestClick,
}: ContestCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())

  const filteredContests = contests.filter(
    (c) => siteFilter === "all" || c.site.toLowerCase() === siteFilter.toLowerCase(),
  )

  const getContestsForDate = (date: Date) => {
    return filteredContests.filter((contest) => {
      const contestDate = new Date(contest.startTime)
      return contestDate.toDateString() === date.toDateString()
    })
  }

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }

    return days
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const days = getDaysInMonth(currentDate)
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
  ]
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  return (
    <div className="max-w-3/4 mx-auto">
      <div className="flex items-center justify-between mb-6">
        <Button variant="outline" size="icon" onClick={() => navigateMonth("prev")}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-xl font-semibold">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <Button variant="outline" size="icon" onClick={() => navigateMonth("next")}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-2">
        {dayNames.map((day) => (
          <div key={day} className="p-2 text-center font-medium text-muted-foreground">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {days.map((day, index) => {
          if (!day) {
            return <div key={index} className="h-24"></div>
          }

          const dayContests = getContestsForDate(day)
          const isToday = day.toDateString() === new Date().toDateString()

          return (
            <Card key={day.toISOString()} className={`h-24 ${isToday ? "ring-2 ring-blue-500" : ""}`}>
              <CardContent className="p-2 h-full">
                <div className="text-sm font-medium mb-1">{day.getDate()}</div>
                <div className="space-y-1 overflow-hidden">
                  {dayContests.slice(0, 2).map((contest) => (
                    <div
                      key={contest.id}
                      className="flex items-center gap-1 text-xs bg-blue-100 dark:bg-blue-900 rounded px-1 py-0.5 cursor-pointer hover:bg-blue-200 dark:hover:bg-blue-800"
                      onClick={() => onContestClick(contest)}
                      title={`${contest.title} - ${contest.startTime.toLocaleTimeString()}`}
                    >
                      <SiteIcon site={contest.site} />
                      <span className="truncate flex-1">
                        {contest.title.length > 15 ? contest.title.substring(0, 15) + "..." : contest.title}
                      </span>
                      <Bookmark
                        className={`h-3 w-3 ${bookmarks.some((c) => c.id === contest.id) ? "fill-yellow-500" : ""}`}
                        onClick={(e) => {
                          e.stopPropagation()
                          onToggleBookmark(contest)
                        }}
                      />
                    </div>
                  ))}
                  {dayContests.length > 2 && (
                    <div className="text-xs text-muted-foreground">+{dayContests.length - 2} more</div>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
