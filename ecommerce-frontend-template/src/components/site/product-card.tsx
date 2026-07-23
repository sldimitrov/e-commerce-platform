import { Link } from "@tanstack/react-router";
import { Eye, Heart, ShoppingBag } from "lucide-react";
import type { Product } from "@/lib/products";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Rating } from "./rating";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, inWishlist } = useStore();
  const wished = inWishlist(product.id);
  const discount =
    product.compareAt && product.compareAt > product.price
      ? Math.round(100 - (product.price / product.compareAt) * 100)
      : 0;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border bg-card card-hover">
      <Link
        to="/product/$id"
        params={{ id: product.id }}
        className="relative block aspect-square overflow-hidden bg-muted"
        aria-label={product.name}
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex gap-1.5">
          {discount > 0 && (
            <Badge className="bg-primary text-primary-foreground">-{discount}%</Badge>
          )}
          {product.tag && !discount && (
            <Badge variant="secondary" className="bg-white/90 text-foreground">
              {product.tag}
            </Badge>
          )}
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product.id);
          }}
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-white/90 text-foreground shadow-soft backdrop-blur transition hover:bg-white"
        >
          <Heart size={16} className={cn(wished && "fill-primary text-primary")} />
        </button>

        <div className="pointer-events-none absolute inset-x-3 bottom-3 flex gap-2 opacity-0 transition-all duration-300 group-hover:pointer-events-auto group-hover:opacity-100">
          <Button
            size="sm"
            className="flex-1 shadow-soft"
            onClick={(e) => {
              e.preventDefault();
              addToCart(product.id);
            }}
          >
            <ShoppingBag /> Add to cart
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="shadow-soft"
            aria-label="Quick view"
            asChild
          >
            <Link to="/product/$id" params={{ id: product.id }} onClick={(e) => e.stopPropagation()}>
              <Eye />
            </Link>
          </Button>
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="text-xs uppercase tracking-wide text-muted-foreground">
          {product.category}
        </div>
        <Link
          to="/product/$id"
          params={{ id: product.id }}
          className="line-clamp-1 font-medium text-foreground hover:text-primary"
        >
          {product.name}
        </Link>
        <Rating value={product.rating} reviews={product.reviews} />
        <div className="mt-auto flex items-baseline gap-2 pt-1">
          <span className="text-lg font-semibold tabular-nums">${product.price}</span>
          {product.compareAt && (
            <span className="text-sm text-muted-foreground line-through tabular-nums">
              ${product.compareAt}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
