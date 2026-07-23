import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

export const Route = createFileRoute("/auth/login")({
  head: () => ({ meta: [{ title: "Sign in — BurgasFrame" }] }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to your BurgasFrame account to continue."
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          toast.success("Signed in");
          navigate({ to: "/" });
        }}
        className="space-y-4"
      >
        <div className="grid gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" required placeholder="you@example.com" />
        </div>
        <div className="grid gap-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <a href="#" className="text-xs text-primary hover:underline">Forgot?</a>
          </div>
          <Input id="password" type="password" required placeholder="••••••••" />
        </div>
        <Button type="submit" size="lg" className="w-full rounded-full shadow-glow">Sign in</Button>
      </form>

      <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
        <Separator className="flex-1" /> OR <Separator className="flex-1" />
      </div>

      <div className="grid gap-2">
        <Button variant="outline" className="rounded-full" size="lg">
          <GoogleIcon /> Continue with Google
        </Button>
        <Button variant="outline" className="rounded-full" size="lg">
          <Github /> Continue with GitHub
        </Button>
      </div>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        New here? <Link to="/auth/register" className="font-medium text-primary hover:underline">Create an account</Link>
      </p>
    </AuthShell>
  );
}

export function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-dvh place-items-center bg-gradient-to-br from-primary/5 via-background to-fuchsia-500/5 px-4 py-16">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link to="/" className="text-xl font-semibold tracking-tight">
            BurgasFrame<span className="text-primary">.</span>
          </Link>
        </div>
        <div className="rounded-3xl border bg-card p-8 shadow-lift">
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
          <div className="mt-6">{children}</div>
        </div>
      </div>
    </div>
  );
}

export function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.2 1.3-1.6 3.8-5.5 3.8-3.3 0-6-2.7-6-6.1s2.7-6.1 6-6.1c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.7 3 14.6 2 12 2 6.9 2 2.8 6.1 2.8 11.2S6.9 20.4 12 20.4c6.9 0 9.5-4.8 9.5-7.3 0-.5-.1-.9-.1-1.2H12z"/>
    </svg>
  );
}
