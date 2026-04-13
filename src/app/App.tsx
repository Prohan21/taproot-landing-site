import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  ArrowRight,
  CheckCircle2,
  GitBranch,
  Activity,
  ShieldCheck,
  Workflow,
  Moon,
  Sun,
} from "lucide-react";
import taprootLogo from "../imports/Taproot_just_logo_svg.png";
import taprootLogoWhite from "../imports/Taproot_just_logo_svg-1.png";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./components/ui/dialog";

const CALENDLY_URL =
  import.meta.env.VITE_CALENDLY_URL ?? "https://calendly.com/rohan-taproot-ai/30min";

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("taproot-landing-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldUseDark = savedTheme ? savedTheme === "dark" : prefersDark;

    setIsDark(shouldUseDark);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    window.localStorage.setItem("taproot-landing-theme", isDark ? "dark" : "light");
  }, [isDark]);

  const logoSrc = isDark ? taprootLogoWhite : taprootLogo;

  return (
    <Dialog open={bookingOpen} onOpenChange={setBookingOpen}>
      <div id="top" className="min-h-screen bg-background transition-colors duration-300">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="max-w-[1400px] mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logoSrc} alt="Taproot" className="h-8" />
            <span className="font-medium text-foreground">Taproot</span>
          </div>
          <nav className="hidden items-center gap-8 md:flex">
            <a href="#platform" className="text-muted-foreground hover:text-foreground transition-colors">Platform</a>
            <a href="#capabilities" className="text-muted-foreground hover:text-foreground transition-colors">Capabilities</a>
            <a href="#enterprise" className="text-muted-foreground hover:text-foreground transition-colors">Enterprise</a>
            <button
              type="button"
              onClick={() => setBookingOpen(true)}
              className="rounded-lg bg-primary px-5 py-2 text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Book a demo
            </button>
          </nav>
          <button
            type="button"
            onClick={() => setIsDark((value) => !value)}
            className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-foreground transition-colors hover:bg-muted"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            <span className="hidden sm:inline">{isDark ? "Light" : "Dark"} mode</span>
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
        <div className="max-w-[1400px] mx-auto px-8 py-32 grid lg:grid-cols-2 gap-16 items-center w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full mb-6 border border-primary/20">
              Closed-loop AI agent infrastructure
            </div>
            <h1 className="text-6xl font-bold leading-[1.1] mb-6 text-foreground">
              The operating system for production AI agents
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-xl">
              Taproot is a unified infrastructure platform for building, evaluating, guarding, serving, and observing AI agents. One system. One feedback loop. Complete control.
            </p>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setBookingOpen(true)}
                className="group flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Book a demo
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <a
                href="https://docs.taproot.ai"
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-border px-6 py-3 transition-colors hover:bg-muted"
              >
                View Documentation
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <SystemDiagram />
          </motion.div>
        </div>
      </section>

      {/* Problem */}
      <section className="py-32 bg-muted/30">
        <div className="max-w-[1400px] mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl"
          >
            <h2 className="text-5xl font-bold mb-6 text-foreground">
              Fragmented stacks cannot learn
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed mb-12">
              Most AI infrastructures are collections of disconnected tools. They run agents, but they cannot diagnose them. They serve responses, but they cannot improve them. They guard against failures, but they cannot learn from them.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="border-l-2 border-destructive/30 pl-6">
                <h3 className="font-medium mb-2 text-foreground">Open-loop execution</h3>
                <p className="text-muted-foreground">No feedback from runtime to development</p>
              </div>
              <div className="border-l-2 border-destructive/30 pl-6">
                <h3 className="font-medium mb-2 text-foreground">Siloed visibility</h3>
                <p className="text-muted-foreground">Observability divorced from evaluation</p>
              </div>
              <div className="border-l-2 border-destructive/30 pl-6">
                <h3 className="font-medium mb-2 text-foreground">Manual remediation</h3>
                <p className="text-muted-foreground">Root cause analysis requires archeology</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Differentiation */}
      <section className="py-32">
        <div className="max-w-[1400px] mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mb-16"
          >
            <h2 className="text-5xl font-bold mb-6 text-foreground">
              Unified infrastructure enables compound capabilities
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              When prompts, retrieval, tools, guardrails, evaluation, observability, and runtime exist in one platform, the system can reason across boundaries. It can diagnose itself. It can improve itself. It can govern itself.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: GitBranch,
                title: "Eval-gated optimization",
                description: "Prompt improvements are tested and compared before deployment"
              },
              {
                icon: Activity,
                title: "Cross-layer diagnosis",
                description: "Failure investigation spans prompt, retrieval, guardrails, and runtime"
              },
              {
                icon: ShieldCheck,
                title: "Policy shadow mode",
                description: "Test guardrail changes against real traffic without risk"
              },
              {
                icon: Workflow,
                title: "Semantic tool discovery",
                description: "Agents find and invoke capabilities through platform understanding"
              }
            ].map((capability, index) => (
              <motion.div
                key={capability.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className="p-6 bg-card border border-border rounded-lg hover:border-primary/30 transition-all"
              >
                <capability.icon className="w-6 h-6 text-primary mb-4" />
                <h3 className="font-medium mb-2 text-foreground">{capability.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{capability.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Flagship Capabilities */}
      <section id="capabilities" className="py-32 bg-primary text-primary-foreground">
        <div className="max-w-[1400px] mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="text-5xl font-bold mb-6">
              Platform-native capabilities
            </h2>
            <p className="text-xl opacity-90 leading-relaxed max-w-3xl">
              These capabilities exist because Taproot is a unified system, not a bundle of services.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="inline-block px-3 py-1 bg-primary-foreground/10 rounded-full mb-4 border border-primary-foreground/20">
                Worker-S
              </div>
              <h3 className="text-3xl font-bold mb-4">Virtual Worker</h3>
              <p className="text-lg opacity-90 mb-6 leading-relaxed">
                A platform-level orchestration layer that can discover capabilities, plan work, execute steps, use tools, query retrieval, fetch prompts, and pause for approval when governance requires it.
              </p>
              <ul className="space-y-3">
                {[
                  "Multi-step task decomposition",
                  "Dynamic tool and retrieval integration",
                  "Approval workflow integration",
                  "Cross-service orchestration"
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0" />
                    <span className="opacity-90">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="inline-block px-3 py-1 bg-primary-foreground/10 rounded-full mb-4 border border-primary-foreground/20">
                Evals-S
              </div>
              <h3 className="text-3xl font-bold mb-4">Diagnosis and Remediation</h3>
              <p className="text-lg opacity-90 mb-6 leading-relaxed">
                When an agent fails, Taproot can investigate across prompt configuration, retrieval behavior, guardrail triggers, tool execution, and runtime telemetry to identify root cause, propose fixes, and verify remediations.
              </p>
              <ul className="space-y-3">
                {[
                  "Automated failure investigation",
                  "Root cause identification across layers",
                  "Remediation proposal and testing",
                  "Closed-loop verification"
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0" />
                    <span className="opacity-90">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Platform Overview */}
      <section id="platform" className="py-32">
        <div className="max-w-[1400px] mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-bold mb-6 text-foreground">
              Full lifecycle, one platform
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Every component reinforces the others. This is not a feature list. This is a control plane.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Prompt-S",
                description: "Versioned prompt management with semantic experimentation and eval-gated promotion"
              },
              {
                title: "Retrieval-S",
                description: "Knowledge integration with vector, graph, and hybrid search orchestration"
              },
              {
                title: "Tool-S",
                description: "Unified tool registry with semantic discovery and execution governance"
              },
              {
                title: "Guard-S",
                description: "Policy enforcement with shadow mode testing and real-time override capability"
              },
              {
                title: "Evals-S",
                description: "Continuous evaluation with automated diagnosis and remediation agents"
              },
              {
                title: "Worker-S",
                description: "Platform-native orchestration for multi-step agent workflows"
              }
            ].map((component, index) => (
              <motion.div
                key={component.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="p-8 border border-border rounded-lg hover:border-primary/30 transition-all"
              >
                <h3 className="text-xl font-bold mb-3 text-foreground">{component.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{component.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise */}
      <section id="enterprise" className="py-32 bg-muted/30">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-bold mb-6 text-foreground">
                Enterprise-grade infrastructure
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                Taproot runs on any cloud, in your tenant. You control the data, the deployment, and the governance model.
              </p>
              <ul className="space-y-4">
                {[
                  "Deploy to AWS, GCP, Azure, or your private cloud",
                  "Single-tenant architecture with full data isolation",
                  "RBAC, audit logging, and policy enforcement",
                  "99.9% uptime SLA with dedicated support"
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-card border border-border rounded-lg p-12"
            >
              <div className="space-y-6">
                <div className="flex items-center gap-4 pb-6 border-b border-border">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Your infrastructure</h4>
                    <p className="text-sm text-muted-foreground">Complete control and compliance</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-3 border-b border-border/50">
                    <span className="text-muted-foreground">Deployment model</span>
                    <span className="font-medium text-foreground">Single-tenant</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-border/50">
                    <span className="text-muted-foreground">Data residency</span>
                    <span className="font-medium text-foreground">Customer-controlled</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-border/50">
                    <span className="text-muted-foreground">Cloud provider</span>
                    <span className="font-medium text-foreground">Any</span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <span className="text-muted-foreground">Support tier</span>
                    <span className="font-medium text-foreground">Enterprise</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32">
        <div className="max-w-[1400px] mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-primary text-primary-foreground rounded-2xl p-16 text-center"
          >
            <h2 className="text-5xl font-bold mb-6">
              Build production agents on unified infrastructure
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto leading-relaxed">
              Join the teams building governable, diagnosable, and improvable AI agent systems on Taproot.
            </p>
            <div className="flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => setBookingOpen(true)}
                className="group flex items-center gap-2 rounded-lg bg-primary-foreground px-8 py-4 text-primary transition-colors hover:bg-primary-foreground/90"
              >
                Book a demo
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border-2 border-primary-foreground/30 px-8 py-4 text-primary-foreground transition-colors hover:border-primary-foreground/50"
              >
                Talk to Sales
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-16">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src={logoSrc} alt="Taproot" className="h-6" />
                <span className="font-medium text-foreground">Taproot</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Closed-loop AI agent infrastructure for enterprise operations.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4 text-foreground">Platform</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#platform" className="hover:text-foreground transition-colors">Platform Overview</a></li>
                <li><a href="#capabilities" className="hover:text-foreground transition-colors">Capabilities</a></li>
                <li><a href="#enterprise" className="hover:text-foreground transition-colors">Enterprise</a></li>
                <li><button type="button" onClick={() => setBookingOpen(true)} className="text-left hover:text-foreground transition-colors">Book a Demo</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4 text-foreground">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="https://docs.taproot.ai" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">Documentation</a></li>
                <li><a href="https://docs.taproot.ai" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">API Reference</a></li>
                <li><button type="button" onClick={() => setBookingOpen(true)} className="text-left hover:text-foreground transition-colors">Request a Walkthrough</button></li>
                <li><a href="mailto:rohan@taproot-ai.com" className="hover:text-foreground transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4 text-foreground">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#top" className="hover:text-foreground transition-colors">About Taproot</a></li>
                <li><a href="#enterprise" className="hover:text-foreground transition-colors">Deployment Model</a></li>
                <li>
                  <button
                    type="button"
                    onClick={() => setBookingOpen(true)}
                    className="text-left hover:text-foreground transition-colors"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-border text-sm text-muted-foreground text-center">
            © 2026 Taproot. All rights reserved.
          </div>
        </div>
      </footer>
      </div>
      <BookingDialog />
    </Dialog>
  );
}

function BookingDialog() {
  return (
    <DialogContent className="max-w-5xl p-0 overflow-hidden">
      <DialogHeader className="px-6 pt-6">
        <DialogTitle>Book a Taproot demo</DialogTitle>
        <DialogDescription>
          Pick a time that works for you and we will walk through the Taproot platform.
        </DialogDescription>
      </DialogHeader>
      <div className="px-6 pb-6">
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <iframe
            title="Book a Taproot demo"
            src={CALENDLY_URL}
            className="h-[700px] w-full"
          />
        </div>
      </div>
    </DialogContent>
  );
}

function SystemDiagram() {
  return (
    <div className="relative w-full aspect-square max-w-xl mx-auto">
      {/* Background logo watermark */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center opacity-5"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.05, scale: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <img src={taprootLogo} alt="" className="w-64 h-64 object-contain" />
      </motion.div>

      <svg viewBox="0 0 400 400" className="w-full h-full relative z-10">
        {/* Connection lines - render first so they appear behind */}
        {[
          { angle: 0, label: "Prompt", delay: 0.5 },
          { angle: 60, label: "Retrieve", delay: 0.6 },
          { angle: 120, label: "Tool", delay: 0.7 },
          { angle: 180, label: "Guard", delay: 0.8 },
          { angle: 240, label: "Eval", delay: 0.9 },
          { angle: 300, label: "Worker", delay: 1.0 }
        ].map(({ angle, label, delay }) => {
          const radian = (angle * Math.PI) / 180;
          const centerRadius = 40;
          const nodeRadius = 28;
          const orbitRadius = 120;

          const x1 = 200 + Math.cos(radian) * centerRadius;
          const y1 = 200 + Math.sin(radian) * centerRadius;
          const x2 = 200 + Math.cos(radian) * (orbitRadius - nodeRadius);
          const y2 = 200 + Math.sin(radian) * (orbitRadius - nodeRadius);

          return (
            <motion.line
              key={`line-${label}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#243d24"
              strokeWidth="2"
              opacity="0.3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay }}
            />
          );
        })}

        {/* Feedback loop arrows */}
        {[
          { from: 0, to: 60 },
          { from: 60, to: 120 },
          { from: 120, to: 180 },
          { from: 180, to: 240 },
          { from: 240, to: 300 },
          { from: 300, to: 360 }
        ].map(({ from, to }, i) => {
          const r1 = (from * Math.PI) / 180;
          const r2 = (to * Math.PI) / 180;
          const orbitRadius = 120;
          const nodeRadius = 28;
          const clearRadius = orbitRadius + nodeRadius + 8;

          const x1 = 200 + Math.cos(r1) * clearRadius;
          const y1 = 200 + Math.sin(r1) * clearRadius;
          const x2 = 200 + Math.cos(r2) * clearRadius;
          const y2 = 200 + Math.sin(r2) * clearRadius;

          const midAngle = (from + to) / 2;
          const midRadian = (midAngle * Math.PI) / 180;
          const controlRadius = clearRadius + 20;
          const cx = 200 + Math.cos(midRadian) * controlRadius;
          const cy = 200 + Math.sin(midRadian) * controlRadius;

          return (
            <motion.path
              key={`arrow-${i}`}
              d={`M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`}
              stroke="#4d7c4d"
              strokeWidth="1.5"
              fill="none"
              opacity="0.4"
              strokeDasharray="4 4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 1.2 + i * 0.1, repeat: Infinity, repeatDelay: 2 }}
            />
          );
        })}

        {/* Central hub with logo */}
        <motion.circle
          cx="200"
          cy="200"
          r="40"
          fill="#243d24"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        />

        {/* Logo in center */}
        <motion.image
          href={taprootLogoWhite}
          x="175"
          y="175"
          width="50"
          height="50"
          opacity="1"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        />

        {/* Orbiting nodes */}
        {[
          { angle: 0, label: "Prompt", delay: 0.5 },
          { angle: 60, label: "Retrieve", delay: 0.6 },
          { angle: 120, label: "Tool", delay: 0.7 },
          { angle: 180, label: "Guard", delay: 0.8 },
          { angle: 240, label: "Eval", delay: 0.9 },
          { angle: 300, label: "Worker", delay: 1.0 }
        ].map(({ angle, label, delay }) => {
          const radian = (angle * Math.PI) / 180;
          const x = 200 + Math.cos(radian) * 120;
          const y = 200 + Math.sin(radian) * 120;

          return (
            <g key={label}>
              {/* Node */}
              <motion.circle
                cx={x}
                cy={y}
                r="28"
                fill="white"
                stroke="#243d24"
                strokeWidth="2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4, delay }}
              />
              <motion.text
                x={x}
                y={y + 4}
                textAnchor="middle"
                fill="#243d24"
                fontSize="11"
                fontWeight="500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: delay + 0.2 }}
              >
                {label}
              </motion.text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
