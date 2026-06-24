import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";

export const Route = createFileRoute("/verify-email")({
  head: () => ({ meta: [{ title: "Email Verified — SchoolSync" }] }),
  component: VerifyEmailPage,
});

function VerifyEmailPage() {
  return (
    <div className="min-h-screen grid place-items-center bg-background p-6">
      <div className="max-w-md w-full text-center bg-card rounded-2xl shadow-xl ring-1 ring-border p-10">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-gold/15 text-gold">
          <Check className="h-10 w-10" />
        </div>
        <h1 className="mt-6 text-2xl font-bold tracking-tight">Your email has been verified!</h1>
        <p className="mt-3 text-sm text-muted-foreground">Your SchoolSync account is now active. You can sign in and start managing your school.</p>
        <Link to="/login" className="mt-8 inline-block rounded-lg bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold hover:opacity-95">Go to Login</Link>
      </div>
    </div>
  );
}