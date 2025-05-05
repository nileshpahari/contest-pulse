
import { Contest } from "@/types/index";
export const LoadDuration = ({ contest }: { contest: Contest }) => {
  const now = new Date();
  if (contest.endTime <= now)
    return (
      <div className="bg-gray-300 dark:bg-gray-900 border rounded-sm w-1/2 text-center">
        Ended
      </div>
    );
  if (contest.startTime <= now && contest.endTime > now)
    return (
      <div className="bg-gray-300 dark:bg-gray-700 border rounded-sm w-1/2 text-center">
        Live
      </div>
    );
  return <div>{contest.duration}</div>;
};
