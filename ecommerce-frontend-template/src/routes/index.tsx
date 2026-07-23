import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, Sparkles, Truck } from "lucide-react";
import heroImage from "@/assets/hero.jpg";
import promoImage from "@/assets/promo.jpg";
import { Button } from "@/components/ui/button";
import { CategoryCard } from "@/components/site/category-card";
import { ProductCard } from "@/components/site/product-card";
import { categories, products } from "@/lib/products";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BurgasFrame Store — Handcrafted wooden goods" },
      {
        name: "description",
        content:
          "Handmade tables, chairs, shelves and small wooden objects from our Burgas workshop. Naturally finished, built to last.",
      },
      { property: "og:title", content: "BurgasFrame Store — Handcrafted wooden goods" },
      { property: "og:description", content: "Tables, seating and small wooden objects, made by hand in Burgas." },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = products.filter((p) => p.featured).slice(0, 8);

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-40 top-0 h-[520px] w-[520px] rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -right-24 bottom-0 h-[420px] w-[420px] rounded-full bg-amber-500/10 blur-3xl" />
        </div>

        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24">
          <div className="flex flex-col justify-center">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border bg-background/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
              <Sparkles size={12} className="text-primary" />
              Handmade in Burgas since 2014
            </div>
            <h1 className="mt-5 font-display text-5xl font-medium tracking-tight sm:text-6xl lg:text-7xl">
              Wood, shaped
              <br />
              <span className="italic text-primary">by hand.</span>
            </h1>
            <p className="mt-5 max-w-lg text-lg text-muted-foreground">
              Tables, chairs, shelves and the small everyday objects that make a home feel lived-in.
              Cut, joined and oiled in our workshop — one piece at a time.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full shadow-glow">
                <Link to="/shop">
                  Browse the workshop <ArrowRight />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full">
                <Link to="/shop" search={{ sale: true } as any}>See what's on sale</Link>
              </Button>
            </div>

            <dl className="mt-10 grid grid-cols-3 gap-4 border-t pt-6 text-sm">
              {[
                { icon: Truck, label: "Careful shipping", sub: "Wrapped by hand" },
                { icon: ShieldCheck, label: "10-year guarantee", sub: "On every joint" },
                { icon: Sparkles, label: "Natural oils only", sub: "Food-safe finish" },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex items-start gap-2">
                  <Icon size={18} className="mt-0.5 shrink-0 text-primary" />
                  <div className="min-w-0">
                    <dt className="font-medium">{label}</dt>
                    <dd className="text-xs text-muted-foreground">{sub}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <div className="absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-br from-primary/20 via-amber-300/10 to-transparent blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border bg-card shadow-lift">
              <img
                src={heroImage}
                alt="Handcrafted oak dining table in a sunlit room"
                width={1400}
                height={1200}
                className="aspect-[7/6] size-full object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl bg-background/85 p-3 backdrop-blur-md">
                <div>
                  <p className="text-xs text-muted-foreground">This month's piece</p>
                  <p className="text-sm font-semibold text-foreground">Sundial Round Coffee Table</p>
                </div>
                <Button asChild size="sm" className="rounded-full">
                  <Link to="/product/$id" params={{ id: "p1" }}>See it</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="The catalog"
          title="Shop by room"
          desc="Six honest categories — from long dining tables to the small objects on your shelf."
          cta={{ to: "/shop", label: "View all" }}
        />
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {categories.map((c) => (
            <CategoryCard key={c.slug} category={c} />
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="From the bench"
          title="New this season"
          desc="Fresh out of the workshop. Small runs, each one signed."
          cta={{ to: "/shop", label: "Shop all" }}
        />
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* PROMO */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border">
          <img
            src={promoImage}
            alt=""
            width={1600}
            height={700}
            loading="lazy"
            className="absolute inset-0 size-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
          <div className="relative flex flex-col gap-4 p-10 text-white sm:p-16 lg:max-w-lg">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/80">
              Workshop story
            </p>
            <h3 className="font-display text-4xl font-medium tracking-tight sm:text-5xl">
              Cut, joined, oiled — never rushed.
            </h3>
            <p className="text-white/80">
              Every piece leaves the bench when it's ready, not before. Come see how it's made.
            </p>
            <Button asChild size="lg" className="mt-2 w-fit rounded-full bg-white text-primary hover:bg-white/90">
              <Link to="/shop">
                Visit the workshop <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Kind words" title="From the people who live with them" />
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="rounded-2xl border bg-card p-6 shadow-soft card-hover"
            >
              <blockquote className="font-display text-lg text-foreground">"{t.quote}"</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <div className="grid size-10 place-items-center rounded-full bg-primary/10 font-semibold text-primary">
                  {t.name[0]}
                </div>
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl border bg-gradient-to-br from-primary/5 via-background to-amber-500/5 p-10 text-center sm:p-16">
          <h3 className="font-display text-3xl font-medium tracking-tight sm:text-4xl">
            Letters from the workshop
          </h3>
          <p className="mx-auto mt-3 max-w-md text-muted-foreground">
            New pieces, small-batch drops and the occasional photo of shavings on the floor. Once a month, that's it.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mx-auto mt-6 flex max-w-md flex-col gap-2 sm:flex-row"
          >
            <Input
              type="email"
              required
              placeholder="you@example.com"
              className="h-12 rounded-full bg-background px-5"
              aria-label="Email address"
            />
            <Button type="submit" size="lg" className="rounded-full shadow-glow">
              Subscribe
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  desc,
  cta,
}: {
  eyebrow?: string;
  title: string;
  desc?: string;
  cta?: { to: string; label: string };
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div className="max-w-xl">
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">{eyebrow}</p>
        )}
        <h2 className="mt-2 font-display text-3xl font-medium tracking-tight sm:text-4xl">{title}</h2>
        {desc && <p className="mt-2 text-muted-foreground">{desc}</p>}
      </div>
      {cta && (
        <Link
          to={cta.to}
          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          {cta.label} <ArrowRight size={16} />
        </Link>
      )}
    </div>
  );
}

const testimonials = [
  {
    quote:
      "The table arrived and the whole room settled around it. You can feel the hand of the maker in every edge.",
    name: "Elena V.",
    role: "Sofia, Bulgaria",
  },
  {
    quote:
      "I ordered a shelf and a bowl — both feel like heirlooms already. Packaging was as careful as the woodwork.",
    name: "Daniel K.",
    role: "Verified buyer",
  },
  {
    quote:
      "Not fast furniture. It took a few weeks to make, and it will outlast anything else I own. Worth it.",
    name: "Priya S.",
    role: "Verified buyer",
  },
];
