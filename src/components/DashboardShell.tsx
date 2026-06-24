import { useState, type ReactNode } from "react";
import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { LayoutDashboard, GraduationCap, Users, School, ClipboardCheck, BarChart3, Wallet, Megaphone, Settings, Bell, ChevronDown, LogOut, Menu, X } from "lucide-react";
import { getStoredUser, signOut } from "@/lib/auth";
import { toast } from "sonner";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/students", label: "Students", icon: GraduationCap },
  { to: "/teachers", label: "Teachers", icon: Users },
  { to: "/classes", label: "Classes", icon: School },
  { to: "/attendance", label: "Attendance", icon: ClipboardCheck },
  { to: "/grades", label: "Grades", icon: BarChart3 },
  { to: "/fees", label: "Fees", icon: Wallet },
  { to: "/announcements", label: "Announcements", icon: Megaphone },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

export function DashboardShell({ title, actions, children }: { title: string; actions?: ReactNode; children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const user = getStoredUser();

  function handleLogout() {
    signOut();
    toast.success("Logged out");
    navigate({ to: "/login" });
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar (desktop) */}
      <aside className="hidden lg:flex fixed inset-y-0 left-0 w-[260px] bg-navy text-white flex-col">
        <SidebarContent pathname={pathname} user={user} onLogout={handleLogout} />
      </aside>

      {/* Sidebar (mobile drawer) */}
      {mobileOpen && (
        <>
          <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setMobileOpen(false)} />
          <aside className="lg:hidden fixed inset-y-0 left-0 w-[260px] bg-navy text-white flex flex-col z-50">
            <SidebarContent pathname={pathname} user={user} onLogout={handleLogout} onNavigate={() => setMobileOpen(false)} />
          </aside>
        </>
      )}

      <div className="lg:pl-[260px] flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-card border-b border-border h-16 flex items-center px-4 lg:px-6 gap-3">
          <button className="lg:hidden p-2 -ml-2 rounded-md hover:bg-muted" onClick={() => setMobileOpen(true)}>
            <Menu className="h-5 w-5" />
          </button>
          <h1 className="text-lg sm:text-xl font-bold tracking-tight text-foreground truncate flex-1">{title}</h1>
          <div className="flex items-center gap-2 sm:gap-3">
            {actions}
            <button className="relative grid h-9 w-9 place-items-center rounded-full hover:bg-muted">
              <Bell className="h-4 w-4 text-muted-foreground" />
              <span className="absolute top-1.5 right-1.5 grid h-4 w-4 place-items-center rounded-full bg-gold text-[10px] font-bold text-gold-foreground">3</span>
            </button>
            <UserMenu user={user} onLogout={handleLogout} />
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}

function SidebarContent({ pathname, user, onLogout, onNavigate }: { pathname: string; user: ReturnType<typeof getStoredUser>; onLogout: () => void; onNavigate?: () => void }) {
  return (
    <>
      <div className="h-16 flex items-center gap-2 px-5 border-b border-white/10">
        <div className="grid h-9 w-9 place-items-center rounded-md bg-gold text-gold-foreground font-bold">S</div>
        <span className="font-bold tracking-tight text-lg">SchoolSync</span>
        {onNavigate && (
          <button onClick={onNavigate} className="ml-auto p-1.5 rounded-md hover:bg-white/10"><X className="h-4 w-4" /></button>
        )}
      </div>
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {nav.map((item) => {
          const active = pathname === item.to || (item.to !== "/dashboard" && pathname.startsWith(item.to));
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={onNavigate}
              className={`relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${active ? "bg-gold/15 text-gold" : "text-white/75 hover:bg-white/5 hover:text-white"}`}
            >
              {active && <span className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-r bg-gold" />}
              <item.icon className="h-[18px] w-[18px] shrink-0" />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-3 border-t border-white/10">
        <div className="flex items-center gap-3 px-2 py-2">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gold text-gold-foreground font-bold">
            {user ? `${user.firstName[0]}${user.lastName[0]}` : "U"}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-sm font-semibold truncate">{user ? `${user.firstName} ${user.lastName}` : "Guest"}</div>
            <div className="text-[10px] uppercase tracking-wider text-gold font-bold">{user?.role ?? "—"}</div>
          </div>
          <button onClick={onLogout} className="grid h-8 w-8 place-items-center rounded-md hover:bg-white/10 text-white/80" aria-label="Logout">
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </>
  );
}

function UserMenu({ user, onLogout }: { user: ReturnType<typeof getStoredUser>; onLogout: () => void }) {
  const [open, setOpen] = useState(false);
  if (!user) return null;
  return (
    <div className="relative">
      <button onClick={() => setOpen((v) => !v)} className="flex items-center gap-2 rounded-full hover:bg-muted pl-1 pr-2 py-1">
        <div className="grid h-8 w-8 place-items-center rounded-full bg-primary text-white text-xs font-bold">{user.firstName[0]}{user.lastName[0]}</div>
        <ChevronDown className="h-3.5 w-3.5 text-muted-foreground hidden sm:block" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 mt-2 w-56 rounded-lg bg-card border border-border shadow-xl z-50 py-1.5">
            <div className="px-3 py-2 border-b border-border">
              <div className="text-sm font-semibold truncate">{user.firstName} {user.lastName}</div>
              <div className="text-xs text-muted-foreground truncate">{user.email}</div>
            </div>
            <Link to="/settings" onClick={() => setOpen(false)} className="block px-3 py-2 text-sm hover:bg-muted">Profile</Link>
            <Link to="/settings" onClick={() => setOpen(false)} className="block px-3 py-2 text-sm hover:bg-muted">Change Password</Link>
            <button onClick={onLogout} className="block w-full text-left px-3 py-2 text-sm text-error hover:bg-muted">Logout</button>
          </div>
        </>
      )}
    </div>
  );
}

// Shared UI primitives used across module pages
export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-xl bg-card border border-border shadow-sm ${className}`}>{children}</div>;
}

export function PrimaryButton({ children, onClick, type = "button" }: { children: ReactNode; onClick?: () => void; type?: "button" | "submit" }) {
  return <button type={type} onClick={onClick} className="inline-flex items-center gap-1.5 rounded-lg bg-primary text-primary-foreground px-3.5 py-2 text-sm font-semibold hover:opacity-95 transition">{children}</button>;
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    active: "bg-success/15 text-success border-success/30",
    inactive: "bg-muted text-muted-foreground border-border",
    suspended: "bg-error/15 text-error border-error/30",
    paid: "bg-success/15 text-success border-success/30",
    partial: "bg-primary/15 text-primary border-primary/30",
    pending: "bg-gold/15 text-gold border-gold/30",
    overdue: "bg-error/15 text-error border-error/30",
    waived: "bg-muted text-muted-foreground border-border",
    present: "bg-success/15 text-success border-success/30",
    absent: "bg-error/15 text-error border-error/30",
    late: "bg-gold/15 text-gold border-gold/30",
    excused: "bg-primary/15 text-primary border-primary/30",
    "half-day": "bg-warning/15 text-warning border-warning/30",
    published: "bg-success/15 text-success border-success/30",
    draft: "bg-muted text-muted-foreground border-border",
    urgent: "bg-error/15 text-error border-error/30",
    high: "bg-warning/15 text-warning border-warning/30",
    medium: "bg-gold/15 text-gold border-gold/30",
    low: "bg-muted text-muted-foreground border-border",
    general: "bg-gold/15 text-gold border-gold/30",
    academic: "bg-primary/15 text-primary border-primary/30",
    emergency: "bg-error/15 text-error border-error/30",
  };
  const cls = map[status] ?? "bg-muted text-muted-foreground border-border";
  return <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold capitalize ${cls}`}>{status}</span>;
}

export function Avatar({ name, className = "" }: { name: string; className?: string }) {
  const initials = name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
  return <div className={`grid place-items-center rounded-full bg-gold/20 text-gold font-bold ${className || "h-9 w-9 text-sm"}`}>{initials}</div>;
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return <h2 className="text-sm font-bold uppercase tracking-[0.08em] text-muted-foreground mb-3 relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[3px] after:w-10 after:bg-gold after:rounded">{children}</h2>;
}

export function EmptyState({ title, message, action }: { title: string; message: string; action?: ReactNode }) {
  return (
    <div className="text-center py-16">
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-muted text-muted-foreground mb-4">
        <School className="h-8 w-8" />
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground max-w-sm mx-auto">{message}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}