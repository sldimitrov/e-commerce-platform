import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Tag, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useCartDetail, useStore } from "@/lib/store";
import { toast } from "sonner";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Cart — BurgasFrame" }] }),
  component: CartPage,
});

function CartPage() {
  const items = useCartDetail();
  const { updateQty, removeFromCart, cartSubtotal } = useStore();
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  const shipping = cartSubtotal > 75 || cartSubtotal === 0 ? 0 : 9;
  const tax = +(cartSubtotal * 0.08).toFixed(2);
  const total = Math.max(0, cartSubtotal - discount) + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <div className="mx-auto grid size-16 place-items-center rounded-full bg-primary/10 text-primary">
          <ShoppingBag />
        </div>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight">Your cart is empty</h1>
        <p className="mt-2 text-muted-foreground">
          Looks like you haven't added anything yet. Let's fix that.
        </p>
        <Button asChild size="lg" className="mt-6 rounded-full"><Link to="/shop">Start shopping</Link></Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Shopping cart</h1>
      <p className="mt-1 text-muted-foreground">{items.length} {items.length === 1 ? "item" : "items"}</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
        <div className="space-y-4">
          {items.map(({ product, qty }) => (
            <div key={product.id} className="flex gap-4 rounded-2xl border bg-card p-4">
              <Link to="/product/$id" params={{ id: product.id }} className="shrink-0">
                <img src={product.image} alt={product.name} className="size-24 rounded-xl object-cover sm:size-28" />
              </Link>
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <div className="text-xs uppercase text-muted-foreground">{product.category}</div>
                <Link to="/product/$id" params={{ id: product.id }} className="font-medium hover:text-primary">
                  {product.name}
                </Link>
                <div className="text-sm text-muted-foreground">Brand: {product.brand}</div>

                <div className="mt-auto flex flex-wrap items-center gap-3 pt-2">
                  <div className="flex items-center rounded-full border">
                    <button onClick={() => updateQty(product.id, qty - 1)} className="grid size-9 place-items-center rounded-full hover:bg-accent" aria-label="Decrease"><Minus size={14} /></button>
                    <span className="w-8 text-center text-sm font-medium tabular-nums">{qty}</span>
                    <button onClick={() => updateQty(product.id, qty + 1)} className="grid size-9 place-items-center rounded-full hover:bg-accent" aria-label="Increase"><Plus size={14} /></button>
                  </div>
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 size={14} /> Remove
                  </button>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold tabular-nums">${(product.price * qty).toFixed(2)}</div>
                <div className="text-xs text-muted-foreground tabular-nums">${product.price} each</div>
              </div>
            </div>
          ))}
        </div>

        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <div className="rounded-2xl border bg-card p-6">
            <h2 className="text-lg font-semibold">Order summary</h2>
            <div className="mt-4 flex gap-2">
              <div className="relative flex-1">
                <Tag size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder="Promo code" className="pl-9" />
              </div>
              <Button
                variant="outline"
                onClick={() => {
                  if (coupon.trim().toUpperCase() === "LUMEN10") {
                    setDiscount(+(cartSubtotal * 0.1).toFixed(2));
                    toast.success("Promo applied — 10% off");
                  } else {
                    toast.error("Invalid code");
                  }
                }}
              >Apply</Button>
            </div>

            <dl className="mt-6 space-y-2 text-sm">
              <Row label="Subtotal" value={`$${cartSubtotal.toFixed(2)}`} />
              {discount > 0 && <Row label="Discount" value={`-$${discount.toFixed(2)}`} accent />}
              <Row label="Shipping" value={shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`} />
              <Row label="Estimated tax" value={`$${tax.toFixed(2)}`} />
            </dl>
            <Separator className="my-4" />
            <div className="flex items-baseline justify-between">
              <span className="font-semibold">Total</span>
              <span className="text-2xl font-semibold tabular-nums">${total.toFixed(2)}</span>
            </div>
            <Button asChild size="lg" className="mt-6 w-full rounded-full shadow-glow">
              <Link to="/checkout">Checkout</Link>
            </Button>
            <Button asChild variant="ghost" className="mt-2 w-full rounded-full"><Link to="/shop">Continue shopping</Link></Button>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex justify-between">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className={accent ? "text-emerald-600 tabular-nums" : "tabular-nums"}>{value}</dd>
    </div>
  );
}
