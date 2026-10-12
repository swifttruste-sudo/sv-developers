import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Phone, CalendarCheck } from "lucide-react";
import Logo from "@/components/Logo";
import Magnetic from "@/components/common/Magnetic";
import { NAV_LINKS, SITE } from "@/data/site";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const linkClass = ({ isActive }) =>
    `nav-link relative px-1 py-2 text-[13px] font-semibold tracking-wide transition-colors duration-200 ${
      isActive ? "text-navy" : "text-steel hover:text-navy"
    }`;

  return (
    <header
      data-testid="site-header"
      className={`fixed inset-x-0 top-0 z-50 bg-white/95 backdrop-blur transition-all duration-300 ${
        scrolled ? "shadow-[0_10px_40px_-18px_rgba(6,40,88,0.35)]" : "border-b border-navy/10"
      }`}
    >
      <div
        className={`container-x flex items-center justify-between transition-all duration-300 ${
          scrolled ? "py-2.5" : "py-4"
        }`}
      >
        <Logo imgClassName="h-11 w-auto transition-all duration-300" />

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === "/"} className={linkClass} data-testid={`nav-link-${item.to === "/" ? "home" : item.to.slice(1)}`}>
              {({ isActive }) => (
                <>
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-gold"
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={SITE.phoneHref}
            data-testid="header-phone-link"
            className="inline-flex items-center gap-2 text-[13px] font-semibold text-navy transition-colors hover:text-gold"
          >
            <Phone size={15} strokeWidth={2.2} className="text-gold" />
            {SITE.phoneDisplay}
          </a>
          <Magnetic strength={0.25}>
            <Link to="/contact" data-testid="book-site-visit-btn" className="btn-gold !px-5 !py-2.5">
              <CalendarCheck size={15} />
              Book a Site Visit
            </Link>
          </Magnetic>
        </div>

        <button
          type="button"
          data-testid="mobile-menu-button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-navy/15 text-navy transition-colors hover:border-gold hover:text-gold lg:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              data-testid="mobile-menu-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 top-0 z-40 bg-midnight/60 backdrop-blur-sm lg:hidden"
            />
            <motion.nav
              data-testid="mobile-drawer"
              aria-label="Mobile"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="navy-panel fixed right-0 top-0 z-50 flex h-dvh w-[86%] max-w-sm flex-col px-8 pb-10 pt-6 lg:hidden"
            >
              <div className="flex items-center justify-between">
                <Logo dark imgClassName="h-10 w-auto" />
                <button
                  type="button"
                  aria-label="Close menu"
                  data-testid="mobile-menu-close-button"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/25 text-white transition-colors hover:border-gold hover:text-gold"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="mt-10 flex flex-col gap-1">
                {NAV_LINKS.map((item, i) => (
                  <motion.div
                    key={item.to}
                    initial={{ opacity: 0, x: 28 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.05, duration: 0.35 }}
                  >
                    <NavLink
                      to={item.to}
                      end={item.to === "/"}
                      data-testid={`mobile-nav-link-${item.to === "/" ? "home" : item.to.slice(1)}`}
                      className={({ isActive }) =>
                        `group flex items-center justify-between border-b border-white/10 py-4 font-display text-lg font-semibold ${
                          isActive ? "text-gold" : "text-white"
                        }`
                      }
                    >
                      {item.label}
                      <span className="h-px w-6 bg-gold opacity-0 transition-opacity group-hover:opacity-100" />
                    </NavLink>
                  </motion.div>
                ))}
              </div>

              <div className="mt-auto flex flex-col gap-3">
                <a href={SITE.phoneHref} data-testid="mobile-phone-link" className="inline-flex items-center gap-2 text-sm font-semibold text-white/85">
                  <Phone size={16} className="text-gold" /> {SITE.phoneDisplay}
                </a>
                <Link to="/contact" data-testid="mobile-book-site-visit-btn" className="btn-gold w-full">
                  <CalendarCheck size={15} /> Book a Site Visit
                </Link>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
