import {
  PersonStanding,
  ClipboardList,
  ShoppingCart,
  PackageSearch,
  ChartColumn,
  ChartNoAxesCombined,
  CircleUser,
} from "lucide-react";

export const platformNavigationItems = [
  {
    title: "Products",
    url: "#",
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
    url: "#",
    icon: ClipboardList,
    items: [
      {
        title: "View All Orders",
        url: "#",
      },
      {
        title: "Create New Order",
        url: "#",
      },
    ],
  },
  {
    title: "Customers",
    url: "#",
    icon: ShoppingCart,
    items: [
      {
        title: "View All Customers",
        url: "#",
      },
    ],
  },
  {
    title: "Employees",
    url: "#",
    icon: PersonStanding,
    items: [
      {
        title: "View All Employees",
        url: "#",
      },
      {
        title: "Add New Employee",
        url: "#",
      },
    ],
  },
];

export const analyticsNavigationItems = [
  {
    title: "Dashboard",
    url: "#",
    icon: ChartColumn,
    isActive: true,
    items: [
      {
        title: "Sales Overview",
        url: "#",
      },
      {
        title: "Customer Overview",
        url: "#",
      },
      {
        title: "Stock & Inventory Insights",
        url: "#",
      },
    ],
  },
  {
    title: "Sales Reports",
    url: "#",
    icon: ChartNoAxesCombined,
    items: [
      {
        title: "Top-Performing Products",
        url: "#",
      },
      {
        title: "Underperforming Products",
        url: "#",
      },
    ],
  },
  {
    title: "Customer Insights",
    url: "#",
    icon: CircleUser,
    items: [
      {
        title: "Customer Demographics",
        url: "#",
      },
      {
        title: "Loyalty & Retention",
        url: "#",
      },
      {
        title: "Feedback & Reviews",
        url: "#",
      },
    ],
  },
];
