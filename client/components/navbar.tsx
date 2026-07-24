"use client";

import Link from "next/link";
import { Bell, Coins, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { api } from "@/lib/api";

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hash, setHash] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<{ _id: string; message: string; isRead?: boolean; time?: string; createdAt?: string; actionRoute?: string }[]>([]);
  const notificationRef = useRef<HTMLDivElement>(null);
  const closeMenu = () => setOpen(false);
  const loadNotifications = async () => {
    try { setNotifications(await api("/notifications")); } catch { setNotifications([]); }
  };
  useEffect(() => {
    const close = (event: MouseEvent) => { if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) setShowNotifications(false); };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);
  useEffect(() => {
    const syncHash = () => setHash(window.location.hash);
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, [pathname]);
  const active = (href: string) => (href === "/#how-it-works" ? pathname === "/" && hash === "#how-it-works" : pathname === href) ? "text-forest underline decoration-lime decoration-4 underline-offset-8" : "hover:text-forest";

  return <header className="sticky top-0 z-50 border-b border-black/5 bg-cream/90 backdrop-blur-xl"><div className="container-app flex h-20 items-center justify-between">
    <Link href="/" className="flex items-center gap-2 text-2xl font-black tracking-tight"><span className="grid h-9 w-9 place-items-center rounded-full bg-lime">F</span>Fundora</Link>
    <nav className="hidden items-center gap-6 md:flex"><Link href="/" className={`font-semibold ${active("/")}`}>Home</Link><Link href="/explore" className={`font-semibold ${active("/explore")}`}>Explore campaigns</Link><Link href="/#how-it-works" className={`font-semibold ${active("/#how-it-works")}`}>How it works</Link>{user ? <><Link href="/dashboard" className={`font-semibold ${active("/dashboard")}`}>Dashboard</Link><span className="flex items-center gap-1 rounded-full bg-white px-3 py-2 text-sm font-bold"><Coins size={16} />{user.credits}</span><div ref={notificationRef} className="relative"><button aria-label="Notifications" onClick={() => { setShowNotifications(!showNotifications); loadNotifications(); }} className="relative grid size-9 place-items-center rounded-full bg-white"><Bell size={17} />{notifications.some((item) => !item.isRead) && <span className="absolute right-1 top-1 size-2 rounded-full bg-red-500" />}</button>{showNotifications && <div className="absolute right-0 top-12 w-80 rounded-2xl border border-black/5 bg-white p-3 shadow-soft">{notifications.length ? <>{notifications.map((item) => <button key={item._id} onClick={async () => { await api(`/notifications/${item._id}/read`, { method: "PATCH" }); setShowNotifications(false); if (item.actionRoute) router.push(item.actionRoute); }} className={`block w-full rounded-xl p-3 text-left text-sm ${item.isRead ? "" : "bg-cream"}`}><b className="block font-medium">{item.message}</b><small className="mt-1 block text-black/45">{new Date(item.time || item.createdAt || Date.now()).toLocaleString()}</small></button>)}<button onClick={() => api("/notifications/read-all", { method: "PATCH" }).then(loadNotifications)} className="mt-2 w-full text-xs font-bold">Mark all read</button></> : <p className="p-3 text-sm text-black/50">No notifications yet.</p>}</div>}</div><Link href="/dashboard" className="flex items-center gap-2">{user.photo ? <img src={user.photo} alt={`${user.name} profile`} className="size-8 rounded-full object-cover" /> : <span className="grid size-8 place-items-center rounded-full bg-forest text-xs text-white">{user.name.charAt(0).toUpperCase()}</span>}<span className="text-xs"><b className="block">{user.name}</b><span className="capitalize text-black/45">{user.role}</span></span></Link><button onClick={logout} className="font-semibold">Logout</button></> : <><Link href="/login" className={`font-semibold ${active("/login")}`}>Login</Link><Link href="/register" className="btn-primary !px-5 !py-2.5">Get started</Link></>}<a href="https://github.com/GalibDev/Fundora" target="_blank" rel="noreferrer" className="text-sm font-bold underline decoration-lime decoration-4 underline-offset-4">Join as developer</a></nav>
    <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">{open ? <X /> : <Menu />}</button>
  </div>{open && <nav className="container-app flex flex-col gap-4 border-t border-black/5 py-5 md:hidden"><Link href="/" onClick={closeMenu}>Home</Link><Link href="/explore" onClick={closeMenu}>Explore campaigns</Link><Link href="/#how-it-works" onClick={closeMenu}>How it works</Link><Link href={user ? "/dashboard" : "/login"} onClick={closeMenu}>{user ? "Dashboard" : "Login"}</Link>{!user && <Link href="/register" onClick={closeMenu}>Register</Link>}{user && <button className="text-left" onClick={logout}>Logout</button>}<a href="https://github.com/GalibDev/Fundora" target="_blank" rel="noreferrer">Join as developer</a></nav>}</header>;
}
