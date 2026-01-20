import { useState } from "react";

import { Spinner } from "@/shared/spinner";

import { useUsersQuery } from "@/hooks/useUsers";
import { UsersTable } from "./partials/UsersTable";

export const Users = () => {
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);

  const usersQuery = useUsersQuery(pageIndex, pageSize);

  const { data, isLoading } = usersQuery;
  const users = data?.content ?? [];

  return (
    <div className="w-full p-10 flex flex-col justify-center items-center gap-8">
      <div className="p-6 w-full">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold">Users</h2>
        </div>

        {isLoading ? (
          <div className="h-[80vh] p-16 flex flex-col justify-center items-center">
            <Spinner />
          </div>
        ) : (
          <div>
            <div className="flex flex-col justify-center items-center">
              {users.length > 0 ? (
                <UsersTable
                  data={users}
                  total={data?.totalElements || 0}
                  pageIndex={pageIndex}
                  pageSize={pageSize}
                  onPageChange={setPageIndex}
                  onPageSizeChange={(size) => {
                    setPageSize(size);
                    setPageIndex(0);
                  }}
                />
              ) : (
                <p className="col-span-full text-center text-gray-500">
                  No users found.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
