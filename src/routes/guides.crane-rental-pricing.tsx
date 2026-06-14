import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/guides/crane-rental-pricing")({
  head: () => ({
    meta: [
      { title: "The Ultimate Guide to Crane Rental Pricing in India (2024)" },
      { name: "description", content: "How crane rental is priced in India in 2024 — tonnage tiers, duration discounts, operator and transport costs, and real rate ranges for Mumbai, Pune, and Delhi NCR." },
      { property: "og:title", content: "The Ultimate Guide to Crane Rental Pricing in India (2024)" },
      { property: "og:description", content: "Tonnage tiers, duration discounts, operator and transport costs, and real city rate ranges for crane hire in India." },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://apex-rentals.lovable.app/guides/crane-rental-pricing" },
    ],
    links: [
      { rel: "canonical", href: "https://apex-rentals.lovable.app/guides/crane-rental-pricing" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "The Ultimate Guide to Crane Rental Pricing in India (2024)",
          description: "Tonnage tiers, duration discounts, operator and transport costs, and real city rate ranges for crane hire in India.",
          author: { "@type": "Organization", name: "KK & Sons Equip" },
          publisher: { "@type": "Organization", name: "KK & Sons Equip" },
          mainEntityOfPage: "https://apex-rentals.lovable.app/guides/crane-rental-pricing",
        }),
      },
    ],
  }),
  component: GuidePage,
});

function GuidePage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white font-sans">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
        <p className="text-xs font-bold uppercase tracking-widest text-[#FFB800] mb-3">Guides</p>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
          The Ultimate Guide to Crane Rental Pricing in India (2024)
        </h1>
        <p className="text-lg text-white/60 leading-relaxed mb-10">
          Crane rental costs in India vary wildly — a 25-ton truck crane in Pune can cost a third of a 90-ton crawler in Mumbai. This guide breaks down the factors that actually move the price so you can budget your project accurately and negotiate from a position of strength.
        </p>

        <h2 className="text-2xl font-bold mt-12 mb-4">1. What drives crane rental cost</h2>
        <ul className="space-y-3 text-white/70 leading-relaxed list-disc pl-6">
          <li><strong className="text-white">Tonnage / lifting capacity</strong> — by far the biggest driver. A 25-ton truck crane rents for ₹25,000–₹32,000/day; a 90-ton crawler can exceed ₹85,000/day.</li>
          <li><strong className="text-white">Rental duration</strong> — daily rates compress significantly at the weekly and monthly tier. Expect ~25% off weekly and ~40% off monthly versus daily.</li>
          <li><strong className="text-white">Operator &amp; rigger costs</strong> — typically ₹2,500–₹4,500 per operator per day, often billed separately.</li>
          <li><strong className="text-white">Mobilization &amp; transport</strong> — flatbed and trailer charges scale with crane class and distance; budget ₹15,000–₹60,000 round trip within a state.</li>
          <li><strong className="text-white">Fuel and consumables</strong> — usually customer-paid; diesel can add ₹3,000–₹8,000/day depending on duty cycle.</li>
          <li><strong className="text-white">Insurance &amp; idle days</strong> — most reputable suppliers bake basic insurance in; idle/wet hire days are usually billable.</li>
        </ul>

        <h2 className="text-2xl font-bold mt-12 mb-4">2. Indicative rate card by tonnage</h2>
        <div className="overflow-x-auto my-6 rounded-lg border border-white/10">
          <table className="w-full text-sm">
            <thead className="bg-white/5 text-white/60 uppercase text-xs tracking-wider">
              <tr>
                <th className="px-4 py-3 text-left">Class</th>
                <th className="px-4 py-3 text-left">Daily</th>
                <th className="px-4 py-3 text-left">Weekly</th>
                <th className="px-4 py-3 text-left">Monthly</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[
                ["25T truck crane", "₹25,000–₹32,000", "₹1.4–1.8 L", "₹4.5–5.5 L"],
                ["50T truck crane", "₹38,000–₹48,000", "₹2.1–2.7 L", "₹6.5–8.5 L"],
                ["90T crawler crane", "₹65,000–₹85,000", "₹3.8–4.8 L", "₹11–14 L"],
                ["150T+ heavy lift", "₹1.1–1.6 L", "₹6–9 L", "On request"],
              ].map((row) => (
                <tr key={row[0]}>
                  {row.map((cell, i) => (
                    <td key={i} className={i === 0 ? "px-4 py-3 font-bold text-white" : "px-4 py-3 text-white/70"}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-white/40">Rates exclude 18% GST, operator, and transport. Valid Q1 2024 across major Indian metros.</p>

        <h2 className="text-2xl font-bold mt-12 mb-4">3. City-by-city rate ranges</h2>
        <h3 className="text-lg font-bold mt-6 mb-2 text-[#FFB800]">Mumbai</h3>
        <p className="text-white/70 leading-relaxed">Mumbai commands the highest crane rental premium in India due to congested job sites, narrow access, and high mobilization costs. Expect 15–25% above the national rate card. Night-shift work is common and adds a ~20% surcharge.</p>
        <h3 className="text-lg font-bold mt-6 mb-2 text-[#FFB800]">Pune</h3>
        <p className="text-white/70 leading-relaxed">Pune is the most competitive of the major western cities. Active infrastructure pipelines (metro, IT parks) mean strong supplier supply — 25-ton and 50-ton rates often sit at the bottom of the national range.</p>
        <h3 className="text-lg font-bold mt-6 mb-2 text-[#FFB800]">Delhi NCR</h3>
        <p className="text-white/70 leading-relaxed">Delhi NCR sees high demand for 90-ton and 150-ton crawler cranes serving expressway and high-rise work. Mobilization across NCR borders can add ₹20,000–₹40,000; plan for one-way transit charges on cross-state moves.</p>

        <h2 className="text-2xl font-bold mt-12 mb-4">4. How to get the best price</h2>
        <ol className="space-y-3 text-white/70 leading-relaxed list-decimal pl-6">
          <li>Commit to a duration — even a 7-day commitment unlocks weekly pricing.</li>
          <li>Bundle multiple machines (crane + loader + generator) with one supplier to negotiate transport.</li>
          <li>Be flexible on make/model — Liebherr, XCMG, and Sany cranes in the same class can vary 10–15% in rate.</li>
          <li>Lock the operator scope in writing (shift length, overtime, idle days) to avoid invoice surprises.</li>
          <li>Always insist on a written insurance certificate and load test before lifting.</li>
        </ol>

        <div className="mt-16 p-8 rounded-2xl border border-[#FFB800]/20 bg-[#FFB800]/5 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-3">Get a real quote in 2 hours</h2>
          <p className="text-white/60 mb-6">Tell us the tonnage, location, and dates — we'll send a confirmed price with operator and transport included.</p>
          <Link to="/quote" className="inline-flex px-8 py-4 bg-[#FFB800] text-black font-black uppercase tracking-widest text-sm hover:bg-[#FFB800]/90 transition-all">
            Request a Crane Quote
          </Link>
        </div>
      </article>
    </main>
  );
}
