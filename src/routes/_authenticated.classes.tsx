import { createFileRoute } from "@tanstack/react-router";
import { Plus, Users, Pencil, Trash2, MapPin } from "lucide-react";
import { DashboardShell, Card, PrimaryButton, StatusBadge } from "@/components/DashboardShell";
import { classes } from "@/lib/mockData";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/classes")({
  head: () => ({ meta: [{ title: "Classes — SchoolSync" }] }),
  component: ClassesPage,
});

function ClassesPage() {
  return (
    <DashboardShell title="Classes" actions={<PrimaryButton onClick={() => toast.info("Demo only")}><Plus className="h-4 w-4" /> Add Class</PrimaryButton>}>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {classes.map((c) => {
          const pct = Math.round((c.currentStrength / c.capacity) * 100);
          return (
            <Card key={c.id} className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{c.academicYear}</div>
                  <h3 className="mt-1 text-2xl font-extrabold tracking-tight">{c.name}</h3>
                </div>
                <span className="rounded-md bg-primary/10 text-primary px-2 py-0.5 text-xs font-mono-tab font-semibold">{c.code}</span>
              </div>
              <div className="mt-5">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-muted-foreground">Capacity</span>
                  <span className="font-semibold font-mono-tab">{c.currentStrength}/{c.capacity}</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-gold rounded-full" style={{ width: `${pct}%` }} />
                </div>
              </div>
              <div className="mt-5 space-y-1.5 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground"><Users className="h-3.5 w-3.5" /> {c.classTeacher}</div>
                <div className="flex items-center gap-2 text-muted-foreground"><MapPin className="h-3.5 w-3.5" /> {c.classroom}</div>
              </div>
              <div className="mt-5 flex items-center justify-between">
                <StatusBadge status={c.status} />
                <div className="flex items-center gap-1">
                  <button className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-primary"><Pencil className="h-4 w-4" /></button>
                  <button className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-error" onClick={() => toast.error("Delete is disabled in demo")}><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </DashboardShell>
  );
}