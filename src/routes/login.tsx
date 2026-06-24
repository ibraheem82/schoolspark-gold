import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, EyeOff, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { AuthLayout } from "@/components/AuthLayout";
import { signIn } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Login — SchoolSync" }] }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [showPw, setShowPw] = useState(false);
  const [email, setEmail] = useState("admin@schoolsync.edu");
  const [password, setPassword] = useState("password");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }
    signIn(email, password);
    toast.success("Welcome back!");
    navigate({ to: "/dashboard" });
    setError(null);
  }

  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to your SchoolSync account.">
      <form onSubmit={handleSubmit} className="space-y-5">
        <Field label="Email">
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="auth-input" placeholder="you@school.edu" />
        </Field>
        <Field label="Password">
          <div className="relative">
            <input value={password} onChange={(e) => setPassword(e.target.value)} type={showPw ? "text" : "password"} className="auth-input pr-10" placeholder="••••••••" />
            <button type="button" onClick={() => setShowPw((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {error && <p className="mt-1.5 text-xs text-error flex items-center gap-1"><AlertTriangle className="h-3 w-3" /> {error}</p>}
        </Field>
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-muted-foreground"><input type="checkbox" className="rounded border-border" /> Remember me</label>
          <Link to="/forgot-password" className="text-primary font-medium hover:underline">Forgot Password?</Link>
        </div>
        <button type="submit" className="w-full rounded-lg bg-primary text-primary-foreground py-3 text-sm font-semibold hover:opacity-95 transition">Login</button>
      </form>
      <div className="my-7 flex items-center gap-3 text-xs text-muted-foreground">
        <div className="h-px flex-1 bg-border" /> Don't have an account? <div className="h-px flex-1 bg-border" />
      </div>
      <Link to="/register" className="block w-full rounded-lg border border-border py-3 text-sm font-semibold text-center hover:bg-muted transition">Register</Link>
    </AuthLayout>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs font-bold uppercase tracking-[0.08em] text-muted-foreground mb-2">{label}</span>
      {children}
    </label>
  );
}