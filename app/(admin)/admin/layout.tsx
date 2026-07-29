"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  FileText,
  Users,
  ShoppingCart,
  Wallet,
  LogOut,
  CalendarHeart,
  Building2,
  Mail,
  MailPlus,
  Send,
  Settings,
  Megaphone,
  Repeat,
} from "lucide-react";
import { useAdminAuth } from "../../store/useAdminAuth";

const navItems = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/content", label: "Content", icon: FileText },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { href: "/admin/subscriptions", label: "Subscriptions", icon: Repeat },
  { href: "/admin/consultations", label: "Consultations", icon: CalendarHeart },
  { href: "/admin/wholesale", label: "Wholesale", icon: Building2 },
  { href: "/admin/influencers", label: "Influencers", icon: Megaphone },
  { href: "/admin/contact-messages", label: "Contact Messages", icon: Mail },
  { href: "/admin/newsletter", label: "Newsletter", icon: MailPlus },
  { href: "/admin/email-campaigns", label: "Email Campaigns", icon: Send },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/budget", label: "Budget", icon: Wallet },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAdminAuth();
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (loading || isLoginPage) return;
    if (!user || user.role !== "ADMIN") router.replace("/admin/login");
  }, [loading, user, isLoginPage, router]);

  if (isLoginPage) return <>{children}</>;

  if (loading || !user || user.role !== "ADMIN") {
    return <div className="min-h-screen bg-[#10160f]" />;
  }

  return (
    <div className="min-h-screen flex bg-[#f4faf3] text-[#16241a]">
      <aside className="w-60 flex-shrink-0 bg-[#10160f] text-white flex flex-col">
        <div className="p-6">
          <p className="text-[10px] tracking-[0.35em] uppercase text-[#8ab88e]">
            Naya Glows
          </p>
          <p className="text-lg font-semibold">Admin</p>
        </div>
        <nav className="flex-1 px-3 flex flex-col gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${
                  active ? "bg-white/10 text-white" : "text-white/55 hover:bg-white/5 hover:text-white/80"
                }`}
              >
                <Icon size={16} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-white/10">
          <p className="text-xs text-white/40 px-3 mb-2 truncate">{user.email}</p>
          <button
            onClick={() => {
              logout();
              router.push("/admin/login");
            }}
            className="flex items-center gap-2 text-sm text-white/55 hover:text-white transition-colors px-3 py-2"
          >
            <LogOut size={15} />
            Sign Out
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto">
        <div className="p-6 sm:p-10 max-w-[1200px] mx-auto">{children}</div>
      </main>
    </div>
  );
}
