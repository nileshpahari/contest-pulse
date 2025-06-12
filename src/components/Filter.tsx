import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {Sites} from "@/types"

export function Filter({siteFilter, setSiteFilter}: {siteFilter: string, setSiteFilter: React.Dispatch<React.SetStateAction<string>>;}) {
  return (
    <div className="flex justify-end items-center mb-4 max-w-3/4 m-auto border rounded-md ">
      <Select value={siteFilter} onValueChange={setSiteFilter}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Filter by site" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Platforms</SelectItem>
          {Sites.map((site) => (
            <SelectItem key={site} value={site}>
              {site}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
