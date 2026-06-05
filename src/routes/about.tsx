import { createFileRoute, Link } from "@tanstack/react-router";
import { Separator } from "@/components/ui/separator";
import { Award, Users, Globe, Clock } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — KK & Sons Equip" },
      { name: "description", content: "KK & Sons Equip — India's trusted construction equipment rental partner since 1995. Over 850 machines, 12,000+ projects completed." },
      { property: "og:title", content: "About Us — KK & Sons Equip" },
      { property: "og:description", content: "KK & Sons Equip — India's trusted construction equipment rental partner since 1995. Over 850 machines, 12,000+ projects completed." },
      { property: "og:url", content: "/about" },
    ],
    links: [
      { rel: "canonical", href: "/about" },
    ],
  }),
  component: AboutPage,
});

const milestones = [
  { year: "1995", title: "Founded", desc: "Started with 5 machines in Mumbai" },
  { year: "2005", title: "Pan-Maharashtra", desc: "Expanded fleet to 120 units" },
  { year: "2012", title: "National Reach", desc: "Operations across 6 states" },
  { year: "2018", title: "850+ Fleet", desc: "Diversified into power & lifting" },
  { year: "2024", title: "Digital First", desc: "Online booking & AI chatbot launched" },
  { year: "2027", title: "Industry Leader", desc: "12,000+ projects completed" },
];

const values = [
  {
    icon: Award,
    title: "Safety First",
    desc: "Every machine undergoes a 47-point safety inspection before deployment. Zero-accident policy since 2015.",
  },
  {
    icon: Users,
    title: "Certified Crew",
    desc: "Our 200+ operators are trained and certified by OEMs. Average experience: 8 years on heavy machinery.",
  },
  {
    icon: Globe,
    title: "Pan-India Network",
    desc: "Strategic depots in 12 cities with 24/7 logistics support. Equipment reaches your site within 24 hours.",
  },
  {
    icon: Clock,
    title: "99.8% Uptime",
    desc: "Proactive maintenance and real-time telemetry ensure your project never waits on equipment.",
  },
];

function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white font-sans">
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFB800]/5 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
              Built on <span className="text-[#FFB800]">Trust</span>
            </h1>
            <p className="text-xl text-white/50 max-w-2xl mx-auto">
              For three decades, KK & Sons Equip has been the backbone of India's infrastructure. From highways to high-rises, we've powered progress.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-white/5 bg-[#FFB800]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: "30+", label: "Years in Business" },
              { value: "850+", label: "Machines in Fleet" },
              { value: "12,000+", label: "Projects Delivered" },
              { value: "200+", label: "Certified Operators" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-4xl md:text-5xl font-black text-black">{stat.value}</p>
                <p className="text-xs uppercase tracking-widest text-black/60 font-bold mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#FFB800]">Our Story</span>
            <h2 className="text-4xl font-extrabold tracking-tight mt-4 mb-6">
              From 5 Machines to India's Leading Rental Fleet
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                KK & Sons Equip began in 1995 with a single vision: make world-class construction equipment accessible to every contractor in India. What started as a modest yard in Mumbai with five second-hand excavators has grown into one of the country's most trusted equipment rental partners.
              </p>
              <p>
                Today, our fleet of 850+ machines spans excavators, cranes, loaders, rollers, generators, forklifts, and telehandlers. We serve clients from solo contractors to India's largest infrastructure conglomerates — all with the same commitment to safety, reliability, and transparency.
              </p>
              <p>
                In 2024, we embraced digital transformation, launching online booking, real-time fleet tracking, and AI-powered customer support. In 2027, we're setting the standard for what a modern equipment rental experience should be.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] rounded-lg overflow-hidden bg-[#14161A] border border-white/5">
              <img
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&h=900&fit=crop"
                alt="KK & Sons Equip fleet"
                className="w-full h-full object-cover opacity-80"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 border-4 border-[#FFB800]/20 rounded-lg" />
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold tracking-tight mb-4">Our Journey</h2>
          <p className="text-white/50">Three decades of moving India forward.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {milestones.map((m, i) => (
            <div key={i} className="glass-card p-6 rounded-lg border border-white/5 text-center hover:border-[#FFB800]/20 transition-all">
              <p className="text-2xl font-black text-[#FFB800] mb-2">{m.year}</p>
              <p className="text-sm font-bold text-white mb-1">{m.title}</p>
              <p className="text-xs text-white/40">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold tracking-tight mb-4">What We Stand For</h2>
          <p className="text-white/50">The principles that guide every machine we deploy.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.map((v, i) => (
            <div key={i} className="glass-card p-8 rounded-lg border border-white/5 hover:border-[#FFB800]/20 transition-all">
              <div className="w-12 h-12 rounded-lg bg-[#FFB800]/10 flex items-center justify-center mb-6">
                <v.icon className="h-6 w-6 text-[#FFB800]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{v.title}</h3>
              <p className="text-white/50 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
