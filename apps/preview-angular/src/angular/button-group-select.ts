import { Component } from "@angular/core"

import { Button } from "@/angular-ui/button"
import { ButtonGroup } from "@/angular-ui/button-group"
import { Input } from "@/angular-ui/input"

interface Currency {
  label: string
  value: string
}

const CURRENCIES: Currency[] = [
  { label: "US Dollar", value: "$" },
  { label: "Euro", value: "€" },
  { label: "British Pound", value: "£" },
]

// TODO(port): swap the native <select> fallback for uiSelect once the select
// component is ported (Wave 2) — this demo mirrors button-group-select.tsx.
@Component({
  selector: "preview-button-group-select",
  standalone: true,
  imports: [Button, ButtonGroup, Input],
  template: `
    <div uiButtonGroup>
      <div uiButtonGroup>
        <select class="border-input h-9 w-fit rounded-md border bg-transparent px-3 py-2 font-mono text-sm shadow-xs outline-none">
          @for (item of currencies; track item.value) {
            <option [value]="item.value">{{ item.value }}</option>
          }
        </select>
        <input uiInput placeholder="10.00" pattern="[0-9]*" />
      </div>
      <div uiButtonGroup>
        <button uiButton aria-label="Send" size="icon" variant="outline">
          <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
            <path d="M400-280v-400l200 200-200 200Z"/>
          </svg>
        </button>
      </div>
    </div>
  `,
})
export class ButtonGroupSelectComponent {
  readonly currencies = CURRENCIES
}

export default ButtonGroupSelectComponent
