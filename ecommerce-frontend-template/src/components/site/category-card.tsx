import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { Category } from "@/lib/products";
import { cn } from "@/lib/utils";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      to="/shop"
      search={{ category: category.slug }}
      className="group relative block overflow-hidden rounded-2xl border bg-card card-hover"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          loading="lazy"
          className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-t opacity-90",
            category.tint,
            "from-black/70 via-black/20 to-transparent",
          )}
        />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 text-white">
          <div>
            <h3 className="text-xl font-semibold tracking-tight">{category.name}</h3>
            <p className="text-sm text-white/80">{category.count} products</p>
          </div>
          <span className="grid size-10 place-items-center rounded-full bg-white/15 backdrop-blur-md transition group-hover:bg-white group-hover:text-primary">
            <ArrowUpRight size={18} />
          </span>
        </div>
      </div>
    </Link>
  );
}
