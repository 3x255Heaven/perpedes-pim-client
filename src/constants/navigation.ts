import {
  PersonStanding,
  ClipboardList,
  ShoppingCart,
  PackageSearch,
  ChartColumn,
  ChartNoAxesCombined,
} from "lucide-react";

export const platformNavigationItems = [
  {
    title: "Products",
    url: "/",
    icon: PackageSearch,
    isActive: true,
    items: [
      {
        title: "View All Products",
        url: "/products",
      },
      {
        title: "Add New Product",
        url: "/add-product",
      },
    ],
  },
  {
    title: "Orders",
    url: "/",
    icon: ClipboardList,
    isActive: true,
    items: [
      {
        title: "View All Orders",
        url: "/orders",
      },
      {
        title: "Create New Order",
        url: "/create-order",
      },
    ],
  },
  {
    title: "Customers",
    url: "/",
    icon: ShoppingCart,
    isActive: true,
    items: [
      {
        title: "View All Customers",
        url: "/customers",
      },
    ],
  },
  {
    title: "Employees",
    url: "/",
    icon: PersonStanding,
    isActive: true,
    items: [
      {
        title: "View All Employees",
        url: "/employees",
      },
      {
        title: "Add New Employee",
        url: "/add-employee",
      },
    ],
  },
];

export const analyticsNavigationItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: ChartColumn,
    isActive: true,
    items: [
      {
        title: "Sales Overview",
        url: "/analytics-sales",
      },
      {
        title: "Customer Overview",
        url: "/analytics-customers",
      },
    ],
  },
  {
    title: "Sales Reports",
    url: "/",
    icon: ChartNoAxesCombined,
    isActive: true,
    items: [
      {
        title: "Top-Performing Products",
        url: "/analytics-performing-products",
      },
      {
        title: "Underperforming Products",
        url: "/analytics-underperforming-products",
      },
    ],
  },
];
