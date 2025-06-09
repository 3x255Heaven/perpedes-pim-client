import { useMemo, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shared/pagination";

const ITEMS_PER_PAGE = 5;
const PAGE_WINDOW = 1; // Pages to show on each side of the current page

export const Variations = ({ variations }: { variations: any[] }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(variations.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedVariations = variations.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const visiblePages = useMemo(() => {
    const pages: (number | "...")[] = [];
    const left = Math.max(1, currentPage - PAGE_WINDOW);
    const right = Math.min(totalPages, currentPage + PAGE_WINDOW);

    if (left > 1) {
      pages.push(1);
      if (left > 2) pages.push("...");
    }

    for (let p = left; p <= right; p++) {
      pages.push(p);
    }

    if (right < totalPages) {
      if (right < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  }, [currentPage, totalPages]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min mt-6 p-4">
      <span className="font-bold text-2xl">Variations</span>

      <Accordion
        type="single"
        collapsible
        className="w-full mt-4"
        defaultValue="item-1"
      >
        {paginatedVariations.map((variation: any, index: number) => (
          <AccordionItem key={variation.id} value={`item-${index + 1}`}>
            <AccordionTrigger className="text-[#9bc79b]">
              {variation.id} / {variation.size} / {variation.width}
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <div className="bg-accent rounded p-4">
                <span className="font-bold text-2xl">General Information</span>
                <Table className="mt-4">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-bold">ID</TableHead>
                      <TableHead className="font-bold">Product ID</TableHead>
                      <TableHead className="font-bold">Size</TableHead>
                      <TableHead className="font-bold">Width</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>{variation.id}</TableCell>
                      <TableCell>{variation.productId}</TableCell>
                      <TableCell>{variation.size}</TableCell>
                      <TableCell>{variation.width}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <div className="bg-accent rounded p-4">
                <span className="font-bold text-2xl">Stock Information</span>
                <Table className="mt-4">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-bold">Stock ID</TableHead>
                      <TableHead className="font-bold">
                        Stock Quantity
                      </TableHead>
                      <TableHead className="font-bold">
                        Reserved Stock
                      </TableHead>
                      <TableHead className="font-bold">Batch</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {variation.stocks.map((stock: any) => (
                      <TableRow key={stock.id}>
                        <TableCell>{stock.stockId}</TableCell>
                        <TableCell>{stock.stockQuantity}</TableCell>
                        <TableCell>{stock.blockedStockQuantity}</TableCell>
                        <TableCell>{stock.batch}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="bg-accent rounded p-4">
                <span className="font-bold text-2xl">Price Information</span>
                <Table className="mt-4">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-bold">Price</TableHead>
                      <TableHead className="font-bold">Price List</TableHead>
                      <TableHead className="font-bold">Currency</TableHead>
                      <TableHead className="font-bold">Unit</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {variation.prices.map((price: any) => (
                      <TableRow key={price.id}>
                        <TableCell>{price.price}</TableCell>
                        <TableCell>{price.priceList}</TableCell>
                        <TableCell>{price.currency}</TableCell>
                        <TableCell>{price.unit}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination className="mt-6 justify-center">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(currentPage - 1);
                }}
                className={
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>

            {visiblePages.map((p, i) =>
              p === "..." ? (
                <span key={`dots-${i}`} className="px-2 select-none">
                  …
                </span>
              ) : (
                <PaginationItem key={p}>
                  <PaginationLink
                    href="#"
                    isActive={p === currentPage}
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(p as number);
                    }}
                  >
                    {p}
                  </PaginationLink>
                </PaginationItem>
              )
            )}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(currentPage + 1);
                }}
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};
