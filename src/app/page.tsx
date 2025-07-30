"use client"
import Link from "next/link"
import Image from "next/image"
import { Check, ChevronRight, Leaf, Mail, MapPin, Phone, Star, Lock, Clock, Shield, Plus, Flower2, Scissors, Hammer, TreePine, Snowflake, Shovel, Wrench, ChevronLeft, Calendar, Palette } from "lucide-react"
import { DM_Sans } from "next/font/google"
import { useState, useEffect } from "react"
import { useLanguage } from "@/context/LanguageContext"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Navigation } from "@/components/Navigation"
import MapBox from "@/components/map"
import MapLegend from "@/components/maplegend"

import { convertFilesToBase64 } from "@/utils/convertToBase64"

const dmSans = DM_Sans({ subsets: ["latin"] })

const cloudFareBucket = `https://r2-worker.micacao15.workers.dev/image`

const getProjects = (t: any, tArray: any) => [
  {
    id: 1,
    title: t('portfolio.projects.project1.title'),
    location: t('portfolio.projects.project1.location'),
    duration: t('portfolio.projects.project1.duration'),
    services: tArray('portfolio.projects.project1.services'),
    description: t('portfolio.projects.project1.description'),
    before: "/images/BEFORE_FI.png",
    after: "/images/AFTER_FI.png"
  },
  {
    id: 2,
    title: t('portfolio.projects.project2.title'),
    location: t('portfolio.projects.project2.location'),
    duration: t('portfolio.projects.project2.duration'),
    services: tArray('portfolio.projects.project2.services'),
    description: t('portfolio.projects.project2.description'),
    before: "/images/BEFORE_SE.jpg",
    after: "/images/AFTER_SE.png"
  },
  {
    id: 3,
    title: t('portfolio.projects.project3.title'),
    location: t('portfolio.projects.project3.location'),
    duration: t('portfolio.projects.project3.duration'),
    services: tArray('portfolio.projects.project3.services'),
    description: t('portfolio.projects.project3.description'),
    before: `${cloudFareBucket}/before7.jpg`,
    after: `${cloudFareBucket}/after7.jpg`
  },
  {
    id: 4,
    title: t('portfolio.projects.project4.title'),
    location: t('portfolio.projects.project4.location'),
    duration: t('portfolio.projects.project4.duration'),
    services: tArray('portfolio.projects.project4.services'),
    description: t('portfolio.projects.project4.description'),
    before: `${cloudFareBucket}/before8.jpg`,
    after: `${cloudFareBucket}/after8.jpg`
  },
  {
    id: 5,
    title: t('portfolio.projects.project5.title'),
    location: t('portfolio.projects.project5.location'),
    duration: t('portfolio.projects.project5.duration'),
    services: tArray('portfolio.projects.project5.services'),
    description: t('portfolio.projects.project5.description'),
    before: `${cloudFareBucket}/before5.jpg`,
    after: `${cloudFareBucket}/after5.jpg`
  },
  {
    id: 6,
    title: t('portfolio.projects.project6.title'),
    location: t('portfolio.projects.project6.location'),
    duration: t('portfolio.projects.project6.duration'),
    services: tArray('portfolio.projects.project6.services'),
    description: t('portfolio.projects.project6.description'),
    before: `${cloudFareBucket}/before1.jpg`,
    after: `${cloudFareBucket}/after1.jpg`
  }
];

export default function LandscapingLanding() {
  async function tester() {
    const response = await fetch("/api/test", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    })
    console.log(response)
  }

  const { t, tArray, language } = useLanguage();
  const projects = getProjects(t, tArray);
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [job, setJob] = useState("");
  const [budget, setBudget] = useState("");
  const [information, setInformation] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [imageHover, setImageHover] = useState<number | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [currentProject, setCurrentProject] = useState(0);
  const [imageComparison, setImageComparison] = useState(50);
  const [sentSuccess, setSentSuccess] = useState(false);
  const [mobile, setMobile] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (window.innerWidth > 1025) {
      setMobile(false);
    }
  }, [])

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length)
    setImageComparison(50)
  }

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length)
    setImageComparison(50)
  }

  async function getFreeQuote(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!first || !last || !phone || !address || !job) {
      alert("Please fill in all required fields");
      return;
    }

    setShowPopup(true);
    setSentSuccess(true);
    setFirst("");
    setLast("");
    setAddress("");
    setEmail("");
    setImages([]);
    setInformation("");
    setJob("");
    setBudget("");
    setPhone("");

    console.log('Number of images before conversion:', images.length);
    const base64strings = await convertFilesToBase64(images);
    console.log('Number of images after conversion:', base64strings.length);
    console.log('First converted image preview:', base64strings[0]?.substring(0, 50) + '...');

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
        budget: budget,
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
          <div className={`relative ${mobile ? "h-[600px] " : "h-[900px] "}`}>
            <Image
              src="/images/banner.jpg"
              alt="Beautiful landscaped garden"
              fill
              className="object-cover object-center"
            />
          </div>
          <div className="container absolute inset-0 z-20 flex items-center px-4">
            <div className="flex items-center w-full">
              {/* Left Content */}
              <div className="w-full">
                <h1 className={`${dmSans.className} text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-white leading-tight`}>
                  {t('hero.title')}
                </h1>
                <p className="mt-4 sm:mt-8 text-lg sm:text-xl md:text-2xl text-gray-300 max-w-xl">
                  {t('hero.subtitle')}
                </p>
                <div className="mt-6 sm:mt-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                  <Button
                    onClick={() => {
                      const el = document.getElementById('quote-form');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="bg-white/20 text-white px-6 sm:px-8 py-3 rounded-none border border-white hover:bg-white/30 transition-colors w-full sm:w-40 h-12"
                  >
                    Contact Us
                  </Button>
                  <Link
                    href="#portfolio"
                    className="text-white border border-white px-6 sm:px-8 py-3 rounded-none hover:bg-white/10 transition-colors flex items-center justify-center w-full sm:w-44 h-12 text-sm"
                  >
                    {t('hero.viewWork')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quote Form Section */}
        <section id="quote-form" className="py-16 md:py-24 bg-white">
          <div className="container px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className={`${dmSans.className} text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6`}>
                {t('quoteForm.title')}
              </h2>
              <p className="text-gray-600 mb-8">
                {t('quoteForm.subtitle')}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-[#4f9132]/5">
                  <div className="h-10 w-10 rounded-full bg-[#4f9132]/10 flex items-center justify-center flex-shrink-0">
                    <Check className="h-5 w-5 text-[#4f9132]" />
                  </div>
                  <div className="text-sm font-medium">{t('quoteForm.freeQuotes')}</div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-[#4f9132]/5">
                  <div className="h-10 w-10 rounded-full bg-[#4f9132]/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="h-5 w-5 text-[#4f9132]" />
                  </div>
                  <div className="text-sm font-medium">{t('quoteForm.responseTime')}</div>
                </div>
              </div>



              <form className="space-y-4" onSubmit={getFreeQuote}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input placeholder={t('quoteForm.firstName')} className="rounded-none" value={first} onChange={(e) => setFirst(e.target.value)} />
                  <Input placeholder={t('quoteForm.lastName')} className="rounded-none" value={last} onChange={(e) => setLast(e.target.value)} />
                </div>
                <Input type="email" placeholder={t('quoteForm.email')} className="rounded-none" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input type="tel" placeholder={t('quoteForm.phone')} className="rounded-none" value={phone} onChange={(e) => setPhone(e.target.value)} />
                <Input type="address" placeholder={t('quoteForm.address')} className="rounded-none" value={address} onChange={(e) => setAddress(e.target.value)} />
                <Select value={job} onValueChange={setJob}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('quoteForm.selectService')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Lawn Care">Lawn Care & Maintenance</SelectItem>
                    <SelectItem value="Garden Design">Garden Design & Planning</SelectItem>
                    <SelectItem value="Planting">Planting & Landscaping</SelectItem>
                    <SelectItem value="Fertilization">Fertilization & Soil Care</SelectItem>
                    <SelectItem value="Tree Services">Tree & Shrub Care</SelectItem>
                    <SelectItem value="Seasonal Cleanup">Seasonal Cleanup</SelectItem>
                    <SelectItem value="Other">Other Services</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={budget} onValueChange={setBudget}>
                  <SelectTrigger>
                    <SelectValue placeholder="What's your budget range?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Under $1,000">Under $1,000</SelectItem>
                    <SelectItem value="$1,000 - $3,000">$1,000 - $3,000</SelectItem>
                    <SelectItem value="$3,000 - $5,000">$3,000 - $5,000</SelectItem>
                    <SelectItem value="$5,000+">$5,000+</SelectItem>
                    <SelectItem value="Not sure">Not sure yet</SelectItem>
                  </SelectContent>
                </Select>
                <Textarea
                  placeholder={t('quoteForm.projectDetails')}
                  className="min-h-[100px] rounded-none resize-none"
                  value={information}
                  onChange={(e) => setInformation(e.target.value)}
                />
                <label className="block text-sm font-medium text-gray-700 text-left">{t('quoteForm.uploadPictures')}</label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => setImages(Array.from(e.target.files ?? []))}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                />
                <Button type="submit" className="w-full bg-[#4f9132] hover:bg-[#458129] text-white rounded-none">
                  {sentSuccess ? <div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-check-check-icon lucide-check-check"><path d="M18 6 7 17l-5-5"/><path d="m22 10-7.5 7.5L13 16"/></svg></div> : t('quoteForm.submit')}
                </Button>
                <p className="text-sm text-gray-500 text-center">
                  {t('quoteForm.terms')}
                </p>
              </form>
            </div>
          </div>
          <section className="relative mt-16 sm:mt-36 py-16 md:py-24">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/mtlbanner.jpg"
                alt="Montreal Banner"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40"></div>
            </div>
            
            {/* Content */}
            <div className="relative z-10 container px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-4xl mx-auto mb-12 md:mb-16">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">{t('map.title')}</h1>
                <p className="mt-4 sm:mt-6 text-white/90 max-w-3xl mx-auto">{t('map.description')}</p>
              </div>
              <div className="max-w-6xl mx-auto">
                <MapBox />
              </div>
            </div>
          </section>
        </section>

        {/* Success Popup */}
        {showPopup && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
                <p className="text-gray-600 mb-6">
                  Your quote request has been submitted successfully. We'll get back to you shortly.
                </p>
                <Button
                  onClick={() => setShowPopup(false)}
                  className="bg-[#4f9132] hover:bg-[#458129] text-white rounded-full px-6"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Services Section */}
        <section id="services" className="py-16 md:py-24 bg-white">
          <div className="container px-4">
            <div className="text-center mb-12">
              <h2 className={`${dmSans.className} text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4`}>{t('services.subtitle')}</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {t('services.description')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  id: 1,
                  title: t('services.gardenDesign.title'),
                  image: "/images/services/flowerservice.jpg",
                  services: tArray('services.gardenDesign.services'),
                  description: t('services.gardenDesign.description')
                },
                {
                  id: 2,
                  title: t('services.maintenance.title'),
                  image: "/images/maintenance.jpg",
                  services: tArray('services.maintenance.services'),
                  description: t('services.maintenance.description')
                },
                {
                  id: 3,
                  title: t('services.mulching.title'),
                  image: "/images/mulch.png",
                  services: tArray('services.mulching.services'),
                  description: t('services.mulching.description')
                },
                {
                  id: 4,
                  title: t('services.paverRestoration.title'),
                  image: "/images/paver.jpg",
                  services: tArray('services.paverRestoration.services'),
                  description: t('services.paverRestoration.description')
                },
                {
                  id: 5,
                  title: t('services.lawnCare.title'),
                  image: "/images/clean.jpg",
                  services: tArray('services.lawnCare.services'),
                  description: t('services.lawnCare.description')
                },
                {
                  id: 6,
                  title: t('services.pressureWashing.title'),
                  image: "/images/pressurewash.jpg",
                  services: tArray('services.pressureWashing.services'),
                  description: t('services.pressureWashing.description')
                }
              ].map((category) => {
                const isHovered = hoveredCard === category.id

                return (
                  <Card
                    key={category.id}
                    className={`relative overflow-hidden transition-all duration-500 ease-in-out transform cursor-pointer group rounded-none ${
                      isHovered ? "scale-105 shadow-2xl" : "hover:scale-102 shadow-lg hover:shadow-xl"
                    }`}
                    onMouseEnter={() => setHoveredCard(category.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <CardContent className="p-0 h-80 relative">
                      {/* Background Image */}
                      <div className="absolute inset-0">
                        <Image
                          src={category.image}
                          alt={category.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/50"></div>
                      </div>

                      {/* Content */}
                      <div className="relative z-10 p-6 h-full flex flex-col justify-between text-white">
                        <div>
                          <h3 className="text-xl font-bold mb-3">{category.title}</h3>
                          <p className="text-white/90 text-sm mb-4">{category.description}</p>
                        </div>

                        {/* Services list - appears on hover */}
                        <div
                          className={`transition-all duration-300 ${
                            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                          }`}
                        >
                          <div className="space-y-2">
                            {category.services.map((service, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="bg-white/20 text-white border-white/30 text-xs mr-2 mb-1 backdrop-blur-sm"
                              >
                                {service}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Decorative elements */}
                        <div className="absolute bottom-4 left-4 opacity-10">
                          <Shovel className="w-12 h-12" />
                        </div>
                      </div>

                      {/* Hover overlay effect */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300 ${
                          isHovered ? "opacity-100" : "opacity-0"
                        }`}
                      ></div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>


          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="py-16 md:py-24 bg-white">
          <div className="container px-4">
            <div className="text-center mb-12">
              <h2 className={`${dmSans.className} text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl`}>{t('portfolio.mainTitle')}</h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                {t('portfolio.subtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Before/After Comparison */}
              <div className="lg:col-span-2">
                <Card className="border border-gray-200 shadow-lg overflow-hidden rounded-none">
                  <CardContent className="p-0">
                    {/* Image Comparison */}
                    <div className="relative h-[700px] overflow-hidden">
                      {/* Before Image */}
                      <Image
                        src={projects[currentProject]?.before || "/images/BEFORE_FI.png"}
                        alt={`Before: ${projects[currentProject]?.title}`}
                        fill
                        className="object-cover"
                      />

                      {/* After Image with clip-path */}
                      <div
                        className="absolute inset-0 overflow-hidden"
                        style={{ clipPath: `inset(0 ${100 - imageComparison}% 0 0)` }}
                      >
                        <Image
                          src={projects[currentProject]?.after || "/images/AFTER_FI.png"}
                          alt={`After: ${projects[currentProject]?.title}`}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Slider Handle */}
                      <div
                        className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-ew-resize z-10"
                        style={{ left: `${imageComparison}%` }}
                        onMouseDown={(e) => {
                          const rect = e.currentTarget.parentElement?.getBoundingClientRect()
                          if (!rect) return

                          const handleMouseMove = (e: MouseEvent) => {
                            const x = e.clientX - rect.left
                            const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
                            setImageComparison(percentage)
                          }

                          const handleMouseUp = () => {
                            document.removeEventListener("mousemove", handleMouseMove)
                            document.removeEventListener("mouseup", handleMouseUp)
                          }

                          document.addEventListener("mousemove", handleMouseMove)
                          document.addEventListener("mouseup", handleMouseUp)
                        }}
                      >
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
                          <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                        </div>
                      </div>

                      {/* Before/After Labels */}
                      <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded text-sm font-medium">
                        {t('portfolio.before')}
                      </div>
                      <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded text-sm font-medium">
                        {t('portfolio.after')}
                      </div>

                      {/* Navigation Arrows */}
                      <Button
                        variant="outline"
                        size="icon"
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-none"
                        onClick={prevProject}
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-none"
                        onClick={nextProject}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Project Details */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{projects[currentProject]?.title}</h3>
                      <p className="text-gray-600 mb-4">
                        {projects[currentProject]?.description}
                      </p>

                      <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {projects[currentProject]?.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {projects[currentProject]?.duration}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {projects[currentProject]?.services.map((service: string, index: number) => (
                          <Badge key={index} variant="secondary" className="bg-green-50 text-green-700 border-green-200">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Project Thumbnails */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">More Projects</h4>
                {projects.map((project, index) => (
                  <Card
                    key={project.id}
                    className={`cursor-pointer transition-all duration-200 rounded-none ${
                      index === currentProject
                        ? "border-green-500 shadow-md"
                        : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                    }`}
                    onClick={() => {
                      setCurrentProject(index)
                      setImageComparison(50)
                    }}
                  >
                    <CardContent className="p-4">
                      <div className="flex gap-3">
                        <div className="flex-shrink-0">
                          <Image
                            src={project.after}
                            alt={project.title}
                            width={64}
                            height={64}
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h5 className="font-medium text-gray-900 text-sm truncate">{project.title}</h5>
                          <p className="text-xs text-gray-500 mt-1">{project.location}</p>
                          <div className="flex gap-1 mt-2">
                            {project.services.slice(0, 2).map((service: string, idx: number) => (
                              <Badge key={idx} variant="secondary" className="text-xs bg-gray-100 text-gray-600">
                                {service}
                              </Badge>
                            ))}
                            {project.services.length > 2 && (
                              <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600">
                                +{project.services.length - 2}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Project Counter */}
            <div className="text-center mt-8">
              <div className="inline-flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
                <span className="text-sm text-gray-600">
                  Project {currentProject + 1} of {projects.length}
                </span>
                <div className="flex gap-1">
                  {projects.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentProject ? "bg-green-600" : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 md:py-24 bg-[#4f9132]/5">
          <div className="container px-4">
            <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
              <div>
                <h2 className={`${dmSans.className} text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl`}>{t('about.title')}</h2>
                <p className="mt-4 text-base sm:text-lg text-gray-600">
                  {t('about.description')}
                </p>
                <ul className="mt-6 space-y-3">
                  {tArray('about.features').map((item: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-[#4f9132] mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm sm:text-base">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center justify-center relative h-[250px] sm:h-[300px] md:h-[400px] rounded-lg overflow-hidden">
                <Image
                  src={language === 'fr' ? "/images/LOGO-1.png" : "/images/bannerlong.png"}
                  alt="Our team"
                  width={600}
                  height={150}
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-[#1a1a1a] text-white py-12">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="mb-4">
                <Image
                  src={language === 'fr' ? "/images/junglelogo_fr_w.png" : "/images/junglelonglogo.png"}
                  alt="Jungle Logo"
                  width={420}
                  height={112}
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
