import type { MetadataRoute } from "next"

export const dynamic = "force-static"

const SITE_URL = "https://anitchaudhry.github.io/anit-website"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const sections = [
    "",
    "#journey",
    "#experience",
    "#work",
    "#gallery",
    "#connect",
  ]
  return sections.map((hash) => ({
    url: `${SITE_URL}/${hash}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: hash === "" ? 1.0 : 0.7,
  }))
}
