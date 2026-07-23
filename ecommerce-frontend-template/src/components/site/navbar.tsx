import { Link, useRouterState } from "@tanstack/react-router";
import { Heart, Menu, Search, ShoppingBag, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { categories } from "@/lib/products";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/shop", label: "Workshop", search: { sale: true } as any },
  { to: "/orders", label: "Orders" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { cartCount, wishlist } = useStore();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b transition-colors",
        scrolled ? "glass border-border/60" : "border-transparent bg-background",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Open menu"
            >
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80">
            <SheetHeader>
              <SheetTitle>
                <Link to="/" onClick={() => setMobileOpen(false)} className="font-display text-lg font-medium">
                  BurgasFrame<span className="text-primary">.</span>
                </Link>
              </SheetTitle>
            </SheetHeader>
            <nav className="mt-6 flex flex-col gap-1 px-2">
              {navLinks.map((l) => (
                <Link
                  key={l.label}
                  to={l.to}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent"
                >
                  {l.label}
                </Link>
              ))}
              <div className="mt-4 px-3 text-xs font-semibold uppercase text-muted-foreground">
                Categories
              </div>
              {categories.map((c) => (
                <Link
                  key={c.slug}
                  to="/shop"
                  search={{ category: c.slug } as any}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-md px-3 py-2 text-sm hover:bg-accent"
                >
                  {c.name}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        <Link to="/" className="flex items-center gap-1 font-display text-xl font-medium tracking-tight">
          BurgasFrame<span className="text-primary">.</span>
        </Link>

        <nav className="ml-6 hidden items-center gap-1 md:flex">
          {navLinks.map((l) => {
            const active = pathname === l.to && !l.search;
            return (
              <Link
                key={l.label}
                to={l.to}
                search={l.search}
                className={cn(
                  "rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground transition hover:text-foreground",
                  active && "bg-accent text-accent-foreground",
                )}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <div className="relative hidden md:block">
            <Search
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              placeholder="Search products…"
              className="h-10 w-64 rounded-full bg-muted pl-9"
              aria-label="Search products"
            />
          </div>

          <Button variant="ghost" size="icon" asChild aria-label="Wishlist">
            <Link to="/wishlist" className="relative">
              <Heart />
              {wishlist.length > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid size-4 place-items-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                  {wishlist.length}
                </span>
              )}
            </Link>
          </Button>

          <Button variant="ghost" size="icon" asChild aria-label="Cart">
            <Link to="/cart" className="relative">
              <ShoppingBag />
              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid size-4 place-items-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                  {cartCount}
                </span>
              )}
            </Link>
          </Button>

          <Button variant="ghost" size="icon" asChild aria-label="Account" className="hidden sm:inline-flex">
            <Link to="/profile"><User /></Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
