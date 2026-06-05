import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, MessageCircle, Phone, Check } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/equipment/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.slug} — KK & Sons Equip` },
      { name: "description", content: `View specifications, pricing, and availability for ${params.slug} rental.` },
      { property: "og:title", content: `${params.slug} — KK & Sons Equip` },
      { property: "og:description", content: `View specifications, pricing, and availability for ${params.slug} rental.` },
      { property: "og:url", content: `/equipment/${params.slug}` },
    ],
    links: [
      { rel: "canonical", href: `/equipment/${params.slug}` },
    ],
  }),
  component: EquipmentDetailPage,
});

const equipmentData: Record<string, any> = {
  "exc-001": {
    name: "CAT 320 GC Excavator",
    category: "Excavators",
    dailyRate: 18500,
    weeklyRate: 115000,
    monthlyRate: 420000,
    availability: "available",
    images: [
      "https://images.unsplash.com/photo-1577702312706-e23ff063064f?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&h=800&fit=crop",
    ],
    specs: {
      "Operating Weight": "20,300 kg",
      "Engine Power": "107 kW (143 hp)",
      "Max Dig Depth": "6,720 mm",
      "Max Reach": "10,200 mm",
      "Bucket Capacity": "1.2 m³",
      "Fuel Tank": "410 L",
      "Swing Speed": "11.5 rpm",
      "Track Width": "600 mm",
    },
    features: [
      "Next-gen hydraulic system for 15% fuel savings",
      "Rearview camera & proximity sensors",
      "Cat Grade 2D assist for precision digging",
      "Pressurized cab with AC & heated seat",
      "Bluetooth radio with noise cancellation",
      "Bio-oil compatible hydraulic system",
    ],
    description:
      "The CAT 320 GC combines proven components with a simplified hydraulic system to deliver reliable performance at a lower cost per hour. Ideal for general construction, road building, and utility work across India.",
  },
  "exc-002": {
    name: "Komatsu PC210 LC",
    category: "Excavators",
    dailyRate: 16500,
    weeklyRate: 102000,
    monthlyRate: 375000,
    availability: "available",
    images: [
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1577702312706-e23ff063064f?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&h=800&fit=crop",
    ],
    specs: {
      "Operating Weight": "21,200 kg",
      "Engine Power": "113 kW (151 hp)",
      "Max Dig Depth": "6,620 mm",
      "Max Reach": "9,925 mm",
      "Bucket Capacity": "1.1 m³",
      "Fuel Tank": "400 L",
      "Swing Speed": "12.4 rpm",
      "Track Width": "600 mm",
    },
    features: [
      "Komatsu SAA6D107E-3 eco-friendly engine",
      "Auto-idle shutdown to save fuel",
      "Reinforced undercarriage for rocky terrain",
      "Large LCD monitor with maintenance alerts",
      "ROPS/FOPS certified operator protection",
      "Quick-coupler ready for attachments",
    ],
    description:
      "The Komatsu PC210 LC is the workhorse of mid-size excavation. Its reinforced frame and efficient engine make it perfect for Indian infrastructure projects requiring long hours and minimal downtime.",
  },
};

function EquipmentDetailPage() {
  const { slug } = Route.useParams();
  const item = equipmentData[slug] || equipmentData["exc-001"];
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white font-sans">
      {/* Breadcrumb */}
      <div className="pt-24 pb-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-sm text-white/40">
          <Link to="/" className="hover:text-[#FFB800] transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/equipment" className="hover:text-[#FFB800] transition-colors">Fleet</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-white/60">{item.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-[#14161A] border border-white/5">
              <img
                src={item.images[currentImage]}
                alt={item.name}
                className="w-full h-full object-cover"
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
            <div className="flex gap-3">
              {item.images.map((img: string, i: number) => (
                <button
                  key={i}
                  onClick={() => setCurrentImage(i)}
                  className={`relative w-24 h-20 rounded overflow-hidden border-2 transition-all ${
                    currentImage === i ? "border-[#FFB800]" : "border-white/5 hover:border-white/20"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-8">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#FFB800]">{item.category}</span>
              <h1 className="text-4xl font-extrabold tracking-tight mt-2 mb-4">{item.name}</h1>
              <p className="text-white/50 leading-relaxed">{item.description}</p>
            </div>

            {/* Pricing */}
            <div className="glass-card p-6 rounded-lg border border-white/5">
              <h3 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-4">Rental Pricing</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 border border-white/5 rounded bg-white/[0.02]">
                  <p className="text-2xl font-bold text-[#FFB800]">₹{item.dailyRate.toLocaleString("en-IN")}</p>
                  <p className="text-[10px] text-white/40 uppercase tracking-wider mt-1">Per Day</p>
                </div>
                <div className="text-center p-4 border border-white/5 rounded bg-white/[0.02]">
                  <p className="text-2xl font-bold text-white">₹{item.weeklyRate.toLocaleString("en-IN")}</p>
                  <p className="text-[10px] text-white/40 uppercase tracking-wider mt-1">Per Week</p>
                </div>
                <div className="text-center p-4 border border-white/5 rounded bg-white/[0.02]">
                  <p className="text-2xl font-bold text-white">₹{item.monthlyRate.toLocaleString("en-IN")}</p>
                  <p className="text-[10px] text-white/40 uppercase tracking-wider mt-1">Per Month</p>
                </div>
              </div>
              <p className="text-xs text-white/30 mt-4 text-center">
                Prices exclude GST & transport. Operator available at ₹2,500/day.
              </p>
            </div>

            {/* Specs */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-4">Technical Specifications</h3>
              <div className="grid grid-cols-2 gap-px bg-white/5 rounded-lg overflow-hidden border border-white/5">
                {Object.entries(item.specs).map(([key, val]) => (
                  <div key={key} className="bg-[#0A0A0A] p-4">
                    <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1">{key}</p>
                    <p className="text-sm font-bold text-white">{val as string}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-4">Key Features</h3>
              <div className="space-y-3">
                {item.features.map((feature: string, i: number) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#FFB800]/10 flex items-center justify-center shrink-0">
                      <Check className="h-3 w-3 text-[#FFB800]" />
                    </div>
                    <span className="text-white/70 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/quote" className="flex-1">
                <Button className="w-full py-6 bg-[#FFB800] text-black font-bold uppercase tracking-widest text-sm hover:bg-[#FFB800]/90 hover:scale-[1.02] transition-all">
                  Request Quote
                </Button>
              </Link>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button
                  variant="outline"
                  className="w-full py-6 border-[#25D366]/30 text-[#25D366] font-bold uppercase tracking-widest text-sm hover:bg-[#25D366]/10 hover:scale-[1.02] transition-all"
                >
                  <MessageCircle className="h-4 w-4 mr-2" /> WhatsApp Inquiry
                </Button>
              </a>
              <a href="tel:+919876543210" className="flex-1">
                <Button
                  variant="outline"
                  className="w-full py-6 border-white/10 text-white font-bold uppercase tracking-widest text-sm hover:bg-white/5 hover:scale-[1.02] transition-all"
                >
                  <Phone className="h-4 w-4 mr-2" /> Call Now
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
