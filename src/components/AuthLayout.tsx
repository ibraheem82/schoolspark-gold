import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { GraduationCap, Sparkles } from "lucide-react";

export function AuthLayout({ children, title, subtitle }: { children: ReactNode; title: string; subtitle?: string }) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <aside className="hidden lg:flex relative bg-[linear-gradient(160deg,var(--navy)_0%,var(--primary)_100%)] text-white p-12 flex-col justify-between overflow-hidden">
        <div className="absolute inset-0 opacity-15" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-gold/20 blur-3xl" />
        <Link to="/" className="relative flex items-center gap-2">
          <div className="grid h-10 w-10 place-items-center rounded-md bg-gold text-gold-foreground font-bold">S</div>
          <span className="font-bold text-xl tracking-tight">SchoolSync</span>
        </Link>
        <div className="relative max-w-sm">
          <Sparkles className="h-8 w-8 text-gold mb-5" />
          <p className="text-2xl font-semibold leading-snug tracking-tight">
            "We moved 1,200 students, 80 teachers, and our entire fee system onto SchoolSync in a single weekend."
          </p>
          <div className="mt-6 flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-gold text-gold-foreground font-bold">CE</div>
            <div>
              <div className="font-semibold text-sm">Mrs. Chioma Eze</div>
              <div className="text-xs text-white/70">Principal · Bright Horizons Academy</div>
            </div>
          </div>
        </div>
        <div className="relative text-xs text-white/60 flex items-center gap-1.5">
          <GraduationCap className="h-3.5 w-3.5" /> Trusted by 2,000+ schools across 14 countries
        </div>
      </aside>

      <main className="flex items-center justify-center bg-card p-6 sm:p-12">
        <div className="w-full max-w-md">
          <Link to="/" className="lg:hidden mb-8 flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-md bg-primary text-white font-bold">S</div>
            <span className="font-bold text-lg tracking-tight">SchoolSync</span>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">{title}</h1>
          {subtitle && <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>}
          <div className="mt-8">{children}</div>
        </div>
      </main>
    </div>
  );
}