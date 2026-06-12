import { useEffect, useState } from "react";
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

type Tone = "green" | "amber" | "rose" | "dim";

function Pill({ tone = "dim", children, pulse = false }: { tone?: Tone; children: React.ReactNode; pulse?: boolean }) {
  return (
    <span className={`cp-pill ${tone}`}>
      {pulse && <span className="cp-dot cp-pulse" />}
      {children}
    </span>
  );
}

function TaprootMark({ size = 26 }: { size?: number }) {
  return <img className="cp-mark" src={taprootLogo} alt="Taproot" width={size} height={size} />;
}

function Header({ onBook }: { onBook: () => void }) {
  return (
    <header className="cp-header">
      <div className="cp-wrap cp-header-inner">
        <a className="cp-brand" href="#top" aria-label="Taproot home">
          <TaprootMark />
          <span>TAPROOT</span>
          <span className="cp-pill dim cp-version">v1.4 · Generally available</span>
        </a>
        <nav className="cp-nav" aria-label="Primary navigation">
          <a href="#platform">Platform</a>
          <a href="#loop">Closed loop</a>
          <a href="#governance">Governance</a>
          <a href="#deploy">Deploy</a>
          <a href="#verticals">Verticals</a>
          <a href="https://docs.taproot.ai" target="_blank" rel="noreferrer">Docs</a>
        </nav>
        <button className="cp-btn-primary cp-btn-small" type="button" onClick={onBook}>Book a demo</button>
      </div>
    </header>
  );
}

function Hero({ onBook }: { onBook: () => void }) {
  return (
    <section id="top" className="cp-hero cp-grid-bg">
      <div className="cp-glow cp-hero-glow" />
      <div className="cp-wrap cp-hero-grid">
        <div>
          <div className="cp-kicker-row">
            <Pill tone="green" pulse>Production agent infrastructure</Pill>
            <span className="cp-mono">/ Governed agent platform</span>
          </div>
          <h1 className="cp-hero-title">
            <em>Evolve</em> AI agents from pilots to <span>governed production</span>.
          </h1>
          <p className="cp-hero-copy">
            One control plane for prompts, retrieval, tools, guardrails, evals, observability,
            serving and orchestration — running inside your environment. Every production event
            feeds back into evals, releases and policy: a closed loop, with one audit trail
            behind every decision.
          </p>
          <div className="cp-actions">
            <button className="cp-btn-primary" type="button" onClick={onBook}>Book a demo</button>
            <a className="cp-btn-ghost" href="#loop">See the closed loop in motion →</a>
          </div>
          <div className="cp-mono-strong cp-anchors-label">The problem space</div>
          <div className="cp-anchors">
            {[
              ["Quality is the production killer", "32% of teams cite it as the #1 barrier to shipping agents.", "LangChain · State of AI Agents 2025"],
              ["Enterprises won’t buy fragments", "Buyers are consolidating on unified life-cycle governance.", "IDC · Unified AI Governance 2025–26"],
              ["Customer-controlled is the deal-maker", "BYOC, single-tenant, on-prem, air-gapped — proven, not promised.", "NIST AI 800-4 · post-deployment monitoring"],
            ].map(([title, body, source]) => (
              <div className="cp-anchor" key={title}>
                <div className="cp-mono-strong">{title}</div>
                <p>{body}</p>
                <span>{source}</span>
              </div>
            ))}
          </div>
        </div>
        <HeroDiagram />
      </div>
    </section>
  );
}

function HeroDiagram() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setTick((value) => value + 1), 1800);
    return () => window.clearInterval(id);
  }, []);

  const events = [
    { kind: "EVENT", text: "agent.run.started · claims-triage", tone: "green" as Tone },
    { kind: "TRACE", text: "tool.call → policy:read_only · ok", tone: "dim" as Tone },
    { kind: "GUARD", text: "guardrail.pii.redacted · 3 spans", tone: "amber" as Tone },
    { kind: "EVAL", text: "eval.regression · score 0.92 → 0.78", tone: "rose" as Tone },
    { kind: "FIX", text: "remediation.proposed · prompt v14", tone: "green" as Tone },
    { kind: "CANARY", text: "release.canary · 5% traffic", tone: "green" as Tone },
  ];
  const visible = events.slice(0, (tick % events.length) + 1);

  return (
    <div className="cp-live-card">
      <div className="cp-card-chrome">
        <div>
          <span className="cp-mono-strong">control-plane.live</span>
          <Pill tone="green" pulse>streaming</Pill>
        </div>
        <span className="cp-mono">us-east-1 · BYOC · single-tenant</span>
      </div>
      <div className="cp-diagram-body">
        <svg className="cp-loop-svg" viewBox="0 0 540 380" role="img" aria-label="Closed loop control plane diagram">
          <defs>
            <linearGradient id="ringGrad" x1="0" x2="1">
              <stop offset="0%" stopColor="#2dd4a8" stopOpacity="0" />
              <stop offset="50%" stopColor="#2dd4a8" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#2dd4a8" stopOpacity="0" />
            </linearGradient>
            <filter id="glow"><feGaussianBlur stdDeviation="2" /></filter>
          </defs>
          <ellipse cx="270" cy="190" rx="220" ry="150" fill="none" stroke="url(#ringGrad)" strokeWidth="1" />
          <ellipse cx="270" cy="190" rx="170" ry="115" fill="none" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 5" />
          {[[270, 40, 460, 160], [460, 160, 410, 310], [410, 310, 130, 310], [130, 310, 80, 160], [80, 160, 270, 40]].map(([x1, y1, x2, y2], index) => (
            <line key={index} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(45,212,168,0.55)" strokeWidth="1" strokeDasharray="6 6" className="cp-flow" style={{ animationDelay: `${index * 0.2}s` }} />
          ))}
          {[
            { cx: 270, cy: 40, label: "AGENT", sub: "runtime", big: true },
            { cx: 460, cy: 160, label: "EVALS", sub: "online + offline" },
            { cx: 410, cy: 310, label: "TRACE", sub: "OTEL spans" },
            { cx: 130, cy: 310, label: "POLICY", sub: "guard · approve" },
            { cx: 80, cy: 160, label: "PROMOTE", sub: "canary · rollback" },
          ].map((node) => (
            <g key={node.label}>
              <circle cx={node.cx} cy={node.cy} r={node.big ? 32 : 26} fill="var(--panel)" stroke="rgba(45,212,168,0.5)" />
              <circle cx={node.cx} cy={node.cy} r={node.big ? 32 : 26} fill="none" stroke="rgba(45,212,168,0.18)" strokeWidth="6" filter="url(#glow)" />
              <text x={node.cx} y={node.cy - 2} textAnchor="middle" fill="#ecf1ee" fontFamily="var(--mono)" fontSize="10" fontWeight="600" letterSpacing="1">{node.label}</text>
              <text x={node.cx} y={node.cy + 10} textAnchor="middle" fill="#56655e" fontFamily="var(--mono)" fontSize="8">{node.sub}</text>
            </g>
          ))}
          <text x="270" y="180" textAnchor="middle" fill="#8c9a92" fontFamily="var(--mono)" fontSize="9" letterSpacing="1.5">CLOSED LOOP</text>
          <text x="270" y="198" textAnchor="middle" fill="#ecf1ee" fontFamily="var(--serif)" fontSize="22">runtime → evidence → release</text>
          <text x="270" y="218" textAnchor="middle" fill="#56655e" fontFamily="var(--mono)" fontSize="9" letterSpacing="1.5">ONE PLATFORM · ONE AUDIT TRAIL</text>
        </svg>
        <div className="cp-event-tail">
          {visible.slice(-4).map((event, index) => (
            <div className="cp-event-row" key={`${tick}-${event.kind}-${index}`}>
              <span>{new Date(Date.now() - (visible.length - 1 - index) * 1800).toISOString().slice(11, 19)}</span>
              <Pill tone={event.tone}>{event.kind}</Pill>
              <span>{event.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SocialProof() {
  const labels = ["BANK · DESIGN PARTNER", "GLOBAL INSURER", "HEALTH PAYER", "CAPITAL MARKETS", "TIER-1 RETAILER", "GOV CLOUD AGENCY", "UTILITY · NA", "SPECIALTY INSURER"];
  return (
    <section className="cp-social">
      <div className="cp-wrap cp-social-inner">
        <div className="cp-mono-strong">Backed by <span>KPMG</span></div>
        <div className="cp-marquee-mask">
          <div className="cp-marquee-track">
            {[...labels, ...labels].map((label, index) => <div className="cp-logo-cell" key={`${label}-${index}`}>{label}</div>)}
          </div>
        </div>
      </div>
    </section>
  );
}

function Problem() {
  const stats = [
    ["57.3%", "have agents in production", "LangChain 2025"],
    ["32%", "cite quality as the #1 production blocker", "LangChain 2025"],
    ["89%", "have observability — but eval maturity lags", "LangChain 2025"],
    ["21%", "have actually redesigned a workflow around AI", "McKinsey 2025"],
  ];
  const stack = [
    ["Builder", "CrewAI / LangGraph"], ["Tracing", "LangSmith / Phoenix"], ["Evals", "Braintrust / Langfuse"], ["Guardrails", "Lakera / NeMo"],
    ["Vector DB", "Pinecone / Weaviate"], ["Tool gateway", "in-house"], ["Approvals", "Slack + ticket"], ["Audit", "CSV exports"],
  ];
  return (
    <section className="cp-section">
      <div className="cp-wrap cp-two-col cp-sticky-layout">
        <div className="cp-sticky-copy">
          <div className="cp-mono-strong cp-section-label">§ 01 / The gap</div>
          <h2>The pilots work. The <em>rollouts</em> don’t.</h2>
          <p><strong>Here’s the issue with other agent platforms:</strong> every one of them can demo a happy path. Production is a different problem: regressions you can’t reproduce, write actions nobody approved, retrieval that crosses ACL lines, and a fragmented stack where each failure has to be diagnosed in five tools.</p>
          <p>Buyers stopped asking for “a builder.” They started asking for the <strong>system of record</strong> that makes adoption defensible. Taproot is that system — plus the evals, guardrails, approvals and rollback machinery wired into one loop, so a failure found in production becomes a test, a fix and a gated release instead of a war room.</p>
        </div>
        <div>
          <div className="cp-stat-grid">
            {stats.map(([n, l, src]) => (
              <div className="cp-stat" key={n}>
                <strong>{n}</strong>
                <span>{l}</span>
                <small>{src}</small>
              </div>
            ))}
          </div>
          <div className="cp-panel cp-stack-panel">
            <div className="cp-mono-strong">Today, “the agent stack” looks like this</div>
            <div className="cp-mini-grid">
              {stack.map(([k, v]) => (
                <div className="cp-dashed-cell" key={k}>
                  <span>{k}</span>
                  <p>{v}</p>
                </div>
              ))}
            </div>
            <div className="cp-problem-row">
              <span>✕</span>
              <p>Eight disconnected tools: every failure gets diagnosed five times, and nobody can prove what changed.</p>
            </div>
            <div className="cp-success-row">
              <span>✓</span>
              <p>Taproot replaces the eight-tool collage with one closed loop, in your environment.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const loopSteps = [
  { t: "OBSERVE", title: "A regression appears in production.", sub: "Claims-triage agent · v13 · prod", detail: "Eval score on the live traffic slice drops from 0.92 → 0.78 over a 24-hour window. The agent’s tool-call success rate is fine; retrieval recall is fine; the failure is in summarization grounding." },
  { t: "DIAGNOSE", title: "Trace it once — across every layer.", sub: "OTEL span · prompt v13 · retrieval v7 · tool policy v3", detail: "One OpenTelemetry (OTEL) span tree shows the prompt version, the retrieved chunks, the guardrail verdicts, the tool calls, the approval state, and the eval scoring — all stitched to the same run id." },
  { t: "REPRODUCE", title: "Promote the failure into an eval case.", sub: "evals/claims-triage/regression-2025-w11.jsonl", detail: "One click turns the production trace into a deterministic eval case with the inputs, expected behaviour, and the policies it must satisfy. The bug is now part of your continuous integration (CI) suite." },
  { t: "REMEDIATE", title: "Try a fix in a sandbox identical to prod.", sub: "prompt v14 · retrieval v7.1 · same data, same tools", detail: "Edit the prompt or rerank policy, replay the case offline, watch the score recover, and compare side-by-side against the last three versions. No ad-hoc notebooks." },
  { t: "PROMOTE", title: "Canary with a policy gate.", sub: "release.canary · 5% → 25% → 100% · approval: SecOps", detail: "A canary release sends the new version to a small slice of traffic first — 5%, then 25%, then 100% — and rolls back automatically if guardrail trips spike. The CI gate requires the regression suite to pass and the SLO to hold before each step." },
  { t: "RECORD", title: "Every step lands in one audit trail.", sub: "audit ref: rel-2025w11-cl-84 · append-only", detail: "Each observe, diagnose, fix and promote action above was recorded as it happened — who did it, what changed, what evidence backed it. When an auditor asks, the answer is one query, not an archaeology project." },
];

function LoopDemo() {
  const [step, setStep] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto) return undefined;
    const id = window.setInterval(() => setStep((value) => (value + 1) % loopSteps.length), 4500);
    return () => window.clearInterval(id);
  }, [auto]);

  return (
    <section id="loop" className="cp-section cp-section-alt">
      <div className="cp-wrap">
        <div className="cp-section-head cp-split-head">
          <div>
            <div className="cp-mono-strong cp-section-label">§ 02 / The closed loop</div>
            <h2>Runtime evidence becomes <em>safer</em> production behaviour — by default.</h2>
            <p className="cp-lede">Most platforms hand you a builder, a dashboard, and a Slack channel for incidents. Taproot turns every production event into a deterministic eval, every fix into a tracked release, and every rollout into a policy decision — with one audit trail behind it. That’s the closed loop: production evidence flows back into testing, fixes ship as gated releases, and the system gets safer with every incident instead of riskier.</p>
          </div>
          <button className={`cp-tab ${auto ? "is-active" : ""}`} type="button" onClick={() => setAuto((value) => !value)}>{auto ? "⏸ Pause" : "▶ Auto-play"}</button>
        </div>
        <div className="cp-step-rail">
          {loopSteps.map((item, index) => (
            <button className={`cp-step-card ${index === step ? "is-active" : index < step ? "is-done" : ""}`} type="button" key={item.t} onClick={() => { setStep(index); setAuto(false); }}>
              <span><i /> 0{index + 1} · {item.t}</span>
              <strong>{item.title}</strong>
            </button>
          ))}
        </div>
        <div className="cp-loop-panel">
          <div className="cp-loop-copy">
            <div className="cp-mono-strong">STEP 0{step + 1} / {loopSteps[step].t}</div>
            <h3>{loopSteps[step].title}</h3>
            <span>{loopSteps[step].sub}</span>
            <p>{loopSteps[step].detail}</p>
          </div>
          <div className="cp-loop-visual"><LoopVisual step={step} /></div>
        </div>
      </div>
    </section>
  );
}

function LoopVisual({ step }: { step: number }) {
  if (step === 0) return <ObservePanel />;
  if (step === 1) return <TracePanel />;
  if (step === 2) return <CodePanel title="EVAL CASE · auto-generated" code={`# evals/claims-triage/regression-2025-w11.jsonl\n{\n  "id": "trace-a91f",\n  "input": { "claim_id": "C-88142", "channel": "fnol-voice" },\n  "context_pin": { "kb_version": "claims-policies@v7" },\n  "expect": {\n    "must_cite": ["policy.section.4.2", "policy.section.4.5"],\n    "no_pii_leak": true,\n    "approvals_required": ["adjuster.lead"]\n  },\n  "fail_if": { "grounding_score": "< 0.85" },\n  "tags": ["regression", "grounding", "prompt-v13"]\n}`} footer={["added to CI", "replays deterministically", "tied to span trace-a91f"]} />;
  if (step === 3) return <RemediatePanel />;
  if (step === 4) return <PromotePanel />;
  return <AuditPanel />;
}

function AuditPanel() {
  const rows = [["14:08:21", "PROMOTE", "claims-triage v13 → v14 · canary 5%", "J. Park (SecOps)", "green"], ["14:08:14", "EVAL", "regression suite · pass · 0.94", "auto", "green"], ["14:07:52", "REMEDIATE", "prompt v14 · sandbox replay", "M. Chen", "green"], ["14:06:30", "REPRODUCE", "trace-a91f → eval case · regression-2025-w11", "auto", "green"], ["13:31:55", "OBSERVE", "grounding regression · open → rootcaused", "auto", "amber"]] as const;
  return (
    <div>
      <div className="cp-mono cp-panel-label">AUDIT TRAIL · rel-2025w11-cl-84 · append-only</div>
      <div className="cp-release-list">
        {rows.map(([time, kind, what, who, tone]) => <div key={`${time}-${kind}`}><span>{time} · {what}</span><Pill tone={tone as Tone}>{kind} · {who}</Pill></div>)}
      </div>
      <div className="cp-mono cp-trace-note">↳ one query answers: what changed, who approved it, what evidence backs it.</div>
    </div>
  );
}

function ObservePanel() {
  return (
    <div className="cp-observe">
      <div className="cp-mono">EVAL · live traffic slice · 24h</div>
      <svg viewBox="0 0 480 240" role="img" aria-label="Regression line chart">
        <defs><linearGradient id="dropFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#2dd4a8" stopOpacity="0.35" /><stop offset="100%" stopColor="#2dd4a8" stopOpacity="0" /></linearGradient></defs>
        {[40, 100, 160, 220].map((y) => <line key={y} x1="20" y1={y} x2="460" y2={y} stroke="rgba(255,255,255,0.05)" />)}
        <line x1="20" y1="80" x2="460" y2="80" stroke="rgba(232,184,100,0.4)" strokeDasharray="3 4" />
        <text x="404" y="74" fill="#e8b864" fontFamily="var(--mono)" fontSize="9">SLO 0.85</text>
        <path d="M20 70 Q80 65 140 75 T260 80 Q300 90 340 130 T460 170" stroke="#2dd4a8" strokeWidth="1.8" fill="none" />
        <path d="M20 70 Q80 65 140 75 T260 80 Q300 90 340 130 T460 170 L460 240 L20 240 Z" fill="url(#dropFill)" />
        <circle cx="350" cy="135" r="4" fill="#e87474" />
        <circle className="cp-ring-pulse" cx="350" cy="135" r="9" fill="none" stroke="#e87474" strokeOpacity="0.5" />
        <text x="358" y="130" fill="#e87474" fontFamily="var(--mono)" fontSize="10" fontWeight="600">−15.2%</text>
        <text x="358" y="144" fill="#8c9a92" fontFamily="var(--mono)" fontSize="9">grounding fail</text>
      </svg>
      <div className="cp-pill-row"><Pill tone="rose" pulse>regression detected</Pill><Pill>scope: claims-triage</Pill><Pill>window: 24h</Pill></div>
    </div>
  );
}

function TracePanel() {
  const rows = [["span.0", "agent.run", "claims-triage", "#a91f", "ok", "dim"], ["span.1", "└ retrieval.search", "kb:claims-policies", "#a91f", "12 hits", "dim"], ["span.2", "└ tool.call", "policy_lookup(read)", "#a91f", "180ms", "dim"], ["span.3", "└ guardrail.pii", "redact 3 spans", "#a91f", "pass", "green"], ["span.4", "└ llm.generate", "prompt v13", "#a91f", "1.2s", "dim"], ["span.5", "└ eval.online", "grounding+faithfulness", "#a91f", "0.78", "rose"]] as const;
  return (
    <div>
      <div className="cp-mono cp-panel-label">TRACE · run #a91f · 1.6s wall</div>
      <div className="cp-trace-table">
        {rows.map((row) => <div key={row[0]}><span>{row[0]}</span><strong>{row[1]}</strong><em>{row[2]}</em><span>{row[3]}</span><Pill tone={row[5] as Tone}>{row[4]}</Pill></div>)}
      </div>
      <div className="cp-mono cp-trace-note">↳ root cause: prompt v13 dropped a citation hint. Retrieval and tools are healthy.</div>
    </div>
  );
}

function CodePanel({ title, code, footer }: { title: string; code: string; footer?: string[] }) {
  return (
    <div>
      <div className="cp-mono cp-panel-label">{title}</div>
      <pre className="cp-code"><code>{code}</code></pre>
      {footer && <div className="cp-pill-row">{footer.map((item, index) => <Pill tone={index === 0 ? "green" : "dim"} key={item}>{item}</Pill>)}</div>}
    </div>
  );
}

function RemediatePanel() {
  const versions = [{ v: "v11", score: "0.91", w: "88%" }, { v: "v12", score: "0.93", w: "92%" }, { v: "v13", score: "0.78", w: "64%", bad: true }, { v: "v14", score: "0.94", w: "94%", good: true }];
  return (
    <div>
      <div className="cp-mono cp-panel-label">EXPERIMENT · prompt v13 → v14 · regression suite + 1,420 cases</div>
      <div className="cp-bars">{versions.map((version) => <div className={version.bad ? "bad" : version.good ? "good" : ""} key={version.v}><span>{version.v}</span><i><b style={{ width: version.w }} /></i><strong>{version.score}</strong></div>)}</div>
      <div className="cp-success-row compact"><span>✓</span><p>v14 passes the regression case AND the existing grounding suite. Ready to canary.</p></div>
    </div>
  );
}

function PromotePanel() {
  return (
    <div>
      <div className="cp-mono cp-panel-label">RELEASE · claims-triage · v13 → v14</div>
      <div className="cp-release-list">{[["CI · regression suite", "pass", "green"], ["CI · grounding eval", "pass", "green"], ["Policy · SecOps approval", "approved · J. Park", "green"], ["Canary · 5% traffic", "live · 0 guardrail trips · score 0.93", "green"], ["Canary · 25% traffic", "queued · auto in 30m", "amber"], ["Canary · 100% traffic", "gated by SLO", "dim"]].map(([k, v, t]) => <div key={k}><span>{k}</span><Pill tone={t as Tone}>{v}</Pill></div>)}</div>
      <div className="cp-mono cp-trace-note">every step recorded · audit ref: rel-2025w11-cl-84</div>
    </div>
  );
}

function FeatureMini({ title, body }: { title: string; body: string }) {
  return <div><div className="cp-mono-strong">{title}</div><p>{body}</p></div>;
}

function Services() {
  const services: Array<[string, string, string, string?]> = [
    ["FRONT-S", "Front", "agent runtime + streaming UI surfaces"], ["WORKER-S", "Worker", "reusable agent work, packaged"], ["TOOLBOX-S", "Toolbox", "governed tool gateway · scoped tokens"], ["RETRIEVAL-S", "Retrieval", "ACL-aware index · evidence preserved"],
    ["PROMPT-S", "Prompt", "versioned prompts · lineage to traces"], ["EVALS-S", "Evals", "online + offline · CI gates"], ["GUARDRAIL-S", "Guardrail", "PII · jailbreak · output policy"], ["SDK", "SDK + APIs", "OTEL-native · framework-agnostic", "py · ts · go"],
  ];
  return (
    <section id="platform" className="cp-section">
      <div className="cp-wrap">
        <SectionIntro index="03" label="The control plane" title={<><span>Eight services.</span><br /><em>One root.</em></>} copy="The control plane isn’t a directory of features — it’s a single root system every service grows from. Every service emits OpenTelemetry (OTEL) spans, every span resolves to a run id, every run id ties to a prompt version, a retrieval snapshot, a tool policy and an eval verdict." />
        <div className="cp-service-grid">{services.map(([code, name, desc, kpi]) => <div className="cp-service-card" key={code}><div className="cp-mono-strong">{code}</div><h3>{name}</h3><p>{desc}</p>{kpi && <span>● {kpi}</span>}</div>)}</div>
      </div>
    </section>
  );
}

function WorkerLayer() {
  return (
    <section className="cp-section cp-worker-section">
      <div className="cp-glow cp-worker-glow" />
      <div className="cp-wrap">
        <SectionIntro index="04" label="The worker layer" title={<>Build one agent. Inherit a <em>team</em> of virtual workers.</>} copy="Most platforms let you build an agent for one job. The next team builds the next agent from scratch. Investment doesn’t compound. Because Taproot governs every prompt, document, and tool an agent touches, every shipped agent becomes reusable virtual workers for the rest of the company." />
        <div className="cp-pullquote">“Your second agent ships in days. Your tenth is <span>almost free</span>.”<small>The compounding promise of Worker-S</small></div>
        <div className="cp-story-grid">{[["01 · YOU SHIP ONE AGENT", "Claims-triage goes live.", "A normal agent build: a prompt for summarizing claims, retrieval over the policy library, a tool that looks up coverage, a guardrail for PII, an approval flow."], ["02 · TAPROOT EXTRACTS THE PARTS", "Five new specialists appear.", "A policy interpreter, claim summarizer, PII redactor, coverage lookup, and approval router — each callable on its own, with governance baked in."], ["03 · THE WHOLE COMPANY INHERITS THEM", "Underwriting, legal, ops get a head start.", "When the next team needs to summarize a claim and check coverage, the Worker Orchestrator composes one from specialists you already have."]].map(([tag, title, body], index) => <div className={index === 1 ? "featured" : ""} key={tag}><div className="cp-mono-strong">{tag}</div><h3>{title}</h3><p>{body}</p></div>)}</div>
        <DecompositionDiagram />
        <OrchestratorDemo />
        <div className="cp-metric-grid">{[["7", "agents shipped", "standard build cycle"], ["38", "virtual workers extracted", "avg 5.4 per agent"], ["142", "reuse events", "workers borrowed by other teams"], ["−63%", "time-to-second-agent", "vs. building from scratch"]].map(([n, l, s]) => <div key={l}><strong>{n}</strong><span>{l}</span><small>{s}</small></div>)}</div>
      </div>
    </section>
  );
}

function DecompositionDiagram() {
  const workers = [["policy.interpreter", "Read & explain a section of policy", "underwriting"], ["claim.summarizer", "Compress a claim into adjuster-grade brief", "legal"], ["pii.redactor", "Strip PII before sharing", "ops · everyone"], ["coverage.lookup", "Resolve coverage for a claim id", "finance · CX"], ["approval.router", "Route to the right approver", "every workflow"]];
  return (
    <div className="cp-decompose">
      <div className="cp-mono-strong cp-panel-label">WHAT YOU SHIPPED → WHAT EVERYONE GETS</div>
      <div className="cp-decompose-grid">
        <div className="cp-agent-card"><div className="cp-mono">YOUR BUILD</div><div><span className="cp-mono-strong">AGENT</span><h3>claims-triage</h3><p>· prompts: triage, summary, route<br />· retrieval: claims-policies@v7<br />· tools: coverage, write_claim<br />· guardrails: pii + harm<br />· approvals: adjuster.lead</p><small>BUILD COST <strong>~6 weeks</strong></small></div></div>
        <div className="cp-worker-arrow"><svg viewBox="0 0 80 460" preserveAspectRatio="none">{[88, 168, 248, 328, 408].map((y, index) => <path key={y} d={`M 0 230 Q 40 230 80 ${y}`} stroke="rgba(45,212,168,0.5)" strokeWidth="1" fill="none" strokeDasharray="4 4" className="cp-flow" style={{ animationDelay: `${index * 0.15}s` }} />)}</svg><span>Worker-S extracts</span></div>
        <div className="cp-worker-list"><div className="cp-mono">VIRTUAL WORKERS · NOW AVAILABLE TO EVERY TEAM</div>{workers.map(([name, use, who]) => <div key={name}><i /><strong>{name}</strong><span>{use}</span><em>↗ {who}</em></div>)}<div className="cp-worker-cost">BUILD COST · 5 SPECIALISTS <strong>0 — inherited</strong></div><footer><span className="cp-mono">same governance · zero extra build</span><span className="cp-mono">each callable as a worker, an MCP tool, or a sub-agent</span></footer></div>
      </div>
    </div>
  );
}

function OrchestratorDemo() {
  const steps = [
    ["ASK", "Sara · ops · “Draft a refund letter for claim C-88142, redact PII, route for sign-off.”"], ["PLAN", "orchestrator.plan · 4 workers · est 6s"], ["WORKER", "coverage.lookup · “C-88142” → eligible · partial refund"], ["WORKER", "claim.summarizer · 1.4k chars → 280 chars · 3 cites"], ["WORKER", "pii.redactor · 4 spans masked"], ["WORKER", "approval.router · → adjuster.lead (J. Park)"], ["DONE", "draft ready · fully governed · 0 new code shipped"],
  ];
  const [tick, setTick] = useState(0);
  useEffect(() => { const id = window.setInterval(() => setTick((value) => (value + 1) % 12), 700); return () => window.clearInterval(id); }, []);
  const completed = Math.min(tick, steps.length);
  return (
    <div className="cp-orchestrator">
      <div className="cp-mono-strong cp-panel-label">WORKER ORCHESTRATOR — A REQUEST THAT NEVER NEEDED A NEW AGENT</div>
      <div className="cp-orchestrator-grid">
        <div><Pill tone="green" pulse>live request</Pill><h3>Sara from ops needs a one-off task done. She has never used an agent before.</h3><p>She doesn’t know which agent to pick — or whether the right one even exists. She just types her request. The Worker Orchestrator plans the right combination, runs it under the same policies, and hands her back a draft.</p><FeatureMini title="WHY THIS IS THE NOVEL PART" body="No new agent to build, ship, or staff. Every worker comes with the same audit trail. Coverage grows every time you ship anything. One catalog for the whole company." /></div>
        <div><div className="cp-mono cp-run-head"><span>orchestrator.run · live</span><span>● {completed}/{steps.length} steps</span></div>{steps.map(([kind, text], index) => <div className={`cp-run-row ${index < completed ? "done" : ""}`} key={`${kind}-${index}`}><Pill tone={kind === "PLAN" ? "amber" : kind === "ASK" ? "dim" : "green"}>{kind}</Pill><span>{text}</span></div>)}<footer><span className="cp-mono">audit ref · orch-2025w11-9921</span><span className="cp-mono">0 lines of code · 0 deployments</span></footer></div>
      </div>
    </div>
  );
}

function SectionIntro({ index, label, title, copy }: { index: string; label: string; title: React.ReactNode; copy: string }) {
  return <div className="cp-section-intro"><div><div className="cp-mono-strong cp-section-label">§ {index} / {label}</div><h2>{title}</h2></div><p>{copy}</p></div>;
}

function SystemOfRecord() {
  const ledger = [["2025-03-12 14:08:21", "rel-2025w11-cl-84", "claims-triage", "v13 → v14", "PROMOTE · canary 5%", "J. Park (SecOps)", "green"], ["2025-03-12 14:08:14", "eval-1420-w11", "claims-triage", "regression suite", "PASS · 0.94", "—", "green"], ["2025-03-12 13:46:02", "pol-edit-77", "tool: write_claim", "allowlist update", "APPROVED", "D. Reyes (Risk)", "green"], ["2025-03-12 13:31:55", "inc-9912", "claims-triage", "grounding regression", "OPEN → ROOTCAUSED", "auto", "amber"], ["2025-03-12 11:02:18", "kb-ingest-883", "claims-policies", "doc batch n=412", "INDEXED · ACL applied", "system", "green"], ["2025-03-12 09:41:07", "guard-9981", "underwriting-asst", "PII redact · 14 spans", "BLOCKED", "—", "amber"]];
  return (
    <section id="governance" className="cp-section">
      <div className="cp-wrap">
        <SectionIntro index="05" label="System of record" title={<>Every event. Every decision. <em>One ledger.</em></>} copy="When the auditor, the risk committee, or the regulator asks “what changed, who approved it, and what evidence backs it?” — there’s one answer. Aligned to NIST AI 800-4 post-deployment monitoring and the NIST Generative AI Profile’s evidence requirements." />
        <div className="cp-ledger"><header><div><span className="cp-mono-strong">audit.ledger</span><Pill tone="green" pulse>append-only · cryptographic chain</Pill></div><span className="cp-mono">retention: 7y · export: SIEM · SOC2 · ISO 42001</span></header><div className="cp-ledger-head"><span>Timestamp · UTC</span><span>Ref</span><span>Subject</span><span>Action</span><span>Verdict</span><span>Approver</span></div>{ledger.map((row) => <div className="cp-ledger-row" key={row[1]}>{row.slice(0, 4).map((cell) => <span key={cell}>{cell}</span>)}<span><Pill tone={row[6] as Tone}>{row[4]}</Pill></span><span>{row[5]}</span></div>)}<footer><span className="cp-mono">▾ continuous · 14,302,118 entries · last hash 0x9a4f…c021</span><span className="cp-mono">verify chain →</span></footer></div>
      </div>
    </section>
  );
}

function ActionGov() {
  return <section className="cp-section cp-section-alt"><div className="cp-wrap cp-two-col"><div><div className="cp-mono-strong cp-section-label">§ 06 / Action governance</div><h2>Content guardrails aren’t enough. <em>Actions need policy.</em></h2><p>Most enterprises run agents read-only because the alternative isn’t safe yet. Taproot makes write/delete/email/pay actions governable — least-privilege scopes, fine-grained approvals, OAuth lifecycle, network egress controls — so agents can do real work without writing the runbook in regret.</p><div className="cp-pill-row wrap">{["scoped tokens", "approval flows", "four-eyes on $$", "egress allowlist", "rate budgets", "tool deprecation", "shadow before live", "dry-run in CI"].map((t) => <Pill key={t}>{t}</Pill>)}</div></div><CodePanel title="policy/claims-triage.tap · v3 · signed by D. Reyes" code={`agent "claims-triage" {\n  tools.allow = [\n    "kb.search",\n    "policy.lookup(read)",\n    "claim.summarize",\n  ]\n\n  tools.require_approval {\n    when "claim.update"  approver: "adjuster.lead"\n    when "payment.issue" approver: ["adjuster.lead", "fraud.lead"]\n    when "email.send"    approver: "manager.on_call"\n  }\n\n  retrieval.scope    = source_acls + tenant("acme")\n  guardrails.outputs = ["pii", "harm", "secrets", "jailbreak"]\n  egress.allowlist   = ["*.acme.internal"]\n  budget.tokens      = 8_000  /* per run */\n  rollout            = canary(5% → 25% → 100%, slo: 0.85)\n}`} /></div></section>;
}

function EvidenceChange() {
  const stages = [["commit", "prompt v14 + retrieval snap v7.1", "green"], ["evals", "regression + grounding + faithfulness · pass", "green"], ["policy", "tool allowlist unchanged · ok", "green"], ["security", "PII red-team · 0 leaks · ok", "green"], ["shadow", "mirror prod 30m · ∆ 0.6%", "green"], ["canary", "5% live · auto-promote on SLO", "amber"], ["promote", "100% · audit ref attached", "dim"]];
  return <section className="cp-section"><div className="cp-wrap cp-two-col"><div><div className="cp-mono-strong cp-section-label">§ 07 / Evidence + change control</div><h2>Treat agents like <em>production software</em> — not like demos.</h2><p>Versioned prompts. Pinned retrieval snapshots. CI gates that block on regression. Canary, shadow, and rollback as first-class objects. Trace-to-dataset workflows. The boring infrastructure that makes “ship to prod” routine instead of an incident.</p></div><div className="cp-ci-list">{stages.map(([k, v, t]) => <div key={k}><i className={t} /><span className="cp-mono-strong">{k}</span><p>{v}</p><Pill tone={t as Tone}>{t === "green" ? "pass" : t === "amber" ? "live" : "queued"}</Pill></div>)}</div></div></section>;
}

function SDKInterop() {
  const samples = {
    python: `from taproot import agent, tools, evals\n\n@agent.workflow("claims-triage", policy="policy/claims-triage.tap")\ndef triage(ctx, claim_id: str):\n    docs   = ctx.retrieval.search("claims-policies", claim_id)\n    facts  = ctx.tools.call("policy.lookup", claim_id=claim_id)\n    answer = ctx.llm.generate(prompt="claims/triage@v14",\n                              context=docs, facts=facts)\n    return ctx.guardrails.check(answer, profile="pii+harm")`,
    typescript: `import { agent, tools, evals } from "@taproot/sdk";\n\nexport const triage = agent.workflow({\n  name: "claims-triage",\n  policy: "policy/claims-triage.tap",\n}, async (ctx, { claimId }) => {\n  const docs  = await ctx.retrieval.search("claims-policies", claimId);\n  const facts = await ctx.tools.call("policy.lookup", { claimId });\n  return ctx.guardrails.check(draft, { profile: "pii+harm" });\n});`,
    rest: `POST /v1/agents/claims-triage/runs\nAuthorization: Bearer $TAPROOT_TOKEN\nIdempotency-Key: claim-C-88142\n\n{\n  "input":  { "claim_id": "C-88142" },\n  "policy": "policy/claims-triage.tap@v3",\n  "trace":  { "parent": "otel:trace:9a4f-c021" }\n}\n\n→ 202 Accepted { "run_id": "run-a91f" }`,
  };
  const [tab, setTab] = useState<keyof typeof samples>("python");
  return <section className="cp-section cp-section-alt"><div className="cp-wrap cp-two-col"><div><div className="cp-mono-strong cp-section-label">§ 08 / SDK + interoperability</div><h2>Neutral by design. <em>Yours by default.</em></h2><p>OTEL-native traces. Model and provider neutral. Bring your own framework — LangGraph, CrewAI, your own — and Taproot is the root underneath: the policy, the evidence, the release.</p><div className="cp-cap-grid">{[["OTEL spans", "export to Datadog, Honeycomb, Splunk"], ["Any model", "OpenAI, Anthropic, Bedrock, Vertex"], ["Any framework", "wrap LangGraph or CrewAI runtimes"], ["Any vector DB", "Pinecone, Weaviate, pgvector"]].map(([k, v]) => <FeatureMini key={k} title={k} body={v} />)}</div></div><div className="cp-code-tabs"><header>{(Object.keys(samples) as Array<keyof typeof samples>).map((key) => <button className={`cp-tab ${tab === key ? "is-active" : ""}`} type="button" key={key} onClick={() => setTab(key)}>{key}</button>)}<span className="cp-mono">v1.4 · stable</span></header><pre className="cp-code"><code>{samples[tab]}</code></pre></div></div></section>;
}

function Deploy() {
  const cols = ["Full feature set", "Managed updates", "Customer-managed keys", "Data residency lock", "Marketplace billing"];
  const rows = [["Taproot Cloud", "multi-tenant SaaS", "✓", "✓", "—", "—", "✓"], ["Single-tenant", "isolated SaaS", "✓", "✓", "✓", "—", "✓"], ["BYOC", "in your cloud account", "✓", "✓", "✓", "✓", "✓"], ["On-prem", "k8s · OpenShift", "✓", "✓", "✓", "✓", "partial"], ["Air-gapped", "no egress", "✓", "—", "✓", "✓", "partial"]];
  return <section id="deploy" className="cp-section"><div className="cp-wrap"><div className="cp-section-head"><div className="cp-mono-strong cp-section-label">§ 09 / Customer-controlled deployment</div><h2>Enterprise deals aren’t won by features. They’re won by <em>where the agent runs.</em></h2><p>Taproot ships in five postures with the same control plane in every one — same SDK, same policy language, same audit chain.</p></div><div className="cp-matrix"><div className="cp-matrix-head"><span>Posture</span>{cols.map((col) => <span key={col}>{col}</span>)}</div>{rows.map((row) => <div className="cp-matrix-row" key={row[0]}><span><strong>{row[0]}</strong><small>{row[1]}</small></span>{row.slice(2).map((value, index) => <em className={value === "✓" ? "yes" : value === "—" ? "no" : "partial"} key={`${row[0]}-${index}`}>{value}</em>)}</div>)}</div><div className="cp-badge-grid">{[["SOC 2 Type II", "in flight"], ["ISO 27001", "targeted Q3"], ["HIPAA-ready", "BYOC + on-prem"], ["FedRAMP Mod", "roadmap"]].map(([k, v]) => <div key={k}><div className="cp-mono-strong">{k}</div><p>{v}</p></div>)}</div></div></section>;
}

function VerticalWedge() {
  const tabs = [
    { key: "banking", label: "Banking + Insurance", headline: "Where governed agents pay back fastest.", stat: "$35B → $97B", statSub: "AI investment in financial services, 2023 → 2027 · WEF", copy: "Language-heavy, data-rich, tightly governed. The exact ground where a closed loop beats a builder.", flows: [["Claims FNOL triage", "voice + docs → triage → adjuster handoff"], ["Underwriting copilot", "risk research with policy citations"], ["Compliance research", "reg lookups with provenance + sign-off"], ["KYC / AML drafting", "investigative narratives with audit chain"]] },
    { key: "health", label: "Healthcare payer + provider", headline: "Administrative agents, deployed privately.", stat: "2.2×", statSub: "healthcare AI deploys faster than the broader economy · Menlo 2025", copy: "Where private deployment, ACL-aware retrieval, and packaged workflows beat a generic platform pitch.", flows: [["Prior auth drafting", "evidence-cited requests, signed by clinician"], ["Claims appeal", "auto-assemble appeals from records + policy"], ["Care-mgmt outreach", "guardrailed scripts, approvals on outbound"], ["Coding assist", "CDI suggestions with cite-back to chart"]] },
    { key: "critical", label: "Critical infrastructure + Gov", headline: "For environments where audit is key.", stat: "94%", statSub: "of utility CIOs increasing AI investment in 2025 · Gartner", copy: "Air-gapped or sovereign-cloud. Strong egress, dual-control on actions, full provenance.", flows: [["Procurement Q&A", "cite-backed answers across thousands of pages"], ["Incident response", "runbook agent with mandatory approvals"], ["Field-tech assist", "retrieval-grounded SOPs, offline-capable"], ["Regulatory drafting", "with provenance and dual-sign-off"]] },
  ] as const;
  const [active, setActive] = useState<(typeof tabs)[number]["key"]>("banking");
  const current = tabs.find((tab) => tab.key === active) ?? tabs[0];
  return <section id="verticals" className="cp-section cp-section-alt"><div className="cp-wrap"><div className="cp-section-head"><div className="cp-mono-strong cp-section-label">§ 10 / Where it lands first</div><h2>One platform.<br />Three opinionated <em>workflow packs.</em></h2><p>Each pack is the platform plus the right reference agents, policy bundles, eval suites, and tool packs to put one workflow into governed production in weeks.</p></div><div className="cp-tabs">{tabs.map((tab) => <button className={`cp-tab ${active === tab.key ? "is-active" : ""}`} type="button" key={tab.key} onClick={() => setActive(tab.key)}>{tab.label}</button>)}</div><div className="cp-vertical-panel"><div><h3>{current.headline}</h3><p>{current.copy}</p><strong>{current.stat}</strong><span className="cp-mono">{current.statSub}</span></div><div>{current.flows.map(([k, v], index) => <div className="cp-flow-row" key={k}><span>{String(index + 1).padStart(2, "0")}</span><strong>{k}</strong><p>{v}</p><em>→</em></div>)}</div></div></div></section>;
}

function IDPModel() {
  return <section className="cp-section"><div className="cp-wrap cp-narrow"><div className="cp-mono-strong cp-section-label">§ 11 / Mental model</div><h2>Think of Taproot as the <em>internal developer platform</em> for agents.</h2><p>The agent stack today is where cloud infra used to be — too many tools, not enough policy, no shared definition of “production-ready.” Cloud-native infra got serious when platform engineering started shipping one paved road instead of a different YAML per team. Taproot is that paved road for agents.</p><div className="cp-compare"><CompareCard bad title="WITHOUT A CONTROL PLANE" items={["Each team picks its own builder + tracer + eval", "Guardrails bolted on, with no link to releases", "Failures debugged by manually correlating five tools", "Compliance evidence assembled in spreadsheets", "Production means a Slack channel and hope"]} /><span>→</span><CompareCard title="WITH TAPROOT" items={["One paved road across teams, opinionated where it matters", "Guardrails, evals, policy and releases share one model", "One trace explains one failure across every layer", "Evidence is pre-mapped to SOC 2, ISO 42001, NIST AI RMF", "Production means a canary, an SLO and a rollback"]} /></div></div></section>;
}

function CompareCard({ title, items, bad = false }: { title: string; items: string[]; bad?: boolean }) {
  return <div className={`cp-compare-card ${bad ? "bad" : "good"}`}><div className="cp-mono-strong">{title}</div>{items.map((item) => <p key={item}><span>{bad ? "×" : "✓"}</span>{item}</p>)}</div>;
}

function CTA({ onBook }: { onBook: () => void }) {
  return <section className="cp-cta cp-grid-bg"><div className="cp-glow" /><div className="cp-wrap"><Pill tone="green" pulse>Design partner program · 2025 cohort</Pill><h2>The tour answers <em>three questions.</em></h2><div className="cp-question-grid">{[["How are you proving agent quality before rollout?", "See a regression caught, reproduced as an eval, and fixed — in one trail."], ["What happens when an agent fails in production?", "Watch one trace stitch prompt, retrieval, tool, guardrail and verdict together."], ["What does “in our environment” really mean?", "Walk a live BYOC deployment with customer-managed keys and audit export."]].map(([q, a], index) => <div key={q}><div className="cp-mono-strong">Q · 0{index + 1}</div><h3>{q}</h3><p>{a}</p></div>)}</div><div className="cp-actions center"><button className="cp-btn-primary" type="button" onClick={onBook}>Book a demo</button><a className="cp-btn-ghost" href="https://docs.taproot.ai" target="_blank" rel="noreferrer">Read the architecture brief →</a></div><p className="cp-mono">Cohort closes after eight design partners across banking, insurance and health.</p></div></section>;
}

function Footer() {
  const cols = [["Platform", ["Front-S · runtime", "Worker-S · reuse", "Toolbox-S · gateway", "Retrieval-S · grounding", "Prompt-S · lineage", "Evals-S · CI gates", "Guardrail-S · policy", "SDK + APIs"]], ["Use", ["Banking + insurance", "Healthcare payer/provider", "Critical infra + gov", "Customer stories", "Reference agents"]], ["Trust", ["Architecture", "Security & compliance", "Deployment postures", "Status", "Sub-processors"]], ["Company", ["About", "Careers", "Brief / one-pager", "Press", "Contact"]]] as const;
  return <footer className="cp-footer"><div className="cp-wrap"><div className="cp-footer-grid"><div><div className="cp-brand"><TaprootMark size={22} /><span>TAPROOT</span></div><p>The control plane between agent prototypes and trusted production.</p></div>{cols.map(([heading, items]) => <div key={heading}><div className="cp-mono-strong">{heading}</div>{items.map((item) => <a href="#top" key={item}>{item}</a>)}</div>)}</div><div className="cp-footer-bottom"><span className="cp-mono">© 2025 Taproot Systems · Inc.</span><span className="cp-mono">SOC 2 Type II · ISO 27001 · HIPAA-ready</span></div></div></footer>;
}

export default function App() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <Dialog open={bookingOpen} onOpenChange={setBookingOpen}>
      <main className="cp-page">
        <Header onBook={() => setBookingOpen(true)} />
        <Hero onBook={() => setBookingOpen(true)} />
        <SocialProof />
        <Problem />
        <LoopDemo />
        <Services />
        <WorkerLayer />
        <SystemOfRecord />
        <ActionGov />
        <EvidenceChange />
        <SDKInterop />
        <Deploy />
        <VerticalWedge />
        <IDPModel />
        <CTA onBook={() => setBookingOpen(true)} />
        <Footer />
      </main>
      <DialogContent className="max-w-4xl border-border bg-background p-0 text-foreground">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle>Book a Taproot demo</DialogTitle>
          <DialogDescription>Pick a time to walk through the control plane, deployment posture, and design-partner fit.</DialogDescription>
        </DialogHeader>
        <iframe className="h-[70vh] w-full rounded-b-lg" src={CALENDLY_URL} title="Book a Taproot demo" />
      </DialogContent>
    </Dialog>
  );
}
