import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { GraduationCap, Users, School, ClipboardCheck, BarChart3, Wallet, Check, Lock, Megaphone, Twitter, Facebook, Linkedin, Instagram, Star, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SchoolSync — Manage Your School Smarter" },
      { name: "description", content: "The all-in-one platform for student records, attendance, grades, fees, and communication — built for modern educational institutions." },
      { property: "og:title", content: "SchoolSync — Manage Your School Smarter" },
      { property: "og:description", content: "The all-in-one platform for student records, attendance, grades, fees, and communication." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <Hero />
      <StatsBar />
      <Features />
      <HowItWorks />
      <AnnouncementsPreview />
      <Roles />
      <CtaBanner />
      <SiteFooter />
    </div>
  );
}

function SiteHeader() {
  return (
    <header className="absolute top-0 left-0 right-0 z-20">
      <div className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-md bg-gold text-gold-foreground font-bold">S</div>
          <span className="text-white font-bold tracking-tight text-lg">SchoolSync</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-white/80 text-sm font-medium">
          <a href="#features" className="hover:text-white">Features</a>
          <a href="#how" className="hover:text-white">How it works</a>
          <a href="#roles" className="hover:text-white">Roles</a>
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/login" className="text-white/90 hover:text-white text-sm font-medium">Login</Link>
          <Link to="/register" className="rounded-lg bg-gold px-4 py-2 text-sm font-semibold text-gold-foreground hover:bg-[color:var(--gold-light)] transition-colors shadow-lg">Get Started</Link>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(135deg,var(--navy)_0%,var(--primary)_100%)]">
      {/* grid lines */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
      }} />
      {/* glow */}
      <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-gold/20 blur-3xl" />
      <div className="absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-primary/30 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 pt-36 pb-28 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-semibold tracking-wider text-gold uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" /> School Management OS
          </span>
          <h1 className="mt-6 text-5xl sm:text-6xl font-extrabold text-white leading-[1.05] tracking-[-0.03em]">
            Manage Your School <span className="text-gold">Smarter</span>
          </h1>
          <p className="mt-6 text-lg text-white/80 max-w-xl leading-relaxed">
            The all-in-one platform for student records, attendance, grades, fees, and communication — built for modern educational institutions.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/register" className="inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-3.5 text-sm font-semibold text-gold-foreground shadow-xl hover:bg-[color:var(--gold-light)] transition-all hover:-translate-y-0.5">
              Get Started Free <ArrowRight className="h-4 w-4" />
            </Link>
            <a href="#how" className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors">
              See How It Works
            </a>
          </div>
        </div>
        <HeroMockup />
      </div>
    </section>
  );
}

function HeroMockup() {
  return (
    <div className="relative hidden lg:block">
      <div className="absolute inset-0 -m-6 rounded-3xl bg-gold/10 blur-2xl" />
      <div className="relative rounded-2xl bg-white shadow-2xl p-5 ring-1 ring-black/5 rotate-1">
        <div className="flex items-center gap-1.5 mb-4">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
          <div className="ml-3 h-5 flex-1 rounded bg-muted" />
        </div>
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[
            { label: "Students", value: "1,284", color: "bg-primary text-white" },
            { label: "Present today", value: "94%", color: "bg-gold text-gold-foreground" },
            { label: "Fees paid", value: "₦18.4M", color: "bg-navy text-white" },
          ].map((c) => (
            <div key={c.label} className={`rounded-xl p-3 ${c.color}`}>
              <div className="text-xs opacity-80">{c.label}</div>
              <div className="text-xl font-bold mt-1">{c.value}</div>
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-border p-4">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Attendance this week</div>
          <div className="flex items-end gap-2 h-24">
            {[70, 85, 62, 92, 78, 88, 95].map((h, i) => (
              <div key={i} className="flex-1 rounded-t-md bg-gradient-to-t from-primary to-gold" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
      </div>
      <div className="absolute -bottom-6 -left-6 rounded-xl bg-white shadow-xl p-4 ring-1 ring-black/5 -rotate-3">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-gold text-gold-foreground font-bold">AO</div>
          <div>
            <div className="text-sm font-semibold">Adaeze Okonkwo</div>
            <div className="text-xs text-muted-foreground">JSS 2A · Present</div>
          </div>
          <Check className="h-5 w-5 text-success" />
        </div>
      </div>
    </div>
  );
}

function StatsBar() {
  const items = [
    { v: "50,000+", l: "Students Managed" },
    { v: "2,000+", l: "Schools Trust Us" },
    { v: "99.9%", l: "Uptime Guaranteed" },
    { v: "4.9★", l: "Average Rating" },
  ];
  return (
    <div className="mx-auto max-w-7xl px-6 -mt-12 relative z-10">
      <div className="rounded-2xl bg-card shadow-xl ring-1 ring-border grid grid-cols-2 md:grid-cols-4">
        {items.map((it, i) => (
          <div key={it.l} className={`px-6 py-8 text-center ${i < items.length - 1 ? "md:border-r border-border" : ""}`}>
            <div className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight">{it.v}</div>
            <div className="mt-1 text-sm text-muted-foreground font-medium">{it.l}</div>
            {i < items.length - 1 && <div className="md:hidden mt-6 -mb-8 h-px bg-border" />}
          </div>
        ))}
      </div>
    </div>
  );
}

function Features() {
  const items = [
    { icon: GraduationCap, title: "Student Management", desc: "Admissions, profiles, parent info, medical records — all in one place." },
    { icon: Users, title: "Teacher Management", desc: "Staff records, designations, qualifications, payroll details." },
    { icon: School, title: "Class & Timetable", desc: "Class setup, academic years, capacity tracking made simple." },
    { icon: ClipboardCheck, title: "Attendance Tracking", desc: "Daily mark, bulk entry, automatic percentage summaries." },
    { icon: BarChart3, title: "Grades & GPA", desc: "Auto-calculated grades, GPA, and detailed exam records." },
    { icon: Wallet, title: "Fee Management", desc: "Invoicing, payments, receipts, and overdue tracking." },
  ];
  return (
    <section id="features" className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center text-4xl md:text-5xl font-bold text-primary tracking-tight gold-underline">
          Everything Your School Needs
        </h2>
        <p className="mt-6 text-center text-muted-foreground max-w-2xl mx-auto">
          Six tightly integrated modules. Zero plugins. Built around the realities of running a school in 2026.
        </p>
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((f) => (
            <div key={f.title} className="group relative rounded-xl bg-card border border-border p-7 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 hover:border-l-4 hover:border-l-gold">
              <div className="grid h-12 w-12 place-items-center rounded-lg bg-gold/15 text-gold mb-5">
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: 1, t: "Register & Verify", d: "Create your institution account in under 2 minutes." },
    { n: 2, t: "Set Up Classes", d: "Configure academic year, classes, and sections." },
    { n: 3, t: "Add Students & Teachers", d: "Import in bulk or create profiles individually." },
    { n: 4, t: "Start Managing", d: "Attendance, grades, and fees — live and in real time." },
  ];
  return (
    <section id="how" className="relative bg-navy text-white py-24">
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: "radial-gradient(circle at 20% 30%, var(--gold) 0, transparent 40%), radial-gradient(circle at 80% 70%, var(--primary) 0, transparent 40%)",
      }} />
      <div className="relative mx-auto max-w-7xl px-6">
        <h2 className="text-center text-4xl md:text-5xl font-bold tracking-tight">How It Works</h2>
        <div className="mt-3 mx-auto h-[3px] w-16 bg-gold rounded-full" />
        <div className="mt-16 grid md:grid-cols-4 gap-10 relative">
          <div className="hidden md:block absolute top-7 left-[12%] right-[12%] border-t-2 border-dashed border-gold/50" />
          {steps.map((s) => (
            <div key={s.n} className="relative text-center">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gold text-gold-foreground text-2xl font-extrabold ring-8 ring-navy">
                {s.n}
              </div>
              <h3 className="mt-5 text-lg font-semibold">{s.t}</h3>
              <p className="mt-2 text-sm text-white/70">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AnnouncementsPreview() {
  const items = [
    { type: "Emergency", color: "bg-error/10 text-error border-error/30", title: "Fire Drill — Friday at 10 AM", date: "2 days ago" },
    { type: "Academic", color: "bg-primary/10 text-primary border-primary/30", title: "First Term Examination Timetable", date: "5 days ago" },
    { type: "General", color: "bg-gold/15 text-gold border-gold/30", title: "Mid-term Break Schedule Released", date: "1 week ago" },
  ];
  return (
    <section className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2 text-gold">
              <Megaphone className="h-5 w-5" />
              <span className="text-xs font-bold uppercase tracking-[0.08em]">Announcements</span>
            </div>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-foreground tracking-tight">Keep everyone in the loop</h2>
          </div>
        </div>
        <div className="mt-10 grid md:grid-cols-3 gap-5">
          {items.map((a) => (
            <div key={a.title} className="rounded-xl bg-card border border-border p-6 shadow-sm">
              <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${a.color}`}>{a.type}</span>
              <h3 className="mt-4 text-base font-semibold text-foreground">{a.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">Published {a.date}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Roles() {
  const cards: Array<{ name: string; featured?: boolean; perms: Array<[string, boolean]> }> = [
    { name: "Admin", featured: true, perms: [["Manage students", true], ["Manage teachers", true], ["Manage fees", true], ["System settings", true]] },
    { name: "Teacher", perms: [["View students", true], ["Mark attendance", true], ["Enter grades", true], ["Manage fees", false]] },
    { name: "Student", perms: [["View own grades", true], ["View own fees", true], ["Mark attendance", false], ["Manage classes", false]] },
    { name: "Parent", perms: [["View child profile", true], ["View child grades", true], ["Pay fees", true], ["System settings", false]] },
  ];
  return (
    <section id="roles" className="py-24 bg-card">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center text-4xl md:text-5xl font-bold text-primary tracking-tight gold-underline">Roles & Permissions</h2>
        <p className="mt-6 text-center text-muted-foreground max-w-2xl mx-auto">Fine-grained access for every kind of user in your institution.</p>
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map((c) => (
            <div key={c.name} className={`rounded-xl bg-background p-6 shadow-sm ${c.featured ? "border-2 border-gold ring-4 ring-gold/10" : "border border-border"}`}>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-foreground">{c.name}</h3>
                {c.featured && <span className="rounded-full bg-gold/15 text-gold text-[10px] font-bold uppercase tracking-wider px-2 py-0.5">Most powerful</span>}
              </div>
              <ul className="mt-5 space-y-3">
                {c.perms.map(([label, ok]) => (
                  <li key={label} className="flex items-center gap-3 text-sm">
                    {ok ? <Check className="h-4 w-4 text-gold shrink-0" /> : <Lock className="h-4 w-4 text-muted-foreground shrink-0" />}
                    <span className={ok ? "text-foreground" : "text-muted-foreground"}>{label}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaBanner() {
  return (
    <section className="bg-primary">
      <div className="mx-auto max-w-7xl px-6 py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Ready to transform how your school operates?</h2>
        <p className="mt-4 text-white/80 max-w-xl mx-auto">Join 2,000+ schools already running on SchoolSync. Free 30-day trial. No credit card required.</p>
        <Link to="/register" className="mt-8 inline-flex items-center gap-2 rounded-lg bg-gold px-7 py-3.5 text-sm font-semibold text-gold-foreground shadow-xl hover:bg-[color:var(--gold-light)] transition-all">
          Create Free Account <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="bg-navy text-white relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gold/60" />
      <div className="mx-auto max-w-7xl px-6 py-16 grid md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-md bg-gold text-gold-foreground font-bold">S</div>
            <span className="font-bold tracking-tight text-lg">SchoolSync</span>
          </div>
          <p className="mt-4 text-sm text-white/70 max-w-xs">School management software built for educators, by educators.</p>
          <div className="mt-5 flex items-center gap-3 text-white/60">
            <a href="#" aria-label="Twitter" className="hover:text-gold"><Twitter className="h-4 w-4" /></a>
            <a href="#" aria-label="Facebook" className="hover:text-gold"><Facebook className="h-4 w-4" /></a>
            <a href="#" aria-label="LinkedIn" className="hover:text-gold"><Linkedin className="h-4 w-4" /></a>
            <a href="#" aria-label="Instagram" className="hover:text-gold"><Instagram className="h-4 w-4" /></a>
          </div>
        </div>
        <FooterCol title="Product" links={["Features", "Roles", "Pricing", "Changelog"]} />
        <FooterCol title="Support" links={["Help Center", "Contact Support", "Status", "API Docs"]} />
        <FooterCol title="Contact" links={["hello@schoolsync.edu", "+234 800 SCHOOL", "Lagos, Nigeria"]} />
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-6 flex items-center justify-between text-xs text-white/60 flex-wrap gap-3">
          <div className="flex items-center gap-1.5"><Star className="h-3.5 w-3.5 text-gold" /> © 2026 SchoolSync. Built for educators, by educators.</div>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h4 className="text-xs font-bold uppercase tracking-[0.08em] text-gold">{title}</h4>
      <ul className="mt-4 space-y-2.5 text-sm text-white/75">
        {links.map((l) => (<li key={l}><a href="#" className="hover:text-white">{l}</a></li>))}
      </ul>
    </div>
  );
}
