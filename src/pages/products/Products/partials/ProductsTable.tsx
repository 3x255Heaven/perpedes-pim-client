import { useNavigate } from "react-router-dom";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/table";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/select";

import { Button } from "@/shared/button";
import { Input } from "@/shared/input";

export type Product = {
  id: number;
  name: string;
  description: string;
  hmvNumber: string;
  modelId: string;
  factory: string;
  color: string;
  picture: string;
  widthSystem: string;
  shoeType: string;
  closureSystem: string;
  upperMaterial: string;
  innerLining: string;
  soleType: string;
  soleColor: string;
  function: string;
  smf: string;
  //   variations: [
  //     {
  //       id: number;
  //       size: string;
  //       width: string;
  //       productId: number;
  //       stocks: [
  //         {
  //           id: number;
  //           stockQuantity: number;
  //           blockedStockQuantity: number;
  //           batch: string;
  //           stockId: string;
  //         }
  //       ];
  //       prices: [
  //         {
  //           id: number;
  //           price: number;
  //           priceList: string;
  //           currency: string;
  //           unit: string;
  //         }
  //       ];
  //     }
  //   ];
};

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "hmvNumber",
    header: "HVM Number",
  },
  {
    accessorKey: "modelId",
    header: "Model ID",
  },
  {
    accessorKey: "factory",
    header: "Factory",
  },
  {
    accessorKey: "color",
    header: "Color",
  },
  {
    accessorKey: "picture",
    header: "Picture",
  },
  {
    accessorKey: "widthSystem",
    header: "Width System",
  },
  {
    accessorKey: "shoeType",
    header: "Shoe Type",
  },
  {
    accessorKey: "closureSystem",
    header: "Closure System",
  },
  {
    accessorKey: "upperMaterial",
    header: "Upper Material",
  },
  {
    accessorKey: "innerLining",
    header: "Inner Lining",
  },
  {
    accessorKey: "soleType",
    header: "Sole Type",
  },
  {
    accessorKey: "soleColor",
    header: "Sole Color",
  },
  {
    accessorKey: "function",
    header: "Function",
  },
  {
    accessorKey: "smf",
    header: "SMF",
  },
];

export const ProductsTable = ({ data }: { data: Product[] }) => {
  const navigate = useNavigate();
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
      <Input
        placeholder="Search"
        value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("name")?.setFilterValue(event.target.value)
        }
        className="max-w-sm"
      />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="font-bold">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="h-[3rem] cursor-pointer"
                  onClick={() => {
                    navigate(`/products/${row.original.id}`);
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-center px-2">
        <div className="flex items-center space-x-6 mt-4 lg:space-x-8">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Rows per page</p>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value));
              }}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue
                  placeholder={table.getState().pagination.pageSize}
                />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>
              <ChevronsLeft />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeft />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRight />
            </Button>
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to last page</span>
              <ChevronsRight />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
