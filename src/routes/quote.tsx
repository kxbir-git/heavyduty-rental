import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Check, Truck, Shield, Wrench, Clock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { submitBooking } from "@/lib/api/bookings.functions";


export const Route = createFileRoute("/quote")({
  head: () => ({
    meta: [
      { title: "Request a Quote — KK & Sons Equip" },
      { name: "description", content: "Get a customized equipment rental quote for your construction project. Fast turnaround, competitive pricing, pan-India delivery." },
      { property: "og:title", content: "Request a Quote — KK & Sons Equip" },
      { property: "og:description", content: "Get a customized equipment rental quote for your construction project. Fast turnaround, competitive pricing, pan-India delivery." },
      { property: "og:url", content: "/quote" },
    ],
    links: [
      { rel: "canonical", href: "/quote" },
    ],
  }),
  component: QuotePage,
});

const equipmentList = [
  { id: "exc-001", name: "CAT 320 GC Excavator", rate: 18500, category: "Excavators" },
  { id: "exc-002", name: "Komatsu PC210 LC", rate: 16500, category: "Excavators" },
  { id: "crn-001", name: "Liebherr LTM 1090", rate: 45000, category: "Cranes" },
  { id: "crn-002", name: "XCMG QY25K Truck Crane", rate: 28000, category: "Cranes" },
  { id: "ldr-001", name: "Volvo L120H Wheel Loader", rate: 12500, category: "Loaders" },
  { id: "ldr-002", name: "JCB 455ZX Loader", rate: 9500, category: "Loaders" },
  { id: "rol-001", name: "Dynapac CA6000 Roller", rate: 8200, category: "Rollers" },
  { id: "gen-001", name: "Cummins C500D5 Generator", rate: 6500, category: "Generators" },
  { id: "frk-001", name: "Toyota 8FG25 Forklift", rate: 3200, category: "Forklifts" },
  { id: "tel-001", name: "JCB 540-170 Telehandler", rate: 7800, category: "Telehandlers" },
];

function QuotePage() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [duration, setDuration] = useState(7);
  const [needsOperator, setNeedsOperator] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const toggleItem = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const selectedEquipment = equipmentList.filter((e) => selectedItems.includes(e.id));
  const equipmentTotal = selectedEquipment.reduce((sum, e) => sum + e.rate * duration, 0);
  const operatorTotal = needsOperator ? selectedEquipment.length * 2500 * duration : 0;
  const transportFee = selectedEquipment.length > 0 ? 5000 : 0;
  const subtotal = equipmentTotal + operatorTotal + transportFee;
  const gst = subtotal * 0.18;
  const total = subtotal + gst;

  const submitQuote = async () => {
    if (!customerName || !customerEmail) {
      toast.error("Please provide your name and email");
      return;
    }
    if (selectedEquipment.length === 0) {
      toast.error("Please select at least one equipment item");
      return;
    }
    setSubmitting(true);
    try {
      const start = new Date();
      const end = new Date();
      end.setDate(end.getDate() + duration);
      await submitBooking({
        data: {
          equipment_slug: selectedItems[0] ?? null,
          customer_name: customerName,
          customer_email: customerEmail,
          customer_phone: customerPhone || null,
          start_date: start.toISOString().slice(0, 10),
          end_date: end.toISOString().slice(0, 10),
          total_amount: total,
          notes: `Items: ${selectedEquipment.map((e) => e.name).join(", ")}${needsOperator ? " | with operator" : ""}`,
        },
      });
      toast.success("Quote request submitted! We'll contact you within 2 hours.");
      setSelectedItems([]); setCustomerName(""); setCustomerEmail(""); setCustomerPhone("");
    } catch (err: any) {
      toast.error(err.message ?? "Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white font-sans">
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFB800]/5 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
              Request a <span className="text-[#FFB800]">Quote</span>
            </h1>
            <p className="text-xl text-white/50 max-w-2xl mx-auto">
              Select your equipment, configure rental duration, and get an instant estimate. We'll confirm within 2 hours.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Equipment Selector */}
          <div className="lg:col-span-2 space-y-8">
            {/* Duration */}
            <div className="glass-card p-6 rounded-lg border border-white/5">
              <h3 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-4">Rental Duration</h3>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="1"
                  max="90"
                  value={duration}
                  onChange={(e) => setDuration(parseInt(e.target.value))}
                  className="flex-1 accent-[#FFB800]"
                />
                <div className="w-24 text-center py-2 bg-white/5 border border-white/10 rounded text-sm font-bold">
                  {duration} days
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                {[1, 7, 15, 30, 60, 90].map((d) => (
                  <button
                    key={d}
                    onClick={() => setDuration(d)}
                    className={`px-3 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition-all ${
                      duration === d
                        ? "bg-[#FFB800] text-black"
                        : "bg-white/5 text-white/40 hover:bg-white/10"
                    }`}
                  >
                    {d}D
                  </button>
                ))}
              </div>
            </div>

            {/* Equipment Grid */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-white/40">Select Equipment</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {equipmentList.map((item) => {
                  const isSelected = selectedItems.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      onClick={() => toggleItem(item.id)}
                      className={`relative text-left p-4 rounded-lg border transition-all duration-300 ${
                        isSelected
                          ? "bg-[#FFB800]/10 border-[#FFB800]/30"
                          : "bg-white/[0.02] border-white/5 hover:border-white/10"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <Badge className="uppercase text-[10px] font-bold tracking-widest bg-white/5 text-white/40">
                          {item.category}
                        </Badge>
                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-[#FFB800] flex items-center justify-center">
                            <Check className="h-3 w-3 text-black" />
                          </div>
                        )}
                      </div>
                      <p className={`font-bold text-sm ${isSelected ? "text-[#FFB800]" : "text-white"}`}>
                        {item.name}
                      </p>
                      <p className="text-xs text-white/40 mt-1">₹{item.rate.toLocaleString("en-IN")}/day</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Operator Option */}
            <div className="glass-card p-6 rounded-lg border border-white/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                    <Wrench className="h-5 w-5 text-[#FFB800]" />
                  </div>
                  <div>
                    <p className="font-bold text-white">Include Certified Operator</p>
                    <p className="text-sm text-white/40">₹2,500/day per machine</p>
                  </div>
                </div>
                <button
                  onClick={() => setNeedsOperator(!needsOperator)}
                  className={`w-14 h-7 rounded-full transition-all ${
                    needsOperator ? "bg-[#FFB800]" : "bg-white/10"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white transition-transform ${
                      needsOperator ? "translate-x-7" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Quote Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 glass-card p-6 rounded-lg border border-white/5">
              <h3 className="text-lg font-bold mb-6">Quote Summary</h3>

              {selectedEquipment.length === 0 ? (
                <div className="text-center py-8">
                  <Truck className="h-12 w-12 text-white/10 mx-auto mb-4" />
                  <p className="text-white/40 text-sm">Select equipment to see your quote</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {selectedEquipment.map((item) => (
                    <div key={item.id} className="flex justify-between items-center py-2 border-b border-white/5">
                      <div>
                        <p className="text-sm font-bold text-white">{item.name}</p>
                        <p className="text-xs text-white/40">
                          {duration} days × ₹{item.rate.toLocaleString("en-IN")}/day
                        </p>
                      </div>
                      <p className="text-sm font-mono text-white/80">
                        ₹{(item.rate * duration).toLocaleString("en-IN")}
                      </p>
                    </div>
                  ))}

                  {needsOperator && (
                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                      <div>
                        <p className="text-sm font-bold text-white">Operators</p>
                        <p className="text-xs text-white/40">
                          {selectedEquipment.length} operators × {duration} days
                        </p>
                      </div>
                      <p className="text-sm font-mono text-white/80">₹{operatorTotal.toLocaleString("en-IN")}</p>
                    </div>
                  )}

                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <p className="text-sm text-white/60">Transport</p>
                    <p className="text-sm font-mono text-white/80">₹{transportFee.toLocaleString("en-IN")}</p>
                  </div>

                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <p className="text-sm text-white/60">Subtotal</p>
                    <p className="text-sm font-mono text-white/80">₹{subtotal.toLocaleString("en-IN")}</p>
                  </div>

                  <div className="flex justify-between items-center py-2">
                    <p className="text-sm text-white/60">GST (18%)</p>
                    <p className="text-sm font-mono text-white/80">₹{gst.toLocaleString("en-IN")}</p>
                  </div>

                  <Separator className="bg-white/10" />

                  <div className="flex justify-between items-center py-2">
                    <p className="text-lg font-bold text-white">Total Estimate</p>
                    <p className="text-2xl font-bold text-[#FFB800]">₹{total.toLocaleString("en-IN")}</p>
                  </div>

                  <div className="pt-4 space-y-3">
                    <Input placeholder="Your name" value={customerName} onChange={(e) => setCustomerName(e.target.value)} maxLength={100} className="bg-white/5 border-white/10" />
                    <Input placeholder="Email" type="email" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} maxLength={200} className="bg-white/5 border-white/10" />
                    <Input placeholder="Phone (optional)" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} maxLength={20} className="bg-white/5 border-white/10" />
                    <Button onClick={submitQuote} disabled={submitting} className="w-full py-6 bg-[#FFB800] text-black font-bold uppercase tracking-widest text-sm hover:bg-[#FFB800]/90 hover:scale-[1.02] transition-all">
                      {submitting ? "Submitting..." : "Submit Quote Request"}
                    </Button>
                    <p className="text-xs text-white/30 text-center">
                      This is an estimate. Final pricing confirmed within 2 hours.
                    </p>
                  </div>
                </div>
              )}

              {/* Trust */}
              <div className="mt-6 pt-6 border-t border-white/5 space-y-3">
                {[
                  { icon: Shield, text: "Fully insured fleet" },
                  { icon: Clock, text: "2-hour quote turnaround" },
                  { icon: Truck, text: "Pan-India delivery" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <item.icon className="h-4 w-4 text-[#FFB800]" />
                    <span className="text-xs text-white/50">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
