import ContestTable from "./ContestTable";
export default function UpcomingContests() {
  type Site = "codechef" | "leetcode" | "codeforces";

  interface Contest {
    site: Site;
    title: string;
    startTime: number;
    duration: number;
    endTime: number;
    url: string;
  }
  
  const contests: Contest[] = [
    {
      site: "codeforces",
      title: "Educational Codeforces Round 176 (Rated for Div. 2)",
      startTime: 1742222100000,
      duration: 7200000,
      endTime: 1742229300000,
      url: "https://codeforces.com/contest/2075",
    },
    {
      site: "codechef",
      title: "Starters 178",
      startTime: 1742394600000,
      duration: 7200000,
      endTime: 1742401800000,
      url: "https://www.codechef.com/START178",
    },
    {
      site: "codeforces",
      title: "Codeforces Round (Div. 2)",
      startTime: 1742654100000,
      duration: 7200000,
      endTime: 1742661300000,
      url: "https://codeforces.com/contest/2085",
    },
    {
      site: "leetcode",
      title: "Weekly Contest 442",
      startTime: 1742697000000,
      duration: 324000000,
      endTime: 1743021000000,
      url: "https://leetcode.com/contest/weekly-contest-442",
    },
    {
      site: "codechef",
      title: "Starters 179",
      startTime: 1742999400000,
      duration: 7200000,
      endTime: 1743006600000,
      url: "https://www.codechef.com/START179",
    },
    {
      site: "leetcode",
      title: "Biweekly Contest 153",
      startTime: 1743258600000,
      duration: 324000000,
      endTime: 1743582600000,
      url: "https://leetcode.com/contest/biweekly-contest-153",
    },
    {
      site: "codeforces",
      title: "Codeforces Round (Div. 1 + Div. 2)",
      startTime: 1743863700000,
      duration: 10800000,
      endTime: 1743874500000,
      url: "https://codeforces.com/contest/2084",
    },
  ];

  return (
    <div className="py-10">
      <div className="text-2xl font-bold text-gray-300 mb-5 mt-2 w-full text-center">Upcoming Contests</div>
      <ContestTable classname="max-w-3/4 m-auto border rounded-md px-4 py-1" contests={contests} />
    </div>
  );
}
