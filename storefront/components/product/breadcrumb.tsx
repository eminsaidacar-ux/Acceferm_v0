import { ChevronRight } from "lucide-react";
import type { ProductDetail } from "@/lib/product-detail";

export function ProductBreadcrumb({ product }: { product: ProductDetail }) {
  const parts = [
    { label: "Catalogue", href: "/#categories" },
    { label: product.category, href: "#" },
    { label: product.brand, href: `#brand-${product.brand.toLowerCase()}` },
  ];

  return (
    <nav aria-label="Fil d'Ariane" className="border-b border-border-soft bg-bg-elev">
      <div className="mx-auto flex max-w-[1440px] items-center gap-1 overflow-x-auto px-6 py-3 text-[12px] lg:px-8">
        {parts.map((p, i) => (
          <span key={p.label} className="flex shrink-0 items-center gap-1">
            <a href={p.href} className="whitespace-nowrap text-fg-muted transition hover:text-fg">
              {p.label}
            </a>
            {i < parts.length - 1 && <ChevronRight className="h-3 w-3 text-fg-faint" />}
          </span>
        ))}
        <ChevronRight className="h-3 w-3 shrink-0 text-fg-faint" />
        <span className="truncate font-medium text-fg">{product.name}</span>
      </div>
    </nav>
  );
}
