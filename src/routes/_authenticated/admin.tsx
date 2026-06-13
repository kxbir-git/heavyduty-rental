import { createFileRoute, Outlet, Link, useNavigate, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { LayoutDashboard, Wrench, CalendarCheck, LogOut, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({ meta: [{ title: "Admin — KK & Sons Equip" }] }),
  component: AdminLayout,
});

function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [checking, setChecking] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate({ to: "/auth" });
        return;
      }
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .maybeSingle();
      setIsAdmin(!!data);
      setChecking(false);
    })();
  }, [navigate]);

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-[#FFB800] animate-spin" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <h1 className="text-3xl font-black uppercase mb-2">Access Denied</h1>
          <p className="text-white/50 mb-6">
            Your account doesn't have admin privileges. Contact the site owner to be granted access.
          </p>
          <div className="flex gap-3 justify-center">
            <Link to="/" className="px-5 py-2.5 bg-white/10 text-white text-sm font-bold uppercase tracking-widest">Home</Link>
            <Button onClick={signOut} className="bg-[#FFB800] text-black hover:bg-[#FFB800]/90 font-bold uppercase">Sign Out</Button>
          </div>
        </div>
      </div>
    );
  }

  const nav = [
    { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
    { to: "/admin/equipment", label: "Equipment", icon: Wrench },
    { to: "/admin/bookings", label: "Bookings", icon: CalendarCheck },
  ];

  const isActive = (to: string, exact?: boolean) =>
    exact ? location.pathname === to : location.pathname.startsWith(to);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex">
      <aside className="w-64 border-r border-white/5 p-6 hidden md:flex flex-col">
        <Link to="/" className="flex items-center gap-2 mb-10">
          <div className="w-8 h-8 bg-[#FFB800] rounded-sm" />
          <span className="font-black uppercase text-sm tracking-tight">KK Admin</span>
        </Link>
        <nav className="flex flex-col gap-1 flex-1">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm font-bold uppercase tracking-wider transition-colors ${
                isActive(item.to, item.exact)
                  ? "bg-[#FFB800] text-black"
                  : "text-white/50 hover:bg-white/5 hover:text-white"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <button
          onClick={signOut}
          className="flex items-center gap-3 px-3 py-2.5 text-sm font-bold uppercase tracking-wider text-white/40 hover:text-white"
        >
          <LogOut className="h-4 w-4" /> Sign Out
        </button>
      </aside>
      <main className="flex-1 overflow-auto">
        <div className="md:hidden border-b border-white/5 p-4 flex gap-2 overflow-x-auto">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`px-3 py-2 rounded-sm text-xs font-bold uppercase whitespace-nowrap ${
                isActive(item.to, item.exact) ? "bg-[#FFB800] text-black" : "bg-white/5 text-white/60"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <button onClick={signOut} className="px-3 py-2 text-xs font-bold uppercase text-white/40">
            Sign out
          </button>
        </div>
        <Outlet />
      </main>
    </div>
  );
}
