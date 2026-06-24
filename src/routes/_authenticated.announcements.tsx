import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Star, Pencil, Trash2, Send } from "lucide-react";
import { DashboardShell, Card, PrimaryButton, StatusBadge } from "@/components/DashboardShell";
import { announcements } from "@/lib/mockData";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/announcements")({
  head: () => ({ meta: [{ title: "Announcements — SchoolSync" }] }),
  component: AnnouncementsPage,
});

function AnnouncementsPage() {
  const [tab, setTab] = useState<"published" | "draft">("published");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const items = announcements.filter((a) => a.status === tab);

  return (
    <DashboardShell title="Announcements" actions={<PrimaryButton onClick={() => setDrawerOpen(true)}><Plus className="h-4 w-4" /> New Announcement</PrimaryButton>}>
      <div className="border-b border-border flex gap-1 mb-5">
        {(["published", "draft"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`relative px-4 py-2.5 text-sm font-semibold capitalize ${tab === t ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}>
            {t === "published" ? "Published" : "Drafts"} ({announcements.filter((a) => a.status === t).length})
            {tab === t && <span className="absolute left-2 right-2 bottom-0 h-[3px] bg-gold rounded" />}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {items.map((a) => (
          <Card key={a.id} className="p-5">
            <div className="flex items-center gap-2 flex-wrap">
              <StatusBadge status={a.type} />
              <StatusBadge status={a.priority} />
              {a.isImportant && <Star className="h-4 w-4 fill-gold text-gold" />}
            </div>
            <h3 className="mt-3 text-base font-semibold leading-snug">{a.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{a.content}</p>
            <div className="mt-4 flex items-center justify-between">
              <div className="text-xs text-muted-foreground">{a.publishedAt ? `Published ${a.publishedAt}` : "Not published"}</div>
              <div className="flex items-center gap-1">
                {a.status === "draft" && <button className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-primary" onClick={() => toast.success("Published (demo)")}><Send className="h-4 w-4" /></button>}
                <button className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-primary"><Pencil className="h-4 w-4" /></button>
                <button className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-error" onClick={() => toast.error("Delete is disabled in demo")}><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {drawerOpen && <AnnouncementDrawer onClose={() => setDrawerOpen(false)} />}
    </DashboardShell>
  );
}

function AnnouncementDrawer({ onClose }: { onClose: () => void }) {
  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 w-full sm:w-[560px] bg-card z-50 flex flex-col shadow-2xl">
        <header className="border-b border-border px-6 py-4"><h2 className="text-lg font-semibold">New Announcement</h2></header>
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <Field label="Title"><input className="auth-input" placeholder="Announcement title" /></Field>
          <Field label="Content"><textarea className="auth-input min-h-[140px]" placeholder="Write your announcement…" /></Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Type"><select className="auth-input"><option>General</option><option>Academic</option><option>Emergency</option></select></Field>
            <Field label="Priority"><select className="auth-input"><option>Low</option><option>Medium</option><option>High</option><option>Urgent</option></select></Field>
          </div>
          <Field label="Target Audience"><select className="auth-input"><option>All</option><option>Students & Parents</option><option>Teachers Only</option></select></Field>
          <Field label="Expires At (optional)"><input type="date" className="auth-input" /></Field>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" className="rounded border-border" /> Mark as important</label>
        </div>
        <footer className="border-t border-border px-6 py-4 flex justify-end gap-3">
          <button onClick={() => { toast.success("Draft saved"); onClose(); }} className="rounded-lg border border-border px-4 py-2 text-sm font-semibold hover:bg-muted">Save Draft</button>
          <button onClick={() => { toast.success("Published!"); onClose(); }} className="rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold">Publish Now</button>
        </footer>
      </div>
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (<label className="block"><span className="block text-xs font-bold uppercase tracking-[0.08em] text-muted-foreground mb-1.5">{label}</span>{children}</label>);
}