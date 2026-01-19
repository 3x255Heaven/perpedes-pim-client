import { useState } from "react";
import { RefreshCcw } from "lucide-react";
import { useClientsRelationshipLogsQuery } from "@/hooks/useLogs";
import { ImportClientsRelationshipHistoryTable } from "./ImportClientsRelationshipTable";

export const ImportClientsRelationshipHistory = () => {
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);

  const logsQuery = useClientsRelationshipLogsQuery(pageIndex, pageSize);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex justify-between items-center">
        <span className="font-bold text-3xl mb-4">Import History</span>
        <RefreshCcw
          className="cursor-pointer"
          onClick={() => logsQuery.refetch()}
        />
      </div>
      {logsQuery.isError ? (
        <div className="min-h-[35vh] flex justify-center items-center text-center p-10 rounded-xl bg-muted/50">
          <span className="text-2xl">
            Something went wrong while trying to get Logs. Please try again
            later!
          </span>
        </div>
      ) : (
        <ImportClientsRelationshipHistoryTable
          data={logsQuery.data?.logs || []}
          total={logsQuery.data?.totalElements || 0}
          pageIndex={pageIndex}
          pageSize={pageSize}
          isLoading={logsQuery.isLoading}
          onPageChange={setPageIndex}
          onPageSizeChange={(size) => {
            setPageSize(size);
            setPageIndex(0);
          }}
        />
      )}
    </div>
  );
};
