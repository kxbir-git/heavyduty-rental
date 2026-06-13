import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin/bookings")({
  component: AdminBookings,
});

const STATUSES = ["pending", "confirmed", "in_progress", "completed", "cancelled"];

function AdminBookings() {
  const qc = useQueryClient();

  const { data: bookings } = useQuery({
    queryKey: ["admin-bookings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("bookings")
        .select("*, equipment(name, slug)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase.from("bookings").update({ status }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Status updated");
      qc.invalidateQueries({ queryKey: ["admin-bookings"] });
    },
    onError: (e: any) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("bookings").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Booking deleted");
      qc.invalidateQueries({ queryKey: ["admin-bookings"] });
    },
  });

  return (
    <div className="p-6 md:p-10 max-w-7xl">
      <h1 className="text-4xl font-black uppercase tracking-tight mb-2">Bookings & Rentals</h1>
      <p className="text-white/40 mb-8">Review and manage every rental request.</p>

      <div className="bg-white/[0.03] border border-white/10 rounded-sm overflow-x-auto">
        <table className="w-full text-sm min-w-[800px]">
          <thead className="bg-white/5 text-xs uppercase tracking-widest text-white/40">
            <tr>
              <th className="text-left p-3">Customer</th>
              <th className="text-left p-3">Equipment</th>
              <th className="text-left p-3">Dates</th>
              <th className="text-left p-3">Amount</th>
              <th className="text-left p-3">Status</th>
              <th className="text-right p-3"></th>
            </tr>
          </thead>
          <tbody>
            {bookings?.map((b: any) => (
              <tr key={b.id} className="border-t border-white/5 align-top">
                <td className="p-3">
                  <div className="font-medium">{b.customer_name}</div>
                  <div className="text-xs text-white/40">{b.customer_email}</div>
                  {b.customer_phone && <div className="text-xs text-white/40">{b.customer_phone}</div>}
                </td>
                <td className="p-3 text-white/70">{b.equipment?.name ?? "—"}</td>
                <td className="p-3 text-white/70 text-xs">
                  {b.start_date}<br/>→ {b.end_date}
                </td>
                <td className="p-3 text-[#FFB800] font-bold">
                  {b.total_amount ? `₹${Number(b.total_amount).toLocaleString("en-IN")}` : "—"}
                </td>
                <td className="p-3">
                  <select
                    value={b.status}
                    onChange={(e) => updateStatus.mutate({ id: b.id, status: e.target.value })}
                    className="bg-white/5 border border-white/10 rounded-sm px-2 py-1 text-xs font-bold uppercase"
                  >
                    {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                  {b.notes && <div className="text-xs text-white/40 mt-2 max-w-xs">{b.notes}</div>}
                </td>
                <td className="p-3 text-right">
                  <button
                    onClick={() => confirm("Delete this booking?") && remove.mutate(b.id)}
                    className="p-2 text-white/60 hover:text-red-400"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
            {bookings?.length === 0 && (
              <tr><td colSpan={6} className="p-8 text-center text-white/40">No bookings yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
