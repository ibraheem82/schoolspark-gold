import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { GraduationCap, Users, School, Wallet, Plus, ClipboardCheck, Megaphone } from "lucide-react";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend, CartesianGrid } from "recharts";
import { DashboardShell, Card, StatusBadge } from "@/components/DashboardShell";
import { stats, announcements } from "@/lib/mockData";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — SchoolSync" }] }),
  component: DashboardPage,
});

const attendanceData = [
  { day: "Mon", Present: 320, Absent: 22, Late: 18 },
  { day: "Tue", Present: 330, Absent: 15, Late: 15 },
  { day: "Wed", Present: 315, Absent: 28, Late: 17 },
  { day: "Thu", Present: 340, Absent: 12, Late: 8 },
  { day: "Fri", Present: 305, Absent: 35, Late: 20 },
];

const feeData = [
  { name: "Collected", value: 18400000, color: "#16A34A" },
  { name: "Pending", value: 6200000, color: "#F0A500" },
  { name: "Overdue", value: 1850000, color: "#DC2626" },
];

function DashboardPage() {
  return (
    <DashboardShell title="Dashboard">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Students" value={stats.totalStudents.toString()} icon={GraduationCap} variant="primary" />
        <StatCard label="Total Teachers" value={stats.totalTeachers.toString()} icon={Users} variant="gold" />
        <StatCard label="Active Classes" value={stats.activeClasses.toString()} icon={School} variant="navy" />
        <StatCard label="Fees Collected" value={`₦${(stats.feesCollected / 1_000_000).toFixed(1)}M`} icon={Wallet} variant="white" />
      </div>

      <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
        <QuickAction icon={Plus} label="Add Student" to="/students" />
        <QuickAction icon={Plus} label="Add Teacher" to="/teachers" />
        <QuickAction icon={ClipboardCheck} label="Mark Attendance" to="/attendance" />
        <QuickAction icon={Megaphone} label="Create Announcement" to="/announcements" />
      </div>

      <div className="mt-6 grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-semibold">Attendance Overview</h3>
              <p className="text-xs text-muted-foreground">Last 5 days · all classes</p>
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-gold">This week</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceData} margin={{ left: -16 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                <XAxis dataKey="day" stroke="#6B7280" fontSize={12} />
                <YAxis stroke="#6B7280" fontSize={12} />
                <Tooltip cursor={{ fill: "rgba(24,119,242,0.06)" }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="Present" fill="#1877F2" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Late" fill="#F0A500" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Absent" fill="#DC2626" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-base font-semibold mb-1">Fee Collection</h3>
          <p className="text-xs text-muted-foreground mb-4">Current term summary</p>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={feeData} dataKey="value" innerRadius={50} outerRadius={80} paddingAngle={3}>
                  {feeData.map((d) => <Cell key={d.name} fill={d.color} />)}
                </Pie>
                <Tooltip formatter={(v: number) => `₦${(v / 1_000_000).toFixed(2)}M`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="mt-3 space-y-2">
            {feeData.map((d) => (
              <li key={d.name} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full" style={{ background: d.color }} /> {d.name}</span>
                <span className="font-semibold font-mono-tab">₦{(d.value / 1_000_000).toFixed(1)}M</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card className="mt-6 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold">Recent Announcements</h3>
          <Link to="/announcements" className="text-sm font-medium text-primary hover:underline">View All →</Link>
        </div>
        <ul className="divide-y divide-border">
          {announcements.filter((a) => a.status === "published").slice(0, 3).map((a) => (
            <li key={a.id} className="py-3 flex items-start gap-3">
              <StatusBadge status={a.type} />
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm truncate">{a.title}</div>
                <div className="text-xs text-muted-foreground">{a.publishedAt}</div>
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </DashboardShell>
  );
}

function StatCard({ label, value, icon: Icon, variant }: { label: string; value: string; icon: React.ComponentType<{ className?: string }>; variant: "primary" | "gold" | "navy" | "white" }) {
  const styles = {
    primary: "bg-primary text-white",
    gold: "bg-gold text-gold-foreground",
    navy: "bg-navy text-white",
    white: "bg-card text-foreground border border-border",
  }[variant];
  return (
    <div className={`rounded-xl ${styles} p-5 shadow-md`}>
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider opacity-80">{label}</div>
          <div className={`mt-2 text-3xl font-extrabold tracking-tight ${variant === "white" ? "text-success" : ""}`}>{value}</div>
        </div>
        <div className={`grid h-10 w-10 place-items-center rounded-lg ${variant === "white" ? "bg-gold/15 text-gold" : "bg-white/15"}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}

function QuickAction({ icon: Icon, label, to }: { icon: React.ComponentType<{ className?: string }>; label: string; to: string }) {
  return (
    <Link to={to} className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2.5 text-sm font-medium hover:border-primary hover:text-primary transition-colors">
      <Icon className="h-4 w-4" /> {label}
    </Link>
  );
}