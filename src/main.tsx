import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ApplicationLayout from "@/layouts/ApplicationLayout";
import { AddProducts } from "@/pages/products/AddProducts.tsx";
import { Products } from "@/pages/products/Products.tsx";
import { Product } from "@/pages/products/Product.tsx";
import "./index.css";
import { ThemeProvider } from "./components/Theme/ThemeProvider";
import { NotFound } from "./components/NotFound/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ApplicationLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <AddProducts /> },
      { path: "add-product", element: <AddProducts /> },
      { path: "products", element: <Products /> },
      { path: "product", element: <Product /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);
