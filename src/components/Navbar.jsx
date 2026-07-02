import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/certifications", label: "Skills" },
  { path: "/portfolio", label: "Portfolio" },
  { path: "/contact", label: "Contact" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <nav
      className={`glass-nav ${scrolled ? "scrolled" : ""}`}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: "var(--nav-height)",
        display: "flex",
        alignItems: "center",
        padding: "0 32px",
        transition: "all 0.3s ease",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link to="/" style={{ textDecoration: "none" }}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            style={{
              fontSize: "1.5rem",
              fontWeight: 800,
              letterSpacing: "-0.03em",
            }}
          >
            <span className="gradient-text">ST</span>
            <span style={{ color: "var(--text-primary)", marginLeft: "8px", fontWeight: 400, fontSize: "1rem" }}>
              Sharan Tandra
            </span>
          </motion.div>
        </Link>

        {/* Desktop Links */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            alignItems: "center",
          }}
          className="nav-desktop"
        >
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link key={link.path} to={link.path}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    padding: "8px 20px",
                    borderRadius: "var(--radius-full)",
                    fontSize: "0.9rem",
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? "var(--accent-cyan)" : "var(--text-secondary)",
                    background: isActive ? "rgba(0, 212, 255, 0.1)" : "transparent",
                    border: isActive ? "1px solid rgba(0, 212, 255, 0.2)" : "1px solid transparent",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                  }}
                >
                  {link.label}
                </motion.div>
              </Link>
            );
          })}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="nav-mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            display: "none",
            flexDirection: "column",
            gap: "5px",
            padding: "8px",
            cursor: "pointer",
          }}
          aria-label="Toggle menu"
        >
          <motion.span
            animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            style={{
              display: "block",
              width: "24px",
              height: "2px",
              background: "var(--text-primary)",
              borderRadius: "2px",
              transition: "background 0.2s",
            }}
          />
          <motion.span
            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            style={{
              display: "block",
              width: "24px",
              height: "2px",
              background: "var(--text-primary)",
              borderRadius: "2px",
            }}
          />
          <motion.span
            animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            style={{
              display: "block",
              width: "24px",
              height: "2px",
              background: "var(--text-primary)",
              borderRadius: "2px",
            }}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={mobileOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        className="nav-mobile-menu"
        style={{
          position: "absolute",
          top: "var(--nav-height)",
          left: 0,
          right: 0,
          background: "rgba(10, 10, 26, 0.95)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid var(--glass-border)",
          overflow: "hidden",
          display: "none",
        }}
      >
        <div style={{ padding: "16px 24px", display: "flex", flexDirection: "column", gap: "8px" }}>
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link key={link.path} to={link.path}>
                <div
                  style={{
                    padding: "12px 20px",
                    borderRadius: "var(--radius-md)",
                    fontSize: "1rem",
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? "var(--accent-cyan)" : "var(--text-secondary)",
                    background: isActive ? "rgba(0, 212, 255, 0.1)" : "transparent",
                  }}
                >
                  {link.label}
                </div>
              </Link>
            );
          })}
        </div>
      </motion.div>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-toggle { display: flex !important; }
          .nav-mobile-menu { display: block !important; }
        }
      `}</style>
    </nav>
  );
}

export default Navbar;