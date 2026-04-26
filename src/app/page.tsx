import Hero from "@/components/sections/Hero"
import Journey from "@/components/sections/Journey"
import Experience from "@/components/sections/Experience"
import Work from "@/components/sections/Work"
import Gallery from "@/components/sections/Gallery"
import Line from "@/components/sections/Line"
import Connect from "@/components/sections/Connect"
import DollySection from "@/components/fx/DollySection"
import GlobalStarfield from "@/components/fx/GlobalStarfield"
import RotatingWordmark from "@/components/fx/RotatingWordmark"

/**
 * Two global fx layers sit fixed behind every section:
 *   - GlobalStarfield: cursor-reactive twinkling stars
 *   - RotatingWordmark: giant subtle "anit" rotating with scroll
 *
 * Sections use `position: relative` with their content at z-index 10+ so
 * they paint OVER the global fx. Body bg #0a0c18 matches the footer video
 * tone so the entire page reads as one continuous night sky.
 */
export default function Home() {
  return (
    <main className="relative">
      {/* Persistent global background fx — render order: starfield (deepest)
          → wordmark (slightly above) → sections (z-10+) above both. */}
      <GlobalStarfield />
      <RotatingWordmark />

      <Hero />
      <DollySection>
        <Journey />
      </DollySection>
      <DollySection>
        <Experience />
      </DollySection>
      <DollySection>
        <Work />
      </DollySection>
      <DollySection>
        <Gallery />
      </DollySection>
      <DollySection>
        <Line />
      </DollySection>
      <DollySection>
        <Connect />
      </DollySection>
    </main>
  )
}
