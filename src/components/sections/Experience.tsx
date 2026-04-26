"use client"
import { motion, useInView } from "motion/react"
import { useRef, useState } from "react"
import { Plus, Minus } from "lucide-react"

type Role = {
  company: string
  role: string
  type: string
  dates: string
  location: string
  short: string
  long: string
  skills?: string[]
}

const ROLES: Role[] = [
  {
    company: "OpenAnalyst Inc.",
    role: "AI Product Manager",
    type: "Full-time",
    dates: "Jan 2026 — Present",
    location: "San Francisco Bay Area · Hybrid",
    short:
      "Translating LLM + agentic capability into a real product — strategy, intelligent workflows, and AI systems that act as collaborators.",
    long:
      "AI Product Manager building scalable, user-centric AI products powered by LLMs and agent-based systems. Designing intelligent workflows where AI acts as a functional collaborator — driving efficiency, automation, and decision-making. Focused on the shift toward intent-driven interfaces, where AI reduces the barrier to building and enables faster execution at scale.",
    skills: ["LLMOps", "AI Engineering", "Agentic Workflows", "Product Strategy"],
  },
  {
    company: "Personal — Career Break",
    role: "Self-directed AI R&D",
    type: "Career break",
    dates: "Oct 2025 — Jan 2026",
    location: "New Delhi, India",
    short:
      "Focused break to research, design, and validate a high-impact AI product — agents, automation systems, and concepts with large-scale potential.",
    long:
      "Intentional career break to work on a high-impact AI product. Deep dive into advanced AI tools, agents, automation systems, and emerging tech — experimenting with problem-solving across multiple domains while validating concepts with strong potential for large-scale impact.",
  },
  {
    company: "10x.in",
    role: "AI Product Manager",
    type: "Full-time",
    dates: "Jan 2025 — Oct 2025",
    location: "United States · Hybrid",
    short:
      "Led AI products and personalised learning experiences — shipping LLM-driven curriculum and automation across the platform.",
    long:
      "Led the development of AI solutions and the evolution of educational platforms at 10x.in. Designed and deployed advanced models, kept curriculum aligned with industry advancements, and built AI-driven automation to scale data processing and course delivery while preserving personalised experiences.",
    skills: ["LLMOps", "Prompt Engineering", "AI Curriculum"],
  },
  {
    company: "Skill Arbitrage",
    role: "Lead Data Scientist",
    type: "Full-time",
    dates: "Sep 2023 — Jan 2025 · 1 yr 5 mos",
    location: "Noida, India · On-site",
    short:
      "Built predictive models, ETL, and ML systems end-to-end. Trained technical and non-technical teams; mentored interns into shipping roles.",
    long:
      "Collected, cleaned, and pre-processed large datasets from diverse sources — making them analysis-ready through normalisation and imputation. Built predictive and descriptive models, designed ETL processes, and developed test plans for ML systems. Communicated findings to stakeholders and collaborated cross-functionally on deployment.",
    skills: ["Octoparse", "PySpark", "ML Modelling"],
  },
  {
    company: "Unmessenger",
    role: "Product Manager",
    type: "Part-time",
    dates: "Mar 2023 — Jan 2025 · 1 yr 11 mos",
    location: "Bengaluru, India · Remote",
    short:
      "Mentored 1,000+ interns into data-science roles — appraisals, offers, and a pipeline of practitioners coming out the other side.",
    long:
      "Corporate trainer and product mentor — guided over 1,000 interns into data-science roles. Built a track record of stellar appraisals and job offers under that mentorship, while connecting practitioners across the field.",
    skills: ["Octoparse", "GCP", "Mentorship"],
  },
  {
    company: "Dataisgood",
    role: "Subject Matter Expert (Data Science)",
    type: "Full-time",
    dates: "May 2022 — Sep 2023 · 1 yr 5 mos",
    location: "Noida, India · On-site",
    short:
      "Scraped, modelled, and taught — Python + Selenium for data extraction; 250+ hrs of live lectures; dashboards in Tableau and PowerBI.",
    long:
      "Used Python and Selenium to extract data from diverse sites, building predictive ML models tailored to client objectives. Delivered 250+ hours of live Python instruction. Built data-driven products and applications, and educated non-technical professionals on the value of data-driven frameworks with automation. Built interactive dashboards in Tableau and PowerBI.",
    skills: ["Power BI", "Python", "Selenium"],
  },
  {
    company: "KaroStartup",
    role: "Product Designer",
    type: "Self-employed",
    dates: "Apr 2021 — Apr 2022 · 1 yr 1 mo",
    location: "Noida, India · On-site",
    short:
      "Cross-functional product design — managed social content and crafted brand identities to capture target audiences.",
    long:
      "Collaborated cross-functionally to bring innovative ideas to life. Managed social media content and crafted brand identities to captivate target audiences, integrating design principles with market strategy.",
    skills: ["Design Management", "Market Research"],
  },
  {
    company: "Apex TG India Pvt Ltd",
    role: "Python Developer",
    type: "Full-time",
    dates: "May 2019 — Apr 2021 · 2 yrs",
    location: "Noida, India · On-site",
    short:
      "Designed, coded, tested, and shipped Python apps — Tkinter GUIs, custom widgets, dynamic event handling, and clean OOP throughout.",
    long:
      "Designed, coded, tested, and deployed Python applications using Tkinter. Built engaging GUIs and pushed Tkinter's capabilities — custom widgets, dynamic event handling, and integrating Tkinter with other libraries and APIs. Solid grounding in OOP and a track record of delivering on time and budget.",
    skills: ["Django", "VS Code", "Tkinter"],
  },
  {
    company: "ReaderFox",
    role: "Python Developer",
    type: "Apprenticeship",
    dates: "May 2018 — Apr 2019 · 1 yr",
    location: "Noida, India",
    short:
      "Built dynamic, scalable, secure web apps in Python — MVT pattern, SQL + NoSQL integrations, third-party API work end-to-end.",
    long:
      "Built dynamic, scalable, secure web apps in Python and associated frameworks. Worked end-to-end across the stack with the MVT pattern, integrating with SQL (MySQL, Oracle) and NoSQL (MongoDB, Cassandra) databases, and consuming third-party APIs.",
  },
]

function RoleRow({ role, index }: { role: Role; index: number }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-10%" })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.05 * index, ease: [0.16, 1, 0.3, 1] }}
      className="relative grid grid-cols-12 gap-6 md:gap-10 border-b border-white/[0.07] py-10 md:py-14"
    >
      <div className="col-span-12 md:col-span-3 flex flex-col gap-2">
        <span className="font-mono text-[10px] tracking-[0.28em] text-cream-muted uppercase">
          {role.dates}
        </span>
        <span className="text-xs text-cream-muted font-mono tracking-wider">
          {role.location}
        </span>
        <span className="mt-1 inline-flex w-fit items-center rounded-full border border-white/10 px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-[0.18em] text-cream-soft">
          {role.type}
        </span>
      </div>

      <div className="col-span-12 md:col-span-9">
        <div className="flex items-start justify-between gap-6">
          <div>
            <h3
              className="font-serif italic"
              style={{
                fontSize: "clamp(1.6rem, 2.6vw, 2.6rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                color: "#E8E5D6",
              }}
            >
              {role.role}
            </h3>
            <p className="mt-1.5 text-sm text-indigo-accent font-mono tracking-wider">
              {role.company}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={open ? "Collapse details" : "Expand details"}
            className="shrink-0 mt-2 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-cream-muted transition-colors hover:border-white/30 hover:text-cream"
          >
            {open ? <Minus size={14} /> : <Plus size={14} />}
          </button>
        </div>

        <p className="mt-5 max-w-2xl text-[15px] leading-[1.7] text-cream-soft">
          {role.short}
        </p>

        <motion.div
          initial={false}
          animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden"
        >
          <p className="mt-4 max-w-2xl text-[14px] leading-[1.75] text-cream-muted">
            {role.long}
          </p>
        </motion.div>

        {role.skills && role.skills.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {role.skills.map((s) => (
              <span
                key={s}
                className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-[11px] font-mono tracking-wider text-cream-muted"
              >
                {s}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: "-15%" })
  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative px-6 md:px-12 lg:px-20 pt-32 md:pt-44 pb-28 md:pb-36 overflow-hidden"
    >
      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 md:mb-20"
        >
          <span className="font-mono text-xs tracking-[0.28em] text-cream-muted uppercase">
            02 · Experience
          </span>
          <h2
            className="font-serif mt-6 max-w-4xl"
            style={{
              fontSize: "clamp(2.4rem, 6vw, 5rem)",
              lineHeight: 0.98,
              letterSpacing: "-0.035em",
              color: "#E8E5D6",
            }}
          >
            Eight years.{" "}
            <em className="italic" style={{ color: "#9AA5E0" }}>
              From Tkinter GUIs to agentic systems.
            </em>
          </h2>
          <p className="mt-6 max-w-xl text-[15px] leading-[1.7] text-cream-soft">
            Tap any role to expand the long version.
          </p>
        </motion.div>

        <div className="border-t border-white/[0.07]">
          {ROLES.map((role, i) => (
            <RoleRow key={role.company + role.dates} role={role} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
