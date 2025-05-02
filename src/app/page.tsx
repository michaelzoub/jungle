"use client"
import Link from "next/link"
import Image from "next/image"
import { Check, ChevronRight, Leaf, Mail, MapPin, Phone, Star, Lock, Clock, Shield, Plus } from "lucide-react"
import { DM_Sans } from "next/font/google"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Navigation } from "@/components/Navigation"
import MapBox from "@/components/map"

import { convertFilesToBase64 } from "@/utils/convertToBase64"

const dmSans = DM_Sans({ subsets: ["latin"] })

const imagesArray = [
  {
    id: 1,
    before: "/images/before1.jpg",
    after: "/images/after1.jpg"
  },
  {
    id: 2,
    before: "/images/before2.jpg",
    after: "/images/after2.jpg"
  },
  {
    id: 3,
    before: "/images/before3.jpg",
    after: "/images/after3.jpg"
  },
  {
    id: 4,
    before: "/images/before4.jpg",
    after: "/images/after4.jpg"
  },
  {
    id: 5,
    before: "/images/before5.jpg",
    after: "/images/after5.jpg"
  }
];


export default function LandscapingLanding() {

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
          "Content-Type": "application/json"
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
    <div className="flex min-h-screen flex-col scroll-smooth element" >
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
              priority
            />
          </div>
          <div className="container absolute inset-0 z-20 flex items-end pb-44">
            <div className="flex items-center w-full">
              {/* Left Content */}
              <div>
                <h1 className={`${dmSans.className} text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight text-white`}>
                  Bring your<br />garden to life
                </h1>
                <p className="mt-8 text-xl sm:text-2xl text-gray-300 max-w-xl">
                  Transform your outdoor space into the space you've always wanted.
                </p>
                <div className="mt-10 flex items-center gap-6">
                  <Button size="lg" className="bg-[#4f9132] hover:bg-[#458129] text-white px-8 rounded-full">
                    Get in touch
                  </Button>
                  <Link 
                    href="#portfolio" 
                    className="text-white/90 hover:text-white flex items-center gap-2 transition-colors"
                  >
                    View our work
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
                  Ready to transform<br />your garden?
                </h2>
                <p className="text-gray-600 mb-8">
                  Get your personalized quote today and take the first step towards creating your dream outdoor space.
                </p>
                
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-[#4f9132]/10 flex items-center justify-center">
                      <Check className="h-5 w-5 text-[#4f9132]" />
                    </div>
                    <div className="text-sm">Free, no-obligation quotes</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-[#4f9132]/10 flex items-center justify-center">
                      <Clock className="h-5 w-5 text-[#4f9132]" />
                    </div>
                    <div className="text-sm">Response within 24 hours</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-[#4f9132]/10 rounded-2xl">
                  <Phone className="h-5 w-5 text-[#4f9132]" />
                  <div>
                    <div className="text-sm text-gray-600">Prefer to talk?</div>
                    <div className="font-medium">Call us at 514-945-6241</div>
                  </div>
                </div>
              </div>

              <div>
                <form className="space-y-4" onSubmit={getFreeQuote}>
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="First name" className="rounded-full" value={first} onChange={(e) => setFirst(e.target.value)} />
                    <Input placeholder="Last name" className="rounded-full" value={last} onChange={(e) => setLast(e.target.value)} />
                  </div>
                  <Input type="email" placeholder="Email address" className="rounded-full" value={email} onChange={(e) => setEmail(e.target.value)} />
                  <Input type="tel" placeholder="Phone number" className="rounded-full" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  <Input type="address" placeholder="Address" className="rounded-full" value={address} onChange={(e) => setAddress(e.target.value)} />
                  <select value={job} onChange={(e) => setJob(e.target.value)} className="flex h-10 w-full rounded-full border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                    <option value="">Select a service</option>
                    <option value="design">Garden Design</option>
                    <option value="maintenance">Garden Maintenance</option>
                    <option value="planting">Flower Planting</option>
                  </select>
                  <Textarea 
                    placeholder="Tell us about your project (optional)" 
                    className="min-h-[100px] rounded-2xl resize-none"
                    value={information}
                    onChange={(e) => setInformation(e.target.value)}
                  />
                  <label className="block text-sm font-medium text-gray-700">Upload pictures of needed work (optional)</label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => setImages(Array.from(e.target.files ?? []))}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                  />
                  <Button type="submit" className="w-full bg-[#4f9132] hover:bg-[#458129] text-white rounded-full">
                    { sentSuccess ? <div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-check-check-icon lucide-check-check"><path d="M18 6 7 17l-5-5"/><path d="m22 10-7.5 7.5L13 16"/></svg></div> : "Get Your Free Quote" }
                  </Button>
                  <p className="text-xs text-center text-gray-500">
                    By submitting this form, you agree to our terms and privacy policy.
                  </p>
                </form>
              </div>
            </div>
          </div>
          <section>
            {/* Map section */}
            <MapBox></MapBox>
          </section>
        </section>

        {/* Services Section */}
        <section id="services" className="py-16 md:py-24 bg-[#4f9132]/5">
          <div className="container">
            <div className="text-green-600 font-medium text-sm mb-2 text-center">Professional Services</div>
            <h2 className="text-3xl font-bold text-center mb-4">Meeting Your Needs</h2>
            <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">At Jungle landscaping, we take pride in offering a wide range of services to transform your outdoor space.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Garden beds & design",
                  description: "Professional garden bed maintenance and seasonal clean-ups to keep your outdoor space pristine.",
                  image: "/images/services/bedservice.jpg",
                },
                {
                  title: "Lawn care",
                  description: "Complete lawn maintenance services to keep your grass healthy and looking its best.",
                  image: "/images/services/lawncareservice.jpeg",
                },
                {
                  title: "Flower planting",
                  description: "Beautiful flower planting and maintenance to add color and life to your garden.",
                  image: "/images/services/flowerservice.jpg",
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
                  </div>
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
              ))}
            </div>
            <div className="mt-12 flex items-center justify-center text-xs md:text-lg">
              <div className="bg-[#4f9132]/5 rounded-full py-3 px-4 md:px-6 flex items-center gap-1 md:gap-3">
                <span className="font-medium">Additional services:</span>
                <div className="flex items-center gap-4 text-gray-600">
                  <span>Fall, spring and summer clean ups</span>
                  <div className="h-1 w-1 rounded-full bg-gray-300" />
                  <span>Trimming and pruning</span>
                  <div className="h-1 w-1 rounded-full bg-gray-300" />
                  <span>Mulching and soil management</span>
                  <div className="h-1 w-1 rounded-full bg-gray-300" />
                  <span>And more</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="py-16 md:py-24 bg-white">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className={`${dmSans.className} text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl`}>Our Work</h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Browse through our portfolio of completed projects and see the transformation for yourself.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {imagesArray.map((item) => (
                <div key={item.after}>
                <div className="relative group overflow-hidden rounded-lg">
                  <div className="aspect-square relative">
                    <Image
                      src={`${imageHover == item.id ? item.after : item.before}`}
                      alt={`Landscaping project ${item}`}
                      fill
                      className="object-cover transition-transform group-hover:scale-105 "
                      priority={true}
                      loading="eager"
                    />
                  </div>
                  <div className="absolute bottom-4 right-4 bg-white shadow-lg rounded-lg p-3 z-50 w-32 gap-1">
                    <h3 className="text-xs text-zinc-600">Hover to see the result of our work!</h3>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6" onMouseEnter={() => setImageHover(item.id)} onMouseLeave={() => setImageHover(null)} onClick={() => setImageHover(item.id)}>

                  </div>
                </div>
                    <Image
                    src={item.after}
                    alt=""
                    width={1}
                    height={1}
                    style={{ display: 'none' }}
                    loading="eager"
                    priority={true}
                  />
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
                <h2 className={`${dmSans.className} text-3xl font-bold tracking-tight sm:text-4xl`}>About Us</h2>
                <p className="mt-4 text-lg text-gray-600">
                  At Jungle Yard Maintenance, we specialize in creating and maintaining beautiful, eco-friendly outdoor spaces. From design to regular upkeep, we’re here to provide personalized service every step of the way. We take pride in our work and look forward to helping you bring your yard to life. Contact us today to get started!
                </p>
                <ul className="mt-6 space-y-3">
                  {[
                    "Licensed and insured professionals",
                    "Eco-friendly practices and materials",
                    "Customized solutions for every property",
                    "Transparent pricing with no hidden fees",
                    "Dedicated customer support",
                  ].map((item, index) => (
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
                Professional landscaping services for residential and commercial properties.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Services</h3>
              <ul className="space-y-2">
                {[
                  "Landscape Design",
                  "Garden Maintenance",
                  "Hardscaping",
                  "Irrigation Systems",
                  "Outdoor Lighting"
                ].map((item, index) => (
                  <li key={index}>
                    <Link href="#" className="text-gray-400 hover:text-[#4f9132] transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                {[
                  "About Us",
                  "Our Team",
                  "Testimonials",
                  "Portfolio",
                  "Careers"
                ].map((item, index) => (
                  <li key={index}>
                    <Link href="#" className="text-gray-400 hover:text-[#4f9132] transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Phone className="h-4 w-4 text-[#4f9132] mr-2" />
                  <span className="text-gray-400">514-945-6241</span>
                </li>
                <li className="flex items-center">
                  <Mail className="h-4 w-4 text-[#4f9132] mr-2" />
                  <span className="text-gray-400">jungleteam1500@gmail.com</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-900 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Jungle Landscaping. All rights reserved.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link href="#" className="text-gray-400 hover:text-[#4f9132] transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-gray-400 hover:text-[#4f9132] transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
