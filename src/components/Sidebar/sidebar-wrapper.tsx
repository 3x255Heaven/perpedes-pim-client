"use client";

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
} from "@/components/shared/sidebar";

import { user } from "@/constants/mock";
import {
  analyticsNavigationItems,
  platformNavigationItems,
} from "@/constants/navigation";
import { applications } from "@/constants/applications";

export function SidebarWrapper({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
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
        <SidebarUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
