"use client"
import Link from "next/link"
import Image from "next/image"
import { Check, ChevronRight, Leaf, Mail, MapPin, Phone, Star, Lock, Clock, Shield, Plus } from "lucide-react"
import { DM_Sans } from "next/font/google"
import { useState, useEffect } from "react"
import { useLanguage } from "@/context/LanguageContext"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Navigation } from "@/components/Navigation"
import MapBox from "@/components/map"
import MapLegend from "@/components/maplegend"

import { convertFilesToBase64 } from "@/utils/convertToBase64"

const dmSans = DM_Sans({ subsets: ["latin"] })

const cloudFareBucket = `https://r2-worker.micacao15.workers.dev/image`

const imagesArray = [
  {
    id: 1,
    before: `${cloudFareBucket}/before6.jpg`,
    after: `${cloudFareBucket}/after6.jpg`
  },
  {
    id: 2,
    before: `${cloudFareBucket}/before2.jpg`,
    after: `${cloudFareBucket}/after2.jpg`
  },
  {
    id: 3,
    before: `${cloudFareBucket}/before3.jpg`,
    after: `${cloudFareBucket}/after3.jpg`
  },
  {
    id: 4,
    before: `${cloudFareBucket}/before4.jpg`,
    after: `${cloudFareBucket}/after4.jpg`
  },
  {
    id: 5,
    before: `${cloudFareBucket}/before5.jpg`,
    after: `${cloudFareBucket}/after5.jpg`
  },
  {
    id: 6,
    before: `${cloudFareBucket}/before1.jpg`,
    after: `${cloudFareBucket}/after1.jpg`
  }
];

export default function LandscapingLanding() {
  const { t, tArray } = useLanguage();
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [job, setJob] = useState("");
  const [information, setInformation] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [imageHover, setImageHover] = useState<number | null>(null);
  const [sentSuccess, setSentSuccess] = useState(false);
  const [mobile, setMobile] = useState(true);

  useEffect(() => {
    if (window.innerWidth > 1025) {
      setMobile(false);
    }
  }, [])

  async function getFreeQuote(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSentSuccess(true);
    setFirst("");
    setLast("");
    setAddress("");
    setEmail("");
    setImages([]);
    setInformation("");
    setJob("");
    setPhone("");

    const base64strings = convertFilesToBase64(images);

    const response = await fetch("/api/storeNewClient", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "max-age=3600"
      },
      body: JSON.stringify({
        first: first,
        last: last,
        email: email,
        phone: phone,
        address: address,
        job: job,
        information: information,
        images: base64strings
      })
    })

    const body = await response.json();
    console.log(body);
  }

  return (
    <div className="flex min-h-screen flex-col scroll-smooth element">
      <Link href='https://api.mapbox.com/mapbox-gl-js/v2.0.0/mapbox-gl.css' rel='stylesheet' />
      <Navigation />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40 z-10" />
          <div className="relative h-[900px]">
            <Image
              src="/images/banner.jpg"
              alt="Beautiful landscaped garden"
              fill
              className="object-cover object-center"
            />
          </div>
          <div className="container absolute inset-0 z-20 flex items-end pb-44">
            <div className="flex items-center w-full">
              {/* Left Content */}
              <div>
                <h1 className={`${dmSans.className} text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight text-white`}>
                  {t('hero.title')}
                </h1>
                <p className="mt-8 text-xl sm:text-2xl text-gray-300 max-w-xl">
                  {t('hero.subtitle')}
                </p>
                <div className="mt-10 flex items-center gap-6">
                  <Button
                    size="lg"
                    onClick={() => {
                      const el = document.getElementById('quote-form');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="bg-[#4f9132] hover:bg-[#458129] text-white px-8 rounded-full"
                  >
                    {t('hero.getInTouch')}
                  </Button>
                  <Link
                    href="#portfolio"
                    className="text-white/90 hover:text-white flex items-center gap-2 transition-colors"
                  >
                    {t('hero.viewWork')}
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quote Form Section */}
        <section id="quote-form" className="py-16 md:py-24 bg-white">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
              <div>
                <h2 className={`${dmSans.className} text-3xl font-bold tracking-tight sm:text-4xl mb-6`}>
                  {t('quoteForm.title')}
                </h2>
                <p className="text-gray-600 mb-8">
                  {t('quoteForm.subtitle')}
                </p>

                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-[#4f9132]/10 flex items-center justify-center">
                      <Check className="h-5 w-5 text-[#4f9132]" />
                    </div>
                    <div className="text-sm">{t('quoteForm.freeQuotes')}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-[#4f9132]/10 flex items-center justify-center">
                      <Clock className="h-5 w-5 text-[#4f9132]" />
                    </div>
                    <div className="text-sm">{t('quoteForm.responseTime')}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-[#4f9132]/10 rounded-2xl">
                  <Phone className="h-5 w-5 text-[#4f9132]" />
                  <div>
                    <div className="text-sm text-gray-600">{t('quoteForm.preferToTalk')}</div>
                    <div className="font-medium">{t('quoteForm.callUs')} 514-945-6241</div>
                  </div>
                </div>
              </div>

              <div>
                <form className="space-y-4" onSubmit={getFreeQuote}>
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder={t('quoteForm.firstName')} className="rounded-full" value={first} onChange={(e) => setFirst(e.target.value)} />
                    <Input placeholder={t('quoteForm.lastName')} className="rounded-full" value={last} onChange={(e) => setLast(e.target.value)} />
                  </div>
                  <Input type="email" placeholder={t('quoteForm.email')} className="rounded-full" value={email} onChange={(e) => setEmail(e.target.value)} />
                  <Input type="tel" placeholder={t('quoteForm.phone')} className="rounded-full" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  <Input type="address" placeholder={t('quoteForm.address')} className="rounded-full" value={address} onChange={(e) => setAddress(e.target.value)} />
                  <select value={job} onChange={(e) => setJob(e.target.value)} className="flex h-10 w-full rounded-full border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                    <option value="">{t('quoteForm.selectService')}</option>
                    <option value="Design">{t('quoteForm.services.design')}</option>
                    <option value="Maintenance">{t('quoteForm.services.maintenance')}</option>
                    <option value="Planting">{t('quoteForm.services.planting')}</option>
                    <option value="Other">{t('quoteForm.services.other')}</option>
                  </select>
                  <Textarea
                    placeholder={t('quoteForm.projectDetails')}
                    className="min-h-[100px] rounded-2xl resize-none"
                    value={information}
                    onChange={(e) => setInformation(e.target.value)}
                  />
                  <label className="block text-sm font-medium text-gray-700">{t('quoteForm.uploadPictures')}</label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => setImages(Array.from(e.target.files ?? []))}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                  />
                  <Button type="submit" className="w-full bg-[#4f9132] hover:bg-[#458129] text-white rounded-full">
                    {sentSuccess ? <div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-check-check-icon lucide-check-check"><path d="M18 6 7 17l-5-5"/><path d="m22 10-7.5 7.5L13 16"/></svg></div> : t('quoteForm.submit')}
                  </Button>
                  <p className="text-sm text-gray-500 text-center">
                    {t('quoteForm.terms')}
                  </p>
                </form>
              </div>
            </div>
          </div>
          <section className="container mt-36">
            <div className="grid md:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight w-[350px] __className_05e5f9">{t('map.title')}</h1>
                <p className="mt-6 text-gray-600">{t('map.description')}</p>
              </div>
            </div>
            <MapBox />
          </section>
        </section>

        {/* Services Section */}
        <section id="services" className="py-16 md:py-24 bg-[#4f9132]/5">
          <div className="container">
            <div className="text-green-600 font-medium text-sm mb-2 text-center">{t('services.title')}</div>
            <h2 className="text-3xl font-bold text-center mb-4">{t('services.subtitle')}</h2>
            <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">{t('services.description')}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: t('services.gardenBeds.title'),
                  description: t('services.gardenBeds.description'),
                  image: `${cloudFareBucket}/bedservice.jpg`,
                },
                {
                  title: t('services.lawnCare.title'),
                  description: t('services.lawnCare.description'),
                  image: `${cloudFareBucket}/lawncareservice.jpeg`,
                },
                {
                  title: t('services.flowerPlanting.title'),
                  description: t('services.flowerPlanting.description'),
                  image: `${cloudFareBucket}/flowerservice.jpg`,
                },
              ].map((service, index) => (
                <div key={index} className="group relative overflow-hidden rounded-[32px]">
                  <div className="aspect-[4/5] relative">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-white rounded-[24px] m-4">
                      <div className="flex items-start gap-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-medium mb-2">{service.title}</h3>
                          <p className="text-gray-500 text-sm">{service.description}</p>
                        </div>
                        <div className="bg-[#4f9132]/10 rounded-full p-2">
                          <ChevronRight className="h-4 w-4 text-[#4f9132]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12 flex items-center justify-center text-xs md:text-lg">
              <div className="bg-[#4f9132]/5 rounded-full py-3 px-4 md:px-6 flex items-center gap-1 md:gap-3">
                <span className="font-medium">{t('services.additionalServices')}</span>
                <div className="flex items-center gap-4 text-gray-600">
                  <span>{t('services.fallCleanup')}</span>
                  <div className="h-1 w-1 rounded-full bg-gray-300" />
                  <span>{t('services.trimming')}</span>
                  <div className="h-1 w-1 rounded-full bg-gray-300" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="py-16 md:py-24 bg-white">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className={`${dmSans.className} text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl`}>{t('portfolio.title')}</h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                {t('portfolio.subtitle')}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {imagesArray.map((item) => (
                <div key={item.after}>
                <div className="relative group overflow-hidden rounded-lg">
                <div className="aspect-square relative group">
                  {/* Before Image */}
                  <Image
                    src={item.before}
                    alt={`Before image of ${item.id}`}
                    fill
                    className={`object-cover transition-opacity duration-300 ${imageHover === item.id ? 'opacity-0' : 'opacity-100'}`}
                    priority
                    loading="eager"
                  />

                  {/* After Image */}
                  <Image
                    src={item.after}
                    alt={`After image of ${item.id}`}
                    fill
                    className={`object-cover transition-opacity duration-300 absolute top-0 left-0 ${imageHover === item.id ? 'opacity-100' : 'opacity-0'}`}
                    priority
                    loading="eager"
                  />
                </div>
                  <div className="absolute bottom-4 right-4 bg-white shadow-lg rounded-lg p-3 z-50 w-32 gap-1 z-[0]">
                    <h3 className="text-xs text-zinc-600">{mobile ? t('portfolio.clickText') : t('portfolio.hoverText')}</h3>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6" onMouseEnter={() => setImageHover(item.id)} onMouseLeave={() => setImageHover(null)} onClick={() => setImageHover(item.id)}>
                  </div>
                </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 md:py-24 bg-[#4f9132]/5">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className={`${dmSans.className} text-3xl font-bold tracking-tight sm:text-4xl`}>{t('about.title')}</h2>
                <p className="mt-4 text-lg text-gray-600">
                  {t('about.description')}
                </p>
                <ul className="mt-6 space-y-3">
                  {tArray('about.features').map((item: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-[#4f9132] mr-2 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center justify-center relative h-[400px] rounded-lg overflow-hidden">
                <Image
                  src="/images/LOGO-2.png"
                  alt="Our team"
                  width={400}
                  height={100}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-[#1a1a1a] text-white py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="mb-4">
                <Image
                  src="/images/junglelonglogo.png"
                  alt="Jungle Logo"
                  width={280}
                  height={75}
                  className="object-contain"
                />
              </div>
              <p className="text-gray-400">
                {t('footer.description')}
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">{t('footer.services.title')}</h3>
              <ul className="space-y-2">
                {tArray('footer.services.items').map((item: string, index: number) => (
                  <li key={index}>
                    <Link href="#" className="text-gray-400 hover:text-[#4f9132] transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">{t('footer.company.title')}</h3>
              <ul className="space-y-2">
                {tArray('footer.company.items').map((item: string, index: number) => (
                  <li key={index}>
                    <Link href="#" className="text-gray-400 hover:text-[#4f9132] transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">{t('footer.contact.title')}</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Phone className="h-4 w-4 text-[#4f9132] mr-2" />
                  <span className="text-gray-400">514-945-6241</span>
                </li>
                <li className="flex items-center">
                  <Mail className="h-4 w-4 text-[#4f9132] mr-2" />
                  <span className="text-gray-400">{t('footer.contact.email')}</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-900 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              {t('footer.copyright', { year: new Date().getFullYear() })}
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
