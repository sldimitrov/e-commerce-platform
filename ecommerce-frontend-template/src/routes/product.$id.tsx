import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, Minus, Plus, Share2, ShieldCheck, ShoppingBag, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Rating } from "@/components/site/rating";
import { ProductCard } from "@/components/site/product-card";
import { getProduct, getRelated } from "@/lib/products";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) =>
    loaderData
      ? {
          meta: [
            { title: `${loaderData.product.name} — BurgasFrame` },
            { name: "description", content: loaderData.product.description },
            { property: "og:title", content: loaderData.product.name },
            { property: "og:description", content: loaderData.product.description },
            { property: "og:image", content: loaderData.product.image },
          ],
        }
      : { meta: [{ title: "Product — BurgasFrame" }] },
  notFoundComponent: () => (
    <div className="mx-auto max-w-lg px-4 py-24 text-center">
      <h1 className="text-2xl font-semibold">Product not found</h1>
      <p className="mt-2 text-muted-foreground">This item may have sold out or been removed.</p>
      <Button asChild className="mt-6 rounded-full"><Link to="/shop">Back to shop</Link></Button>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { addToCart, toggleWishlist, inWishlist } = useStore();
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const wished = inWishlist(product.id);
  const related = getRelated(product.id, product.categorySlug);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbLink asChild><Link to="/shop">Shop</Link></BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbPage className="truncate max-w-[220px]">{product.name}</BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        {/* Gallery */}
        <div className="grid gap-3 sm:grid-cols-[80px_1fr]">
          <div className="order-2 flex gap-3 sm:order-1 sm:flex-col">
            {product.images.map((src: string, i: number) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={cn(
                  "size-20 shrink-0 overflow-hidden rounded-xl border transition",
                  activeImg === i ? "ring-2 ring-primary" : "opacity-70 hover:opacity-100",
                )}
                aria-label={`Show image ${i + 1}`}
              >
                <img src={src} alt="" className="size-full object-cover" />
              </button>
            ))}
          </div>
          <div className="order-1 overflow-hidden rounded-2xl border bg-muted sm:order-2">
            <img
              src={product.images[activeImg]}
              alt={product.name}
              className="aspect-square size-full object-cover"
            />
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col">
          <div className="text-xs uppercase tracking-widest text-primary">{product.category}</div>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{product.name}</h1>
          <div className="mt-3 flex flex-wrap items-center gap-4">
            <Rating value={product.rating} reviews={product.reviews} size={16} />
            <span className="text-sm text-muted-foreground">Brand: <span className="text-foreground">{product.brand}</span></span>
            <span className="text-sm text-muted-foreground">SKU: {product.sku}</span>
          </div>

          <div className="mt-6 flex items-end gap-3">
            <span className="text-4xl font-semibold tabular-nums">${product.price}</span>
            {product.compareAt && (
              <span className="text-lg text-muted-foreground line-through tabular-nums">
                ${product.compareAt}
              </span>
            )}
            {product.compareAt && (
              <Badge className="ml-1">
                Save {Math.round(100 - (product.price / product.compareAt) * 100)}%
              </Badge>
            )}
          </div>

          <div className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-sm text-emerald-600">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            In stock — ready to ship
          </div>

          <p className="mt-6 text-muted-foreground">{product.description}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <div className="flex items-center rounded-full border">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="grid size-11 place-items-center rounded-full hover:bg-accent"
                aria-label="Decrease quantity"
              ><Minus size={16} /></button>
              <span className="w-10 text-center font-medium tabular-nums">{qty}</span>
              <button
                onClick={() => setQty(qty + 1)}
                className="grid size-11 place-items-center rounded-full hover:bg-accent"
                aria-label="Increase quantity"
              ><Plus size={16} /></button>
            </div>
            <Button
              size="lg"
              className="flex-1 rounded-full shadow-glow sm:flex-none"
              onClick={() => addToCart(product.id, qty)}
            >
              <ShoppingBag /> Add to cart
            </Button>
            <Button asChild size="lg" variant="secondary" className="rounded-full">
              <Link to="/checkout">Buy now</Link>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="size-11 rounded-full"
              onClick={() => toggleWishlist(product.id)}
              aria-label="Toggle wishlist"
            >
              <Heart className={cn(wished && "fill-primary text-primary")} />
            </Button>
            <Button variant="outline" size="icon" className="size-11 rounded-full" aria-label="Share">
              <Share2 />
            </Button>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-start gap-2 rounded-xl border bg-card p-3">
              <Truck size={18} className="mt-0.5 text-primary" />
              <div><div className="font-medium">Free shipping</div><div className="text-xs text-muted-foreground">Arrives in 2–4 days</div></div>
            </div>
            <div className="flex items-start gap-2 rounded-xl border bg-card p-3">
              <ShieldCheck size={18} className="mt-0.5 text-primary" />
              <div><div className="font-medium">2-year warranty</div><div className="text-xs text-muted-foreground">Full manufacturer coverage</div></div>
            </div>
          </div>

          <Accordion type="single" collapsible defaultValue="desc" className="mt-8">
            <AccordionItem value="desc">
              <AccordionTrigger>Description</AccordionTrigger>
              <AccordionContent>
                {product.description} Every unit is inspected before shipment and comes with our full support.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="specs">
              <AccordionTrigger>Specifications</AccordionTrigger>
              <AccordionContent>
                <dl className="grid grid-cols-2 gap-y-2 text-sm">
                  <dt className="text-muted-foreground">Brand</dt><dd>{product.brand}</dd>
                  <dt className="text-muted-foreground">Category</dt><dd>{product.category}</dd>
                  <dt className="text-muted-foreground">SKU</dt><dd>{product.sku}</dd>
                  <dt className="text-muted-foreground">Weight</dt><dd>0.8 kg</dd>
                </dl>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="shipping">
              <AccordionTrigger>Shipping & returns</AccordionTrigger>
              <AccordionContent>
                Free standard shipping on orders over $75. Express available at checkout. 30-day easy returns.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="reviews">
              <AccordionTrigger>Reviews ({product.reviews})</AccordionTrigger>
              <AccordionContent>
                Averaged {product.rating.toFixed(1)}★ across {product.reviews} verified customers.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="text-2xl font-semibold tracking-tight">You might also like</h2>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}
