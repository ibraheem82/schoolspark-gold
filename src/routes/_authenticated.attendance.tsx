import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Save } from "lucide-react";
import { DashboardShell, Card } from "@/components/DashboardShell";
import { classes, students } from "@/lib/mockData";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/attendance")({
  head: () => ({ meta: [{ title: "Attendance — SchoolSync" }] }),
  component: AttendancePage,
});

type Status = "present" | "absent" | "late" | "excused" | "half-day";

function AttendancePage() {
  const [classId, setClassId] = useState(classes[0].id);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const roster = useMemo(() => students.filter((s) => s.classId === classId), [classId]);
  const [marks, setMarks] = useState<Record<string, Status>>({});

  function setStatus(id: string, st: Status) { setMarks((m) => ({ ...m, [id]: st })); }

  return (
    <DashboardShell title="Attendance">
      <Card className="p-4 mb-4 flex flex-wrap gap-3 items-end">
        <label className="block">
          <span className="block text-xs font-bold uppercase tracking-[0.08em] text-muted-foreground mb-1.5">Class</span>
          <select className="auth-input" value={classId} onChange={(e) => setClassId(e.target.value)}>
            {classes.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </label>
        <label className="block">
          <span className="block text-xs font-bold uppercase tracking-[0.08em] text-muted-foreground mb-1.5">Date</span>
          <input type="date" className="auth-input" value={date} onChange={(e) => setDate(e.target.value)} />
        </label>
        <div className="ml-auto">
          <button onClick={() => { toast.success(`Saved attendance for ${roster.length} students`); }} className="inline-flex items-center gap-1.5 rounded-lg bg-gold text-gold-foreground px-4 py-2.5 text-sm font-semibold hover:opacity-95">
            <Save className="h-4 w-4" /> Save All
          </button>
        </div>
      </Card>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground">
              <tr><th className="text-left px-4 py-3 font-semibold">Student</th><th className="text-left px-4 py-3 font-semibold">Roll</th><th className="text-left px-4 py-3 font-semibold">Status</th></tr>
            </thead>
            <tbody className="divide-y divide-border">
              {roster.map((s) => {
                const st = marks[s.id];
                const rowBg = st === "present" ? "bg-success/5" : st === "absent" ? "bg-error/5" : st === "late" ? "bg-gold/5" : "";
                return (
                  <tr key={s.id} className={rowBg}>
                    <td className="px-4 py-3 font-medium">{s.firstName} {s.lastName}</td>
                    <td className="px-4 py-3 font-mono-tab">{s.rollNo}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1.5">
                        {(["present", "absent", "late", "excused", "half-day"] as const).map((opt) => (
                          <button key={opt} onClick={() => setStatus(s.id, opt)} className={`rounded-md border px-2.5 py-1 text-xs font-semibold capitalize transition ${st === opt ? "bg-primary text-white border-primary" : "border-border text-muted-foreground hover:border-primary hover:text-primary"}`}>{opt}</button>
                        ))}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </DashboardShell>
  );
}