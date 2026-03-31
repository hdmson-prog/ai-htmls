"use client"

import { useEffect, useRef, useState } from "react"
import { Send, MapPin, Phone, Mail, Clock, Building2, MessageSquare } from "lucide-react"

const inquiryTypes = [
  "Product Inquiry",
  "Request a Quote",
  "Technical Support",
  "Partnership Opportunity",
  "Career Inquiry",
  "Other",
]

const regions = [
  "North America",
  "Europe",
  "Asia Pacific",
  "Middle East",
  "Latin America",
  "Africa",
]

export function ContactForm() {
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    jobTitle: "",
    region: "",
    inquiryType: "",
    productInterest: "",
    quantity: "",
    message: "",
    newsletter: false,
    terms: false,
  })
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Form submitted:", formData)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  return (
    <section id="contact" ref={sectionRef} className="py-24 lg:py-32 bg-secondary">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block text-accent text-sm font-semibold tracking-[0.3em] uppercase mb-4">
            Contact Us
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground font-bold leading-tight mb-6">
            <span className="text-balance">Get In Touch</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Ready to discuss your bearing needs? Our team is here to provide expert 
            guidance and customized solutions.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div
            className={`space-y-8 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
            }`}
          >
            {/* Info Cards */}
            <div className="bg-card p-6 border border-border">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-2">Headquarters</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    1234 Industrial Boulevard<br />
                    Suite 500<br />
                    Detroit, MI 48201, USA
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card p-6 border border-border">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-2">Phone</h3>
                  <p className="text-sm text-muted-foreground">
                    Sales: +1 (800) 555-0123<br />
                    Support: +1 (800) 555-0124
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card p-6 border border-border">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-2">Email</h3>
                  <p className="text-sm text-muted-foreground">
                    Sales: sales@precisionbearings.com<br />
                    Support: support@precisionbearings.com
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card p-6 border border-border">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-2">Business Hours</h3>
                  <p className="text-sm text-muted-foreground">
                    Monday - Friday: 8:00 AM - 6:00 PM EST<br />
                    Saturday: 9:00 AM - 1:00 PM EST<br />
                    24/7 Technical Support Available
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div
            className={`lg:col-span-2 transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
            }`}
          >
            <form onSubmit={handleSubmit} className="bg-card border border-border p-8 lg:p-10">
              <div className="grid sm:grid-cols-2 gap-6">
                {/* First Name */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    First Name <span className="text-accent">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
                    placeholder="John"
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Last Name <span className="text-accent">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
                    placeholder="Doe"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Email Address <span className="text-accent">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
                    placeholder="john@company.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                {/* Company */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Company Name <span className="text-accent">*</span>
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
                    placeholder="Company Inc."
                  />
                </div>

                {/* Job Title */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Job Title
                  </label>
                  <input
                    type="text"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
                    placeholder="Procurement Manager"
                  />
                </div>

                {/* Region */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Region <span className="text-accent">*</span>
                  </label>
                  <select
                    name="region"
                    value={formData.region}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-background border border-border text-foreground focus:outline-none focus:border-accent transition-colors appearance-none cursor-pointer"
                  >
                    <option value="">Select Region</option>
                    {regions.map((region) => (
                      <option key={region} value={region}>
                        {region}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Inquiry Type */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Inquiry Type <span className="text-accent">*</span>
                  </label>
                  <select
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-background border border-border text-foreground focus:outline-none focus:border-accent transition-colors appearance-none cursor-pointer"
                  >
                    <option value="">Select Type</option>
                    {inquiryTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Product Interest */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Product Interest
                  </label>
                  <input
                    type="text"
                    name="productInterest"
                    value={formData.productInterest}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
                    placeholder="e.g., WH-2000 Series"
                  />
                </div>

                {/* Estimated Quantity */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Estimated Quantity
                  </label>
                  <input
                    type="text"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
                    placeholder="e.g., 1,000 units"
                  />
                </div>

                {/* Message */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Message <span className="text-accent">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors resize-none"
                    placeholder="Please describe your requirements in detail..."
                  />
                </div>

                {/* Checkboxes */}
                <div className="sm:col-span-2 space-y-4">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      name="newsletter"
                      checked={formData.newsletter}
                      onChange={handleChange}
                      className="w-5 h-5 border-2 border-border bg-background text-accent focus:ring-accent mt-0.5"
                    />
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      Subscribe to our newsletter for product updates and industry insights
                    </span>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      name="terms"
                      checked={formData.terms}
                      onChange={handleChange}
                      required
                      className="w-5 h-5 border-2 border-border bg-background text-accent focus:ring-accent mt-0.5"
                    />
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      I agree to the{" "}
                      <a href="#" className="text-accent hover:underline">
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-accent hover:underline">
                        Privacy Policy
                      </a>{" "}
                      <span className="text-accent">*</span>
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-10 py-4 bg-primary text-primary-foreground text-sm font-semibold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-accent transition-colors"
                  >
                    <Send className="w-4 h-4" />
                    Submit Inquiry
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
