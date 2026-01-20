import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

import { Spinner } from "@/shared/spinner";
import { Input } from "@/shared/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/shared/select";
import { useClientsQuery, useClientsSearchQuery } from "@/hooks/useClients";
import { ClientsTable } from "./partials/ClientsTable";

export const Clients = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [sort, setSort] = useState<string>("name1");
  const [order, setOrder] = useState<"asc" | "desc">("asc");

  const debouncedSetSearch = useDebouncedCallback((value: string) => {
    setSearchTerm(value);
  }, 300);

  const isSearching = searchTerm.length > 0;

  const clientsQuery = useClientsQuery(pageIndex, pageSize, sort, order);
  const searchQuery = useClientsSearchQuery(
    searchTerm,
    pageIndex,
    pageSize,
    sort,
    order,
  );

  const activeQuery = isSearching ? searchQuery : clientsQuery;

  const { data, isLoading } = activeQuery;
  const clients = isSearching ? (data ?? []) : (data?.clients ?? []);

  return (
    <div className="w-full p-10 flex flex-col justify-center items-center gap-8">
      <div className="p-6 w-full">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold">Clients</h2>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Select
              value={`${sort},${order}`}
              onValueChange={(value) => {
                const [s, o] = value.split(",");
                setSort(s);
                setOrder(o as "asc" | "desc");
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name1,asc">Name ↑</SelectItem>
                <SelectItem value="name1,desc">Name ↓</SelectItem>
              </SelectContent>
            </Select>

            <Input
              placeholder="Search clients..."
              onChange={(e) => debouncedSetSearch(e.target.value)}
              className="sm:w-[250px]"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="h-[80vh] p-16 flex flex-col justify-center items-center">
            <Spinner />
          </div>
        ) : (
          <div>
            <div className="flex flex-col justify-center items-center">
              {clients.length > 0 ? (
                <ClientsTable
                  data={clients}
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
                  No clients found.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
