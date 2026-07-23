import { createFileRoute, Link } from "@tanstack/react-router";
import { Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/orders")({
  head: () => ({ meta: [{ title: "Orders — BurgasFrame" }] }),
  component: OrdersPage,
});

const orders = [
  { id: "LMN-10428", date: "Jul 12, 2026", status: "Delivered", total: 349.0 },
  { id: "LMN-10391", date: "Jul 03, 2026", status: "Shipped", total: 189.0 },
  { id: "LMN-10322", date: "Jun 22, 2026", status: "Paid", total: 78.0 },
  { id: "LMN-10287", date: "Jun 10, 2026", status: "Pending", total: 129.0 },
  { id: "LMN-10214", date: "May 28, 2026", status: "Cancelled", total: 249.0 },
];

const statusStyles: Record<string, string> = {
  Delivered: "bg-emerald-500/10 text-emerald-600",
  Shipped: "bg-blue-500/10 text-blue-600",
  Paid: "bg-primary/10 text-primary",
  Pending: "bg-amber-500/10 text-amber-600",
  Cancelled: "bg-destructive/10 text-destructive",
};

function OrdersPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Your orders</h1>
      <p className="mt-1 text-muted-foreground">Recent purchases and their status.</p>

      {orders.length === 0 ? (
        <EmptyOrders />
      ) : (
        <div className="mt-8 overflow-hidden rounded-2xl border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((o) => (
                <TableRow key={o.id}>
                  <TableCell className="font-medium">{o.id}</TableCell>
                  <TableCell className="text-muted-foreground">{o.date}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={cn("rounded-full font-medium", statusStyles[o.status])}>
                      {o.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right tabular-nums">${o.total.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">View</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

function EmptyOrders() {
  return (
    <div className="mt-16 grid place-items-center rounded-2xl border bg-card p-16 text-center">
      <div className="grid size-14 place-items-center rounded-full bg-primary/10 text-primary"><Package /></div>
      <h2 className="mt-4 text-lg font-semibold">No orders yet</h2>
      <Button asChild className="mt-4 rounded-full"><Link to="/shop">Start shopping</Link></Button>
    </div>
  );
}
