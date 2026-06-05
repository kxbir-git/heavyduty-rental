import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, SlidersHorizontal } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/equipment")({
  head: () => ({
    meta: [
      { title: "Equipment Fleet — KK & Sons Equip" },
      { name: "description", content: "Browse our full catalog of construction equipment rentals — excavators, cranes, loaders, rollers, generators, forklifts, and more." },
      { property: "og:title", content: "Equipment Fleet — KK & Sons Equip" },
      { property: "og:description", content: "Browse our full catalog of construction equipment rentals — excavators, cranes, loaders, rollers, generators, forklifts, and more." },
      { property: "og:url", content: "/equipment" },
    ],
    links: [
      { rel: "canonical", href: "/equipment" },
    ],
  }),
  component: EquipmentPage,
});

const categories = [
  "All",
  "Excavators",
  "Cranes",
  "Loaders",
  "Rollers",
  "Generators",
  "Forklifts",
  "Telehandlers",
];

const allEquipment = [
  {
    id: "exc-001",
    name: "CAT 320 GC Excavator",
    category: "Excavators",
    dailyRate: 18500,
    specs: { weight: "20,300 kg", power: "107 kW", bucket: "1.2 m³" },
    availability: "available",
    image: "https://images.unsplash.com/photo-1577702312706-e23ff063064f?w=800&h=600&fit=crop",
  },
  {
    id: "exc-002",
    name: "Komatsu PC210 LC",
    category: "Excavators",
    dailyRate: 16500,
    specs: { weight: "21,200 kg", power: "113 kW", bucket: "1.1 m³" },
    availability: "available",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop",
  },
  {
    id: "crn-001",
    name: "Liebherr LTM 1090",
    category: "Cranes",
    dailyRate: 45000,
    specs: { capacity: "90 Tons", reach: "52 m", type: "All-Terrain" },
    availability: "limited",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=600&fit=crop",
  },
  {
    id: "crn-002",
    name: "XCMG QY25K Truck Crane",
    category: "Cranes",
    dailyRate: 28000,
    specs: { capacity: "25 Tons", reach: "39 m", type: "Truck-Mounted" },
    availability: "available",
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=600&fit=crop",
  },
  {
    id: "ldr-001",
    name: "Volvo L120H Wheel Loader",
    category: "Loaders",
    dailyRate: 12500,
    specs: { weight: "20,000 kg", power: "203 kW", bucket: "3.3 m³" },
    availability: "available",
    image: "https://images.unsplash.com/photo-1590642916589-592bca10dfbf?w=800&h=600&fit=crop",
  },
  {
    id: "ldr-002",
    name: "JCB 455ZX Loader",
    category: "Loaders",
    dailyRate: 9500,
    specs: { weight: "16,500 kg", power: "128 kW", bucket: "2.8 m³" },
    availability: "available",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop",
  },
  {
    id: "rol-001",
    name: "Dynapac CA6000 Roller",
    category: "Rollers",
    dailyRate: 8200,
    specs: { weight: "12,500 kg", width: "2.1 m", type: "Vibratory" },
    availability: "available",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=600&fit=crop",
  },
  {
    id: "gen-001",
    name: "Cummins C500D5 Generator",
    category: "Generators",
    dailyRate: 6500,
    specs: { output: "500 kVA", fuel: "Diesel", noise: "68 dB" },
    availability: "available",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=600&fit=crop",
  },
  {
    id: "frk-001",
    name: "Toyota 8FG25 Forklift",
    category: "Forklifts",
    dailyRate: 3200,
    specs: { capacity: "2.5 Tons", lift: "4.5 m", fuel: "LPG" },
    availability: "limited",
    image: "https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=800&h=600&fit=crop",
  },
  {
    id: "tel-001",
    name: "JCB 540-170 Telehandler",
    category: "Telehandlers",
    dailyRate: 7800,
    specs: { reach: "17 m", capacity: "4.0 Tons", drive: "4WD" },
    availability: "available",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop",
  },
];

function EquipmentPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = allEquipment.filter((item) => {
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white font-sans">
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFB800]/5 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
              Equipment <span className="text-[#FFB800]">Fleet</span>
            </h1>
            <p className="text-xl text-white/50 max-w-2xl mx-auto">
              Browse our full inventory of heavy machinery. All units safety-inspected and ready for deployment.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
            <SlidersHorizontal className="h-4 w-4 text-[#FFB800] shrink-0" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? "bg-[#FFB800] text-black"
                    : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <Input
            type="text"
            placeholder="Search equipment..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-64 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#FFB800]"
          />
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <Link
              key={item.id}
              to="/equipment/$slug"
              params={{ slug: item.id }}
              className="group glass-card border border-white/5 rounded-lg overflow-hidden hover:border-[#FFB800]/30 transition-all duration-300"
            >
              <div className="relative overflow-hidden aspect-[4/3] bg-[#14161A]">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4">
                  <Badge
                    className={`uppercase text-[10px] font-bold tracking-widest ${
                      item.availability === "available"
                        ? "bg-green-500/20 text-green-400 border-green-500/30"
                        : "bg-[#FFB800]/20 text-[#FFB800] border-[#FFB800]/30"
                    }`}
                  >
                    {item.availability === "available" ? "Available Now" : "Limited Stock"}
                  </Badge>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#FFB800]">{item.category}</span>
                  <span className="text-sm font-mono text-white/40">₹{item.dailyRate.toLocaleString("en-IN")}/day</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-[#FFB800] transition-colors">
                  {item.name}
                </h3>
                <div className="grid grid-cols-3 gap-2 mb-6">
                  {Object.entries(item.specs).map(([key, val]) => (
                    <div key={key} className="text-center py-2 border border-white/5 rounded bg-white/[0.02]">
                      <p className="text-[10px] text-white/40 uppercase tracking-wider">{key}</p>
                      <p className="text-xs font-bold text-white/80">{val}</p>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/40">Daily rental</span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-[#FFB800]/30 text-[#FFB800] hover:bg-[#FFB800] hover:text-black text-xs uppercase tracking-widest font-bold"
                  >
                    View Details <ChevronRight className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-24">
            <p className="text-white/40 text-lg">No equipment found matching your criteria.</p>
            <button
              onClick={() => { setActiveCategory("All"); setSearchQuery(""); }}
              className="mt-4 text-[#FFB800] text-sm font-bold uppercase tracking-widest hover:underline"
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
