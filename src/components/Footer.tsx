import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="relative noise-overlay" style={{ backgroundColor: "hsl(20, 44%, 16%)" }}>
    <div className="container mx-auto px-6 py-16 relative z-10">
      <div className="flex flex-col md:flex-row items-start justify-between gap-10">
        <div className="max-w-xs">
          <Link to="/" className="flex items-center gap-2 mb-4">
            <span className="text-2xl">🐝</span>
            <span className="text-xl font-bold tracking-tight text-white">
              Bizzy<span style={{ color: "hsl(40, 78%, 67%)" }}>Bee</span>
            </span>
          </Link>
          <p className="text-sm leading-relaxed" style={{ color: "hsla(40, 20%, 92%, 0.6)" }}>
            AI-powered customer service hub built for UK service businesses.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-10">
          <div>
            <h4 className="font-mono-label mb-4" style={{ color: "hsla(40, 20%, 92%, 0.35)" }}>Contact</h4>
            <ul className="space-y-3">
              <li className="text-sm" style={{ color: "hsla(40, 20%, 92%, 0.6)" }}>hello@bizzybee.co.uk</li>
              <li className="text-sm" style={{ color: "hsla(40, 20%, 92%, 0.6)" }}>0800 123 4567</li>
              <li className="text-sm" style={{ color: "hsla(40, 20%, 92%, 0.6)" }}>London, United Kingdom</li>
            </ul>
          </div>
          <div>
            <h4 className="font-mono-label mb-4" style={{ color: "hsla(40, 20%, 92%, 0.35)" }}>Company</h4>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-sm transition-colors hover:text-primary-light" style={{ color: "hsla(40, 20%, 92%, 0.6)" }}>About Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-mono-label mb-4" style={{ color: "hsla(40, 20%, 92%, 0.35)" }}>Legal</h4>
            <ul className="space-y-3">
              <li><Link to="/privacy" className="text-sm transition-colors hover:text-primary-light" style={{ color: "hsla(40, 20%, 92%, 0.6)" }}>Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-sm transition-colors hover:text-primary-light" style={{ color: "hsla(40, 20%, 92%, 0.6)" }}>Terms of Service</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderTop: "1px solid hsla(40, 20%, 92%, 0.1)" }}>
        <p className="text-sm" style={{ color: "hsla(40, 20%, 92%, 0.35)" }}>
          © {new Date().getFullYear()} BizzyBee Ltd. Registered in England & Wales.
        </p>
        <p className="text-sm" style={{ color: "hsla(40, 20%, 92%, 0.35)" }}>
          Made with 🍯 in the UK
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
