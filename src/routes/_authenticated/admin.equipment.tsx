import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin/equipment")({
  component: AdminEquipment,
});

type Equipment = {
  id: string; slug: string; name: string; category: string; daily_rate: number;
  weight: string | null; power: string | null; capacity: string | null;
  description: string | null; image_url: string | null; availability: string; is_active: boolean;
};

const empty = {
  slug: "", name: "", category: "Excavators", daily_rate: 0,
  weight: "", power: "", capacity: "", description: "", image_url: "",
  availability: "available", is_active: true,
};

function AdminEquipment() {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Equipment | null>(null);
  const [form, setForm] = useState<any>(empty);

  const { data: items } = useQuery({
    queryKey: ["admin-equipment"],
    queryFn: async () => {
      const { data, error } = await supabase.from("equipment").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data as Equipment[];
    },
  });

  const upsert = useMutation({
    mutationFn: async () => {
      const payload = { ...form, daily_rate: Number(form.daily_rate) || 0 };
      if (editing) {
        const { error } = await supabase.from("equipment").update(payload).eq("id", editing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("equipment").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast.success(editing ? "Equipment updated" : "Equipment added");
      qc.invalidateQueries({ queryKey: ["admin-equipment"] });
      setOpen(false); setEditing(null); setForm(empty);
    },
    onError: (e: any) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("equipment").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Deleted");
      qc.invalidateQueries({ queryKey: ["admin-equipment"] });
    },
    onError: (e: any) => toast.error(e.message),
  });

  const openEdit = (item: Equipment) => {
    setEditing(item);
    setForm({
      slug: item.slug, name: item.name, category: item.category, daily_rate: item.daily_rate,
      weight: item.weight ?? "", power: item.power ?? "", capacity: item.capacity ?? "",
      description: item.description ?? "", image_url: item.image_url ?? "",
      availability: item.availability, is_active: item.is_active,
    });
    setOpen(true);
  };

  const openNew = () => { setEditing(null); setForm(empty); setOpen(true); };

  return (
    <div className="p-6 md:p-10 max-w-7xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tight">Equipment</h1>
          <p className="text-white/40 mt-1">Manage your rental fleet.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={openNew} className="bg-[#FFB800] text-black hover:bg-[#FFB800]/90 font-black uppercase">
              <Plus className="h-4 w-4 mr-2" /> Add
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#0A0A0A] border-white/10 text-white max-w-2xl max-h-[90vh] overflow-auto">
            <DialogHeader>
              <DialogTitle className="uppercase tracking-tight">{editing ? "Edit" : "Add"} Equipment</DialogTitle>
            </DialogHeader>
            <form
              onSubmit={(e) => { e.preventDefault(); upsert.mutate(); }}
              className="grid grid-cols-2 gap-4"
            >
              <Field label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
              <Field label="Slug" value={form.slug} onChange={(v) => setForm({ ...form, slug: v })} required />
              <Field label="Category" value={form.category} onChange={(v) => setForm({ ...form, category: v })} required />
              <Field label="Daily Rate (₹)" type="number" value={form.daily_rate} onChange={(v) => setForm({ ...form, daily_rate: v })} required />
              <Field label="Weight" value={form.weight} onChange={(v) => setForm({ ...form, weight: v })} />
              <Field label="Power" value={form.power} onChange={(v) => setForm({ ...form, power: v })} />
              <Field label="Capacity" value={form.capacity} onChange={(v) => setForm({ ...form, capacity: v })} />
              <div>
                <Label className="text-xs uppercase tracking-widest text-white/50">Availability</Label>
                <select
                  value={form.availability}
                  onChange={(e) => setForm({ ...form, availability: e.target.value })}
                  className="w-full mt-1 bg-white/5 border border-white/10 rounded-md px-3 py-2 text-sm"
                >
                  <option value="available">Available</option>
                  <option value="limited">Limited</option>
                  <option value="unavailable">Unavailable</option>
                </select>
              </div>
              <div className="col-span-2">
                <Field label="Image URL" value={form.image_url} onChange={(v) => setForm({ ...form, image_url: v })} />
              </div>
              <div className="col-span-2">
                <Label className="text-xs uppercase tracking-widest text-white/50">Description</Label>
                <Textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="bg-white/5 border-white/10 mt-1"
                  rows={3}
                />
              </div>
              <label className="col-span-2 flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.is_active}
                  onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
                />
                Active (visible to customers)
              </label>
              <Button type="submit" disabled={upsert.isPending} className="col-span-2 bg-[#FFB800] text-black hover:bg-[#FFB800]/90 font-black uppercase">
                {upsert.isPending ? "Saving..." : "Save"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white/[0.03] border border-white/10 rounded-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-white/5 text-xs uppercase tracking-widest text-white/40">
            <tr>
              <th className="text-left p-3">Name</th>
              <th className="text-left p-3 hidden md:table-cell">Category</th>
              <th className="text-left p-3">Rate/day</th>
              <th className="text-left p-3 hidden sm:table-cell">Status</th>
              <th className="text-right p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items?.map((it) => (
              <tr key={it.id} className="border-t border-white/5">
                <td className="p-3">
                  <div className="font-medium">{it.name}</div>
                  <div className="text-xs text-white/40">{it.slug}</div>
                </td>
                <td className="p-3 hidden md:table-cell text-white/70">{it.category}</td>
                <td className="p-3 text-[#FFB800] font-bold">₹{Number(it.daily_rate).toLocaleString("en-IN")}</td>
                <td className="p-3 hidden sm:table-cell">
                  <span className={`px-2 py-1 text-xs font-bold uppercase rounded-sm ${
                    !it.is_active ? "bg-white/10 text-white/40" :
                    it.availability === "available" ? "bg-green-500/20 text-green-400" :
                    "bg-[#FFB800]/20 text-[#FFB800]"
                  }`}>{!it.is_active ? "hidden" : it.availability}</span>
                </td>
                <td className="p-3 text-right">
                  <button onClick={() => openEdit(it)} className="p-2 text-white/60 hover:text-[#FFB800]"><Pencil className="h-4 w-4" /></button>
                  <button onClick={() => confirm(`Delete ${it.name}?`) && remove.mutate(it.id)} className="p-2 text-white/60 hover:text-red-400"><Trash2 className="h-4 w-4" /></button>
                </td>
              </tr>
            ))}
            {items?.length === 0 && (
              <tr><td colSpan={5} className="p-8 text-center text-white/40">No equipment yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", required }: { label: string; value: any; onChange: (v: string) => void; type?: string; required?: boolean }) {
  return (
    <div>
      <Label className="text-xs uppercase tracking-widest text-white/50">{label}</Label>
      <Input
        type={type}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="bg-white/5 border-white/10 mt-1"
      />
    </div>
  );
}
