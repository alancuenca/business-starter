/**
 * FixIt Pro Site Configuration
 *
 * CUSTOMIZE: This is the single source of truth for your business.
 * Update these values to rebrand the entire template.
 */

export const siteConfig = {
  // =============================================
  // CUSTOMIZE: Business Information
  // =============================================
  businessName: "FixIt Pro",
  tagline: "Your Trusted Home Repair Experts",
  description:
    "Professional plumbing, electrical, and home renovation services. Licensed, insured, and available 24/7 for emergency repairs.",

  // =============================================
  // CUSTOMIZE: Contact Information
  // =============================================
  phone: "(555) 123-4567",
  email: "info@fixitpro.com",

  address: {
    street: "123 Main Street",
    city: "San Francisco",
    state: "CA",
    zip: "94102",
    country: "United States",
  },

  geo: {
    latitude: "37.7749",
    longitude: "-122.4194",
  },

  // =============================================
  // CUSTOMIZE: Business Hours & Credentials
  // =============================================
  hours: "24/7 Emergency Service",
  openingHours: "Mo-Su 00:00-23:59",
  licenseNumber: "LIC-123456",
  certifications: ["Licensed", "Insured", "Bonded"],

  // =============================================
  // CUSTOMIZE: Hero Stats Bar
  // Update these numbers to match your business.
  // =============================================
  stats: [
    { value: "15+", label: "Years Experience" },
    { value: "2k+", label: "Projects Completed" },
    { value: "100%", label: "Satisfaction Rate" },
    { value: "24/7", label: "Emergency Service" },
  ],

  // =============================================
  // CUSTOMIZE: Navigation Links
  // Add, remove, or reorder navigation items.
  // =============================================
  navLinks: [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/projects", label: "Projects" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ],

  // =============================================
  // CUSTOMIZE: Footer Links
  // =============================================
  footerLinks: {
    company: [
      { href: "/about", label: "About Us" },
      { href: "/contact", label: "Contact" },
      { href: "/projects", label: "Our Work" },
      { href: "#", label: "Careers" },
    ],
    legal: [
      { href: "#", label: "Privacy Policy" },
      { href: "#", label: "Terms of Service" },
    ],
  },

  // =============================================
  // CUSTOMIZE: Social Media
  // Remove or add platforms as needed.
  // =============================================
  socialLinks: {
    facebook: "https://facebook.com/fixitpro",
    instagram: "https://instagram.com/fixitpro",
    yelp: "https://yelp.com/biz/fixitpro",
    twitter: "https://twitter.com/fixitpro",
  },

  // =============================================
  // SEO Configuration
  // =============================================
  seo: {
    siteName: "FixIt Pro",
    siteUrl: "https://fixitpro.com",
    defaultImage: "/og-image.jpg",
    twitterHandle: "@fixitpro",
  },

  priceRange: "$$",
  serviceAreas: ["San Francisco", "Oakland", "San Jose", "Berkeley"],
} as const;

export type SiteConfig = typeof siteConfig;
