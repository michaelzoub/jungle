import Link from "next/link"
import Image from "next/image"
import { Check, ChevronRight, Leaf, Mail, MapPin, Phone, Star, Lock, Clock, Shield, Plus } from "lucide-react"
import { DM_Sans } from "next/font/google"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Navigation } from "@/components/Navigation"

const dmSans = DM_Sans({ subsets: ["latin"] })

export default function LandscapingLanding() {
  return (
    <div className="flex min-h-screen flex-col scroll-smooth">
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
                    <div className="font-medium">Call us at (555) 123-4567</div>
                  </div>
                </div>
              </div>

              <div>
                <form className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="First name" className="rounded-full" />
                    <Input placeholder="Last name" className="rounded-full" />
                  </div>
                  <Input type="email" placeholder="Email address" className="rounded-full" />
                  <Input type="tel" placeholder="Phone number" className="rounded-full" />
                  <select className="flex h-10 w-full rounded-full border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                    <option value="">Select a service</option>
                    <option value="design">Garden Design</option>
                    <option value="maintenance">Garden Maintenance</option>
                    <option value="planting">Flower Planting</option>
                  </select>
                  <Textarea 
                    placeholder="Tell us about your project (optional)" 
                    className="min-h-[100px] rounded-2xl resize-none"
                  />
                  <Button type="submit" className="w-full bg-[#4f9132] hover:bg-[#458129] text-white rounded-full">
                    Get Your Free Quote
                  </Button>
                  <p className="text-xs text-center text-gray-500">
                    By submitting this form, you agree to our terms and privacy policy.
                  </p>
                </form>
              </div>
            </div>
          </div>
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
            <div className="mt-12 flex items-center justify-center">
              <div className="bg-[#4f9132]/5 rounded-full py-3 px-6 flex items-center gap-3">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="relative group overflow-hidden rounded-lg">
                  <div className="aspect-square relative">
                    <Image
                      src={`/placeholder.svg?height=400&width=400&text=Project ${item}`}
                      alt={`Landscaping project ${item}`}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                    <Button variant="outline" className="text-white border-white hover:bg-white/20">
                      View Project
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-16 md:py-24">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">What Our Clients Say</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Don't just take our word for it. Here's what our satisfied customers have to say.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Sarah Johnson",
                  location: "Local Resident",
                  quote:
                    "GreenScape transformed our backyard into a beautiful oasis. The team was professional, on time, and the results exceeded our expectations.",
                },
                {
                  name: "Michael Thompson",
                  location: "Homeowner",
                  quote:
                    "We've been using their maintenance services for 3 years now. Our garden has never looked better, and their attention to detail is impressive.",
                },
                {
                  name: "Jennifer Davis",
                  location: "Property Manager",
                  quote:
                    "As a property manager, I've worked with many landscapers. GreenScape stands out for their reliability, quality work, and excellent communication.",
                },
              ].map((testimonial, index) => (
                <Card key={index} className="p-6">
                  <div className="flex text-yellow-400 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="italic mb-4">"{testimonial.quote}"</p>
                  <div className="font-medium">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                </Card>
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
                  With over 15 years of experience, we've been the trusted landscaping partner for homeowners
                  and businesses in the local area.
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
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=400&width=600&text=Our Team"
                  alt="Our team"
                  fill
                  className="object-cover"
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
              &copy; {new Date().getFullYear()} GreenScape Landscaping. All rights reserved.
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
