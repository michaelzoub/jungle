"use client"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { useLanguage } from "@/context/LanguageContext"
import { LanguageSwitcher } from "../LanguageSwitcher"

export function MobileSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useLanguage();

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
    // Prevent scrolling when sidebar is open

  }

  return (
    <div className="s">
      {/* Trigger Button */}
      <button
        onClick={toggleSidebar}
        className="flex items-center justify-center w-10 h-10 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#4f9132] transition-colors"
        aria-label="Toggle menu"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 transition-opacity" onClick={toggleSidebar} aria-hidden="true" />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-[280px] bg-white z-50 shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="font-medium">{t('navigation.home')}</div>
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-md hover:bg-gray-100 transition-colors"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-auto p-4">
            <div className="flex flex-col space-y-6">
              <a href="#" className="text-sm font-medium hover:text-[#4f9132] transition-colors">
                {t('navigation.home')}
              </a>
              <a href="#quote-form" className="text-sm font-medium hover:text-[#4f9132] transition-colors">
                {t('navigation.quote')}
              </a>
              <a href="#about" className="text-sm font-medium hover:text-[#4f9132] transition-colors">
                {t('navigation.aboutUs')}
              </a>
              <a href="#portfolio" className="text-sm font-medium hover:text-[#4f9132] transition-colors">
                {t('navigation.ourWork')}
              </a>
              <a href="#services" className="text-sm font-medium hover:text-[#4f9132] transition-colors">
                {t('navigation.services')}
              </a>
              <div className="pt-4">
                <LanguageSwitcher />
              </div>
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t">
            <button 
              onClick={() => {
                const el = document.getElementById('quote-form');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                setIsOpen(false);
              }}
              className="w-full py-2 px-4 bg-[#4f9132] hover:bg-[#3e7127] text-white font-medium rounded-md transition-colors"
            >
              {t('navigation.getQuote')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
