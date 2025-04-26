import { Handler } from '@netlify/functions';
import { updateContestTable } from "@/lib/updateContestTable";

export const handler: Handler = async () => {
  await updateContestTable();
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Contest Table updated" }),
  };
};