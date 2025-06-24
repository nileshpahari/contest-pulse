import { Contest } from "@/types";

export function composeCalURL(contest: Contest) {
    // Base URL for Google Calendar event creation
    const baseUrl = "https://calendar.google.com/calendar/u/0/r/eventedit";

    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";

    // Format dates for Google Calendar
    // Google Calendar expects dates in format: YYYYMMDDTHHMMSS (no Z suffix)
    function formatDateForGCal(date: Date) {
      const year = date.getUTCFullYear();
      const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
      const day = date.getUTCDate().toString().padStart(2, "0");
      const hours = date.getUTCHours().toString().padStart(2, "0");
      const minutes = date.getUTCMinutes().toString().padStart(2, "0");
      const seconds = date.getUTCSeconds().toString().padStart(2, "0");

      return `${year}${month}${day}T${hours}${minutes}${seconds}`;
    }

    const startTimeFormatted = formatDateForGCal(contest.startTime);
    const endTimeFormatted = formatDateForGCal(contest.endTime);

    const dates = `dates=${startTimeFormatted}/${endTimeFormatted}`;

    const location = encodeURIComponent(contest.url);

    const additionalParams = "output=xml&sf=true";

    const action = "action=TEMPLATE";

    const title = encodeURIComponent(
      "Contest at " +
        contest.site.charAt(0).toUpperCase() +
        contest.site.slice(1) +
        ": " +
        contest.title
    );

    const startTimeISO = contest.startTime
      .toISOString()
      .replace(/-|:|\.\d+/g, "");
    const endTimeISO = contest.endTime.toISOString().replace(/-|:|\.\d+/g, "");

    // Create dates parameter
    // const dates = `dates=${contest.startTime}/${contest.endTime}`;
    const description = encodeURIComponent(
      `<strong>Event created from <a href="https://contestpulse.netlify.app">Contest Pulse</a></strong>\n` +
        `<hr/>` +
        `<br/>` +
        `<b>Link:</b> <a href="${contest.url}"><b>${contest.title}</b></a>\n` +
        `<b>Site:</b> ${contest.site}\n` +
        `<b>Duration:</b> ${contest.duration}`
    );

    const calendarURL = `${baseUrl}?${timezone}&${dates}&details=${description}&location=${location}&${additionalParams}&text=${title}`;
    return calendarURL;
  }
