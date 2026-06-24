import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";
import { DashboardShell, Card, PrimaryButton, StatusBadge, Avatar } from "@/components/DashboardShell";
import { teachers } from "@/lib/mockData";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/teachers")({
  head: () => ({ meta: [{ title: "Teachers — SchoolSync" }] }),
  component: TeachersPage,
});

function TeachersPage() {
  const [q, setQ] = useState("");
  const list = useMemo(() => teachers.filter((t) => `${t.firstName} ${t.lastName} ${t.employeeId}`.toLowerCase().includes(q.toLowerCase())), [q]);
  return (
    <DashboardShell title="Teachers" actions={<PrimaryButton onClick={() => toast.info("Demo only")}><Plus className="h-4 w-4" /> Add Teacher</PrimaryButton>}>
      <Card className="p-4 mb-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name or employee ID" className="auth-input pl-9" />
        </div>
      </Card>
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="text-left px-4 py-3 font-semibold">Teacher</th>
                <th className="text-left px-4 py-3 font-semibold">Employee ID</th>
                <th className="text-left px-4 py-3 font-semibold">Designation</th>
                <th className="text-left px-4 py-3 font-semibold">Department</th>
                <th className="text-left px-4 py-3 font-semibold">Qualification</th>
                <th className="text-left px-4 py-3 font-semibold">Joined</th>
                <th className="text-left px-4 py-3 font-semibold">Status</th>
                <th className="text-right px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {list.map((t) => (
                <tr key={t.id} className="hover:bg-primary/[0.04]">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar name={`${t.firstName} ${t.lastName}`} />
                      <div>
                        <div className="font-medium">{t.firstName} {t.lastName}</div>
                        <div className="text-xs text-muted-foreground">{t.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono-tab text-xs">{t.employeeId}</td>
                  <td className="px-4 py-3">{t.designation}</td>
                  <td className="px-4 py-3 text-muted-foreground">{t.department}</td>
                  <td className="px-4 py-3">{t.qualification}</td>
                  <td className="px-4 py-3 font-mono-tab text-xs">{t.joiningDate}</td>
                  <td className="px-4 py-3"><StatusBadge status={t.status} /></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-primary"><Pencil className="h-4 w-4" /></button>
                      <button className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-error" onClick={() => toast.error("Delete is disabled in demo")}><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </DashboardShell>
  );
}