"use client"
import { Menu, X } from "lucide-react"
import { useState, useEffect } from "react"
import { useLanguage } from "@/context/LanguageContext"
import { LanguageSwitcher } from "../LanguageSwitcher"

export function MobileSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useLanguage();

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleNavClick = (href: string) => {
    setIsOpen(false)
    const element = document.querySelector(href)
    if (element) {
      const elementRect = element.getBoundingClientRect()
      const absoluteElementTop = elementRect.top + window.pageYOffset
      const middle = absoluteElementTop - (window.innerHeight / 2) + (elementRect.height / 2)
      
      window.scrollTo({
        top: middle,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className="relative">
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
        <div 
          className="fixed inset-0 bg-black/50 z-40 transition-opacity" 
          onClick={toggleSidebar} 
          aria-hidden="true" 
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-[280px] bg-white z-50 shadow-xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-[#4f9132]/5">
            <div className="font-semibold text-lg text-[#4f9132]">Menu</div>
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
            <div className="flex flex-col space-y-4">
              <a 
                href="#" 
                onClick={() => handleNavClick('#')}
                className="text-base font-medium py-3 px-4 rounded-lg hover:bg-[#4f9132]/10 hover:text-[#4f9132] transition-colors"
              >
                {t('navigation.home')}
              </a>
              <a 
                href="#quote-form" 
                onClick={() => handleNavClick('#quote-form')}
                className="text-base font-medium py-3 px-4 rounded-lg hover:bg-[#4f9132]/10 hover:text-[#4f9132] transition-colors"
              >
                {t('navigation.quote')}
              </a>
              <a 
                href="#services" 
                onClick={() => handleNavClick('#services')}
                className="text-base font-medium py-3 px-4 rounded-lg hover:bg-[#4f9132]/10 hover:text-[#4f9132] transition-colors"
              >
                {t('navigation.services')}
              </a>
              <a 
                href="#portfolio" 
                onClick={() => handleNavClick('#portfolio')}
                className="text-base font-medium py-3 px-4 rounded-lg hover:bg-[#4f9132]/10 hover:text-[#4f9132] transition-colors"
              >
                {t('navigation.ourWork')}
              </a>
              <a 
                href="#about" 
                onClick={() => handleNavClick('#about')}
                className="text-base font-medium py-3 px-4 rounded-lg hover:bg-[#4f9132]/10 hover:text-[#4f9132] transition-colors"
              >
                {t('navigation.aboutUs')}
              </a>
              
              <div className="pt-6 border-t border-gray-200">
                <div className="text-sm text-gray-600 mb-3 px-4">Language</div>
                <div className="px-4">
                  <LanguageSwitcher />
                </div>
              </div>
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t bg-gray-50">
            <button 
              onClick={() => {
                const el = document.getElementById('quote-form');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                  setIsOpen(false);
                }
              }}
              className="w-full py-3 px-4 bg-[#4f9132] hover:bg-[#3e7127] text-white font-medium rounded-lg transition-colors"
            >
              {t('navigation.getQuote')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
