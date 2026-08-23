import { Button } from "@/angular-ui/button"
import { Card, CardContent, CardHeader } from "@/angular-ui/card"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/angular-ui/collapsible"
import { Tabs, TabsList, TabsTrigger } from "@/angular-ui/tabs"
import { Component } from "@angular/core"

@Component({
  selector: "preview-collapsible-file-tree",
  standalone: true,
  imports: [Button, Card, CardHeader, CardContent, Collapsible, CollapsibleTrigger, CollapsibleContent, Tabs, TabsList, TabsTrigger],
  template: `
    <div uiCard class="mx-auto w-full max-w-xs gap-2">
      <div uiCardHeader>
        <div uiTabs defaultValue="explorer">
          <div uiTabsList class="w-full">
            <button uiTabsTrigger value="explorer">Explorer</button>
            <button uiTabsTrigger value="settings">Outline</button>
          </div>
        </div>
      </div>
      <div uiCardContent>
        <div class="flex flex-col gap-1">
          <div uiCollapsible>
            <button
              uiCollapsibleTrigger
              class="group inline-flex w-full items-center justify-start gap-2 rounded-md px-2 py-1 text-sm font-medium transition-none hover:bg-accent hover:text-accent-foreground [&_svg]:fill-current [&_svg]:size-4"
            >
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                class="transition-transform group-data-open:rotate-90"
              >
                <path d="m488-432 140-140q11-11 11-28t-11-28q-11-11-28-11t-28 11L432-568v-96q0-17-11.5-28.5T392-704q-17 0-28.5 11.5T352-664v192q0 17 11.5 28.5T392-432h192q17 0 28.5-11.5T624-472q0-17-11.5-28.5T584-512h-96Z" />
              </svg>
              <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h207q16 0 30.5 6t25.5 17l57 57h320q33 0 56.5 23.5T880-640v400q0 33-23.5 56.5T800-160H160Z" />
              </svg>
              components
            </button>
            <div uiCollapsibleContent class="mt-1 ml-5">
              <div class="flex flex-col gap-1">
                <button uiButton variant="link" size="sm" class="w-full justify-start gap-2 text-foreground [&_svg]:fill-current [&_svg]:size-4">
                  <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M320-240h320v-80H320v80Zm0-160h320v-80H320v80ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520Z" /></svg>
                  <span>button.tsx</span>
                </button>
                <button uiButton variant="link" size="sm" class="w-full justify-start gap-2 text-foreground [&_svg]:fill-current [&_svg]:size-4">
                  <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M320-240h320v-80H320v80Zm0-160h320v-80H320v80ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520Z" /></svg>
                  <span>card.tsx</span>
                </button>
                <button uiButton variant="link" size="sm" class="w-full justify-start gap-2 text-foreground [&_svg]:fill-current [&_svg]:size-4">
                  <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M320-240h320v-80H320v80Zm0-160h320v-80H320v80ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520Z" /></svg>
                  <span>input.tsx</span>
                </button>
              </div>
            </div>
          </div>
          <div uiCollapsible defaultOpen>
            <button
              uiCollapsibleTrigger
              class="group inline-flex w-full items-center justify-start gap-2 rounded-md px-2 py-1 text-sm font-medium transition-none hover:bg-accent hover:text-accent-foreground [&_svg]:fill-current [&_svg]:size-4"
            >
              <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class="transition-transform group-data-open:rotate-90">
                <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h207q16 0 30.5 6t25.5 17l57 57h320q33 0 56.5 23.5T880-640v400q0 33-23.5 56.5T800-160H160Z" />
              </svg>
              lib
            </button>
            <div uiCollapsibleContent class="mt-1 ml-5">
              <div class="flex flex-col gap-1">
                <button uiButton variant="link" size="sm" class="w-full justify-start gap-2 text-foreground [&_svg]:fill-current [&_svg]:size-4">
                  <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M320-240h320v-80H320v80Zm0-160h320v-80H320v80ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520Z" /></svg>
                  <span>utils.ts</span>
                </button>
                <button uiButton variant="link" size="sm" class="w-full justify-start gap-2 text-foreground [&_svg]:fill-current [&_svg]:size-4">
                  <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M320-240h320v-80H320v80Zm0-160h320v-80H320v80ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520Z" /></svg>
                  <span>cn.ts</span>
                </button>
              </div>
            </div>
          </div>
          <button uiButton variant="link" size="sm" class="w-full justify-start gap-2 text-foreground [&_svg]:fill-current [&_svg]:size-4">
            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M320-240h320v-80H320v80Zm0-160h320v-80H320v80ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520Z" /></svg>
            <span>app.tsx</span>
          </button>
          <button uiButton variant="link" size="sm" class="w-full justify-start gap-2 text-foreground [&_svg]:fill-current [&_svg]:size-4">
            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M320-240h320v-80H320v80Zm0-160h320v-80H320v80ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520Z" /></svg>
            <span>package.json</span>
          </button>
        </div>
      </div>
    </div>
  `,
})
export class CollapsibleFileTreeComponent {}

export default CollapsibleFileTreeComponent
