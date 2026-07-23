import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Grid3x3, LayoutList, PackageSearch, Search, SlidersHorizontal } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/site/product-card";
import { Rating } from "@/components/site/rating";
import { categories, products } from "@/lib/products";
import { cn } from "@/lib/utils";

const searchSchema = z.object({
  category: z.string().optional(),
  q: z.string().optional(),
  sale: z.boolean().optional(),
});

export const Route = createFileRoute("/shop")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Shop — BurgasFrame" },
      {
        name: "description",
        content: "Browse the full BurgasFrame catalog with filters for category, brand, price and rating.",
      },
    ],
  }),
  component: ShopPage,
});

const brands = Array.from(new Set(products.map((p) => p.brand)));

function ShopPage() {
  const search = Route.useSearch();
  const [q, setQ] = useState(search.q ?? "");
  const [category, setCategory] = useState<string>(search.category ?? "all");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);
  const [priceMax, setPriceMax] = useState(400);
  const [inStock, setInStock] = useState(false);
  const [sale, setSale] = useState<boolean>(search.sale ?? false);
  const [sort, setSort] = useState("newest");
  const [view, setView] = useState<"grid" | "list">("grid");

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (category !== "all" && p.categorySlug !== category) return false;
      if (q && !p.name.toLowerCase().includes(q.toLowerCase())) return false;
      if (selectedBrands.length && !selectedBrands.includes(p.brand)) return false;
      if (p.rating < minRating) return false;
      if (p.price > priceMax) return false;
      if (inStock && p.stock <= 0) return false;
      if (sale && !p.compareAt) return false;
      return true;
    });
    switch (sort) {
      case "price-asc": list = [...list].sort((a, b) => a.price - b.price); break;
      case "price-desc": list = [...list].sort((a, b) => b.price - a.price); break;
      case "popular": list = [...list].sort((a, b) => b.reviews - a.reviews); break;
    }
    return list;
  }, [category, q, selectedBrands, minRating, priceMax, inStock, sale, sort]);

  const filters = (
    <div className="space-y-6">
      <FilterGroup title="Category">
        <div className="space-y-1.5">
          {[{ slug: "all", name: "All categories" }, ...categories].map((c) => (
            <button
              key={c.slug}
              onClick={() => setCategory(c.slug)}
              className={cn(
                "flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-sm transition",
                category === c.slug ? "bg-accent text-accent-foreground" : "hover:bg-accent/60",
              )}
            >
              <span>{c.name}</span>
            </button>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title={`Price · up to $${priceMax}`}>
        <Slider
          value={[priceMax]}
          min={20}
          max={500}
          step={10}
          onValueChange={(v) => setPriceMax(v[0])}
        />
      </FilterGroup>

      <FilterGroup title="Brand">
        <div className="space-y-2">
          {brands.map((b) => (
            <label key={b} className="flex items-center gap-2 text-sm">
              <Checkbox
                checked={selectedBrands.includes(b)}
                onCheckedChange={(v) =>
                  setSelectedBrands((cur) =>
                    v ? [...cur, b] : cur.filter((x) => x !== b),
                  )
                }
              />
              {b}
            </label>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Rating">
        <div className="space-y-1.5">
          {[4, 3, 0].map((r) => (
            <button
              key={r}
              onClick={() => setMinRating(r)}
              className={cn(
                "flex w-full items-center justify-between rounded-md px-2 py-1.5 text-sm transition",
                minRating === r ? "bg-accent" : "hover:bg-accent/60",
              )}
            >
              <span>{r === 0 ? "Any rating" : `${r}★ & up`}</span>
            </button>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Availability">
        <label className="flex items-center gap-2 text-sm">
          <Checkbox checked={inStock} onCheckedChange={(v) => setInStock(!!v)} />
          In stock only
        </label>
        <label className="mt-2 flex items-center gap-2 text-sm">
          <Checkbox checked={sale} onCheckedChange={(v) => setSale(!!v)} />
          On sale
        </label>
      </FilterGroup>
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">Shop</p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">All products</h1>
        <p className="text-muted-foreground">
          {filtered.length} {filtered.length === 1 ? "product" : "products"} available
        </p>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-2xl border bg-card p-5">{filters}</div>
        </aside>

        <div>
          <div className="flex flex-wrap items-center gap-3 rounded-2xl border bg-card p-3">
            <div className="relative min-w-0 flex-1">
              <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search in shop…"
                className="h-10 rounded-full bg-muted pl-9"
              />
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="rounded-full lg:hidden">
                  <SlidersHorizontal /> Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 overflow-y-auto p-5">
                <SheetHeader className="px-0"><SheetTitle>Filters</SheetTitle></SheetHeader>
                <div className="mt-4">{filters}</div>
              </SheetContent>
            </Sheet>

            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="h-10 w-[170px] rounded-full">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-asc">Price: Low → High</SelectItem>
                <SelectItem value="price-desc">Price: High → Low</SelectItem>
                <SelectItem value="popular">Popularity</SelectItem>
              </SelectContent>
            </Select>

            <div className="hidden overflow-hidden rounded-full border sm:flex">
              <button
                type="button"
                aria-label="Grid view"
                onClick={() => setView("grid")}
                className={cn("grid size-9 place-items-center", view === "grid" && "bg-accent")}
              >
                <Grid3x3 size={16} />
              </button>
              <button
                type="button"
                aria-label="List view"
                onClick={() => setView("list")}
                className={cn("grid size-9 place-items-center", view === "list" && "bg-accent")}
              >
                <LayoutList size={16} />
              </button>
            </div>
          </div>

          {(category !== "all" || selectedBrands.length || sale || minRating > 0) && (
            <div className="mt-4 flex flex-wrap gap-2">
              {category !== "all" && (
                <ActiveChip label={categories.find((c) => c.slug === category)?.name ?? category} onClear={() => setCategory("all")} />
              )}
              {selectedBrands.map((b) => (
                <ActiveChip key={b} label={b} onClear={() => setSelectedBrands((cur) => cur.filter((x) => x !== b))} />
              ))}
              {sale && <ActiveChip label="On sale" onClear={() => setSale(false)} />}
              {minRating > 0 && <ActiveChip label={`${minRating}★ & up`} onClear={() => setMinRating(0)} />}
            </div>
          )}

          {filtered.length === 0 ? (
            <EmptyState query={q} />
          ) : view === "grid" ? (
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              {filtered.map((p) => (
                <Link
                  key={p.id}
                  to="/product/$id"
                  params={{ id: p.id }}
                  className="flex gap-5 rounded-2xl border bg-card p-4 card-hover"
                >
                  <img src={p.image} alt={p.name} loading="lazy" className="size-32 shrink-0 rounded-xl object-cover" />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="text-xs uppercase text-muted-foreground">{p.category}</div>
                    <div className="font-medium">{p.name}</div>
                    <Rating value={p.rating} reviews={p.reviews} className="mt-1" />
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{p.description}</p>
                    <div className="mt-auto pt-2 text-lg font-semibold">${p.price}</div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Pagination (static) */}
          {filtered.length > 0 && (
            <div className="mt-10 flex items-center justify-center gap-1">
              {[1, 2, 3].map((n) => (
                <button
                  key={n}
                  className={cn(
                    "grid size-9 place-items-center rounded-full text-sm transition",
                    n === 1 ? "bg-primary text-primary-foreground" : "hover:bg-accent",
                  )}
                >
                  {n}
                </button>
              ))}
              <span className="px-2 text-muted-foreground">…</span>
              <button className="grid size-9 place-items-center rounded-full text-sm hover:bg-accent">
                7
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <Label className="mb-3 block text-sm font-semibold">{title}</Label>
      {children}
    </div>
  );
}

function ActiveChip({ label, onClear }: { label: string; onClear: () => void }) {
  return (
    <button
      onClick={onClear}
      className="inline-flex items-center gap-1.5 rounded-full border bg-background px-3 py-1 text-xs hover:bg-accent"
    >
      {label} <span aria-hidden>×</span>
    </button>
  );
}

function EmptyState({ query }: { query: string }) {
  return (
    <div className="mt-16 grid place-items-center rounded-2xl border bg-card p-14 text-center">
      <div className="grid size-14 place-items-center rounded-full bg-primary/10 text-primary">
        <PackageSearch />
      </div>
      <h3 className="mt-4 text-lg font-semibold">No products found</h3>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">
        {query ? `We couldn't find matches for "${query}".` : "Try adjusting your filters or clearing your search."}
      </p>
      <Badge variant="secondary" className="mt-4">Try broader filters</Badge>
    </div>
  );
}
