import { createFileRoute, Link, useRouterState } from "@tanstack/react-router";
import { Heart, MapPin, Package, Settings2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile — BurgasFrame" }] }),
  component: ProfilePage,
});

const nav = [
  { to: "/profile", label: "Overview", icon: User },
  { to: "/orders", label: "Orders", icon: Package },
  { to: "/wishlist", label: "Wishlist", icon: Heart },
  { to: "/profile", label: "Addresses", icon: MapPin },
  { to: "/profile", label: "Settings", icon: Settings2 },
];

function ProfilePage() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside>
          <div className="flex items-center gap-3 rounded-2xl border bg-card p-4">
            <div className="grid size-12 place-items-center rounded-full bg-primary/10 text-lg font-semibold text-primary">A</div>
            <div className="min-w-0">
              <div className="truncate font-semibold">Alex Morgan</div>
              <div className="truncate text-xs text-muted-foreground">alex@lumen.co</div>
            </div>
          </div>
          <nav className="mt-4 space-y-1 rounded-2xl border bg-card p-2">
            {nav.map((n) => {
              const Icon = n.icon;
              const active = pathname === n.to && n.label === "Overview";
              return (
                <Link
                  key={n.label}
                  to={n.to}
                  className={cn(
                    "flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition",
                    active ? "bg-accent text-accent-foreground" : "hover:bg-accent/60",
                  )}
                >
                  <Icon size={16} /> {n.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <div className="space-y-8">
          <section className="rounded-2xl border bg-card p-6">
            <h1 className="text-2xl font-semibold tracking-tight">Personal information</h1>
            <p className="mt-1 text-sm text-muted-foreground">Update your details and contact info.</p>
            <form className="mt-6 grid gap-4 sm:grid-cols-2">
              <Field label="First name"><Input defaultValue="Alex" /></Field>
              <Field label="Last name"><Input defaultValue="Morgan" /></Field>
              <Field label="Email"><Input type="email" defaultValue="alex@lumen.co" /></Field>
              <Field label="Phone"><Input type="tel" defaultValue="(555) 123-4567" /></Field>
              <div className="sm:col-span-2 flex justify-end">
                <Button type="button" className="rounded-full">Save changes</Button>
              </div>
            </form>
          </section>

          <section className="rounded-2xl border bg-card p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold tracking-tight">Recent orders</h2>
              <Button asChild variant="ghost" size="sm"><Link to="/orders">View all</Link></Button>
            </div>
            <ul className="mt-4 divide-y">
              {[
                { id: "LMN-10428", date: "Jul 12, 2026", status: "Delivered", total: 349 },
                { id: "LMN-10391", date: "Jul 03, 2026", status: "Shipped", total: 189 },
                { id: "LMN-10322", date: "Jun 22, 2026", status: "Paid", total: 78 },
              ].map((o) => (
                <li key={o.id} className="flex items-center justify-between py-3">
                  <div>
                    <div className="font-medium">{o.id}</div>
                    <div className="text-xs text-muted-foreground">{o.date}</div>
                  </div>
                  <Badge variant="secondary" className="rounded-full">{o.status}</Badge>
                  <div className="text-sm font-semibold tabular-nums">${o.total.toFixed(2)}</div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
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
