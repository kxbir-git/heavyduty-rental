import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Shield, Truck, Wrench, Clock } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "KK & Sons Equip — Premium Construction Equipment Rental" },
      { name: "description", content: "Rent top-tier excavators, cranes, loaders, and heavy machinery across India. Competitive daily, weekly, and monthly rates with reliable delivery and certified operator support." },
      { property: "og:title", content: "KK & Sons Equip — Premium Construction Equipment Rental" },
      { property: "og:description", content: "Rent top-tier excavators, cranes, loaders, and heavy machinery across India. Competitive daily, weekly, and monthly rates with reliable delivery and certified operator support." },
      { property: "og:url", content: "https://apex-rentals.lovable.app/" },
    ],
    links: [
      { rel: "canonical", href: "https://apex-rentals.lovable.app/" },
    ],
  }),
  component: Index,
});

const categories = [
  { name: "Excavators", desc: "20-ton class CAT & Komatsu" },
  { name: "Cranes", desc: "25-90 ton truck & crawler" },
  { name: "Loaders", desc: "Wheel & backhoe loaders" },
  { name: "Rollers", desc: "Dynapac soil compactors" },
  { name: "Generators", desc: "Cummins 500 kVA diesel" },
  { name: "Forklifts", desc: "Toyota 2.5-ton class" },
];

const trustPoints = [
  { icon: Shield, title: "Fully Insured Fleet", desc: "Every machine carries comprehensive insurance." },
  { icon: Truck, title: "Pan-India Delivery", desc: "On-site delivery to 50+ cities, often same week." },
  { icon: Wrench, title: "Certified Operators", desc: "Licensed operators with 5+ years experience." },
  { icon: Clock, title: "2-Hour Quote", desc: "Get confirmed pricing within two business hours." },
];

function Index() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white font-sans">
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFB800]/10 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#FFB800]/30 bg-[#FFB800]/5 mb-6">
              <span className="text-sm font-semibold text-[#FFB800]">Trusted by 500+ contractors across India</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
              Heavy Equipment, <span className="text-[#FFB800]">Rented Right.</span>
            </h1>
            <p className="text-xl text-white/60 mb-8 leading-relaxed">
              KK &amp; Sons Equip rents excavators, cranes, loaders, rollers, generators, and forklifts to construction and infrastructure projects across India. Transparent pricing, insured fleet, certified operators — book in hours, not days.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/quote" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#FFB800] text-black font-black uppercase tracking-widest text-sm hover:bg-[#FFB800]/90 transition-all">
                Request a Quote <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/equipment" className="inline-flex items-center justify-center px-8 py-4 border border-white/10 text-white font-bold uppercase tracking-widest text-sm hover:bg-white/5 transition-all">
                Browse Fleet
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">Our Fleet</h2>
        <p className="text-white/50 mb-10">Pick a category — full specs and live availability inside.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((c) => (
            <Link key={c.name} to="/equipment" className="group p-6 rounded-lg border border-white/5 bg-white/[0.02] hover:border-[#FFB800]/30 hover:bg-[#FFB800]/5 transition-all">
              <h3 className="text-xl font-bold text-white group-hover:text-[#FFB800] transition-colors">{c.name}</h3>
              <p className="text-sm text-white/50 mt-1">{c.desc}</p>
            </Link>

          ))}
        </div>
      </section>

      {/* Trust */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-white/5">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-10">Why Contractors Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustPoints.map((t) => (
            <div key={t.title} className="p-6 rounded-lg border border-white/5">
              <div className="w-12 h-12 rounded-lg bg-[#FFB800]/10 flex items-center justify-center mb-4">
                <t.icon className="h-6 w-6 text-[#FFB800]" />
              </div>
              <h3 className="font-bold text-white mb-1">{t.title}</h3>
              <p className="text-sm text-white/50">{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="rounded-2xl border border-[#FFB800]/20 bg-gradient-to-br from-[#FFB800]/10 to-transparent p-10 md:p-16 text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Ready to <span className="text-[#FFB800]">move earth?</span>
          </h2>
          <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto">
            Tell us what you need. We'll send a confirmed quote within two hours and have machines on-site this week.
          </p>
          <Link to="/quote" className="inline-flex items-center gap-2 px-8 py-4 bg-[#FFB800] text-black font-black uppercase tracking-widest text-sm hover:bg-[#FFB800]/90 transition-all">
            Request a Quote <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
