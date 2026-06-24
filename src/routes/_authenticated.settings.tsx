import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { DashboardShell, Card, StatusBadge, Avatar } from "@/components/DashboardShell";
import { getStoredUser } from "@/lib/auth";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/settings")({
  head: () => ({ meta: [{ title: "Settings — SchoolSync" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  const user = getStoredUser();
  const [tab, setTab] = useState<"personal" | "password" | "account">("personal");
  if (!user) return null;
  return (
    <DashboardShell title="Settings">
      <div className="grid lg:grid-cols-[220px_1fr] gap-6">
        <Card className="p-3 h-fit">
          {(["personal", "password", "account"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`relative w-full text-left rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${tab === t ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}>
              {tab === t && <span className="absolute left-0 top-2 bottom-2 w-[3px] rounded-r bg-gold" />}
              {t === "personal" ? "Personal Info" : t === "password" ? "Change Password" : "Account"}
            </button>
          ))}
        </Card>

        <Card className="p-6">
          {tab === "personal" && (
            <>
              <div className="flex items-center gap-5 mb-6">
                <Avatar name={`${user.firstName} ${user.lastName}`} className="h-20 w-20 text-2xl" />
                <div>
                  <button className="rounded-lg border border-border px-3 py-1.5 text-sm font-semibold hover:bg-muted">Change Avatar</button>
                  <p className="mt-2 text-xs text-muted-foreground">PNG or JPG, up to 2MB.</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="First Name"><input className="auth-input" defaultValue={user.firstName} /></Field>
                <Field label="Last Name"><input className="auth-input" defaultValue={user.lastName} /></Field>
                <Field label="Phone"><input className="auth-input" defaultValue={user.phone} /></Field>
                <Field label="Address"><input className="auth-input" placeholder="123 Main St" /></Field>
              </div>
              <div className="mt-6">
                <button onClick={() => toast.success("Profile updated")} className="rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold">Save Changes</button>
              </div>
            </>
          )}
          {tab === "password" && (
            <div className="max-w-md space-y-4">
              <Field label="Current Password"><input type="password" className="auth-input" /></Field>
              <Field label="New Password"><input type="password" className="auth-input" /></Field>
              <Field label="Confirm New Password"><input type="password" className="auth-input" /></Field>
              <button onClick={() => toast.success("Password updated")} className="rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold">Update Password</button>
            </div>
          )}
          {tab === "account" && (
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-5 text-sm">
              <Info label="Email" value={user.email} />
              <Info label="Role" extra={<StatusBadge status={user.role} />} />
              <Info label="Status" extra={<StatusBadge status={user.status} />} />
              <Info label="Last Login" value={user.lastLogin ? new Date(user.lastLogin).toLocaleString() : "—"} />
              <Info label="Member Since" value={new Date(user.createdAt).toLocaleDateString()} />
            </div>
          )}
        </Card>
      </div>
    </DashboardShell>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (<label className="block"><span className="block text-xs font-bold uppercase tracking-[0.08em] text-muted-foreground mb-1.5">{label}</span>{children}</label>);
}
function Info({ label, value, extra }: { label: string; value?: string; extra?: React.ReactNode }) {
  return (<div><div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">{label}</div>{extra ? extra : <div className="font-medium">{value}</div>}</div>);
}