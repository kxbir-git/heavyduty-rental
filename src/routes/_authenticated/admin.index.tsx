import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Wrench, CalendarCheck, Clock, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const { data: stats } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const [eq, bk, pending, confirmed] = await Promise.all([
        supabase.from("equipment").select("*", { count: "exact", head: true }),
        supabase.from("bookings").select("*", { count: "exact", head: true }),
        supabase.from("bookings").select("*", { count: "exact", head: true }).eq("status", "pending"),
        supabase.from("bookings").select("*", { count: "exact", head: true }).eq("status", "confirmed"),
      ]);
      return {
        equipment: eq.count ?? 0,
        bookings: bk.count ?? 0,
        pending: pending.count ?? 0,
        confirmed: confirmed.count ?? 0,
      };
    },
  });

  const { data: recent } = useQuery({
    queryKey: ["recent-bookings"],
    queryFn: async () => {
      const { data } = await supabase
        .from("bookings")
        .select("*, equipment(name)")
        .order("created_at", { ascending: false })
        .limit(8);
      return data ?? [];
    },
  });

  const cards = [
    { label: "Equipment", value: stats?.equipment ?? "—", icon: Wrench },
    { label: "Total Bookings", value: stats?.bookings ?? "—", icon: CalendarCheck },
    { label: "Pending", value: stats?.pending ?? "—", icon: Clock },
    { label: "Confirmed", value: stats?.confirmed ?? "—", icon: CheckCircle2 },
  ];

  return (
    <div className="p-6 md:p-10 max-w-6xl">
      <h1 className="text-4xl font-black uppercase tracking-tight mb-2">Dashboard</h1>
      <p className="text-white/40 mb-8">Operational snapshot of your rental business.</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {cards.map((c) => (
          <div key={c.label} className="bg-white/[0.03] border border-white/10 p-5 rounded-sm">
            <c.icon className="h-5 w-5 text-[#FFB800] mb-3" />
            <div className="text-3xl font-black">{c.value}</div>
            <div className="text-xs uppercase tracking-widest text-white/40 mt-1">{c.label}</div>
          </div>
        ))}
      </div>

      <h2 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-3">Recent Bookings</h2>
      <div className="bg-white/[0.03] border border-white/10 rounded-sm overflow-hidden">
        {recent && recent.length > 0 ? (
          <table className="w-full text-sm">
            <thead className="bg-white/5 text-xs uppercase tracking-widest text-white/40">
              <tr>
                <th className="text-left p-3">Customer</th>
                <th className="text-left p-3 hidden md:table-cell">Equipment</th>
                <th className="text-left p-3 hidden sm:table-cell">Dates</th>
                <th className="text-left p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((b: any) => (
                <tr key={b.id} className="border-t border-white/5">
                  <td className="p-3">
                    <div className="font-medium">{b.customer_name}</div>
                    <div className="text-xs text-white/40">{b.customer_email}</div>
                  </td>
                  <td className="p-3 hidden md:table-cell text-white/70">{b.equipment?.name ?? "—"}</td>
                  <td className="p-3 hidden sm:table-cell text-white/70 text-xs">{b.start_date} → {b.end_date}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 text-xs font-bold uppercase rounded-sm ${
                      b.status === "confirmed" ? "bg-green-500/20 text-green-400" :
                      b.status === "pending" ? "bg-[#FFB800]/20 text-[#FFB800]" :
                      "bg-white/10 text-white/60"
                    }`}>{b.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-8 text-center text-white/40 text-sm">No bookings yet.</div>
        )}
      </div>
    </div>
  );
}
