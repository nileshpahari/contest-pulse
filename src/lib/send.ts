import nodemailer from "nodemailer";
import { Contest } from "@prisma/client";
import db from "../db/index";

export async function sendReminders() {
  try {
    const now = new Date();

    // Start of today (00:00 UTC)
    const todayStart = new Date(
      Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate(),
        0,
        0,
        0,
        0
      )
    );

    // Start of tomorrow (00:00 UTC next day)
    const tomorrowStart = new Date(todayStart.getTime() + 24 * 60 * 60 * 1000);

    // only doubtful logic
    const notifications = await db.notification.findMany({
      where: {
        notifyAt: {
          gte: todayStart,
          lt: tomorrowStart,
        },
        notified: false,
      },
      include: { contest: true },
    });

    for (const n of notifications) {
      const info = await sendEmail(n.userEmail, n.contest);
      console.log("Email sent:", info.messageId);
      if (info) {
        await db.notification.update({
          where: { id: n.id },
          data: { notified: true },
        });
      }
    }
  } catch (error) {
    console.error("Error sending reminders:", error);
  }
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendEmail(to: string, contest: Contest) {
  const { site, title, startTime, endTime, duration, url } = contest;
  const subject = `Reminder for the contest - ${title}`;
  const html = `
  <h1>Contest Reminder</h1>
  <p>Contest: ${title}</p>
  <p>Site: ${site}</p>
  <p>Duration: ${duration}</p>
  <p>Start Time: ${startTime.toLocaleString()}</p>
  <p>End Time: ${endTime.toLocaleString()}</p>
  <p>Link: <a>${url}</a></p>
   <p style="font-size: 0.9em; color: gray;">You're receiving this reminder because you opted in for contest notifications on Contest Pulse.</p>
  `;

  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject,
      html,
    });
    return info;
  } catch (error) {
    console.error("Email error:", error);
    throw error;
  }
}


const main = async (): Promise<boolean> => {
  try {
    await sendReminders();
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default main;