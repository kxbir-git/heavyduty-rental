import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { MessageCircle, Phone, Mail, MapPin, Clock } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — KK & Sons Equip" },
      { name: "description", content: "Get in touch with KK & Sons Equip for construction equipment rentals, project quotes, and fleet inquiries." },
      { property: "og:title", content: "Contact — KK & Sons Equip" },
      { property: "og:description", content: "Get in touch with KK & Sons Equip for construction equipment rentals, project quotes, and fleet inquiries." },
      { property: "og:url", content: "/contact" },
    ],
    links: [
      { rel: "canonical", href: "/contact" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white font-sans">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFB800]/5 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#FFB800]/30 bg-[#FFB800]/5 mb-6">
              <MessageCircle className="h-4 w-4 text-[#FFB800]" />
              <span className="text-sm font-semibold text-[#FFB800]">Get in Touch</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
              Contact <span className="text-[#FFB800]">Us</span>
            </h1>
            <p className="text-xl text-white/50 max-w-2xl mx-auto">
              Ready to move earth? Our team is standing by to help you configure the perfect fleet for your project.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Phone, label: "Phone", value: "+91 98765 43210", sub: "Mon-Sat 8am-8pm" },
            { icon: Mail, label: "Email", value: "rentals@kksonsequip.com", sub: "24hr response" },
            { icon: MapPin, label: "Head Office", value: "Mumbai, Maharashtra", sub: "Pan-India Service" },
            { icon: Clock, label: "Emergency", value: "24/7 Hotline", sub: "+91 98765 43211" },
          ].map((item, i) => (
            <div key={i} className="glass-card p-6 rounded-lg border border-white/5 hover:border-[#FFB800]/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-[#FFB800]/10 flex items-center justify-center mb-4">
                <item.icon className="h-6 w-6 text-[#FFB800]" />
              </div>
              <p className="text-sm text-white/40 uppercase tracking-wider font-bold mb-1">{item.label}</p>
              <p className="text-lg font-bold text-white">{item.value}</p>
              <p className="text-sm text-white/40 mt-1">{item.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form + Map */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Form */}
          <div className="glass-card p-8 rounded-lg border border-white/5">
            <h2 className="text-2xl font-bold mb-2">Send a Message</h2>
            <p className="text-white/50 mb-8">Fill out the form and we'll get back to you within 2 hours.</p>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm text-white/60">Full Name</Label>
                  <Input id="name" placeholder="John Doe" className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#FFB800]" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm text-white/60">Phone</Label>
                  <Input id="phone" placeholder="+91 98765 43210" className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#FFB800]" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm text-white/60">Email</Label>
                <Input id="email" type="email" placeholder="john@company.com" className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#FFB800]" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company" className="text-sm text-white/60">Company / Project</Label>
                <Input id="company" placeholder="Acme Construction Pvt Ltd" className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#FFB800]" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm text-white/60">Message</Label>
                <Textarea id="message" rows={5} placeholder="Tell us about your project requirements..." className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#FFB800] resize-none" />
              </div>
              <Button className="w-full py-6 bg-[#FFB800] text-black font-bold uppercase tracking-widest text-sm hover:bg-[#FFB800]/90 hover:scale-[1.02] transition-all">
                Send Message
              </Button>
            </form>
          </div>

          {/* Service Areas + WhatsApp */}
          <div className="space-y-8">
            <div className="glass-card p-8 rounded-lg border border-white/5">
              <h3 className="text-xl font-bold mb-6">Service Areas</h3>
              <div className="grid grid-cols-2 gap-4">
                {["Mumbai", "Pune", "Nashik", "Nagpur", "Surat", "Ahmedabad", "Indore", "Hyderabad", "Bangalore", "Chennai", "Delhi NCR", "Jaipur"].map((city) => (
                  <div key={city} className="flex items-center gap-2 text-white/60 text-sm">
                    <MapPin className="h-3 w-3 text-[#FFB800]" />
                    {city}
                  </div>
                ))}
              </div>
              <Separator className="my-6 bg-white/5" />
              <div className="space-y-4">
                <h4 className="font-bold text-sm uppercase tracking-wider">Preferred Contact</h4>
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-lg bg-[#25D366]/10 border border-[#25D366]/20 hover:bg-[#25D366]/20 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center">
                    <MessageCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-white group-hover:text-[#25D366] transition-colors">Chat on WhatsApp</p>
                    <p className="text-sm text-white/50">Instant response during business hours</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="glass-card p-8 rounded-lg border border-white/5">
              <h3 className="text-xl font-bold mb-6">Why Contractors Trust Us</h3>
              <div className="space-y-4">
                {[
                  "ISO 9001:2015 Certified Fleet",
                  "All Equipment Safety Inspected",
                  "Licensed & Insured Operators Available",
                  "Transparent Pricing — No Hidden Fees",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#FFB800]/10 flex items-center justify-center shrink-0">
                      <div className="w-2 h-2 rounded-full bg-[#FFB800]" />
                    </div>
                    <span className="text-white/70 text-sm">{item}</span>
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
