import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { AuthLayout } from "@/components/AuthLayout";
import { signIn } from "@/lib/auth";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Create Account — SchoolSync" }] }),
  component: RegisterPage,
});

function pwStrength(pw: string): { score: number; label: string; color: string } {
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  if (pw.length >= 12) s++;
  const map = [
    { label: "Too weak", color: "bg-error" },
    { label: "Weak", color: "bg-error" },
    { label: "Fair", color: "bg-warning" },
    { label: "Good", color: "bg-gold" },
    { label: "Strong", color: "bg-success" },
    { label: "Excellent", color: "bg-success" },
  ];
  return { score: s, ...map[s] };
}

function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "", role: "admin", phone: "" });
  const [submitted, setSubmitted] = useState(false);
  const strength = useMemo(() => pwStrength(form.password), [form.password]);

  function update<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    toast.success("Account created — signing you in (demo).");
    setTimeout(() => {
      signIn(form.email, form.password);
      navigate({ to: "/dashboard" });
    }, 900);
  }

  return (
    <AuthLayout title="Create your account" subtitle="Start managing your school in minutes.">
      {submitted && (
        <div className="mb-5 rounded-md border border-primary/30 bg-primary/10 p-3 text-sm text-primary">
          Check your email to verify your account before logging in.
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <Field label="First Name"><input className="auth-input" value={form.firstName} onChange={(e) => update("firstName", e.target.value)} required /></Field>
          <Field label="Last Name"><input className="auth-input" value={form.lastName} onChange={(e) => update("lastName", e.target.value)} required /></Field>
        </div>
        <Field label="Email"><input type="email" className="auth-input" value={form.email} onChange={(e) => update("email", e.target.value)} required /></Field>
        <Field label="Password">
          <input type="password" className="auth-input" value={form.password} onChange={(e) => update("password", e.target.value)} required />
          {form.password && (
            <div className="mt-2">
              <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                <div className={`h-full ${strength.color} transition-all`} style={{ width: `${(strength.score / 5) * 100}%` }} />
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{strength.label}</p>
            </div>
          )}
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Role">
            <select className="auth-input" value={form.role} onChange={(e) => update("role", e.target.value)}>
              <option value="admin">Admin</option>
              <option value="teacher">Teacher</option>
              <option value="student">Student</option>
              <option value="parent">Parent</option>
            </select>
          </Field>
          <Field label="Phone (optional)"><input className="auth-input" value={form.phone} onChange={(e) => update("phone", e.target.value)} /></Field>
        </div>
        <button type="submit" className="w-full rounded-lg bg-primary text-primary-foreground py-3 text-sm font-semibold hover:opacity-95">Create Account</button>
      </form>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account? <Link to="/login" className="text-primary font-medium hover:underline">Sign in</Link>
      </p>
    </AuthLayout>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (<label className="block"><span className="block text-xs font-bold uppercase tracking-[0.08em] text-muted-foreground mb-2">{label}</span>{children}</label>);
}