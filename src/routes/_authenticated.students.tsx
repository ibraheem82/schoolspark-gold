import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Plus, Search, Eye, Pencil, Trash2 } from "lucide-react";
import { DashboardShell, Card, PrimaryButton, StatusBadge, Avatar } from "@/components/DashboardShell";
import { students, classes } from "@/lib/mockData";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/students")({
  head: () => ({ meta: [{ title: "Students — SchoolSync" }] }),
  component: StudentsPage,
});

function StudentsPage() {
  const [q, setQ] = useState("");
  const [classFilter, setClassFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [page, setPage] = useState(1);
  const perPage = 10;

  const filtered = useMemo(() => students.filter((s) => {
    const matchQ = `${s.firstName} ${s.lastName} ${s.admissionNo}`.toLowerCase().includes(q.toLowerCase());
    const matchC = classFilter === "all" || s.classId === classFilter;
    const matchS = statusFilter === "all" || s.status === statusFilter;
    return matchQ && matchC && matchS;
  }), [q, classFilter, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageItems = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <DashboardShell title="Students" actions={<PrimaryButton onClick={() => setDrawerOpen(true)}><Plus className="h-4 w-4" /> Add Student</PrimaryButton>}>
      <Card className="p-4 mb-4">
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input value={q} onChange={(e) => { setQ(e.target.value); setPage(1); }} placeholder="Search by name or admission no." className="auth-input pl-9" />
          </div>
          <select value={classFilter} onChange={(e) => { setClassFilter(e.target.value); setPage(1); }} className="auth-input w-auto">
            <option value="all">All Classes</option>
            {classes.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }} className="auth-input w-auto">
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
      </Card>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="text-left font-semibold px-4 py-3">Student</th>
                <th className="text-left font-semibold px-4 py-3">Admission No.</th>
                <th className="text-left font-semibold px-4 py-3">Class</th>
                <th className="text-left font-semibold px-4 py-3">Roll</th>
                <th className="text-left font-semibold px-4 py-3">Father</th>
                <th className="text-left font-semibold px-4 py-3">Status</th>
                <th className="text-right font-semibold px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {pageItems.map((s) => (
                <tr key={s.id} className="hover:bg-primary/[0.04] transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar name={`${s.firstName} ${s.lastName}`} />
                      <div>
                        <div className="font-medium">{s.firstName} {s.lastName}</div>
                        <div className="text-xs text-muted-foreground">{s.bloodGroup}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono-tab text-xs">{s.admissionNo}</td>
                  <td className="px-4 py-3"><span className="rounded-md bg-primary/10 text-primary px-2 py-0.5 text-xs font-semibold">{s.className}</span></td>
                  <td className="px-4 py-3 font-mono-tab">{s.rollNo}</td>
                  <td className="px-4 py-3 text-muted-foreground">{s.fatherName}</td>
                  <td className="px-4 py-3"><StatusBadge status={s.status} /></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Link to="/students/$id" params={{ id: s.id }} className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-primary" aria-label="View"><Eye className="h-4 w-4" /></Link>
                      <button className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-primary" aria-label="Edit" onClick={() => setDrawerOpen(true)}><Pencil className="h-4 w-4" /></button>
                      <button className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-error" aria-label="Delete" onClick={() => toast.error("Delete is disabled in demo")}><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-4 py-3 border-t border-border text-sm">
          <div className="text-muted-foreground">Showing {Math.min(filtered.length, (page - 1) * perPage + 1)}–{Math.min(page * perPage, filtered.length)} of {filtered.length}</div>
          <div className="flex items-center gap-1">
            <button disabled={page === 1} onClick={() => setPage((p) => p - 1)} className="px-2.5 py-1 rounded border border-border disabled:opacity-50 hover:bg-muted">Prev</button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).slice(0, 5).map((p) => (
              <button key={p} onClick={() => setPage(p)} className={`px-3 py-1 rounded ${page === p ? "bg-primary text-white" : "border border-border hover:bg-muted"}`}>{p}</button>
            ))}
            <button disabled={page === totalPages} onClick={() => setPage((p) => p + 1)} className="px-2.5 py-1 rounded border border-border disabled:opacity-50 hover:bg-muted">Next</button>
          </div>
        </div>
      </Card>

      {drawerOpen && <StudentDrawer onClose={() => setDrawerOpen(false)} />}
    </DashboardShell>
  );
}

function StudentDrawer({ onClose }: { onClose: () => void }) {
  const [tab, setTab] = useState<"basic" | "family" | "medical" | "transport">("basic");
  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 w-full sm:w-[600px] bg-card z-50 flex flex-col shadow-2xl">
        <header className="border-b border-border px-6 py-4">
          <h2 className="text-lg font-semibold">Add Student</h2>
          <p className="text-xs text-muted-foreground">Enter the student's information below.</p>
        </header>
        <div className="border-b border-border px-6 flex gap-1">
          {(["basic", "family", "medical", "transport"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`relative px-3 py-3 text-sm font-medium capitalize ${tab === t ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}>
              {t === "basic" ? "Basic Info" : t === "family" ? "Family" : t === "medical" ? "Medical" : "Transport"}
              {tab === t && <span className="absolute left-2 right-2 bottom-0 h-[3px] bg-gold rounded" />}
            </button>
          ))}
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {tab === "basic" && (<>
            <FormField label="Admission Number"><input className="auth-input" placeholder="ADM/2026/0001" /></FormField>
            <div className="grid grid-cols-2 gap-4">
              <FormField label="First Name"><input className="auth-input" /></FormField>
              <FormField label="Last Name"><input className="auth-input" /></FormField>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField label="Class"><select className="auth-input">{classes.map((c) => <option key={c.id}>{c.name}</option>)}</select></FormField>
              <FormField label="Roll Number"><input className="auth-input" /></FormField>
            </div>
            <FormField label="Blood Group"><select className="auth-input"><option>O+</option><option>A+</option><option>B+</option><option>AB+</option></select></FormField>
          </>)}
          {tab === "family" && (<>
            <FormField label="Father's Name"><input className="auth-input" /></FormField>
            <FormField label="Father's Occupation"><input className="auth-input" /></FormField>
            <FormField label="Mother's Name"><input className="auth-input" /></FormField>
          </>)}
          {tab === "medical" && (<>
            <FormField label="Medical Conditions"><textarea className="auth-input min-h-[80px]" /></FormField>
            <FormField label="Allergies"><textarea className="auth-input min-h-[80px]" /></FormField>
            <FormField label="Emergency Contact"><input className="auth-input" /></FormField>
          </>)}
          {tab === "transport" && (<>
            <FormField label="Transport Mode"><select className="auth-input"><option>School Bus</option><option>Private</option><option>Walking</option></select></FormField>
            <FormField label="Bus Route"><input className="auth-input" /></FormField>
          </>)}
        </div>
        <footer className="border-t border-border px-6 py-4 flex justify-end gap-3">
          <button onClick={onClose} className="rounded-lg border border-border px-4 py-2 text-sm font-semibold hover:bg-muted">Cancel</button>
          <button onClick={() => { toast.success("Student saved (demo)"); onClose(); }} className="rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold">Save Student</button>
        </footer>
      </div>
    </>
  );
}

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (<label className="block"><span className="block text-xs font-bold uppercase tracking-[0.08em] text-muted-foreground mb-2">{label}</span>{children}</label>);
}