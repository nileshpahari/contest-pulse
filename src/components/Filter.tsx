import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {Sites} from "@/types"
import { cn } from "@/lib/utils";

export function Filter({siteFilter, setSiteFilter, className}: {siteFilter: string, setSiteFilter: React.Dispatch<React.SetStateAction<string>>; className?: string}) {
  return (
    <div className={cn(`flex justify-end items-center mb-4 max-w-3/4 m-auto border rounded-md`, className)}>
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
