import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowUpRight, CheckCircle2, ChevronRight, Cloud, Code2, Container, ExternalLink,
  Globe2, Layers3, Menu, MonitorCog, X, Zap
} from 'lucide-react'
import { profile } from './data/profile'
import { skillGroups } from './data/skills'
import { projects } from './data/projects'
import { experience } from './data/experience'
import LoadingScreen from './components/LoadingScreen'
import './index.css'

const reveal = { hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55 } } }

const GithubIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.42-4.04-1.42-.55-1.4-1.34-1.77-1.34-1.77-1.09-.75.08-.74.08-.74 1.2.08 1.84 1.23 1.84 1.23 1.07 1.83 2.8 1.3 3.49.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.94 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.17 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.3-1.55 3.3-1.23 3.3-1.23.65 1.65.24 2.87.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.93.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.82.58A12 12 0 0 0 12 .5Z" />
  </svg>
)

const LinkedinIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M6.94 8.5H3.5V20h3.44V8.5ZM5.22 3A2.02 2.02 0 1 0 5.22 7.04 2.02 2.02 0 0 0 5.22 3ZM20.5 13.57c0-3.47-1.85-5.09-4.32-5.09-1.99 0-2.88 1.09-3.38 1.86V8.5H9.36V20h3.44v-6.4c0-1.69.32-3.32 2.41-3.32 2.06 0 2.08 1.92 2.08 3.43V20h3.43l-.22-6.43Z" />
  </svg>
)

function Section({ id, eyebrow, title, children }) {
  const reduce = useReducedMotion()
  return (
    <motion.section id={id} className="section shell" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.12 }} transition={reduce ? { duration: 0 } : undefined}>
      <div className="section-head">
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
      </div>
      {children}
    </motion.section>
  )
}

function Nav({ open, setOpen }) {
  const links = ['skills', 'projects', 'experience', 'infrastructure', 'github', 'contact']
  return (
    <header className="nav-wrap">
      <nav className="nav shell">
        <a className="brand" href="#home" onClick={() => setOpen(false)} aria-label="Nagendra Jadon home">
          <span className="brand-mark">NJ</span>
          <span>NAGENDRA<span className="muted">.DEVOPS</span></span>
        </a>
        <button className="mobile-toggle" onClick={() => setOpen(!open)} aria-label="Toggle navigation" aria-expanded={open}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
        <div className={`nav-links ${open ? 'open' : ''}`}>
          {links.map((link) => <a key={link} href={`#${link}`} onClick={() => setOpen(false)}>{link}</a>)}
          <a className="nav-github" href={profile.github} target="_blank" rel="noreferrer"><GithubIcon size={15} /> GitHub</a>
        </div>
      </nav>
    </header>
  )
}

function Hero() {
  return (
    <section id="home" className="hero shell">
      <div className="hero-copy">
        <div className="status-pill"><span className="pulse" /> OPEN TO DEVOPS / CLOUD OPPORTUNITIES</div>
        <p className="hero-kicker">AWS · CI/CD · LINUX · INFRASTRUCTURE</p>
        <h1>Building reliable<br /><span>infrastructure.</span></h1>
        <p className="hero-text">{profile.summary} Focused on deployment automation, server reliability, and practical cloud engineering.</p>
        <div className="hero-actions">
          <a className="btn primary" href="#projects">View Projects <ArrowUpRight size={17} /></a>
          <a className="btn secondary" href="/Nagendra_Jadon_DevOps.pdf" download>Download Resume <ArrowUpRight size={17} /></a>
        </div>
        <div className="hero-actions-secondary">
          <a className="btn secondary" href={profile.github} target="_blank" rel="noreferrer"><GithubIcon size={17} /> GitHub</a>
          <a className="btn hire" href={`mailto:${profile.email}?subject=${encodeURIComponent('DevOps Engineer Opportunity — Nagendra Jadon')}`} target="_blank" rel="noreferrer">Hire Me <ArrowUpRight size={17} /></a>
        </div>
        <div className="hero-meta"><span><MapPinIcon /> {profile.location}</span><span><CheckCircle2 size={15} /> Production-focused</span></div>
      </div>
      <TerminalCard />
    </section>
  )
}

function MapPinIcon() { return <Globe2 size={15} /> }

function TerminalCard() {
  return (
    <div className="terminal-card">
      <div className="terminal-bar"><div className="terminal-dots"><i /><i /><i /></div><span>nagendra@devops:~</span><span className="terminal-live">● LIVE</span></div>
      <div className="terminal-body">
        <div><span className="prompt">$</span> whoami</div>
        <div className="output">nagendra-jadon</div>
        <div className="spacer" />
        <div><span className="prompt">$</span> role</div>
        <div className="output">DevOps Engineer</div>
        <div className="spacer" />
        <div><span className="prompt">$</span> stack --primary</div>
        <div className="output">AWS / Jenkins / Linux / Nginx</div>
        <div><span className="output">Docker / Terraform / Monitoring</span></div>
        <div className="spacer" />
        <div><span className="prompt">$</span> mission</div>
        <div className="output">automate → deploy → observe → improve<span className="cursor">_</span></div>
      </div>
    </div>
  )
}

function Skills() {
  const icons = [Cloud, Zap, Container, MonitorCog, Code2, Layers3]
  return <Section id="skills" eyebrow="01 / TOOLBOX" title="DevOps skills that ship." >
    <div className="skills-grid">
      {skillGroups.map((group, i) => {
        const Icon = icons[i]
        return <motion.article className="skill-card" key={group.title} whileHover={{ y: -4 }}>
          <div className="skill-icon"><Icon size={19} /></div><h3>{group.title}</h3>
          <div className="chips">{group.skills.map(s => <span key={s}>{s}</span>)}</div>
        </motion.article>
      })}
    </div>
  </Section>
}

function Projects() {
  return <Section id="projects" eyebrow="02 / SELECTED WORK" title="Infrastructure, not just screenshots." >
    <div className="projects-grid">
      {projects.map(project => <motion.article className="project-card" key={project.number} whileHover={{ y: -5 }}>
        <div className="project-top"><span className="project-number">{project.number}</span><span className="project-type">{project.type}</span></div>
        <div className="project-content">
          <p className="eyebrow">{project.eyebrow}</p><h3>{project.title}</h3><p>{project.description}</p>
          <div className="chips">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
        </div>
        <div className="project-visual"><img src={project.architecture} alt={`${project.title} architecture diagram`} /></div>
        <div className="project-footer"><a href={project.repository} target="_blank" rel="noreferrer">VIEW {project.type === 'Personal Project' ? 'SOURCE' : 'CASE STUDY'} <ArrowUpRight size={16} /></a></div>
      </motion.article>)}
    </div>
  </Section>
}

function Experience() {
  return <Section id="experience" eyebrow="03 / EXPERIENCE" title="Production experience, clearly documented." >
    <div className="timeline">
      {experience.map(item => <motion.article className={`timeline-item ${item.current ? 'current' : ''}`} key={`${item.company}-${item.period}`}>
        <div className="timeline-marker"><span /></div>
        <div className="timeline-card"><div className="timeline-meta"><span>{item.period}</span>{item.current && <b>CURRENT</b>}</div><h3>{item.role}</h3><h4>{item.company}</h4><ul>{item.bullets.map(b => <li key={b}>{b}</li>)}</ul></div>
      </motion.article>)}
    </div>
    <div className="education-card"><div className="skill-icon"><Code2 size={19} /></div><div><span className="eyebrow">EDUCATION</span><h3>Bachelor of Engineering · Computer Science Engineering</h3><p>ITM Universe · 2016 — 2020</p></div></div>
  </Section>
}

function Infrastructure() {
  return <Section id="infrastructure" eyebrow="04 / HOW I WORK" title="From commit to reliable runtime." >
    <div className="infra-layout">
      <div className="infra-copy">
        <p className="lead">The portfolio itself follows the same mindset: source control, automated delivery, containerized runtime, reverse proxy, and HTTPS.</p>
        <div className="infra-points">
          {[['01', 'Version control', 'GitHub is the source of truth for code and documentation.'], ['02', 'Automated delivery', 'GitHub Actions is designed to validate, build, and package releases.'], ['03', 'Container runtime', 'Docker packages the production build into a consistent deployment unit.'], ['04', 'Edge & security', 'Nginx handles web delivery and HTTPS terminates at the edge/server layer.']].map(([n, t, d]) => <div className="infra-point" key={n}><span>{n}</span><div><h3>{t}</h3><p>{d}</p></div></div>)}
        </div>
      </div>
      <div className="infra-diagram"><img src="/assets/portfolio-architecture.svg" alt="Portfolio deployment architecture diagram" width="1000" height="560" /></div>
    </div>
    <div className="learning-strip"><div><span className="eyebrow">CURRENTLY LEARNING</span><h3>Kubernetes · CKA path</h3></div><div><span className="eyebrow">CERTIFICATION PATH</span><h3>AWS Solutions Architect Associate · SAA-C03</h3></div></div>
  </Section>
}

function GithubSection() {
  return <Section id="github" eyebrow="05 / OPEN WORK" title="See the case studies." >
    <div className="github-panel">
      <div><GithubIcon size={34} /><p>Selected DevOps work, sanitized client case studies, and personal projects live on GitHub.</p></div>
      <a className="btn primary" href={profile.github} target="_blank" rel="noreferrer">Open GitHub profile <ExternalLink size={16} /></a>
    </div>
    <div className="repo-grid">
      {projects.slice(0, 2).map(p => <a className="repo-card" href={p.repository} target="_blank" rel="noreferrer" key={p.repository}><div><span>{p.type}</span><h3>{p.title}</h3></div><ChevronRight size={20} /></a>)}
    </div>
  </Section>
}

function Contact() {
  return (
    <section id="contact" className="contact shell">
      <div className="contact-box">
        <div>
          <span className="eyebrow">06 / CONTACT</span>
          <h2>Let's build reliable infrastructure.</h2>
          <p>Open to DevOps and Cloud Engineering opportunities where automation, troubleshooting, and infrastructure ownership matter.</p>
        </div>
        <div className="contact-actions">
          <a className="btn hire" href={`mailto:${profile.email}?subject=${encodeURIComponent('DevOps Engineer Opportunity — Nagendra Jadon')}`} target="_blank" rel="noreferrer">Hire Me <ArrowUpRight size={17} /></a>
          <a className="btn secondary" href="/Nagendra_Jadon_DevOps.pdf" download>Download Resume <ArrowUpRight size={17} /></a>
          <a className="btn secondary" href={`mailto:${profile.email}`} target="_blank" rel="noreferrer">Email me <ArrowUpRight size={17} /></a>
          <a className="btn secondary" href={profile.linkedin} target="_blank" rel="noreferrer"><LinkedinIcon size={17} /> LinkedIn</a>
        </div>
      </div>
    </section>
  )
}

function Footer() { return <footer className="footer shell"><span>© {new Date().getFullYear()} Nagendra Jadon</span><span>DEVOPS ENGINEER · AWS · CI/CD · LINUX</span><a href="#home">BACK TO TOP ↑</a></footer> }

export default function App() {
  const [open, setOpen] = useState(false)
  const [done, setDone] = useState(false)
  return <>
    {!done && <LoadingScreen onComplete={() => setDone(true)} />}
    <Nav open={open} setOpen={setOpen} />
    <main><Hero /><Skills /><Projects /><Experience /><Infrastructure /><GithubSection /><Contact /></main>
    <Footer />
  </>
}
