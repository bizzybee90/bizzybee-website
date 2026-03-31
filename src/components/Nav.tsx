import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.svg";

const navLinks: { label: string; href: string }[] = [
  { label: "Features", href: "/#features" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const Nav = () => {
 const [scrolled, setScrolled] = useState(false);
 const [mobileOpen, setMobileOpen] = useState(false);
 const location = useLocation();

 useEffect(() => {
 const onScroll = () => setScrolled(window.scrollY > 50);
 window.addEventListener("scroll", onScroll, { passive: true });
 return () => window.removeEventListener("scroll", onScroll);
 }, []);

 useEffect(() => setMobileOpen(false), [location]);

 return (
 <motion.header
 className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
 scrolled
 ? "py-2 border-b border-border shadow-sm"
 : "py-4 bg-transparent"
 }`}
 style={scrolled ? {
 background: "rgba(255, 255, 255, 0.72)",
 backdropFilter: "saturate(180%) blur(20px)",
 WebkitBackdropFilter: "saturate(180%) blur(20px)",
 } : undefined}
 >
 <div className="container mx-auto flex items-center justify-between px-6">
 <Link to="/" className="flex items-center gap-2 group">
 <img src={logo} alt="BizzyBee" className="h-8 w-auto" />
 </Link>

 <nav className="hidden md:flex items-center gap-8">
 {navLinks.map((link) => (
 <Link
 key={link.href}
 to={link.href}
 className={`text-sm font-medium transition-colors hover:text-primary ${
 location.pathname === link.href ? "text-primary" : "text-muted-foreground"
 }`}
 >
 {link.label}
 </Link>
 ))}
 </nav>

 <div className="hidden md:flex items-center gap-3">
 <a
 href="https://app.bizzybee.co.uk"
 className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
 >
 Log in
 </a>
 <a
 href="/pricing"
 className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium hover:shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
 style={{ background: "var(--accent-primary)", color: "white", borderRadius: "var(--radius-pill)", boxShadow: "var(--shadow-card)" }}
 >
 Start Free Trial
 </a>
 </div>

 <button
 onClick={() => setMobileOpen(!mobileOpen)}
 className="md:hidden p-2 text-foreground"
 aria-label="Toggle menu"
 >
 {mobileOpen ? <X size={22} /> : <Menu size={22} />}
 </button>
 </div>

 <AnimatePresence>
 {mobileOpen && (
 <motion.div
 initial={{ opacity: 0, height: 0 }}
 animate={{ opacity: 1, height: "auto" }}
 exit={{ opacity: 0, height: 0 }}
 className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border overflow-hidden"
 >
 <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
 {navLinks.map((link) => (
 <Link
 key={link.href}
 to={link.href}
 className="text-base font-medium text-foreground py-2"
 >
 {link.label}
 </Link>
 ))}
 <a
 href="/pricing"
 className="inline-flex items-center justify-center px-5 py-3 text-sm font-medium mt-2" style={{ background: "var(--accent-primary)", color: "white", borderRadius: "var(--radius-pill)", boxShadow: "var(--shadow-card)" }}
 >
 Start Free Trial
 </a>
 </div>
 </motion.div>
 )}
 </AnimatePresence>
 </motion.header>
 );
};

export default Nav;
