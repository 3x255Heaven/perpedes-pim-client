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
import { Input } from "@/shared/input";
import { Inbox } from "lucide-react";
import { PRODUCT_LEG_TYPES } from "@/constants/product";

const ITEMS_PER_PAGE = 5;
const PAGE_WINDOW = 1;

export const Variations = ({
  variations,
  modelId,
}: {
  variations: any[];
  modelId: string;
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredVariations = useMemo(() => {
    if (!searchTerm.trim()) return variations;

    const lowerSearch = searchTerm.toLowerCase();
    return variations.filter((variation: any) =>
      variation.stocks.some(
        (stock: any) =>
          stock.stockId?.toString().toLowerCase().includes(lowerSearch) ||
          stock.batch?.toString().toLowerCase().includes(lowerSearch) ||
          variation.unit?.toString().toLowerCase().includes(lowerSearch)
      )
    );
  }, [variations, searchTerm]);

  const totalPages = Math.ceil(filteredVariations.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedVariations = filteredVariations.slice(
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

  const getPriceInEuros = (prices: any) => {
    const priceInEuros = prices.find((price: any) => price.currency === "EUR");
    return priceInEuros
      ? `${priceInEuros.price} ${priceInEuros.currency}`
      : "N/A";
  };

  const getTotalStock = (variation: any) =>
    variation.stocks.reduce(
      (acc: any, item: any) => acc + item.stockQuantity,
      0
    );

  return (
    <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min mt-6 p-4">
      <div className="flex justify-between items-center">
        <span className="font-bold text-2xl">Variations</span>
        <Input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="max-w-xs"
        />
      </div>

      <div className="mt-4 min-h-[430px] flex flex-col">
        {paginatedVariations.length > 0 ? (
          <Accordion
            type="single"
            collapsible
            className="w-full flex-1"
            defaultValue="item-1"
          >
            {paginatedVariations.map((variation: any, index: number) => (
              <AccordionItem key={variation.id} value={`item-${index + 1}`}>
                <AccordionTrigger className="text-[#9bc79b]">
                  <span>
                    {variation.width}
                    {modelId}
                    {/* @ts-ignore */}
                    {PRODUCT_LEG_TYPES[variation.unit]}
                    {variation.size}
                  </span>
                  <span className="font-bold">
                    Total Stock: {getTotalStock(variation)}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                  <div className="bg-accent rounded p-4">
                    <span className="font-bold text-2xl">
                      Stock Information
                    </span>
                    <Table className="mt-4">
                      <TableHeader>
                        <TableRow>
                          <TableHead className="font-bold">Material</TableHead>
                          <TableHead className="font-bold">
                            Stock Quantity
                          </TableHead>
                          <TableHead className="font-bold">Batch</TableHead>
                          <TableHead className="font-bold">Unit</TableHead>
                          <TableHead className="font-bold">Price</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {variation.stocks.length !== 0 ? (
                          <>
                            {variation.stocks.map((stock: any) => (
                              <TableRow key={stock.id}>
                                <TableCell>{stock.stockId}</TableCell>
                                <TableCell>{stock.stockQuantity}</TableCell>
                                <TableCell>{stock.batch}</TableCell>
                                <TableCell>{variation.unit}</TableCell>
                                <TableCell>
                                  {getPriceInEuros(variation.prices)}
                                </TableCell>
                              </TableRow>
                            ))}
                          </>
                        ) : (
                          <TableRow>
                            <TableCell>
                              {variation.width}
                              {modelId}
                              {/* @ts-ignore */}
                              {PRODUCT_LEG_TYPES[variation.unit]}
                              {variation.size}
                            </TableCell>
                            <TableCell>0</TableCell>
                            <TableCell>N/A</TableCell>
                            <TableCell>{variation.unit}</TableCell>
                            <TableCell>
                              {getPriceInEuros(variation.prices)}
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <div className="flex flex-col items-center justify-center flex-1 text-muted-foreground gap-2">
            <Inbox className="w-10 h-10" />
            <span className="text-lg font-medium">No items found</span>
          </div>
        )}
      </div>

      <Pagination
        className={`mt-6 justify-center transition-opacity duration-300 ${
          totalPages > 1 ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
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
    </div>
  );
};
