import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AuthLayout } from "@/components/AuthLayout";

export const Route = createFileRoute("/reset-password")({
  head: () => ({ meta: [{ title: "Reset Password — SchoolSync" }] }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [pw, setPw] = useState("");
  const [cpw, setCpw] = useState("");
  return (
    <AuthLayout title="Set a new password" subtitle="Choose a strong password you'll remember.">
      <form onSubmit={(e) => { e.preventDefault(); if (pw !== cpw) return toast.error("Passwords do not match"); toast.success("Password updated"); navigate({ to: "/login" }); }} className="space-y-5">
        <label className="block"><span className="block text-xs font-bold uppercase tracking-[0.08em] text-muted-foreground mb-2">New Password</span><input type="password" required className="auth-input" value={pw} onChange={(e) => setPw(e.target.value)} /></label>
        <label className="block"><span className="block text-xs font-bold uppercase tracking-[0.08em] text-muted-foreground mb-2">Confirm Password</span><input type="password" required className="auth-input" value={cpw} onChange={(e) => setCpw(e.target.value)} /></label>
        <button className="w-full rounded-lg bg-gold text-gold-foreground py-3 text-sm font-semibold hover:opacity-95">Reset Password</button>
      </form>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        <Link to="/login" className="text-primary font-medium hover:underline">Back to login</Link>
      </p>
    </AuthLayout>
  );
}