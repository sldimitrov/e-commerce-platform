import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { CreditCard, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useCartDetail, useStore } from "@/lib/store";
import { toast } from "sonner";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — BurgasFrame" }] }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const items = useCartDetail();
  const { cartSubtotal, clearCart } = useStore();
  const navigate = useNavigate();
  const shipping = cartSubtotal > 75 ? 0 : 9;
  const tax = +(cartSubtotal * 0.08).toFixed(2);
  const total = cartSubtotal + shipping + tax;

  const placeOrder = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Order placed! Thank you.");
    clearCart();
    navigate({ to: "/orders" });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Checkout</h1>

      <form onSubmit={placeOrder} className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_400px]">
        <div className="space-y-8">
          <Section title="Contact information">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Email"><Input type="email" required placeholder="you@example.com" /></Field>
              <Field label="Phone"><Input type="tel" placeholder="(555) 123-4567" /></Field>
            </div>
          </Section>

          <Section title="Shipping address">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="First name"><Input required /></Field>
              <Field label="Last name"><Input required /></Field>
              <div className="sm:col-span-2"><Field label="Address"><Input required /></Field></div>
              <Field label="City"><Input required /></Field>
              <Field label="Postal code"><Input required /></Field>
              <Field label="Country"><Input required defaultValue="United States" /></Field>
              <Field label="State"><Input required /></Field>
            </div>
          </Section>

          <Section title="Delivery">
            <RadioGroup defaultValue="standard" className="grid gap-3 sm:grid-cols-2">
              <DeliveryOption id="standard" title="Standard" sub="2–4 business days" price="Free" />
              <DeliveryOption id="express" title="Express" sub="1 business day" price="$14" />
            </RadioGroup>
          </Section>

          <Section title="Payment">
            <div className="rounded-xl border bg-card p-4">
              <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
                <Lock size={14} /> Secure, encrypted payment
              </div>
              <div className="grid gap-4">
                <Field label="Card number">
                  <div className="relative">
                    <CreditCard size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input required placeholder="1234 5678 9012 3456" className="pl-9" />
                  </div>
                </Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Expiry"><Input required placeholder="MM / YY" /></Field>
                  <Field label="CVC"><Input required placeholder="123" /></Field>
                </div>
              </div>
            </div>
          </Section>
        </div>

        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <div className="rounded-2xl border bg-card p-6">
            <h2 className="text-lg font-semibold">Order summary</h2>
            <ul className="mt-4 space-y-3">
              {items.map(({ product, qty }) => (
                <li key={product.id} className="flex gap-3">
                  <div className="relative">
                    <img src={product.image} alt={product.name} className="size-14 rounded-lg object-cover" />
                    <span className="absolute -right-1.5 -top-1.5 grid size-5 place-items-center rounded-full bg-foreground text-[10px] font-semibold text-background">
                      {qty}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="line-clamp-1 text-sm font-medium">{product.name}</div>
                    <div className="text-xs text-muted-foreground">{product.category}</div>
                  </div>
                  <div className="text-sm tabular-nums">${(product.price * qty).toFixed(2)}</div>
                </li>
              ))}
              {items.length === 0 && (
                <li className="text-sm text-muted-foreground">
                  Cart is empty. <Link to="/shop" className="text-primary hover:underline">Browse products</Link>.
                </li>
              )}
            </ul>
            <Separator className="my-4" />
            <dl className="space-y-2 text-sm">
              <Row label="Subtotal" value={`$${cartSubtotal.toFixed(2)}`} />
              <Row label="Shipping" value={shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`} />
              <Row label="Tax" value={`$${tax.toFixed(2)}`} />
            </dl>
            <Separator className="my-4" />
            <div className="flex items-baseline justify-between">
              <span className="font-semibold">Total</span>
              <span className="text-2xl font-semibold tabular-nums">${total.toFixed(2)}</span>
            </div>
            <Button type="submit" size="lg" className="mt-6 w-full rounded-full shadow-glow" disabled={items.length === 0}>
              Place order
            </Button>
          </div>
        </aside>
      </form>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border bg-card p-6">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1.5">
      <Label className="text-sm">{label}</Label>
      {children}
    </div>
  );
}
function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="tabular-nums">{value}</dd>
    </div>
  );
}
function DeliveryOption({ id, title, sub, price }: { id: string; title: string; sub: string; price: string }) {
  return (
    <label htmlFor={id} className="flex cursor-pointer items-center gap-3 rounded-xl border bg-card p-4 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-accent/50">
      <RadioGroupItem id={id} value={id} />
      <div className="flex-1">
        <div className="text-sm font-medium">{title}</div>
        <div className="text-xs text-muted-foreground">{sub}</div>
      </div>
      <div className="text-sm font-semibold">{price}</div>
    </label>
  );
}
