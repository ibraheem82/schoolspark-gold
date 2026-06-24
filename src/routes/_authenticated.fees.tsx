import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { DashboardShell, Card, PrimaryButton, StatusBadge } from "@/components/DashboardShell";
import { fees } from "@/lib/mockData";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/fees")({
  head: () => ({ meta: [{ title: "Fees — SchoolSync" }] }),
  component: FeesPage,
});

function FeesPage() {
  const [payOpen, setPayOpen] = useState<string | null>(null);
  const totals = useMemo(() => ({
    collected: fees.reduce((s, f) => s + f.paid, 0),
    pending: fees.filter((f) => f.status === "pending" || f.status === "partial").reduce((s, f) => s + f.balance, 0),
    overdue: fees.filter((f) => f.status === "overdue").reduce((s, f) => s + f.balance, 0),
    paidCount: fees.filter((f) => f.status === "paid").length,
  }), []);
  const payingFee = fees.find((f) => f.id === payOpen);

  return (
    <DashboardShell title="Fees" actions={<PrimaryButton onClick={() => toast.info("Demo only")}><Plus className="h-4 w-4" /> Create Fee</PrimaryButton>}>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <SummaryStat label="Total Collected" value={`₦${(totals.collected / 1_000_000).toFixed(2)}M`} color="text-success" />
        <SummaryStat label="Total Pending" value={`₦${(totals.pending / 1_000_000).toFixed(2)}M`} color="text-gold" />
        <SummaryStat label="Total Overdue" value={`₦${(totals.overdue / 1_000_000).toFixed(2)}M`} color="text-error" />
        <SummaryStat label="Paid Count" value={totals.paidCount.toString()} color="text-primary" />
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground">
              <tr><th className="text-left px-4 py-3 font-semibold">Student</th><th className="text-left px-4 py-3 font-semibold">Type</th><th className="text-left px-4 py-3 font-semibold">Amount</th><th className="text-left px-4 py-3 font-semibold">Paid</th><th className="text-left px-4 py-3 font-semibold">Balance</th><th className="text-left px-4 py-3 font-semibold">Status</th><th className="text-left px-4 py-3 font-semibold">Due</th><th className="text-right px-4 py-3 font-semibold">Actions</th></tr>
            </thead>
            <tbody className="divide-y divide-border">
              {fees.map((f) => (
                <tr key={f.id} className="hover:bg-primary/[0.04]">
                  <td className="px-4 py-3 font-medium">{f.studentName}</td>
                  <td className="px-4 py-3 text-muted-foreground">{f.type}</td>
                  <td className="px-4 py-3 font-mono-tab">₦{f.amount.toLocaleString()}</td>
                  <td className="px-4 py-3 font-mono-tab text-success">₦{f.paid.toLocaleString()}</td>
                  <td className="px-4 py-3 font-mono-tab">₦{f.balance.toLocaleString()}</td>
                  <td className="px-4 py-3"><StatusBadge status={f.status} /></td>
                  <td className="px-4 py-3 font-mono-tab text-xs">{f.dueDate}</td>
                  <td className="px-4 py-3 text-right">
                    {f.balance > 0 ? (
                      <button onClick={() => setPayOpen(f.id)} className="rounded-md bg-gold text-gold-foreground px-2.5 py-1 text-xs font-semibold hover:opacity-90">Record Payment</button>
                    ) : (
                      <span className="text-xs text-muted-foreground font-mono-tab">{f.receiptNo}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {payingFee && <PayDrawer fee={payingFee} onClose={() => setPayOpen(null)} />}
    </DashboardShell>
  );
}

function SummaryStat({ label, value, color }: { label: string; value: string; color: string }) {
  return (<Card className="p-5"><div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{label}</div><div className={`mt-2 text-2xl sm:text-3xl font-extrabold ${color}`}>{value}</div></Card>);
}

function PayDrawer({ fee, onClose }: { fee: typeof fees[number]; onClose: () => void }) {
  const [amount, setAmount] = useState<number>(fee.balance);
  const newBalance = Math.max(0, fee.balance - amount);
  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 w-full sm:w-[480px] bg-card z-50 flex flex-col shadow-2xl">
        <header className="border-b border-border px-6 py-4">
          <h2 className="text-lg font-semibold">Record Payment</h2>
          <p className="text-xs text-muted-foreground">{fee.studentName} · {fee.type}</p>
        </header>
        <div className="p-6 flex-1 overflow-y-auto space-y-5">
          <div className="grid grid-cols-2 gap-4 rounded-lg bg-muted p-4 text-sm">
            <div><div className="text-xs text-muted-foreground">Total</div><div className="font-bold font-mono-tab">₦{fee.amount.toLocaleString()}</div></div>
            <div><div className="text-xs text-muted-foreground">Balance</div><div className="font-bold font-mono-tab">₦{fee.balance.toLocaleString()}</div></div>
          </div>
          <label className="block">
            <span className="block text-xs font-bold uppercase tracking-[0.08em] text-muted-foreground mb-1.5">Payment Amount</span>
            <input type="number" className="auth-input" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
          </label>
          <label className="block">
            <span className="block text-xs font-bold uppercase tracking-[0.08em] text-muted-foreground mb-1.5">Payment Mode</span>
            <select className="auth-input"><option>Bank Transfer</option><option>Cash</option><option>Card</option><option>USSD</option></select>
          </label>
          <label className="block">
            <span className="block text-xs font-bold uppercase tracking-[0.08em] text-muted-foreground mb-1.5">Transaction ID</span>
            <input className="auth-input" placeholder="TRX-..." />
          </label>
          <div className="rounded-lg border border-success/30 bg-success/5 p-3 text-sm">
            New balance: <span className="font-bold font-mono-tab text-success">₦{newBalance.toLocaleString()}</span>
          </div>
        </div>
        <footer className="border-t border-border px-6 py-4 flex justify-end gap-3">
          <button onClick={onClose} className="rounded-lg border border-border px-4 py-2 text-sm font-semibold hover:bg-muted">Cancel</button>
          <button onClick={() => { toast.success("Payment recorded (demo)"); onClose(); }} className="rounded-lg bg-gold text-gold-foreground px-4 py-2 text-sm font-semibold">Record Payment</button>
        </footer>
      </div>
    </>
  );
}