import type { Metadata, Viewport } from "next"
import Script from "next/script"
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google"
import "./globals.css"

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
})
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
})
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
})

const SITE_URL = "https://anit.upfyn.com"
const TITLE = "Anit Chaudhry — AI Product Manager at OpenAnalyst"
const DESCRIPTION =
  "Anit Chaudhry is an AI Product Manager at OpenAnalyst, building agentic systems, 10x developer tools, and the Claude-native analyst stack. Writing weekly about where this wave goes for 11K+ followers on LinkedIn."

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s — Anit Chaudhry",
  },
  description: DESCRIPTION,
  applicationName: "Anit Chaudhry — Portfolio",
  authors: [{ name: "Anit Chaudhry", url: "https://www.linkedin.com/in/anit-choudhary-984994149/" }],
  creator: "Anit Chaudhry",
  publisher: "Anit Chaudhry",
  keywords: [
    "Anit Chaudhry",
    "Anit Choudhary",
    "AI Product Manager",
    "OpenAnalyst",
    "10x Developer Tools",
    "Agentic AI",
    "LLM Product Management",
    "MCP",
    "Claude",
    "Generative AI",
    "Anthropic",
    "AI agents",
    "Noida AI",
    "India AI Product Manager",
    "anit-choudhary-984994149",
  ],
  alternates: {
    canonical: SITE_URL,
  },
  category: "technology",
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Anit Chaudhry",
    title: TITLE,
    description: DESCRIPTION,
    firstName: "Anit",
    lastName: "Chaudhry",
    username: "anitchaudhry",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Anit Chaudhry — AI Product Manager",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og.png"],
    creator: "@anitchaudhry",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [{ url: "/icon.png", type: "image/png" }],
    apple: [{ url: "/icon.png" }],
  },
  other: {
    "linkedin:owner": "https://www.linkedin.com/in/anit-choudhary-984994149/",
  },
}

export const viewport: Viewport = {
  themeColor: "#0a0c18",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
}

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Anit Chaudhry",
  alternateName: ["Anit Choudhary", "Anit Choudhary AI", "Anit AI"],
  url: SITE_URL,
  image: `${SITE_URL}/profile/anit-hero.jpeg`,
  jobTitle: "AI Product Manager",
  worksFor: {
    "@type": "Organization",
    name: "OpenAnalyst Inc.",
    url: "https://openanalyst.com",
  },
  description: DESCRIPTION,
  email: "Getintouch.anit@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Noida",
    addressRegion: "Uttar Pradesh",
    addressCountry: "IN",
  },
  sameAs: [
    "https://www.linkedin.com/in/anit-choudhary-984994149/",
    "https://github.com/AnitChaudhry",
    "https://openanalyst.com",
  ],
  knowsAbout: [
    "Agentic AI",
    "Large Language Models",
    "Generative AI",
    "AI Product Management",
    "Multi-agent Coordination",
    "Model Context Protocol",
    "Claude",
    "LLMOps",
    "Prompt Engineering",
  ],
}

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Anit Chaudhry — Portfolio",
  url: SITE_URL,
  inLanguage: "en",
  author: { "@type": "Person", name: "Anit Chaudhry" },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable}`}
    >
      <body>
        <Script
          id="ld-person"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <Script
          id="ld-website"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {children}
      </body>
    </html>
  )
}
