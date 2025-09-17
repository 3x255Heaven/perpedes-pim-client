import { useState, useMemo } from "react";
import { MultiValueProperty, ProductType } from "@/hooks/useProducts";
import { Badge } from "@/shared/badge";
import { Dialog, DialogContent } from "@/shared/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/select";
import { Input } from "@/shared/input";
import { PRODUCT_LEG_TYPES } from "@/constants/product";

interface StockModalProps {
  isModalOpen: "info" | "stock" | null;
  setModalOpen: (type: "info" | "stock" | null) => void;
  products: ProductType[];
  productModelId: string;
  productFunctions: MultiValueProperty[];
}

const getDisplayedPrice = (product: ProductType) => {
  const eur = product.prices.find((p) => p.currency === "EUR");
  return eur ?? product.prices[0];
};

const getStockStatus = (
  stockQuantity: number
): "No Stock" | "Low Stock" | "In Stock" => {
  if (stockQuantity === 0) return "No Stock";
  if (stockQuantity <= 2) return "Low Stock";
  return "In Stock";
};

export const StockModal = ({
  isModalOpen,
  setModalOpen,
  products,
  productModelId,
  productFunctions,
}: StockModalProps) => {
  const [filters, setFilters] = useState({
    unit: "",
    width: "",
    size: "",
  });

  const stocksForTable = useMemo(() => {
    return products.flatMap((product) => {
      const priceObj = getDisplayedPrice(product);

      if (!product.stocks.length) {
        return {
          id: `${product.width}${productModelId}${
            //@ts-ignore
            PRODUCT_LEG_TYPES[product.unit]
          }${product.size}`,
          productFunction: productFunctions.map((f) => f.name).join(", "),
          modelId: productModelId,
          unit: product.unit,
          width: product.width,
          size: product.size,
          stock: 0,
          price: priceObj?.price ?? 0,
          currency: priceObj?.currency ?? "",
          status: "No Stock",
          batch: "N/A",
        };
      }

      return product.stocks.map((stock) => ({
        id: stock.stockId,
        productFunction: productFunctions.map((f) => f.name).join(", "),
        modelId: productModelId,
        unit: product.unit,
        width: product.width,
        size: product.size,
        stock: stock.stockQuantity,
        price: priceObj?.price ?? 0,
        currency: priceObj?.currency ?? "",
        status: getStockStatus(stock.stockQuantity),
        batch: stock.batch,
      }));
    });
  }, [products, productFunctions, productModelId]);

  const units = useMemo(
    () => Array.from(new Set(stocksForTable.map((s) => s.unit))),
    [stocksForTable]
  );
  const widths = useMemo(
    () => Array.from(new Set(stocksForTable.map((s) => s.width))),
    [stocksForTable]
  );

  const filteredStocks = useMemo(() => {
    return stocksForTable
      .filter((item) => {
        const { unit, width, size } = filters;
        return (
          (!unit || item.unit === unit) &&
          (!width || item.width === width) &&
          (!size || item.size?.toLowerCase().includes(size.toLowerCase()))
        );
      })
      .sort((a, b) => a.id.localeCompare(b.id));
  }, [stocksForTable, filters]);

  const isFilterApplied = Boolean(filters.unit || filters.width);

  if (!products.length) return null;

  return (
    <Dialog
      open={isModalOpen === "stock"}
      onOpenChange={() => setModalOpen(null)}
    >
      <DialogContent className="max-w-7xl w-full sm:max-w-6xl md:max-w-7xl p-0 rounded">
        <div className="flex h-[600px] bg-white dark:bg-black text-black dark:text-white rounded">
          <div className="flex-1 p-4 overflow-auto border-r border-gray-200 dark:border-gray-700">
            <div className="flex justify-between">
              <div className="flex gap-4 mb-4">
                <Select
                  onValueChange={(value: any) =>
                    setFilters((f) => ({ ...f, unit: value }))
                  }
                  value={filters.unit}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by Unit" />
                  </SelectTrigger>
                  <SelectContent>
                    {units.map((unit) => (
                      <SelectItem key={unit} value={unit}>
                        {unit}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  onValueChange={(value: any) =>
                    setFilters((f) => ({ ...f, width: value }))
                  }
                  value={filters.width}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by Width" />
                  </SelectTrigger>
                  <SelectContent>
                    {widths.map((width) => (
                      <SelectItem key={width} value={width}>
                        {width}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Input
                  type="text"
                  placeholder="Filter by Size"
                  value={filters.size}
                  onChange={(e) =>
                    setFilters((f) => ({ ...f, size: e.target.value }))
                  }
                  className="w-[120px]"
                />
              </div>

              {isFilterApplied && (
                <div className="flex gap-2 mb-4 mr-10 flex-wrap">
                  {filters.unit && (
                    <Badge
                      className="flex items-center gap-2 px-2 py-1 bg-blue-100 text-black dark:bg-blue-400 dark:text-white cursor-pointer"
                      onClick={() => setFilters((f) => ({ ...f, unit: "" }))}
                    >
                      <span className="font-bold">Unit:</span>
                      <span>{filters.unit}</span>
                    </Badge>
                  )}
                  {filters.width && (
                    <Badge
                      className="flex items-center gap-2 px-2 py-1 bg-blue-100 text-black dark:bg-blue-400 dark:text-white cursor-pointer"
                      onClick={() => setFilters((f) => ({ ...f, width: "" }))}
                    >
                      <span className="font-bold">Width:</span>
                      <span>{filters.width}</span>
                    </Badge>
                  )}
                  <Badge
                    onClick={() =>
                      setFilters({ unit: "", width: "", size: "" })
                    }
                    className="flex items-center gap-2 px-2 py-1 bg-red-400 text-white cursor-pointer"
                  >
                    Clear All
                  </Badge>
                </div>
              )}
            </div>

            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left p-2">Artikelnummer</th>
                  <th className="text-left p-2">Funktion</th>
                  <th className="text-left p-2">Modell ID</th>
                  <th className="text-left p-2">Seite</th>
                  <th className="text-left p-2">Größe</th>
                  <th className="text-left p-2">Preis</th>
                  <th className="text-left p-2">Charge</th>
                  <th className="text-left p-2">Status</th>
                  <th className="text-left p-2">Bestand</th>
                </tr>
              </thead>
              <tbody>
                {filteredStocks.map((item) => (
                  <tr
                    key={`${item.id}-${item.batch}`}
                    className="border-b border-gray-200 dark:border-gray-700"
                  >
                    <td className="p-2">{item.id}</td>
                    <td className="p-2">{item.productFunction}</td>
                    <td className="p-2">
                      <Badge variant="secondary">{item.modelId}</Badge>
                    </td>
                    <td className="p-2">{item.unit}</td>
                    <td className="p-2">{item.size}</td>
                    <td className="p-2">
                      {item.price} {item.currency}
                    </td>
                    <td className="p-2">{item.batch}</td>
                    <td className="p-2">
                      {item.status === "In Stock" && (
                        <Badge className="bg-green-100 text-green-700 dark:bg-green-400 dark:text-white">
                          In Stock
                        </Badge>
                      )}
                      {item.status === "Low Stock" && (
                        <Badge className="bg-yellow-100 text-yellow-700 dark:bg-orange-400 dark:text-white">
                          Low Stock
                        </Badge>
                      )}
                      {item.status === "No Stock" && (
                        <Badge className="bg-red-100 text-red-700 dark:bg-red-400 dark:text-white">
                          No Stock
                        </Badge>
                      )}
                    </td>
                    <td className="p-2">{item.stock}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
