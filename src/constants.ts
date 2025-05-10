import "dotenv/config";
export const URL = process.env.fetchURL as string;
export const NEXTAUTH_URL= process.env.NEXTAUTH_URL as string;
export const NEXTAUTH_SECRET= process.env.NEXTAUTH_SECRET as string;
export const GOOGLE_CLIENT_ID= process.env.GOOGLE_CLIENT_ID as string;
export const GOOGLE_CLIENT_SECRET= process.env.GOOGLE_CLIENT_SECRET as string;
export const DB_URL= process.env.DATABASE_URL as string;
export const YT_KEY =  process.env.NEXT_PUBLIC_YOUTUBE_API_KEY  as string;