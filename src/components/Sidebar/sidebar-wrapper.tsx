import * as React from "react";

import { SidebarNavigation } from "@/components/Sidebar/sidebar-navigation";
import { SidebarUser } from "@/components/Sidebar/sidebar-user";
import { SidebarApplicationSwitcher } from "@/components/Sidebar/sidebar-application-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/shared/sidebar";

import {
  analyticsNavigationItems,
  platformNavigationItems,
} from "@/constants/navigation";
import { applications } from "@/constants/applications";
import { useUserQuery } from "@/hooks/useUser";

export function SidebarWrapper({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const userQuery = useUserQuery();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarApplicationSwitcher applications={applications} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarNavigation title="Platform" items={platformNavigationItems} />
        <SidebarNavigation title="Analytics" items={analyticsNavigationItems} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarUser user={userQuery.data} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
