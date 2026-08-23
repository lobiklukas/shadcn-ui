import { Component } from "@angular/core"
import { Tabs, TabsList, TabsTrigger } from "@/angular-ui/tabs"

@Component({
  selector: "preview-tabs-rtl",
  standalone: true,
  imports: [Tabs, TabsList, TabsTrigger],
  template: ` <div uiTabs defaultValue="home" dir="rtl">
    <div uiTabsList>
      <button uiTabsTrigger value="home">الرئيسية</button>
      <button uiTabsTrigger value="settings">الإعدادات</button>
    </div>
  </div>`,
})
export class TabsRtlComponent {}

export default TabsRtlComponent
