import { Checkbox } from "@/angular-ui/checkbox"
import { Field, FieldGroup, FieldLabel } from "@/angular-ui/field"
import { Component } from "@angular/core"

@Component({
  selector: "preview-checkbox-rtl",
  standalone: true,
  imports: [Checkbox, Field, FieldGroup, FieldLabel],
  template: ` <div dir="rtl">
    <div uiFieldGroup class="mx-auto w-56">
      <div uiField orientation="horizontal">
        <button uiCheckbox id="terms-checkbox-rtl"></button>
        <label uiFieldLabel for="terms-checkbox-rtl">
          أوافق على الشروط والأحكام
        </label>
      </div>
    </div>
  </div>`,
})
export class CheckboxRtlComponent {}

export default CheckboxRtlComponent
