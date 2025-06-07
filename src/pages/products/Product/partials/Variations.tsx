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

export const Variations = ({ variations }: { variations: any }) => {
  return (
    <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min mt-6 p-4">
      <span className="font-bold text-2xl">Variations</span>

      <Accordion
        type="single"
        collapsible
        className="w-full mt-4"
        defaultValue="item-1"
      >
        {variations.map((variation: any, index: number) => {
          return (
            <AccordionItem key={index} value={`item-${index + 1}`}>
              <AccordionTrigger className="text-[#9bc79b]">
                {variation.id} / {variation.size} / {variation.width}
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                <div className="bg-accent rounded p-4">
                  <span className="font-bold text-2xl">
                    General Information
                  </span>
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
                      <TableRow key={variation.id}>
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
                      {variation.stocks.map((stock: any) => {
                        return (
                          <TableRow key={stock.id}>
                            <TableCell>{stock.stockId}</TableCell>
                            <TableCell>{stock.stockQuantity}</TableCell>
                            <TableCell>{stock.blockedStockQuantity}</TableCell>
                            <TableCell>{stock.batch}</TableCell>
                          </TableRow>
                        );
                      })}
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
                      {variation.prices.map((price: any) => {
                        return (
                          <TableRow key={price.id}>
                            <TableCell>{price.price}</TableCell>
                            <TableCell>{price.priceList}</TableCell>
                            <TableCell>{price.currency}</TableCell>
                            <TableCell>{price.unit}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};
