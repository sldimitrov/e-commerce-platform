import { Link } from "@tanstack/react-router";
import { Facebook, Github, Instagram, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <Link to="/" className="font-display text-xl font-medium tracking-tight">
              BurgasFrame<span className="text-primary">.</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              A small woodworking studio on the Bulgarian coast. Tables, chairs and honest objects, made to last.
            </p>
            <div className="mt-5 flex gap-2">
              {[Twitter, Instagram, Facebook, Github].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social"
                  className="grid size-9 place-items-center rounded-full border bg-background text-muted-foreground transition hover:text-primary"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <FooterCol
            title="Workshop"
            links={["Our story", "The makers", "Wood & finish", "Visit us"]}
          />
          <FooterCol
            title="Shop"
            links={["Tables", "Seating", "Shelving", "Kitchen", "Home Décor", "Frames"]}
          />
          <FooterCol
            title="Care"
            links={["Shipping", "Care guide", "Returns", "Contact"]}
          />
        </div>

        <div className="mt-12 flex flex-col-reverse items-center justify-between gap-3 border-t pt-6 text-sm text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} BurgasFrame Studio. Made by hand in Burgas.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-foreground">{title}</h4>
      <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
        {links.map((l) => (
          <li key={l}>
            <a href="#" className="hover:text-foreground">
              {l}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
