import { SidebarWrapper } from "@/components/Sidebar/sidebar-wrapper";
import { Separator } from "@/shared/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/shared/sidebar";
import { Outlet } from "react-router-dom";
import { Breadcrumbs } from "@/layouts/partials/Breadcrumbs";
import { ThemeToggle } from "@/components/Theme/ThemeToggle";

export const ApplicationLayout = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-svh">
      <SidebarProvider>
        <SidebarWrapper />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4 w-full">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <div className="flex w-full justify-between items-center">
                <Breadcrumbs />
                <ThemeToggle />
              </div>
            </div>
          </header>
          <Outlet />
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};
