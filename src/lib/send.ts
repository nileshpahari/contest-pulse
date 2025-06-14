import nodemailer from "nodemailer";
import { Contest } from "@prisma/client";
import db from "../db/index.js";

export async function sendReminders() {
  const reminders = await db.reminder.findMany({
    where: {
      notifyAt: { lte: new Date() },
      notified: false,
    },
    include: { user: true, contest: true },
  });

  for (const r of reminders) {
    await sendEmail(r.user.email, r.contest); 
    await db.reminder.update({
      where: { id: r.id },
      data: { notified: true },
    });
  }
};

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
  `;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject,
      html,
    });
    console.log("Email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("Email error:", error);
    throw error;
  }
}
