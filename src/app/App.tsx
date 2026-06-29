import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { motion, useInView } from "motion/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./components/ui/dialog";
import taprootLogo from "../imports/Taproot_just_logo_svg.png";

const CALENDLY_URL =
  import.meta.env.VITE_CALENDLY_URL ?? "https://calendly.com/rohan-taproot-ai/30min";

type Direction = "up" | "down" | "left" | "right";

type IconName = "box" | "search" | "chart" | "doc" | "shield" | "database" | "tool" | "pulse" | "edit" | "frame";

const directions = {
  up: { hidden: { opacity: 0, y: 75 }, visible: { opacity: 1, y: 0 } },
  down: { hidden: { opacity: 0, y: -75 }, visible: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: 75 }, visible: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: -75 }, visible: { opacity: 1, x: 0 } },
};

function ScrollReveal({ children, direction = "up", delay = 0, id }: { children: ReactNode; direction?: Direction; delay?: number; id?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      id={id}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={directions[direction]}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.4, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Icon({ name }: { name: IconName }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" } as const;
  const paths: Record<IconName, ReactNode> = {
    box: <><path d="m7.5 4.3 9 5.1" /><path d="M21 8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" /><path d="m3.3 7 8.7 5 8.7-5" /><path d="M12 22V12" /></>,
    search: <><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /><path d="M11 8v3" /><path d="M11 14h.01" /></>,
    chart: <><path d="M3 3v16a2 2 0 0 0 2 2h16" /><path d="m19 9-5 5-4-4-3 3" /></>,
    doc: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /></>,
    shield: <path d="M20 13c0 5-3.5 7.5-7.7 9a1 1 0 0 1-.6 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.2-2.7a1.2 1.2 0 0 1 1.6 0C14.5 3.8 17 5 19 5a1 1 0 0 1 1 1z" />,
    database: <><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5v14a9 3 0 0 0 18 0V5" /><path d="M3 12a9 3 0 0 0 18 0" /></>,
    tool: <><path d="m10.5 20.5 10-10a2.8 2.8 0 0 0-4-4l-10 10a2.8 2.8 0 0 0 4 4Z" /><path d="m7 17-4 4" /></>,
    pulse: <path d="M22 12h-4l-3 9L9 3l-3 9H2" />,
    edit: <><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" /></>,
    frame: <><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M3 9h18" /><path d="M9 21V9" /></>,
  };

  return <svg width="22" height="22" viewBox="0 0 24 24" {...common}>{paths[name]}</svg>;
}

function Logo({ small = false }: { small?: boolean }) {
  return <img className="tl-logo-mark" src={taprootLogo} alt="Taproot" width={small ? 26 : 30} height={small ? 26 : 30} />;
}

function Header({ onBook }: { onBook: () => void }) {
  return (
    <nav className="tl-nav">
      <a className="tl-brand" href="#top" aria-label="Taproot home"><Logo /><span>Taproot</span></a>
      <div className="tl-nav-links" aria-label="Primary navigation">
        <a href="#platform">Platform</a>
        <a href="#loop">How it works</a>
        <a href="#worker">Workers</a>
        <a href="#governance">Governance</a>
        <a href="#deploy">Deploy</a>
      </div>
      <div className="tl-nav-actions">
        <a href="#docs">Docs</a>
        <button className="tl-btn tl-btn-solid tl-btn-small" type="button" onClick={onBook}>Book a demo</button>
      </div>
    </nav>
  );
}

function Hero({ onBook }: { onBook: () => void }) {
  return (
    <section id="top" className="tl-section tl-hero">
      <div className="tl-glow tl-hero-glow" />
      <div className="tl-wrap tl-hero-grid">
        <div>
          <div className="tl-pill tl-pill-pulse"><span />Enterprise agent platform</div>
          <h1>Every agent you build makes the next one <em>faster, safer, almost free.</em></h1>
          <p>Taproot is the agent platform for companies that don't want to become AI infrastructure companies. Prompts, tools, retrieval, guardrails and evals live in one closed loop — so every investment compounds into reusable capability, with human accountability and a full audit trail built in.</p>
          <div className="tl-actions">
            <button className="tl-btn tl-btn-solid" type="button" onClick={onBook}>Request a demo</button>
            <a className="tl-btn tl-btn-ghost" href="#loop">See how it works →</a>
          </div>
        </div>
        <AssemblyPreview compact />
      </div>
    </section>
  );
}

function AssemblyPreview({ compact = false }: { compact?: boolean }) {
  const [done, setDone] = useState(0);
  const labels = [
    "Pulled 9 prompts from your library",
    "Connected Retrieval — Help Center + Orders",
    "Applied Guardrail set — Support-v3",
    "Flagged 1 outdated tool — needs review",
    "Routed for approval — Sarah (Support Lead)",
    "Deploy to production",
  ];

  useEffect(() => {
    const id = window.setInterval(() => setDone((value) => (value + 1) % 8), 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className={compact ? "tl-hero-card tl-float" : "tl-assembly-card"}>
      {compact && <div className="tl-window-bar"><i /><i /><i /><span>app.taproot.ai / build</span></div>}
      <div className="tl-card-body">
        <div className="tl-card-head"><strong>Assembling — Support Agent</strong><span className="tl-live"><i />Live</span></div>
        <div className="tl-progress"><span style={{ width: `${Math.min(100, Math.round((done / 6) * 100))}%` }} /></div>
        {labels.map((label, index) => {
          const status = index < done ? "done" : index === done ? "active" : "idle";
          return <div className={`tl-assembly-row ${status}`} key={label}><b>{status === "done" ? "✓" : status === "active" ? "●" : "○"}</b><span>{label}</span></div>;
        })}
      </div>
    </div>
  );
}

function StatsStrip() {
  const stats = [
    ["One platform", "for the entire agent lifecycle — running inside your own environment."],
    ["Zero", "ungoverned actions. Every write, email and payment is policy-gated and logged."],
    ["Every agent", "compounds. Reuse grows each time your team ships anything."],
  ];
  return <section className="tl-stats tl-wrap">{stats.map(([title, body]) => <div key={title}><strong>{title}</strong><span>{body}</span></div>)}</section>;
}

function Platform() {
  const cards: Array<[IconName, string, string, string]> = [
    ["box", "Self-assembling", "Agents built from what your company already knows", "The Virtual Worker draws from your library of prompts, tools, guardrails, datasets and past evals — surfacing what's relevant and configuring a deployment-ready agent. Every new agent inherits everything your team has already built."],
    ["search", "Guided remediation", "When an agent breaks, you'll know exactly why", "Taproot monitors performance continuously, traces failures to the real cause — a prompt, a retrieval step, a tool, a policy — and recommends a targeted fix. Problems aren't just reported, they're diagnosed and routed for approval."],
    ["chart", "Safe optimization", "Agents that improve without drifting out of bounds", "Continuous evaluation runs against the guardrails your team defined. Optimization happens inside the boundaries you set — so agents get better over time without silent drift, surprise behavior, or compliance gaps."],
  ];

  return (
    <section id="platform" className="tl-section">
      <div className="tl-wrap">
        <SectionHead eyebrow="Why Taproot" title="The agent lifecycle is one system — not eight tools." copy="Running agents on disconnected tools creates blind spots: prompts in one place, guardrails in another, evals nowhere. Taproot owns the operational layer across build, serve, evaluate, govern and improve — so nothing falls through the cracks." centered />
        <div className="tl-card-grid tl-three">
          {cards.map(([icon, eyebrow, title, body], index) => (
            <ScrollReveal key={title} direction={index === 0 ? "left" : index === 1 ? "up" : "right"} delay={index * 0.08}>
              <FeatureCard icon={icon} eyebrow={eyebrow} title={title} body={body} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Loop() {
  const steps = [
    ["01", "Detect", "Guardrails or eval scoring flag the moment quality slips."],
    ["02", "Diagnose", "Trace retrieval, tools and prompt versions to the real failure point."],
    ["03", "Propose", "A targeted fix, drawn from your history and governed policies."],
    ["04", "Verify", "Shadow-tested against golden datasets before anything ships."],
    ["05", "Approve", "A human signs off. The whole path is audited and reversible."],
  ];

  return (
    <section id="loop" className="tl-section tl-section-alt">
      <div className="tl-wrap">
        <SectionHead eyebrow="Governed autonomy" title="When an agent breaks, Taproot already knows the fix." copy="This isn't reckless self-healing. It's guided remediation — the failure is diagnosed, the fix is verified against your data, and a person signs off before anything ships. Every step stays on the record." centered />
        <div className="tl-step-line">
          {steps.map(([num, title, body], index) => <div key={num}><b className={index === steps.length - 1 ? "active" : ""}>{num}</b><h4>{title}</h4><p>{body}</p></div>)}
        </div>
        <div className="tl-tour-card">
          <div className="tl-mono">▶ See it in action</div>
          <div className="tl-video-box"><div><span><i /></span><strong>Watch the 90-second product tour</strong><p>A regression caught, diagnosed, fixed and shipped — start to finish. Drop your walkthrough video here.</p></div></div>
        </div>
      </div>
    </section>
  );
}

function Worker() {
  const rows = [
    ["1", "Pull from your library", "The Virtual Worker scans your prompts, docs, guardrails, tools and datasets — and assembles the components the agent needs."],
    ["2", "Surface conflicts before they ship", "Outdated components, conflicting instructions and coverage gaps are flagged before deployment — not discovered by users."],
    ["3", "Route through your approval workflow", "Need sign-off? Flip the toggle. Agents don't go live until the right person has reviewed — accountability built in, not bolted on."],
    ["4", "Deploy with confidence", "Ships as a stable, documented, auditable configuration. Every component it was built from is traceable."],
  ];
  const assets: Array<[IconName, string, string, string, "ok" | "warn"]> = [
    ["doc", "Support Prompt Suite v4.2", "Prompt · 9 variants", "✓ Active", "ok"],
    ["shield", "Guardrail: Support-v3", "Guardrail · 12 rules", "✓ Active", "ok"],
    ["database", "Retrieval: Help Center + Orders", "Retrieval · updated 2d ago", "✓ Active", "ok"],
    ["tool", "Toolbox: Refund API", "Tool · integration", "⚠ Review", "warn"],
    ["pulse", "Eval Suite: Support QA v2", "Evaluation · 46 cases", "✓ Active", "ok"],
  ];

  return (
    <section id="worker" className="tl-section">
      <div className="tl-wrap">
        <div className="tl-left-head"><SectionHead eyebrow="The worker layer" title="Build one agent. Inherit a team." copy="Most platforms let you build an agent for one job — then the next team starts from scratch. Investment doesn't compound. Because Taproot governs every prompt, document and tool an agent touches, every agent you ship becomes a set of reusable virtual workers for the rest of the company." /></div>
        <div className="tl-worker-grid">
          <div className="tl-worker-steps">
            {rows.map(([num, title, body]) => <div key={num}><b>{num}</b><span><h4>{title}</h4><p>{body}</p></span></div>)}
            <blockquote>"Every agent you build in Taproot makes the next one faster and better. That's not a feature — it's how the platform is designed."</blockquote>
          </div>
          <div className="tl-assembly-card">
            <div className="tl-card-body">
              <div className="tl-card-head"><strong>Support Agent — Assembly</strong><span className="tl-status">Awaiting approval</span></div>
              {assets.map(([icon, title, sub, status, tone]) => <div className={`tl-asset-row ${tone}`} key={title}><i><Icon name={icon} /></i><span><strong>{title}</strong><small>{sub}</small></span><b>{status}</b></div>)}
              <div className="tl-approval"><span><strong>Require approval before deploy</strong><small>Reviewer: Sarah Chen (Support Lead)</small></span><i /></div>
            </div>
          </div>
        </div>
        <div className="tl-worker-close">Your second agent ships in days. Your tenth is <em>almost free.</em></div>
      </div>
    </section>
  );
}

function Architecture() {
  const surfaces: Array<[IconName, string, string]> = [
    ["database", "Retrieval", "Your agents know what your organization knows. Connect knowledge bases, documents and data once — reusable by every agent."],
    ["edit", "Prompt Studio", "Build, version and test prompts with your team. Every prompt lives in the library, reusable by every agent you build next."],
    ["box", "Build", "Assemble agents from your library, not from scratch. Configure, test and deploy with full version control."],
    ["shield", "Guardrail Studio", "Define the boundaries agents operate within. Set rules, review violations, and enforce the policies your team established."],
    ["tool", "Toolbox", "Give agents the integrations and actions they need. APIs and internal systems, managed centrally, available everywhere."],
    ["frame", "Frame", "Structure how agents think, respond and reason — the scaffolding that keeps them predictable, consistent and aligned."],
  ];

  return (
    <section id="architecture" className="tl-section tl-section-alt">
      <div className="tl-wrap">
        <SectionHead eyebrow="The foundation" title="Six surfaces. One root system." copy="Taproot isn't a directory of features — it's a single root system every service grows from. Each surface is built to be reused, governed and shared, so value compounds instead of duplicating." centered />
        <div className="tl-card-grid tl-surfaces">{surfaces.map(([icon, title, body]) => <FeatureCard key={title} icon={icon} title={title} body={body} />)}</div>
        <div className="tl-note">Every surface runs on shared <strong>evaluation, observability and the System of Record</strong> — with an OTEL-native SDK (Python · TS · Go) and multi-cloud deployment underneath.</div>
      </div>
    </section>
  );
}

function Governance() {
  const chips = ["Version control", "Approval workflows", "Role attribution", "Full traceability", "Shadow mode", "Append-only audit"];
  const rows = [
    ["14:08", "Agent deploy · support-agent v14 · approved by S. Chen", "Approved", "ok"],
    ["14:07", "Eval run · Support QA v2 · 46/46 cases passed", "Passed", "ok"],
    ["14:06", "Guardrail check · PII redact · 3 spans", "Passed", "ok"],
    ["14:05", "Tool call · Refund API · $240", "Awaiting", "warn"],
    ["14:03", "Retrieval · Orders DB · out-of-policy response", "Blocked", "bad"],
    ["14:01", "Prompt promote · triage v13 → v14 · canary 5%", "Live", "ok"],
  ];

  return (
    <section id="governance" className="tl-section">
      <div className="tl-wrap tl-two-col">
        <div>
          <SectionHead eyebrow="System of record" title="Governance isn't an afterthought. It's the architecture." copy="Taproot keeps a running, reproducible, auditable history of every important action — what happened, how, why, and the evidence behind it. So when your legal, compliance or security team asks &quot;what changed and who approved it?&quot;, the answer is one query, not an archaeology project." />
          <div className="tl-chip-row">{chips.map((chip) => <span key={chip}>{chip}</span>)}</div>
        </div>
        <div className="tl-ledger"><header><span><i />Audit ledger — live</span><small>append-only</small></header>{rows.map(([time, text, status, tone]) => <div className={`tl-ledger-row ${tone}`} key={`${time}-${text}`}><span>{time}</span><p>{text}</p><b>{status}</b></div>)}</div>
      </div>
    </section>
  );
}

function Deploy() {
  const cards = [
    ["Taproot Cloud", "Multi-tenant SaaS. Fastest path to a governed agent in production."],
    ["Single-tenant", "Isolated SaaS with customer-managed keys and dedicated data planes."],
    ["BYOC", "In your own cloud account, with data-residency lock. Nothing leaves your perimeter."],
    ["On-prem · air-gapped", "Kubernetes or OpenShift, no egress. For the most regulated environments."],
  ];
  const badges = ["SOC 2 Type II", "ISO 27001", "HIPAA-ready", "ISO 42001 · NIST AI RMF aligned"];

  return (
    <section id="deploy" className="tl-section tl-section-alt">
      <div className="tl-wrap">
        <div className="tl-left-head"><SectionHead eyebrow="Customer-controlled" title="Runs where your data already lives." copy="The same control plane in every posture — same SDK, same policy language, same audit chain. You get an enterprise-grade agent platform without standing up the infrastructure yourself." /></div>
        <div className="tl-deploy-grid">{cards.map(([title, body], index) => <div className={index === 2 ? "featured" : ""} key={title}><h3>{title}</h3><p>{body}</p></div>)}</div>
        <div className="tl-badges">{badges.map((badge) => <span key={badge}>{badge}</span>)}</div>
      </div>
    </section>
  );
}

function CTA({ onBook }: { onBook: () => void }) {
  return (
    <section id="demo" className="tl-section tl-cta">
      <div className="tl-glow tl-cta-glow" />
      <div className="tl-wrap">
        <h2>Stop rebuilding. Start compounding.</h2>
        <p>Every agent. Every deployment. Every outcome — in one governed loop.</p>
        <div className="tl-actions center"><button className="tl-btn tl-btn-solid" type="button" onClick={onBook}>Request a demo</button><a className="tl-btn tl-btn-ghost" href="#docs">Read the architecture brief →</a></div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="tl-footer">
      <div className="tl-wrap tl-footer-grid">
        <div className="tl-footer-brand"><div className="tl-brand"><Logo small /><span>Taproot</span></div><p>The agent platform for companies that don't want to become AI infrastructure companies.</p></div>
        <div><h4>Platform</h4><a href="#platform">Worker · Prompt · Retrieval</a><a href="#loop">How it works</a><a href="#governance">Governance</a><a href="#deploy">Deployment</a></div>
        <div><h4>Company</h4><a href="#docs">Documentation</a><a href="#demo">Book a demo</a><a href="#top">Security &amp; compliance</a><a href="#top">Contact</a></div>
      </div>
      <div className="tl-wrap tl-footer-bottom"><span>© 2026 Taproot</span><span>SOC 2 Type II · ISO 27001 · HIPAA-ready</span></div>
    </footer>
  );
}

function FeatureCard({ icon, eyebrow, title, body }: { icon: IconName; eyebrow?: string; title: string; body: string }) {
  return <div className="tl-feature-card"><i><Icon name={icon} /></i>{eyebrow && <span>{eyebrow}</span>}<h3>{title}</h3><p>{body}</p></div>;
}

function SectionHead({ eyebrow, title, copy, centered = false }: { eyebrow: string; title: string; copy: string; centered?: boolean }) {
  return <div className={`tl-section-head ${centered ? "centered" : ""}`}><span>{eyebrow}</span><h2>{title}</h2><p>{copy}</p></div>;
}

export default function App() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <Dialog open={bookingOpen} onOpenChange={setBookingOpen}>
      <main className="tl-page">
        <Header onBook={() => setBookingOpen(true)} />
        <ScrollReveal><Hero onBook={() => setBookingOpen(true)} /></ScrollReveal>
        <ScrollReveal direction="right"><StatsStrip /></ScrollReveal>
        <Platform />
        <ScrollReveal direction="down"><Loop /></ScrollReveal>
        <ScrollReveal><Worker /></ScrollReveal>
        <ScrollReveal direction="left"><Architecture /></ScrollReveal>
        <ScrollReveal direction="right"><Governance /></ScrollReveal>
        <ScrollReveal><Deploy /></ScrollReveal>
        <ScrollReveal delay={0.2}><CTA onBook={() => setBookingOpen(true)} /></ScrollReveal>
        <Footer />
      </main>
      <DialogContent className="max-w-4xl border-border bg-background p-0 text-foreground">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle>Book a Taproot demo</DialogTitle>
          <DialogDescription>Pick a time to walk through Taproot's governed agent platform.</DialogDescription>
        </DialogHeader>
        <iframe className="h-[70vh] w-full rounded-b-lg" src={CALENDLY_URL} title="Book a Taproot demo" />
      </DialogContent>
    </Dialog>
  );
}
