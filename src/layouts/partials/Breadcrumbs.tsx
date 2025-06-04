import { breadcrumbs } from "@/constants/breadcrumbs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shared/breadcrumb";
import { useLocation } from "react-router-dom";

export const Breadcrumbs = () => {
  const location = useLocation();

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink href="#">
            {breadcrumbs[location.pathname as keyof typeof breadcrumbs]
              ? breadcrumbs[location.pathname as keyof typeof breadcrumbs].base
              : "Products"}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="hidden md:block" />
        <BreadcrumbItem>
          <BreadcrumbPage className="font-bold uppercase">
            {breadcrumbs[location.pathname as keyof typeof breadcrumbs]
              ? breadcrumbs[location.pathname as keyof typeof breadcrumbs].label
              : "Product Details"}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
