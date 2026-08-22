import { Component } from "@angular/core"

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/angular-ui/breadcrumb"
import { Button } from "@/angular-ui/button"

// React example composes a DropdownMenu around the ellipsis trigger. Angular's
// dropdown-menu port is pending, so the trigger renders as the ghost icon
// button without popup content.
@Component({
  selector: "preview-breadcrumb-demo",
  standalone: true,
  imports: [
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
    BreadcrumbPage,
    BreadcrumbEllipsis,
    Button,
  ],
  template: `<nav uiBreadcrumb>
    <ol uiBreadcrumbList>
      <li uiBreadcrumbItem>
        <a uiBreadcrumbLink href="#">Home</a>
      </li>
      <li uiBreadcrumbSeparator></li>
      <li uiBreadcrumbItem>
        <!-- DropdownMenu composition pending angular dropdown-menu port -->
        <button uiButton variant="ghost" size="icon-sm">
          <span uiBreadcrumbEllipsis></span>
          <span class="sr-only">Toggle menu</span>
        </button>
      </li>
      <li uiBreadcrumbSeparator></li>
      <li uiBreadcrumbItem>
        <a uiBreadcrumbLink href="#">Components</a>
      </li>
      <li uiBreadcrumbSeparator></li>
      <li uiBreadcrumbItem>
        <span uiBreadcrumbPage>Breadcrumb</span>
      </li>
    </ol>
  </nav>`,
})
export class BreadcrumbDemoComponent {}

export default BreadcrumbDemoComponent
