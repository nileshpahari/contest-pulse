import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Site = "codechef" | "leetcode" | "codeforces";
interface Contest {
  site: Site;
  title: string;
  startTime: number;
  duration: number;
  endTime: number;
  url: string;
}

function formatDuration(ms: number): string {
  const hours = Math.floor(ms / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${hours}h ${minutes}m ${seconds}s`;
}

function formatTime(time: number): string {
  const date = new Date(time);
  return date.toLocaleString();
}

export default function ContestTable({ contests }: { contests: Contest[] }) {
  return (
    <Table>
      <TableHeader className="font-semibold text-gray-500">
        <TableRow>
          <TableHead className="w-[100px]">Site</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Start Time</TableHead>
          <TableHead>End Time</TableHead>
          <TableHead>Duration</TableHead>
          <TableHead className="text-right">URL</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="text-gray-300">
        {contests.map((contest) => (
          <TableRow key={contest.title}>
            <TableCell className="font-medium">{contest.site}</TableCell>
            <TableCell>{contest.title}</TableCell>
            <TableCell>{formatTime(contest.startTime)}</TableCell>
            <TableCell>{formatTime(contest.endTime)}</TableCell>
            <TableCell>{formatDuration(contest.duration)}</TableCell>
            <TableCell className="text-right">{contest.url}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
