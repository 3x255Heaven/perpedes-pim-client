import { Badge } from "@/shared/badge";
import { Card } from "@/shared/card";
import { Dialog, DialogContent } from "@/shared/dialog";

interface Stock {
  id: number;
  stockQuantity: number;
  blockedStockQuantity: number;
  batch: string;
  stockId: string;
}

interface Price {
  id: number;
  price: number;
  priceList: string;
  currency: string;
  unit: string;
}

interface ProductType {
  id: number;
  size: string;
  width: string;
  unit: string;
  productId: number;
  stocks: Stock[];
  prices: Price[];
}

interface StockModalProps {
  isModalOpen: "info" | "stock" | null;
  setModalOpen: (type: "info" | "stock" | null) => void;
  products: ProductType[];
}

export const StockModal = ({
  isModalOpen,
  setModalOpen,
  products,
}: StockModalProps) => {
  if (!products || products.length === 0) return null;

  // Flatten all stocks from all products into one array for the table
  // Map each stock with its product info
  const stocksForTable = products.flatMap((product) =>
    product.stocks.map((stock) => {
      // Pick EUR price for this product if any
      const eurPriceObj = product.prices.find((p) => p.currency === "EUR");
      const displayedPrice = eurPriceObj
        ? eurPriceObj.price
        : product.prices[0]?.price;

      return {
        id: stock.stockId,
        productId: product.productId,
        material: product.width,
        unit: product.unit,
        size: product.size,
        stock: stock.stockQuantity,
        price: displayedPrice,
        currency: eurPriceObj?.currency || product.prices[0]?.currency,
        status: stock.stockQuantity > 5 ? "In Stock" : "Low Stock",
        batch: stock.batch,
      };
    })
  );

  // Total stock sum across all products
  const totalStock = products.reduce(
    (acc, product) =>
      acc +
      product.stocks.reduce(
        (stockAcc, stock) => stockAcc + stock.stockQuantity,
        0
      ),
    0
  );

  return (
    <Dialog
      open={isModalOpen === "stock"}
      onOpenChange={() => setModalOpen(null)}
    >
      <DialogContent className="max-w-6xl w-full sm:max-w-5xl md:max-w-6xl p-0">
        <div className="flex h-[600px] bg-black">
          {/* Stocks Table */}
          <div className="flex-1 p-4 overflow-auto border-r">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left p-2">Material ID</th>
                  <th className="text-left p-2">Product ID</th>
                  <th className="text-left p-2">Material</th>
                  <th className="text-left p-2">Unit</th>
                  <th className="text-left p-2">Size</th>
                  <th className="text-left p-2">Stock</th>
                  <th className="text-left p-2">Price</th>
                  <th className="text-left p-2">Status</th>
                  <th className="text-left p-2">Batch</th>
                </tr>
              </thead>
              <tbody>
                {stocksForTable.map((item) => (
                  <tr key={`${item.id}-${item.batch}`} className="border-b">
                    <td className="p-2">{item.id}</td>
                    <td className="p-2">{item.productId}</td>
                    <td className="p-2">
                      <Badge variant="secondary">{item.material}</Badge>
                    </td>
                    <td className="p-2">{item.unit}</td>
                    <td className="p-2">{item.size}</td>
                    <td className="p-2">{item.stock}</td>
                    <td className="p-2">
                      {item.price} {item.currency}
                    </td>
                    <td className="p-2">
                      {item.status === "In Stock" && (
                        <Badge className="bg-green-100 text-green-700">
                          In Stock
                        </Badge>
                      )}
                      {item.status === "Low Stock" && (
                        <Badge className="bg-yellow-100 text-yellow-700">
                          Low Stock
                        </Badge>
                      )}
                    </td>
                    <td className="p-2">{item.batch}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Right panel - Summary for all products */}
          <div className="w-[400px] p-4 overflow-auto">
            <h2 className="text-lg font-semibold mb-2">Stock Summary</h2>
            <p className="text-sm text-gray-500 mb-4">
              Showing stock details for {products.length} products
            </p>

            <Card className="p-3 text-center mb-4">
              <p className="font-bold text-lg">{totalStock}</p>
              <p className="text-xs text-gray-500">
                Total {products[0]?.unit.toLowerCase()}s in Stock
              </p>
            </Card>

            <h3 className="font-medium mb-2">Stock Status</h3>
            <Badge
              className={`mb-2 ${
                totalStock > 5
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {totalStock > 5 ? "In Stock" : "Low Stock"}
            </Badge>

            {/* Optional: List products specs summary */}
            <h3 className="font-medium mt-6 mb-2">Products Specifications</h3>
            <ul className="text-sm text-gray-600 space-y-1 max-h-60 overflow-auto">
              {products.map((product) => (
                <li key={product.id}>
                  <strong>Product ID:</strong> {product.productId} |{" "}
                  <strong>Size:</strong> {product.size} |{" "}
                  <strong>Material:</strong> {product.width} |{" "}
                  <strong>Unit:</strong> {product.unit.toLowerCase()}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
