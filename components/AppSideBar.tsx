import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { appMenuItems } from "@/components/layout/Header/app/AppHeader";
import { NavSideBarLink } from "@/components/layout/Header/NavSideBarLink";

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {appMenuItems.map(({ href, label, icon: Icon, exact }) => (
                <NavSideBarLink key={label} href={href} label={label} icon={Icon} exact={exact} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
