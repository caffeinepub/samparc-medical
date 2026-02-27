import { Link, useRouterState, Outlet } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail, MapPin, Heart } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import ChatAssistant from './ChatAssistant';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Medicines', path: '/medicines' },
  { label: 'Contact Us', path: '/contact' },
];

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Top Info Bar */}
      <div className="bg-medical-dark text-white py-2 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <a href="mailto:samparc6@gmail.com" className="flex items-center gap-1.5 hover:text-gold-light transition-colors">
              <Mail size={13} />
              <span>samparc6@gmail.com</span>
            </a>
            <a href="tel:+919766343454" className="flex items-center gap-1.5 hover:text-gold-light transition-colors">
              <Phone size={13} />
              <span>+91 9766343454</span>
            </a>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin size={13} className="text-gold-light" />
            <span className="text-gray-300">Near Malavali Railway Station, Maharashtra</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-medical' : 'bg-white/95 backdrop-blur-sm'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src="/assets/generated/samparc-medical-logo.dim_400x120.png"
                alt="SAMPARC MEDICAL Logo"
                className="h-14 w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              <div className="hidden items-center gap-2" style={{ display: 'none' }}>
                <div className="w-10 h-10 bg-medical-primary rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">✚</span>
                </div>
                <div>
                  <div className="text-medical-primary font-extrabold text-xl leading-tight tracking-wide">SAMPARC</div>
                  <div className="text-gold font-bold text-sm tracking-widest">MEDICAL</div>
                </div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-md text-sm font-semibold transition-all duration-200 ${
                    currentPath === link.path
                      ? 'bg-medical-primary text-white shadow-sm'
                      : 'text-gray-700 hover:bg-medical-light hover:text-medical-primary'
                  }`}
                >
                  {link.label}
                </Link>
              ))}

            </nav>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="md:hidden p-2 rounded-md text-gray-700 hover:bg-medical-light"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-lg animate-slide-down">
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-3 rounded-md text-sm font-semibold transition-all ${
                    currentPath === link.path
                      ? 'bg-medical-primary text-white'
                      : 'text-gray-700 hover:bg-medical-light hover:text-medical-primary'
                  }`}
                >
                  {link.label}
                </Link>
              ))}

            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-medical-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-medical-primary rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">✚</span>
                </div>
                <div>
                  <div className="text-white font-extrabold text-lg leading-tight">SAMPARC</div>
                  <div className="text-gold font-bold text-xs tracking-widest">MEDICAL</div>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Your trusted healthcare partner, committed to providing quality medical care with compassion and excellence.
              </p>
              <p className="text-gold font-semibold italic text-sm">"Your Health, Our Mission"</p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-bold text-base mb-4 border-b border-medical-primary pb-2">Quick Links</h3>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="text-gray-400 hover:text-gold transition-colors text-sm flex items-center gap-1.5">
                      <span className="text-medical-primary">›</span> {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-white font-bold text-base mb-4 border-b border-medical-primary pb-2">Contact Us</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="tel:+919766343454" className="flex items-start gap-2 text-gray-400 hover:text-gold transition-colors">
                    <Phone size={14} className="mt-0.5 text-medical-primary shrink-0" />
                    <span>+91 9766343454 (Customer Care)</span>
                  </a>
                </li>
                <li>
                  <a href="https://wa.me/919766343454" target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 text-gray-400 hover:text-gold transition-colors">
                    <SiWhatsapp size={14} className="mt-0.5 text-green-400 shrink-0" />
                    <span>+91 9766343454 (WhatsApp)</span>
                  </a>
                </li>
                <li>
                  <a href="https://wa.me/919270556455" target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 text-gray-400 hover:text-gold transition-colors">
                    <SiWhatsapp size={14} className="mt-0.5 text-green-400 shrink-0" />
                    <span>+91 9270556455 (Cross WhatsApp)</span>
                  </a>
                </li>
                <li>
                  <a href="tel:+919766343456" className="flex items-start gap-2 text-gray-400 hover:text-gold transition-colors">
                    <Phone size={14} className="mt-0.5 text-medical-primary shrink-0" />
                    <span>+91 9766343456 (CEO)</span>
                  </a>
                </li>
                <li>
                  <a href="mailto:samparc6@gmail.com" className="flex items-start gap-2 text-gray-400 hover:text-gold transition-colors">
                    <Mail size={14} className="mt-0.5 text-medical-primary shrink-0" />
                    <span>samparc6@gmail.com</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Address */}
            <div>
              <h3 className="text-white font-bold text-base mb-4 border-b border-medical-primary pb-2">Our Location</h3>
              <div className="flex items-start gap-2 text-gray-400 text-sm mb-4">
                <MapPin size={14} className="mt-0.5 text-medical-primary shrink-0" />
                <address className="not-italic leading-relaxed">
                  SAMPARC MEDICAL,<br />
                  Nearby Malavali Railway Station,<br />
                  Samparc Malavali Campus,<br />
                  Near Malavli, Malavli,<br />
                  Maharashtra 410405
                </address>
              </div>
              <a
                href="https://maps.google.com/?q=Malavali+Railway+Station+Maharashtra"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs bg-medical-primary/20 text-medical-light px-3 py-1.5 rounded-full hover:bg-medical-primary/30 transition-colors"
              >
                <MapPin size={12} /> View on Map
              </a>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-gray-500">
            <p>© {new Date().getFullYear()} SAMPARC MEDICAL. All Rights Reserved.</p>
            <p className="flex items-center gap-1.5">
              Built with <Heart size={14} className="text-red-400 fill-red-400" /> using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== 'undefined' ? window.location.hostname : 'samparc-medical')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold hover:text-gold-light transition-colors font-medium"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>

      <ChatAssistant />
    </div>
  );
}
