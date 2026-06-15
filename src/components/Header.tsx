import { Link, useLocation } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, ShieldCheck, MapPin, Phone, Mail } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const location = useLocation();
  const { isAdmin, user } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const routeLinks = [
    { to: "/", label: "Home" },
    { to: "/equipment", label: "Fleet" },
  ] as const;

  const navTriggerClass = "text-sm font-bold uppercase tracking-widest transition-colors text-white/40 hover:text-white";

  return (
    <header className="sticky top-0 z-50 bg-[#0A0A0A]/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#FFB800] rounded-sm flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-black">
                <path d="M4 16L8 8L12 16M12 16L16 8L20 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-xl font-black tracking-tighter uppercase">
              KK & Sons <span className="text-[#FFB800]">Equip</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {routeLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-bold uppercase tracking-widest transition-colors ${
                  isActive(link.to)
                    ? "text-[#FFB800]"
                    : "text-white/40 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <button type="button" onClick={() => setAboutOpen(true)} className={navTriggerClass}>
              About
            </button>
            <button type="button" onClick={() => setContactOpen(true)} className={navTriggerClass}>
              Contact
            </button>
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            {isAdmin && (
              <Link to="/admin" className="px-3 py-2 text-xs font-bold uppercase tracking-widest text-[#FFB800] hover:text-white flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4" /> Admin
              </Link>
            )}
            {!user && (
              <Link to="/auth" className="px-3 py-2 text-xs font-bold uppercase tracking-widest text-white/60 hover:text-white">
                Sign In
              </Link>
            )}
            <Link
              to="/quote"
              className="px-6 py-3 bg-[#FFB800] text-black text-xs font-black uppercase tracking-widest hover:bg-[#FFB800]/90 transition-all"
            >
              Request Quote
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            className="md:hidden w-10 h-10 flex items-center justify-center text-white"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/5 animate-fade-in">
            <nav className="flex flex-col gap-4">
              {routeLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-sm font-bold uppercase tracking-widest py-2 transition-colors ${
                    isActive(link.to)
                      ? "text-[#FFB800]"
                      : "text-white/40 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <button
                type="button"
                onClick={() => { setIsMenuOpen(false); setAboutOpen(true); }}
                className="text-left text-sm font-bold uppercase tracking-widest py-2 text-white/40 hover:text-white"
              >
                About
              </button>
              <button
                type="button"
                onClick={() => { setIsMenuOpen(false); setContactOpen(true); }}
                className="text-left text-sm font-bold uppercase tracking-widest py-2 text-white/40 hover:text-white"
              >
                Contact
              </button>
              <Link
                to="/quote"
                onClick={() => setIsMenuOpen(false)}
                className="mt-4 px-6 py-3 bg-[#FFB800] text-black text-center text-xs font-black uppercase tracking-widest"
              >
                Request Quote
              </Link>
            </nav>
          </div>
        )}
      </div>

      {/* About Popup */}
      <Dialog open={aboutOpen} onOpenChange={setAboutOpen}>
        <DialogContent className="bg-[#0A0A0A] border-white/10 text-white max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-extrabold uppercase tracking-tight">
              About <span className="text-[#FFB800]">KK & Sons Equip</span>
            </DialogTitle>
            <DialogDescription className="text-white/60">
              Heavy equipment rental, done right.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 text-sm text-white/70 leading-relaxed">
            <p>
              For over two decades, KK & Sons Equip has supplied contractors, infrastructure
              firms, and project owners across India with reliable, well-maintained heavy
              equipment — excavators, cranes, loaders, rollers, generators, and forklifts.
            </p>
            <p>
              Every machine is insured, serviced on a strict schedule, and backed by certified
              operators with 5+ years of field experience. We deliver to 50+ cities and confirm
              quotes within two business hours.
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Contact Popup */}
      <Dialog open={contactOpen} onOpenChange={setContactOpen}>
        <DialogContent className="bg-[#0A0A0A] border-white/10 text-white max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-extrabold uppercase tracking-tight">
              Get in <span className="text-[#FFB800]">Touch</span>
            </DialogTitle>
            <DialogDescription className="text-white/60">
              Our team replies within two business hours.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 text-sm">
            <a href="tel:+919876543210" className="flex items-center gap-3 p-3 rounded-lg border border-white/10 hover:border-[#FFB800]/40 hover:bg-[#FFB800]/5 transition-all">
              <Phone className="h-5 w-5 text-[#FFB800] shrink-0" />
              <div>
                <div className="text-xs uppercase tracking-widest text-white/40">Call us</div>
                <div className="font-bold text-white">+91 98765 43210</div>
              </div>
            </a>
            <a href="mailto:hello@kksonsequip.in" className="flex items-center gap-3 p-3 rounded-lg border border-white/10 hover:border-[#FFB800]/40 hover:bg-[#FFB800]/5 transition-all">
              <Mail className="h-5 w-5 text-[#FFB800] shrink-0" />
              <div>
                <div className="text-xs uppercase tracking-widest text-white/40">Email</div>
                <div className="font-bold text-white">hello@kksonsequip.in</div>
              </div>
            </a>
            <div className="flex items-center gap-3 p-3 rounded-lg border border-white/10">
              <MapPin className="h-5 w-5 text-[#FFB800] shrink-0" />
              <div>
                <div className="text-xs uppercase tracking-widest text-white/40">Yard</div>
                <div className="font-bold text-white">Plot 14, Industrial Area, Pune, MH</div>
              </div>
            </div>
            <Link
              to="/quote"
              onClick={() => setContactOpen(false)}
              className="block text-center mt-2 px-6 py-3 bg-[#FFB800] text-black text-xs font-black uppercase tracking-widest hover:bg-[#FFB800]/90 transition-all"
            >
              Request a Quote
            </Link>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
}
