'use client'

import { CreditCard, QrCode, Wallet, Mail, Phone, MapPin, Instagram, Linkedin, Github } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative w-full text-white">
      {/* BACKGROUND */}
      <div className="absolute inset-0">
        {/* Desktop */}
        <div className="hidden md:block w-full h-full bg-cover bg-center" style={{ backgroundImage: 'url(/banner_footer_desktop.png)' }} />
        {/* Mobile */}
        <div className="block md:hidden w-full h-full bg-cover bg-center" style={{ backgroundImage: 'url(/banner_footer_mobile.png)' }} />

        {/* MASK / OVERLAY */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* BRAND */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold tracking-wide">PLASMA</h3>
          <p className="text-sm text-white/70 leading-relaxed">
            Advanced branding, digital presence and e-commerce solutions. Built with performance, identity and scalability in mind.
          </p>

          <div className="flex items-center gap-4 pt-2">
            <a className="text-white/70 hover:text-white transition" href="#">
              <Instagram size={18} />
            </a>
            <a className="text-white/70 hover:text-white transition" href="#">
              <Linkedin size={18} />
            </a>
            <a className="text-white/70 hover:text-white transition" href="#">
              <Github size={18} />
            </a>
          </div>
        </div>

        {/* NAV */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold uppercase tracking-wider">Navigation</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li>
              <a href="#" className="hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Projects
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* CONTACT */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold uppercase tracking-wider">Contact</h4>

          <div className="space-y-3 text-sm text-white/70">
            <div className="flex items-center gap-3">
              <Mail size={16} />
              <span>contact@plasma.dev</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={16} />
              <span>+55 (11) 99999-9999</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin size={16} />
              <span>Brazil</span>
            </div>
          </div>
        </div>

        {/* PAYMENTS */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold uppercase tracking-wider">Payment Methods</h4>

          <div className="flex flex-wrap items-center gap-4 text-white/80">
            <CreditCard size={28} />
            <Wallet size={28} />
            <QrCode size={28} />
          </div>

          <p className="text-xs text-white/60">Secure payments. All transactions are encrypted.</p>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="relative z-10 border-t border-white/10 py-6 text-center text-xs text-white/50">
        © {new Date().getFullYear()} Plasma. All rights reserved.
      </div>
    </footer>
  )
}
