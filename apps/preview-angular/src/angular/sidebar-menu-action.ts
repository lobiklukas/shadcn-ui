import { Component } from "@angular/core"

import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRoot,
  DropdownMenuTrigger,
} from "@/angular-ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarGroupContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenu,
  SidebarMenuItem,
  SidebarProvider,
} from "@/angular-ui/sidebar"

// apps/v4/examples/base/sidebar-menu-action.tsx
const svg = (d: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" aria-hidden="true"><path d="${d}"/></svg>`

const FRAME = svg("M120-120v-320h80v240h240v80H120Zm400 0v-80h240v-240h80v320H520ZM120-520v-320h320v80H200v240h-80Zm640 0v-240H520v-80h320v320h-80Z")
const PIE_CHART = svg("M440-80q-75 0-140.5-28.5t-114-77q-48.5-48.5-77-114T80-440h360v360Zm80 0v-360h360q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T520-80ZM80-520q0-75 28.5-140.5t77-114q48.5-48.5 114-77T440-880v360H80Zm440 0v-360q75 0 140.5 28.5t114 77q48.5 48.5 77 114T880-520H520Z")
const MAP = svg("m600-120-240-84-186 72q-20 8-37-4.5T120-170v-560q0-13 7.5-23t20.5-15l192-64 240 84 186-72q20-8 37 4.5t17 32.5v560q0 13-7.5 23T792-184l-192 64Zm-20-98v-468l-200-68v468l200 68Z")
const MORE_HORIZONTAL = svg("M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z")

@Component({
  selector: "preview-sidebar-menu-action",
  standalone: true,
  imports: [
    DropdownMenuRoot, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem,
    SidebarProvider, Sidebar, SidebarContent,
    SidebarGroup, SidebarGroupLabel, SidebarGroupContent,
    SidebarMenu, SidebarMenuItem, SidebarMenuButton,
    SidebarMenuAction,
  ],
  template: `
    <div class="flex h-[300px] w-full overflow-hidden rounded-lg border border-border">
      <div uiSidebarProvider class="w-full">
        <nav uiSidebar>
          <div uiSidebarContent>
            <div uiSidebarGroup>
              <div uiSidebarGroupLabel>Projects</div>
              <div uiSidebarGroupContent>
                <ul uiSidebarMenu>
                  @for (project of projects; track project.name) {
                    <li uiSidebarMenuItem>
                      <a
                        uiSidebarMenuButton
                        [href]="project.url"
                        class="group-has-[[data-state=open]]/menu-item:bg-sidebar-accent"
                      >
                        <span [innerHTML]="project.icon"></span>
                        <span>{{ project.name }}</span>
                      </a>
                      <div uiDropdownMenuRoot>
                        <button uiDropdownMenuTrigger uiSidebarMenuAction>
                          <span [innerHTML]="MORE_HORIZONTAL"></span>
                          <span class="sr-only">More</span>
                        </button>
                        <div uiDropdownMenuContent>
                          <button uiDropdownMenuItem><span>Edit Project</span></button>
                          <button uiDropdownMenuItem><span>Delete Project</span></button>
                        </div>
                      </div>
                    </li>
                  }
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  `,
})
export default class SidebarMenuActionDemoComponent {
  protected readonly projects = [
    { name: "Design Engineering", url: "#", icon: FRAME },
    { name: "Sales & Marketing", url: "#", icon: PIE_CHART },
    { name: "Travel", url: "#", icon: MAP },
  ]
  protected readonly MORE_HORIZONTAL = MORE_HORIZONTAL
}
