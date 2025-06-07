import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@/components/Theme/ThemeProvider";
import { ApplicationLayout } from "@/layouts/ApplicationLayout";
import { NotFound } from "@/components/NotFound/NotFound";
import { ManageProducts } from "@/pages/products/ManageProducts/ManageProducts";
import { Products } from "@/pages/products/Products/Products";
import { Product } from "@/pages/products/Product/Product";
import { Orders } from "@/pages/orders/Orders";
import { Customers } from "@/pages/customers/Customers";
import { CreateOrders } from "@/pages/orders/CreateOrder";
import { Employees } from "@/pages/employees/Employees";
import { AddEmployee } from "@/pages/employees/AddEmployee";
import { SalesOverview } from "@/pages/dashboard/SalesOverview";
import { CustomerOverview } from "@/pages/dashboard/CustomerOverview";
import { PerformingProducts } from "@/pages/sales/PerformingProducts";
import { UnderPerformingProducts } from "@/pages/sales/UnderperformingProducts";

import "./index.css";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <ApplicationLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Products /> },
      { path: "add-product", element: <ManageProducts /> },
      { path: "products/:id", element: <Product /> },
      { path: "products", element: <Products /> },
      { path: "orders", element: <Orders /> },
      { path: "create-order", element: <CreateOrders /> },
      { path: "customers", element: <Customers /> },
      { path: "employees", element: <Employees /> },
      { path: "add-employee", element: <AddEmployee /> },
      { path: "analytics-sales", element: <SalesOverview /> },
      { path: "analytics-customers", element: <CustomerOverview /> },
      {
        path: "analytics-performing-products",
        element: <PerformingProducts />,
      },
      {
        path: "analytics-underperforming-products",
        element: <UnderPerformingProducts />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
