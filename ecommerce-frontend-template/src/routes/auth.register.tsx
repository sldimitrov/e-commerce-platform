import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { AuthShell, GoogleIcon } from "./auth.login";

export const Route = createFileRoute("/auth/register")({
  head: () => ({ meta: [{ title: "Create account — BurgasFrame" }] }),
  component: RegisterPage,
});

function RegisterPage() {
  const navigate = useNavigate();
  return (
    <AuthShell title="Create your account" subtitle="Join BurgasFrame — it takes less than a minute.">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          toast.success("Account created");
          navigate({ to: "/" });
        }}
        className="space-y-4"
      >
        <div className="grid gap-1.5">
          <Label htmlFor="name">Full name</Label>
          <Input id="name" required placeholder="Jane Doe" />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" required placeholder="you@example.com" />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" required placeholder="At least 8 characters" />
        </div>
        <Button type="submit" size="lg" className="w-full rounded-full shadow-glow">Create account</Button>
      </form>

      <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
        <Separator className="flex-1" /> OR <Separator className="flex-1" />
      </div>

      <div className="grid gap-2">
        <Button variant="outline" className="rounded-full" size="lg"><GoogleIcon /> Sign up with Google</Button>
        <Button variant="outline" className="rounded-full" size="lg"><Github /> Sign up with GitHub</Button>
      </div>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account? <Link to="/auth/login" className="font-medium text-primary hover:underline">Sign in</Link>
      </p>
    </AuthShell>
  );
}
