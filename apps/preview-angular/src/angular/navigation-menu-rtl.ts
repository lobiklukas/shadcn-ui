import { Component } from "@angular/core"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuContentAnchor,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/angular-ui/navigation-menu"

// apps/v4/examples/base/navigation-menu-rtl.tsx — the React example drives
// dir/labels from the language-selector translations (ar). Static Arabic
// labels + dir="rtl" render the same visual state (same convention as
// dropdown-menu-rtl.ts).
@Component({
  selector: "preview-navigation-menu-rtl",
  standalone: true,
  imports: [
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuTrigger,
    NavigationMenuContentAnchor,
    NavigationMenuContent,
    NavigationMenuLink,
    NavigationMenuViewport,
  ],
  template: `<div uiNavigationMenu dir="rtl">
  <ul uiNavigationMenuList>
    <li uiNavigationMenuItem value="getting-started">
      <button uiNavigationMenuTrigger>البدء</button>
      <ng-template uiNavigationMenuContent>
        <div uiNavigationMenuContent>
          <ul class="w-96">
            <li>
              <a uiNavigationMenuLink href="/docs">
                <div class="flex flex-col gap-1 text-sm">
                  <div class="leading-none font-medium">مقدمة</div>
                  <div class="line-clamp-2 text-muted-foreground">مكونات قابلة لإعادة الاستخدام مبنية باستخدام Tailwind CSS.</div>
                </div>
              </a>
            </li>
            <li>
              <a uiNavigationMenuLink href="/docs/installation">
                <div class="flex flex-col gap-1 text-sm">
                  <div class="leading-none font-medium">التثبيت</div>
                  <div class="line-clamp-2 text-muted-foreground">كيفية تثبيت التبعيات وتنظيم تطبيقك.</div>
                </div>
              </a>
            </li>
            <li>
              <a uiNavigationMenuLink href="/docs/primitives/typography">
                <div class="flex flex-col gap-1 text-sm">
                  <div class="leading-none font-medium">الطباعة</div>
                  <div class="line-clamp-2 text-muted-foreground">أنماط للعناوين والفقرات والقوائم...إلخ</div>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </ng-template>
    </li>

    <li uiNavigationMenuItem value="components" class="hidden md:flex">
      <button uiNavigationMenuTrigger>المكونات</button>
      <ng-template uiNavigationMenuContent>
        <div uiNavigationMenuContent>
          <ul class="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
            <li>
              <a uiNavigationMenuLink href="/docs/primitives/alert-dialog">
                <div class="flex flex-col gap-1 text-sm">
                  <div class="leading-none font-medium">حوار التنبيه</div>
                  <div class="line-clamp-2 text-muted-foreground">حوار نافذة يقطع المستخدم بمحتوى مهم ويتوقع استجابة.</div>
                </div>
              </a>
            </li>
            <li>
              <a uiNavigationMenuLink href="/docs/primitives/hover-card">
                <div class="flex flex-col gap-1 text-sm">
                  <div class="leading-none font-medium">بطاقة التحويم</div>
                  <div class="line-clamp-2 text-muted-foreground">للمستخدمين المبصرين لمعاينة المحتوى المتاح خلف الرابط.</div>
                </div>
              </a>
            </li>
            <li>
              <a uiNavigationMenuLink href="/docs/primitives/progress">
                <div class="flex flex-col gap-1 text-sm">
                  <div class="leading-none font-medium">التقدم</div>
                  <div class="line-clamp-2 text-muted-foreground">يعرض مؤشرًا يوضح تقدم إتمام المهمة، عادةً يتم عرضه كشريط تقدم.</div>
                </div>
              </a>
            </li>
            <li>
              <a uiNavigationMenuLink href="/docs/primitives/scroll-area">
                <div class="flex flex-col gap-1 text-sm">
                  <div class="leading-none font-medium">منطقة التمرير</div>
                  <div class="line-clamp-2 text-muted-foreground">يفصل المحتوى بصريًا أو دلاليًا.</div>
                </div>
              </a>
            </li>
            <li>
              <a uiNavigationMenuLink href="/docs/primitives/tabs">
                <div class="flex flex-col gap-1 text-sm">
                  <div class="leading-none font-medium">التبويبات</div>
                  <div class="line-clamp-2 text-muted-foreground">مجموعة من أقسام المحتوى المتعددة الطبقات—المعروفة بألواح التبويب—التي يتم عرضها واحدة في كل مرة.</div>
                </div>
              </a>
            </li>
            <li>
              <a uiNavigationMenuLink href="/docs/primitives/tooltip">
                <div class="flex flex-col gap-1 text-sm">
                  <div class="leading-none font-medium">تلميح</div>
                  <div class="line-clamp-2 text-muted-foreground">نافذة منبثقة تعرض معلومات متعلقة بعنصر عندما يتلقى العنصر التركيز على لوحة المفاتيح أو عند تحويم الماوس فوقه.</div>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </ng-template>
    </li>

    <li uiNavigationMenuItem value="with-icon">
      <button uiNavigationMenuTrigger>مع أيقونة</button>
      <ng-template uiNavigationMenuContent>
        <div uiNavigationMenuContent>
          <ul class="grid w-[200px]">
            <li>
              <a uiNavigationMenuLink href="#">قائمة الانتظار</a>
              <a uiNavigationMenuLink href="#">المهام</a>
              <a uiNavigationMenuLink href="#">منجز</a>
            </li>
          </ul>
        </div>
      </ng-template>
    </li>

    <li uiNavigationMenuItem value="docs">
      <a uiNavigationMenuLink href="/docs">الوثائق</a>
    </li>
  </ul>
  <div uiNavigationMenuViewport></div>
</div>`,
})
export class NavigationMenuRtlComponent {}

export default NavigationMenuRtlComponent
