import { useEffect, useState } from "react";
import { RefreshCcw } from "lucide-react";
import { ImportHistoryTable, Log } from "./ImportHistoryTable";
import { Skeleton } from "@/shared/skeleton";

export const ImportHistory = ({ data }: { data: Log[] }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return <Skeleton className="h-[57vh] w-full rounded-xl" />;
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex justify-between items-center">
        <span className="font-bold text-3xl mb-4">Import History</span>
        <RefreshCcw
          className="cursor-pointer"
          onClick={() => {
            setIsLoading(true);

            setTimeout(() => {
              setIsLoading(false);
            }, 2000);
          }}
        />
      </div>
      <ImportHistoryTable data={data} />
    </div>
  );
};
