import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/site/product-card";
import { products } from "@/lib/products";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/wishlist")({
  head: () => ({ meta: [{ title: "Wishlist — BurgasFrame" }] }),
  component: WishlistPage,
});

function WishlistPage() {
  const { wishlist } = useStore();
  const items = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Wishlist</h1>
      <p className="mt-1 text-muted-foreground">{items.length} saved</p>

      {items.length === 0 ? (
        <div className="mt-16 grid place-items-center rounded-2xl border bg-card p-16 text-center">
          <div className="grid size-14 place-items-center rounded-full bg-primary/10 text-primary">
            <Heart />
          </div>
          <h2 className="mt-4 text-lg font-semibold">Your wishlist is empty</h2>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            Tap the heart on any product to save it here for later.
          </p>
          <Button asChild className="mt-4 rounded-full"><Link to="/shop">Browse products</Link></Button>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}
