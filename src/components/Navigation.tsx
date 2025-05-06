'use client'

import { useEffect, useState } from "react"
import { Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MobileSidebar } from "./ui/mobileSidebar"
import { LanguageSwitcher } from "./LanguageSwitcher"
import { useLanguage } from "@/context/LanguageContext"

export function Navigation() {
  const { t } = useLanguage();
  const [mobile, setMobile] = useState(true);

  useEffect(() => {
    if (window.innerWidth > 1025) {
      setMobile(false);
    }
  }, [])

  useEffect(() => {
    const handleSmoothScroll = (e: Event) => {
      e.preventDefault();
      const target = e.currentTarget as HTMLAnchorElement;
      const href = target.getAttribute('href') || '';
      
      if (href === '#') {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        return;
      }

      const element = document.querySelector(href);
      if (element) {
        const elementRect = element.getBoundingClientRect();
        const absoluteElementTop = elementRect.top + window.pageYOffset;
        const middle = absoluteElementTop - (window.innerHeight / 2) + (elementRect.height / 2);
        
        window.scrollTo({
          top: middle,
          behavior: 'smooth'
        });
      }
    };

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', handleSmoothScroll as EventListener);
    });

    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', handleSmoothScroll as EventListener);
      });
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b bg-white">
      <div className={`${mobile ? "sticky flex flex-row p-2 justify-between" : "hidden"}`}>
        <MobileSidebar />
        <img
          src="/images/Junglebanner.png"
          alt="Jungle Logo"
          width={125}
          height={20}
          className="object-contain"
        />
      </div>
      <div className={`${mobile ? "hidden" : "container flex h-16 items-center justify-between py-4"}`}>
        <div className="flex items-center">
          <img
            src="/images/bannerlong.png"
            alt="Jungle Logo"
            width={280}
            height={75}
            className="object-contain"
          />
        </div>
        <nav className="flex-1 flex justify-center gap-6">
          <a href="#" className="text-sm font-medium hover:text-[#4f9132] transition-colors">
            {t('navigation.home')}
          </a>
          <a href="#quote-form" className="text-sm font-medium hover:text-[#4f9132] transition-colors">
            {t('navigation.quote')}
          </a>
          <a href="#services" className="text-sm font-medium hover:text-[#4f9132] transition-colors">
            {t('navigation.services')}
          </a>
          <a href="#portfolio" className="text-sm font-medium hover:text-[#4f9132] transition-colors">
            {t('navigation.ourWork')}
          </a>
          <a href="#about" className="text-sm font-medium hover:text-[#4f9132] transition-colors">
            {t('navigation.aboutUs')}
          </a>
        </nav>
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <button
            onClick={() => {
              const el = document.getElementById('quote-form');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-[#4f9132] hover:bg-[#458129] text-white font-semibold rounded-full px-6 py-2 transition-colors focus:outline-none focus:ring-2 focus:ring-[#4f9132] focus:ring-offset-2"
            aria-label={t('navigation.getQuote')}
          >
            {t('navigation.getQuote')}
          </button>
        </div>
      </div>
    </header>
  );
} 