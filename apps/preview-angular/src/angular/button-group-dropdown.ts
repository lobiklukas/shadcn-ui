import { Component } from "@angular/core"

import { Button } from "@/angular-ui/button"
import { ButtonGroup } from "@/angular-ui/button-group"

// TODO(port): DropdownMenu is not ported yet (Wave 2) — its trigger is
// rendered as a static icon button and the popup menu is omitted.
@Component({
  selector: "preview-button-group-dropdown",
  standalone: true,
  imports: [Button, ButtonGroup],
  template: `
    <div uiButtonGroup>
      <button uiButton variant="outline">Follow</button>
      <!-- TODO(port): swap for uiDropdownMenu once Wave 2 lands -->
      <button uiButton variant="outline" class="pl-2!" aria-label="Conversation options">
        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
          <path d="M480-344 240-584l43-43 197 197 197-197 43 43-240 240Z"/>
        </svg>
      </button>
    </div>
  `,
})
export class ButtonGroupDropdownComponent {}

export default ButtonGroupDropdownComponent
