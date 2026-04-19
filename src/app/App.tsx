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
import { SystemDiagram } from "./components/SystemDiagram";

const CALENDLY_URL =
  import.meta.env.VITE_CALENDLY_URL ?? "https://calendly.com/rohan-taproot-ai/30min";

function SectionDivider() {
  return (
    <div
      aria-hidden
      className="mx-auto h-px w-full max-w-[1400px] bg-gradient-to-r from-transparent via-primary/60 to-transparent"
    />
  );
}

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
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md">
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent"
        />
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

      <SectionDivider />

      {/* Problem */}
      <section className="py-32">
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

      <SectionDivider />

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

      <SectionDivider />

      {/* Flagship Capabilities */}
      <section id="capabilities" className="py-32">
        <div className="max-w-[1400px] mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="text-5xl font-bold mb-6 text-foreground">
              Platform-native capabilities
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
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
              <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full mb-4 border border-primary/20">
                Worker-S
              </div>
              <h3 className="text-3xl font-bold mb-4 text-foreground">Virtual Worker</h3>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
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
                    <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0 text-primary" />
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
            >
              <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full mb-4 border border-primary/20">
                Evals-S
              </div>
              <h3 className="text-3xl font-bold mb-4 text-foreground">Diagnosis and Remediation</h3>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
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
                    <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0 text-primary" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      <SectionDivider />

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

      <SectionDivider />

      {/* Enterprise */}
      <section id="enterprise" className="py-32">
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
                  "SOC 2 Type II certified infrastructure",
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

      <SectionDivider />

      {/* Final CTA and Footer — wrapped together for bottom glow */}
      <div className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 top-0 bg-gradient-to-t from-primary/20 via-primary/5 to-transparent"
        />

        {/* Final CTA */}
        <section className="py-32 relative z-10">
          <div className="max-w-[1400px] mx-auto px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-6xl font-bold mb-6 text-foreground">
                Build production agents on unified infrastructure
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                Join the teams building governable, diagnosable, and improvable AI agent systems on Taproot.
              </p>
              <div className="flex items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => setBookingOpen(true)}
                  className="group flex items-center gap-2 rounded-lg bg-primary px-8 py-4 text-primary-foreground font-medium transition-colors hover:bg-primary/90"
                >
                  Book a demo
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <a
                  href="https://docs.taproot.ai"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-border px-8 py-4 text-foreground font-medium transition-colors hover:bg-muted"
                >
                  Read the Architecture
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-16 relative z-10">
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
            <div className="mt-12 pt-8 border-t border-border/60 text-sm text-muted-foreground text-center">
              © 2026 Taproot. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
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
