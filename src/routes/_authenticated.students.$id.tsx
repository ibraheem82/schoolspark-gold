import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { DashboardShell, Card, StatusBadge, Avatar } from "@/components/DashboardShell";
import { students, attendance, grades, fees } from "@/lib/mockData";

export const Route = createFileRoute("/_authenticated/students/$id")({
  head: () => ({ meta: [{ title: "Student — SchoolSync" }] }),
  component: StudentDetailPage,
});

function StudentDetailPage() {
  const { id } = Route.useParams();
  const s = students.find((x) => x.id === id);
  if (!s) throw notFound();
  const [tab, setTab] = useState<"overview" | "attendance" | "grades" | "fees">("overview");
  const stuAttendance = attendance.filter((a) => a.studentId === s.id);
  const stuGrades = grades.filter((g) => g.studentId === s.id);
  const stuFees = fees.filter((f) => f.studentId === s.id);
  const gpa = stuGrades.length ? (stuGrades.reduce((a, g) => a + g.gradePoint, 0) / stuGrades.length) : 0;
  const presentCount = stuAttendance.filter((a) => a.status === "present").length;

  return (
    <DashboardShell title="Student Profile">
      <Link to="/students" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary mb-4">
        <ArrowLeft className="h-4 w-4" /> Back to Students
      </Link>

      <Card className="p-6 flex flex-wrap items-center gap-5">
        <Avatar name={`${s.firstName} ${s.lastName}`} className="h-20 w-20 text-2xl" />
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold tracking-tight">{s.firstName} {s.lastName}</h2>
          <div className="mt-1 text-sm text-muted-foreground font-mono-tab">{s.admissionNo}</div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-primary/10 text-primary px-2 py-0.5 text-xs font-semibold">{s.className}</span>
            <StatusBadge status={s.status} />
            <span className="text-xs text-muted-foreground">Roll · {s.rollNo}</span>
          </div>
        </div>
      </Card>

      <div className="mt-6 border-b border-border flex gap-1">
        {(["overview", "attendance", "grades", "fees"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`relative px-4 py-3 text-sm font-medium capitalize ${tab === t ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}>
            {t}
            {tab === t && <span className="absolute left-2 right-2 bottom-0 h-[3px] bg-gold rounded" />}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {tab === "overview" && (
          <Card className="p-6 grid sm:grid-cols-2 gap-x-8 gap-y-4 text-sm">
            <Info label="Father's Name" value={s.fatherName} />
            <Info label="Father's Occupation" value={s.fatherOccupation} />
            <Info label="Father's Phone" value={s.fatherPhone} />
            <Info label="Mother's Name" value={s.motherName} />
            <Info label="Emergency Contact" value={s.emergencyContact} />
            <Info label="Blood Group" value={s.bloodGroup} />
            <Info label="Transport" value={s.transportMode} />
            <Info label="Bus Route" value={s.busRoute ?? "—"} />
          </Card>
        )}
        {tab === "attendance" && (
          <>
            <div className="grid sm:grid-cols-3 gap-4 mb-4">
              <SummaryCard label="Present" value={presentCount.toString()} accent="success" />
              <SummaryCard label="Total Days" value={stuAttendance.length.toString()} accent="primary" />
              <SummaryCard label="Percentage" value={`${stuAttendance.length ? Math.round((presentCount / stuAttendance.length) * 100) : 0}%`} accent="gold" />
            </div>
            <Card className="overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground">
                  <tr><th className="text-left px-4 py-2 font-semibold">Date</th><th className="text-left px-4 py-2 font-semibold">Status</th><th className="text-left px-4 py-2 font-semibold">Remarks</th></tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {stuAttendance.map((a) => (<tr key={a.id}><td className="px-4 py-2 font-mono-tab">{a.date}</td><td className="px-4 py-2"><StatusBadge status={a.status} /></td><td className="px-4 py-2 text-muted-foreground">{a.remarks ?? "—"}</td></tr>))}
                </tbody>
              </table>
            </Card>
          </>
        )}
        {tab === "grades" && (
          <div className="grid lg:grid-cols-3 gap-4">
            <Card className="lg:col-span-2 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground"><tr><th className="text-left px-4 py-2">Subject</th><th className="text-left px-4 py-2">Marks</th><th className="text-left px-4 py-2">Grade</th></tr></thead>
                <tbody className="divide-y divide-border">
                  {stuGrades.map((g) => (<tr key={g.id}><td className="px-4 py-2">{g.subject}</td><td className="px-4 py-2 font-mono-tab">{g.marksObtained}/{g.totalMarks}</td><td className="px-4 py-2"><span className="font-bold text-primary">{g.grade}</span></td></tr>))}
                </tbody>
              </table>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Cumulative GPA</div>
              <div className={`mt-3 text-6xl font-extrabold tracking-tight ${gpa >= 3 ? "text-success" : gpa >= 2 ? "text-gold" : "text-error"}`}>{gpa.toFixed(2)}</div>
              <div className="mt-1 text-sm text-muted-foreground">out of 4.0</div>
            </Card>
          </div>
        )}
        {tab === "fees" && (
          <Card className="overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground"><tr><th className="text-left px-4 py-2">Type</th><th className="text-left px-4 py-2">Amount</th><th className="text-left px-4 py-2">Balance</th><th className="text-left px-4 py-2">Status</th><th className="text-left px-4 py-2">Receipt</th></tr></thead>
              <tbody className="divide-y divide-border">
                {stuFees.map((f) => (<tr key={f.id}><td className="px-4 py-2">{f.type}</td><td className="px-4 py-2 font-mono-tab">₦{f.amount.toLocaleString()}</td><td className="px-4 py-2 font-mono-tab">₦{f.balance.toLocaleString()}</td><td className="px-4 py-2"><StatusBadge status={f.status} /></td><td className="px-4 py-2 font-mono-tab text-xs">{f.receiptNo ?? "—"}</td></tr>))}
              </tbody>
            </table>
          </Card>
        )}
      </div>
    </DashboardShell>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (<div><div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{label}</div><div className="mt-0.5 font-medium">{value}</div></div>);
}
function SummaryCard({ label, value, accent }: { label: string; value: string; accent: "success" | "primary" | "gold" }) {
  const colors = { success: "text-success", primary: "text-primary", gold: "text-gold" }[accent];
  return (<Card className="p-5"><div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{label}</div><div className={`mt-2 text-3xl font-extrabold ${colors}`}>{value}</div></Card>);
}