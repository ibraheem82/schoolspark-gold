import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { DashboardShell, Card, PrimaryButton } from "@/components/DashboardShell";
import { grades, students } from "@/lib/mockData";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/grades")({
  head: () => ({ meta: [{ title: "Grades — SchoolSync" }] }),
  component: GradesPage,
});

function gradeFor(pct: number): { grade: string; gp: number } {
  if (pct >= 90) return { grade: "A+", gp: 4.0 };
  if (pct >= 80) return { grade: "A", gp: 3.7 };
  if (pct >= 70) return { grade: "B", gp: 3.3 };
  if (pct >= 60) return { grade: "C", gp: 2.7 };
  if (pct >= 50) return { grade: "D", gp: 2.0 };
  if (pct >= 40) return { grade: "E", gp: 1.0 };
  return { grade: "F", gp: 0 };
}

function GradesPage() {
  const [marks, setMarks] = useState(0);
  const [total, setTotal] = useState(100);
  const pct = total ? (marks / total) * 100 : 0;
  const live = gradeFor(pct);
  const scale = useMemo(() => [
    { g: "A+", min: 90, color: "text-success" }, { g: "A", min: 80, color: "text-success" },
    { g: "B", min: 70, color: "text-primary" }, { g: "C", min: 60, color: "text-primary" },
    { g: "D", min: 50, color: "text-gold" }, { g: "E", min: 40, color: "text-warning" },
    { g: "F", min: 0, color: "text-error" },
  ], []);
  return (
    <DashboardShell title="Grades" actions={<PrimaryButton onClick={() => toast.success("Grade saved (demo)")}><Plus className="h-4 w-4" /> Add Grade</PrimaryButton>}>
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6">
          <h3 className="text-base font-semibold mb-4">Quick Grade Entry</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Student"><select className="auth-input">{students.slice(0, 10).map((s) => <option key={s.id}>{s.firstName} {s.lastName}</option>)}</select></Field>
            <Field label="Subject"><select className="auth-input"><option>Mathematics</option><option>English Language</option><option>Physics</option><option>Chemistry</option></select></Field>
            <Field label="Exam"><input className="auth-input" defaultValue="First Term Examination" /></Field>
            <Field label="Remarks"><input className="auth-input" placeholder="Optional" /></Field>
            <Field label="Marks Obtained"><input className="auth-input" type="number" value={marks} onChange={(e) => setMarks(Number(e.target.value))} /></Field>
            <Field label="Total Marks"><input className="auth-input" type="number" value={total} onChange={(e) => setTotal(Number(e.target.value))} /></Field>
          </div>
          <div className="mt-5 flex items-center gap-4 rounded-lg bg-muted p-4">
            <div className="flex-1">
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Live Preview</div>
              <div className="text-sm font-medium mt-0.5">{pct.toFixed(1)}% — Grade Point {live.gp.toFixed(1)}</div>
            </div>
            <div className="text-4xl font-extrabold text-primary">{live.grade}</div>
          </div>
        </Card>
        <Card className="p-6">
          <h3 className="text-base font-semibold mb-4">Grading Scale</h3>
          <ul className="space-y-2 text-sm">
            {scale.map((s) => (
              <li key={s.g} className="flex items-center justify-between">
                <span className={`text-lg font-extrabold ${s.color}`}>{s.g}</span>
                <span className="text-muted-foreground font-mono-tab">{s.min}%+</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card className="mt-6 overflow-hidden">
        <div className="px-6 py-4 border-b border-border"><h3 className="text-base font-semibold">All Grades</h3></div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground">
              <tr><th className="text-left px-4 py-3 font-semibold">Student</th><th className="text-left px-4 py-3 font-semibold">Subject</th><th className="text-left px-4 py-3 font-semibold">Exam</th><th className="text-left px-4 py-3 font-semibold">Marks</th><th className="text-left px-4 py-3 font-semibold">%</th><th className="text-left px-4 py-3 font-semibold">Grade</th><th className="text-left px-4 py-3 font-semibold">GP</th></tr>
            </thead>
            <tbody className="divide-y divide-border">
              {grades.slice(0, 30).map((g) => {
                const p = (g.marksObtained / g.totalMarks) * 100;
                return (<tr key={g.id} className="hover:bg-primary/[0.04]"><td className="px-4 py-2 font-medium">{g.studentName}</td><td className="px-4 py-2">{g.subject}</td><td className="px-4 py-2 text-muted-foreground">{g.exam}</td><td className="px-4 py-2 font-mono-tab">{g.marksObtained}/{g.totalMarks}</td><td className="px-4 py-2 font-mono-tab">{p.toFixed(0)}%</td><td className="px-4 py-2"><span className="font-bold text-primary">{g.grade}</span></td><td className="px-4 py-2 font-mono-tab">{g.gradePoint.toFixed(1)}</td></tr>);
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </DashboardShell>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (<label className="block"><span className="block text-xs font-bold uppercase tracking-[0.08em] text-muted-foreground mb-1.5">{label}</span>{children}</label>);
}