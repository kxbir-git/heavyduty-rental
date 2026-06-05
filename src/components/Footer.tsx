import { Link } from "@tanstack/react-router";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] pt-16 pb-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-[#FFB800] rounded-sm flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-black">
                  <path d="M4 16L8 8L12 16M12 16L16 8L20 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-lg font-black tracking-tighter uppercase">
                KK & Sons <span className="text-[#FFB800]">Equip</span>
              </span>
            </Link>
            <p className="text-sm text-white/40 leading-relaxed">
              India's trusted partner for heavy construction equipment rental. Serviced to zero-hour standards, delivered in 24 hours.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/60 mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { to: "/equipment", label: "Equipment Fleet" },
                { to: "/about", label: "About Us" },
                { to: "/contact", label: "Contact" },
                { to: "/quote", label: "Request Quote" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-white/40 hover:text-[#FFB800] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/60 mb-4">Categories</h4>
            <ul className="space-y-3">
              {["Excavators", "Cranes", "Loaders", "Rollers", "Generators", "Forklifts"].map((cat) => (
                <li key={cat}>
                  <Link
                    to="/equipment"
                    className="text-sm text-white/40 hover:text-[#FFB800] transition-colors"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/60 mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-white/40">
              <li>+91 98765 43210</li>
              <li>rentals@kksonsequip.com</li>
              <li>Mumbai, Maharashtra</li>
              <li className="flex items-center gap-2 text-[#25D366]">
                <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                WhatsApp Online
              </li>
            </ul>
          </div>
        </div>

        <Separator className="bg-white/5" />

        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/20 uppercase tracking-widest">
            © 2027 KK & Sons Equip. All Rights Reserved.
          </p>
          <div className="flex gap-8">
            <span className="text-xs text-white/20 uppercase tracking-widest hover:text-white/40 cursor-pointer transition-colors">
              Terms
            </span>
            <span className="text-xs text-white/20 uppercase tracking-widest hover:text-white/40 cursor-pointer transition-colors">
              Privacy
            </span>
            <span className="text-xs text-white/20 uppercase tracking-widest hover:text-white/40 cursor-pointer transition-colors">
              Compliance
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
