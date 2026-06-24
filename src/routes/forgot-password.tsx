import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AuthLayout } from "@/components/AuthLayout";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({ meta: [{ title: "Forgot Password — SchoolSync" }] }),
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  return (
    <AuthLayout title="Forgot password?" subtitle="We'll email you a link to reset it.">
      {sent ? (
        <div className="rounded-md border border-success/30 bg-success/10 p-4 text-sm text-success">
          If an account exists for that email, a reset link is on its way.
        </div>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-5">
          <label className="block">
            <span className="block text-xs font-bold uppercase tracking-[0.08em] text-muted-foreground mb-2">Email</span>
            <input type="email" required className="auth-input" placeholder="you@school.edu" />
          </label>
          <button className="w-full rounded-lg bg-gold text-gold-foreground py-3 text-sm font-semibold hover:opacity-95">Send Reset Link</button>
        </form>
      )}
      <p className="mt-6 text-center text-sm text-muted-foreground">
        <Link to="/login" className="text-primary font-medium hover:underline">Back to login</Link>
      </p>
    </AuthLayout>
  );
}