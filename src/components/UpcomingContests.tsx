// import { nanoid } from "nanoid";
import ContestTable from "./ContestTable";
export default function UpcomingContests() {

  return (
    <div className="py-10">
      <div className="text-2xl font-bold  -300 mb-5 mt-2 w-full text-center">
        Upcoming Contests
      </div>
      <ContestTable classname="max-w-3/4 m-auto border rounded-md px-4 py-1" />
    </div>
  );
}
