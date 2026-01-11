'use client'

import { useState, useEffect } from 'react'
import { Home, ShoppingBag, Users, Info, Phone, Menu, X, Search, User } from 'lucide-react'

const menuItems = [
  { id: 'home', label: 'Home', icon: <Home size={18} /> },
  { id: 'shop', label: 'Shop', icon: <ShoppingBag size={18} /> },
  { id: 'about', label: 'About', icon: <Info size={18} /> },
  { id: 'team', label: 'Team', icon: <Users size={18} /> },
  { id: 'contact', label: 'Contact', icon: <Phone size={18} /> }
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeItem, setActiveItem] = useState('home')

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="relative w-full h-screen">
      {/* BACKGROUND */}
      <div className="absolute inset-0">
        {/* DESKTOP */}
        <div className="hidden md:block w-full h-full bg-cover bg-center" style={{ backgroundImage: 'url(/banner_content_header.png)' }} />

        {/* MOBILE */}
        <div
          className="block md:hidden w-full h-full bg-contain bg-top bg-no-repeat"
          style={{ backgroundImage: 'url(/mobile_banner_content_header.png)' }}
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* PLANK MENU */}
      <div
        className={`
          fixed left-1/2 z-50
          w-[92%] max-w-6xl
          transition-all duration-300 ease-out
          ${isScrolled ? 'bg-black/70 backdrop-blur-md shadow-2xl' : 'bg-black/45 backdrop-blur-lg'}
          rounded-[5px]
          px-4 md:px-6 py-3
        `}
        style={{
          top: isScrolled ? 16 : 150,
          transform: `translateX(-50%) scale(${isScrolled ? 0.97 : 1})`
        }}>
        {/* ROW */}
        <div className="relative flex items-center justify-between gap-6">
          {/* DESKTOP LOGOS */}
          <div className="hidden md:flex items-center gap-4 shrink-0">
            <img src="/content_logo_header.png" alt="Logo" className="h-9 w-auto object-contain" />
            <img src="/branding_plasma.png" alt="Branding Plasma" className="h-7 w-auto object-contain opacity-90" />
          </div>

          {/* MOBILE – BRANDING CENTER */}
          <div className="md:hidden absolute left-1/2 -translate-x-1/2">
            <img src="/branding_plasma.png" alt="Branding Plasma" className="h-8 w-auto object-contain" />
          </div>

          {/* MENU DESKTOP */}
          <nav className="hidden md:flex items-center gap-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveItem(item.id)}
                className={`
                  flex items-center gap-2
                  px-4 py-2
                  rounded-md
                  text-sm font-medium
                  transition-all
                  ${activeItem === item.id ? 'bg-white/15 text-white border-b-2' : 'text-white/70 hover:text-white hover:bg-white/10'}
                `}
                style={{
                  borderColor: activeItem === item.id ? 'var(--brand)' : 'transparent'
                }}>
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>

          {/* DESKTOP ACTIONS */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <button className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-md">
              <Search size={20} />
            </button>
            <button className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-md">
              <User size={20} />
            </button>
            <button
              className="px-5 py-2 rounded-md text-white font-medium flex items-center gap-2"
              style={{ backgroundColor: 'var(--brand)' }}>
              <ShoppingBag size={18} />
              Shop Now
            </button>
          </div>

          {/* MOBILE MENU BUTTON (EXTREMIDADE) */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-white p-2 rounded-md hover:bg-white/10 z-10">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {isMenuOpen && (
          <div className="md:hidden mt-4">
            <div className="bg-black/85 backdrop-blur-xl rounded-md border border-white/10 p-4 space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveItem(item.id)
                    setIsMenuOpen(false)
                  }}
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-md text-white/80 hover:bg-white/10">
                  {item.icon}
                  {item.label}
                </button>
              ))}

              <div className="pt-3 border-t border-white/10">
                <button
                  className="w-full py-3 rounded-md text-white font-medium flex items-center justify-center gap-2"
                  style={{ backgroundColor: 'var(--brand)' }}>
                  <ShoppingBag size={18} />
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
