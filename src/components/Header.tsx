import { Link, useLocation } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, ShieldCheck } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { isAdmin, user } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/equipment", label: "Fleet" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

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
            {navLinks.map((link) => (
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
              {navLinks.map((link) => (
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
    </header>
  );
}
