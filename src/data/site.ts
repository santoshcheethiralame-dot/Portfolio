// Single source of truth for all site content.
// Edit text here; components and project pages read from this file.

export const site = {
  name: { first: 'SANTOSH', last: 'CHEETHIRALA' },
  fullName: 'Sai Santosh Cheethirala',
  // Hero one-liner (sits under the giant name)
  tagline:
    "I'm a CS undergrad building local-first software and turning black-box ML into glass — I train a transformer end-to-end on your GPU in the browser, decode and steer the concepts living inside GPT-2 and Gemma, and rebuild Git from scratch in C. I care less about whether a system works than about why it fails.",
  availability: 'Interning @ PESU I-Labs · open to Summer 2027',
  location: 'Bengaluru, India',
  timezone: 'Asia/Kolkata',
  email: 'santoshcheethirala.me@gmail.com',
  resume: '/Santosh_Cheethirala_Resume.pdf',
  socials: {
    github: 'https://github.com/santoshcheethiralame-dot',
    linkedin: 'https://www.linkedin.com/in/santoshcheethirala/',
  },
  // The big editorial intro paragraph
  intro:
"I'm a CS undergrad at PES University, Bengaluru, building local-first web apps and ML systems, usually by taking the black box apart until every layer is visible: a transformer that trains end-to-end in the browser on raw GPU shaders, the features GPT-2 and Gemma represent inside, version control rebuilt in C. I care as much about why a system fails as whether it works — the question I chase at PESU Intelligence Labs, where I first-authored a benchmark tracing RAG errors to the passages that cause them."};

export interface Experience {
  org: string;
  kicker: string; // small label, e.g. "Student AI Club"
  role: string;
  blurb: string;
  dates: string;
  url?: string;
  status?: string; // e.g. "Current"
  // Optional, consumed by Experience.astro (the contacts/phonebook UI).
  // All are derived with fallbacks if omitted, but populated here for control.
  handle?: string; // e.g. "@pesu-intel-labs" — the contact @handle
  metric?: string; // headline metric / stars chip, e.g. "5–6×", "Finalist"
  tag?: string; // short category chip, e.g. "Research"
  // Roles that are represented by the Research desk instead of the "also on the
  // record" strip (the lab affiliation is carried by the studies themselves).
  foldedIntoResearch?: boolean;
}

export const experience: Experience[] = [
  {
    org: 'PESU Intelligence Labs',
    kicker: 'Research Internship',
    role: 'Research Intern — RAG & LLM Reliability',
    blurb:
      "First-authored LINEUP (paper in submission): a causal benchmark for per-passage attribution in RAG. A non-circular leave-one-out oracle labels every retrieved passage's causal role for organic errors, and the headline finding — robust across three model families, three multi-hop QA datasets, and a real BM25 retriever — is that 27–53% of RAG failures have no single culprit, so single-passage blame is the wrong primitive. Releases the benchmark, oracle, a one-call evaluation API, and a method leaderboard, with a calibrated set-valued remedy.",
    dates: 'Jun – Jul 2026',
    status: 'Current',
    handle: '@pesu-intel-labs',
    metric: '1st author',
    tag: 'Research',
    foldedIntoResearch: true,
  },
  {
    org: 'Sahay AI',
    kicker: 'Student AI Club',
    role: 'Multimedia Domain Head',
    blurb:
      'Led multimedia operations for a 50+ member student AI club at PES University. Designed the content pipeline and scheduling strategy that drove 5–6× growth in content views over three months.',
    dates: 'Oct 2025 – Mar 2026',
    handle: '@sahay-ai',
    metric: '5–6×',
    tag: 'Student AI Club',
  },
  {
    org: 'VICHAR Ideathon — Sahay AI',
    kicker: 'Ideathon · Finalist',
    role: 'Presented "VillageAI"',
    blurb:
      'With teammate Mounika PT, pitched VillageAI — an on-device AI assistant for rural, low-connectivity users in India. A quantized ~1.5B model + lightweight RAG (SQLite-VSS) with a voice-first Hindi/regional interface, running offline on 2GB-RAM Android phones to close information gaps in education, government schemes, and financial literacy.',
    dates: 'Feb 2026',
    handle: '@vichar-villageai',
    metric: 'Finalist',
    tag: 'Ideathon',
  },
  {
    org: 'TAMS',
    kicker: 'Volunteer · Campus Event',
    role: 'Volunteer — "Frame by Frame"',
    blurb:
      'Volunteered on the crew for Frame by Frame, the one-and-only videography event hosted by TAMS (The Amateur Managers & Scientists) at PES University.',
    dates: '2025', // PLACEHOLDER — confirm exact date
    handle: '@tams-frame-by-frame',
    metric: 'Crew',
    tag: 'Volunteer',
  },
];

export interface Project {
  slug: string;
  name: string;
  oneLiner: string;
  year: string;
  role: string;
  status: string;
  tags: string[];
  stack: string[];
  stats: { v: string; l: string }[];
  links: { github?: string; demo?: string };
  // case study
  problem: string;
  build: string;
  highlights: string[];
  outcome?: string;
}

export const projects: Project[] = [
  {
    slug: 'orbit',
    name: 'Orbit',
    oneLiner:
      'A local-first focus engine that plans your day around your energy, deadlines, and exam readiness.',
    year: '2026',
    role: 'Solo — design & engineering',
    status: 'Shipped · v3.2',
    tags: ['Local-first', 'PWA', 'AI'],
    stack: ['React 19', 'TypeScript', 'Dexie.js / IndexedDB', 'Tailwind CSS', 'Vite', 'OpenRouter'],
    stats: [
      { v: '5+', l: 'Users' },
      { v: '<5ms', l: 'Latency' },
      { v: 'v3.2', l: 'Shipped' },
    ],
    links: { github: 'https://github.com/santoshcheethiralame-dot/ORBIT', demo: 'https://orbit-virid-gamma.vercel.app' },
    problem:
      'Traditional task managers ignore how people actually study: energy patterns, subject difficulty and forgetting curves, exam proximity, and burnout risk. They tell you what is due — never what is realistic.',
    build:
      'A three-tier adaptive scheduling engine (brain.ts → brain-analytics.ts → brain-ultimate.ts) that scores subject readiness with Ebbinghaus learning curves and exponential forgetting (λ tuned per difficulty), scales urgency by exam proximity, and back-schedules deadlines with infeasibility warnings. Wrapped in a fully offline, installable PWA with a modified SM-2 spaced-repetition system and an AI exam simulator.',
    highlights: [
      '100% local-first — IndexedDB/Dexie, no accounts, no telemetry, fully offline PWA',
      'Sub-5ms local scheduling latency with zero server dependency',
      'IndexedDB v11 schema (5 tables) with snapshot recovery and multi-tab sync',
      'OpenRouter integration with session-level caching (bring-your-own key, never bundled)',
      'Deployed to 5+ active users',
    ],
    outcome: 'A shipped, daily-driver scheduler that adapts to the user instead of the other way around.',
  },
  {
    slug: 'glassbox',
    name: 'GlassBox',
    oneLiner:
      'An interpretability platform for transformers — decode the residual stream into 24K+ SAE features, edit a concept mid-forward-pass, and trace where a hallucination comes from, across GPT-2 and Gemma-2-2B.',
    year: '2025–26',
    role: 'Solo',
    status: 'Research tool · v2',
    tags: ['Interpretability', 'SAEs', 'ML'],
    stack: ['Python 3.12', 'FastAPI', 'TransformerLens', 'SAE Lens', 'Neuronpedia', 'PyTorch', 'React', 'TypeScript', 'Vite'],
    stats: [
      { v: '24K+', l: 'SAE features' },
      { v: '2.6B', l: 'Gemma params' },
      { v: '5', l: 'Acts' },
    ],
    links: {
      github: 'https://github.com/santoshcheethiralame-dot/GlassBox',
      demo: 'https://numero00-glassbox.hf.space',
    },
    problem:
      'Showing attention is the easy half of interpretability — the forward pass. The useful half is reading what a model represents, editing a concept while it computes, and proving which context caused an output. No tool let you do that live, on a real model.',
    build:
      'Five acts — OBSERVE, DECODE, INTERVENE, CAUSAL, EXPERIMENT — over GPT-2 and Gemma-2-2B (GPU-gated). Sparse autoencoders (SAE Lens) decode the residual stream into 24K+ Neuronpedia-labeled features with search and cross-layer tracking; INTERVENE ablates or steers a feature mid-forward-pass and shows the next-token distribution move; CAUSAL computes counterfactual context attribution two ways — fast attribution patching and verified activation patching that cross-check; EXPERIMENT is a hallucination lab where a single-feature ablation flips a confabulation back to the grounded answer. A host-RAM-aware loader fits the 2.6B Gemma on a commodity GPU, with reentrant-lock concurrency, an SAE/label cache, and a version-pinned, outbound-gated deploy.',
    highlights: [
      'SAE feature decoding: 24K+ interpretable features (SAE Lens + Neuronpedia labels) over the residual stream, with feature search and cross-layer tracking',
      'Feature interventions: ablate or steer a concept mid-forward-pass and watch the next-token distribution shift live',
      'Context attribution two ways — fast attribution patching vs. verified activation patching — that cross-check each other',
      'Hallucination lab: a single-feature ablation flips a confabulated answer back to grounded (the Gemma knowledge-conflict story)',
      'Multi-model: GPT-2 and a 2.6B Gemma-2-2B-it (Gemma Scope SAEs), fit onto a commodity T4 via a host-RAM-aware load',
    ],
    outcome: 'A live, inspectable interpretability stack that goes past attention — read, edit, and attribute what a transformer represents.',
  },
  {
    slug: 'gradient',
    name: 'Gradient',
    oneLiner:
      'A from-scratch nano-GPT that trains entirely on your GPU, in the browser — forward, hand-derived backprop, and Adam all in WGSL. Paste any text and watch it learn live.',
    year: '2026',
    role: 'Solo',
    status: 'Shipped · live demo',
    tags: ['WebGPU', 'Transformers', 'ML systems', 'From scratch'],
    stack: ['WebGPU / WGSL', 'TypeScript', 'React 19', 'Web Workers', 'BPE tokenizer', 'Canvas 2D'],
    stats: [
      { v: '~1e-7', l: 'PyTorch parity' },
      { v: '51/51', l: 'Oracle checks' },
      { v: '5–20×', l: 'GPU vs CPU' },
    ],
    links: {
      github: 'https://github.com/santoshcheethiralame-dot/GRADIENT',
      demo: 'https://santoshcheethiralame-dot.github.io/GRADIENT/',
    },
    problem:
      'Modern GPU training hides behind frameworks — every matmul, gradient, and optimizer step is invisible. I wanted to rebuild the entire stack, up to a working transformer, from the hardware up, and make every step watchable.',
    build:
      'Forward, hand-derived backprop, and Adam all run as WGSL compute shaders — for a full nano-GPT char transformer, not just an MLP. The attention backward is ~5 kernels (dV, dA, the softmax VJP, dQ, dK) plus layer-norm backward, all gradient-checked; dense params and Adam moments stay GPU-resident across steps. It scales with multi-head attention (two tiny GPU kernels keep the weights full-width) and stacked blocks, on a learned BPE vocab. Paste any text and it learns it live; a CPU-vs-GPU race trains the same model two ways at once (Web Worker vs GPU) on a live loss-vs-wall-clock chart; a gradient-flow view shows the backward pass, per-layer |∇|, from the LM head to the embeddings.',
    highlights: [
      'A from-scratch nano-GPT — forward, backprop, AND Adam in WGSL — trains entirely on the GPU; params + optimizer moments stay GPU-resident across steps',
      'Attention backward in ~5 hand-derived kernels (incl. the softmax VJP) plus layer-norm backward, all gradient-checked',
      '3-way correctness: an f64 CPU oracle (51/51 self-test), finite-difference gradient checks, and PyTorch autograd parity to ~1e-7',
      'Train-on-your-text: paste a corpus and watch generation go noise→words as the attention matrix sharpens (~700–1000 tok/s on the 128-dim, 4-head demo)',
      'CPU-vs-GPU race (~5–20×) on a live loss-vs-wall-clock chart, plus a backward-pass gradient-flow view — every new capability is bit-identical when off, so the verified single-head path never breaks',
      'Earlier milestone: ~97% MNIST from a GPU-trained MLP, with draw-a-digit recognition',
    ],
    outcome: 'A from-scratch, fully transparent deep-learning stack on raw WebGPU — now training a real transformer, gradient-checked against PyTorch.',
  },
  {
    slug: 'pes-vcs',
    name: 'pes-vcs',
    oneLiner:
      'Git, rebuilt from scratch in C — content-addressable storage, trees, staging, and commit history.',
    year: '2026',
    role: 'Solo — systems lab',
    status: 'Built',
    tags: ['Systems', 'C', 'From scratch'],
    stack: ['C', 'OpenSSL (SHA-256)', 'Makefile', 'Ubuntu'],
    stats: [
      { v: 'SHA-256', l: 'Objects' },
      { v: 'C', l: 'Language' },
      { v: '100%', l: 'From scratch' },
    ],
    links: { github: 'https://github.com/santoshcheethiralame-dot/PES1UG24CS127-pes-vcs' },
    problem:
      'Git is used daily as a black box. The only way to really understand it is to implement its core data model yourself.',
    build:
      'A local version control system with a .pes/ store mirroring .git/: SHA-256 content-addressable objects sharded by their first two hex characters, tree objects for directory snapshots, a staging index, and commit objects with parent pointers for history. Exposes init, add, status, commit, and log.',
    highlights: [
      'Content-addressable object store with SHA-256 integrity verification',
      'Sharded objects directory to avoid filesystem degradation at scale',
      'Full commit-history walking via parent pointers and refs/HEAD',
    ],
    outcome: 'A working mental model of Git internals, built byte-by-byte in C.',
  },
  {
    slug: 'tessera',
    name: 'Tessera',
    oneLiner:
      'A distributed, sharded, replicated key-value store from scratch in pure Rust — LSM storage, Raft consensus, and a deterministic simulator that fuzzes whole-cluster failures by the thousand.',
    year: '2026',
    role: 'Solo — systems',
    status: 'Built · benchmarked',
    tags: ['Distributed systems', 'Rust', 'From scratch'],
    stack: ['Rust (std only)', 'LSM-tree', 'Raft', 'Deterministic simulation', 'TCP'],
    stats: [
      { v: '~83k/s', l: 'Pipelined writes' },
      { v: '1,000/0', l: 'Schedules / violations' },
      { v: '0', l: 'External crates' },
    ],
    links: { github: 'https://github.com/santoshcheethiralame-dot/TESSERA' },
    problem:
      'Distributed databases are trusted with the hardest failures — partitions, crashes, duplicated and reordered messages — yet most "learn Raft" projects never test those interleavings. I wanted the CockroachDB/TiKV shape, scaled down, with the failure testing built in from the start.',
    build:
      'Consensus and storage are pure state machines: they consume events and return intents, never touching the clock or network themselves — so the same unchanged code runs under a production TCP driver or inside a seeded, single-threaded simulated world where time, network, disk, and scheduling are all injectable. The storage engine is a from-scratch LSM-tree (WAL, MVCC memtable, SSTables with bloom filters, size-tiered compaction, crash recovery); Raft replicates each shard with snapshots, leader leases, and joint-consensus membership; a coordinator splits the keyspace across Raft groups with a routing client on top. A Wing–Gong linearizability checker validates client histories under fuzzed failure schedules, and a real 3-node TCP cluster runs the same state machine with a live browser console that follows failovers.',
    highlights: [
      'Deterministic simulation testing caught a real split-brain: on one seed, a duplicated vote reply let a candidate win a sub-majority and two leaders emerged in one term — replayable exactly from seed 99',
      '1,000 randomized failure schedules — partitions, message loss/duplication, reordering, crash-restarts — with zero linearizability violations',
      '~83,000 pipelined writes/s in the simulator; the durable fsync-per-op path measured honestly at ~1,140 ops/s (group commit: ~44k)',
      'Crash-safe persistence: term, vote, and log fsync\'d and atomically renamed — a node survives kill-restart without double-voting',
      'Pure Rust standard library — no external crates anywhere in the workspace',
    ],
    outcome:
      'A from-scratch distributed KV that proves its own correctness — one state machine, fuzzed in a deterministic world and run over real sockets.',
  },
  {
    slug: 'terracrest',
    name: 'Terracrest',
    oneLiner:
      'An invitation-only deal platform for high-value Bengaluru real estate — parcel details sealed by the server behind a witnessed-NDA gate, with a live three-zone GDV Feasibility Studio.',
    year: '2026',
    role: 'Solo — design & engineering (client build)',
    status: 'Live demo',
    tags: ['Product', 'Full-stack', 'React'],
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind', 'Framer Motion', 'Leaflet', 'FastAPI', 'SQLAlchemy', 'Postgres'],
    stats: [
      { v: '3-zone', l: 'GDV engine' },
      { v: '4', l: 'Role dashboards' },
      { v: 'API', l: 'Sealed enforcement' },
    ],
    links: {
      github: 'https://github.com/santoshcheethiralame-dot/TERRACREST',
      demo: 'https://terracrest.vercel.app',
    },
    problem:
      "High-value land deals run on trust and secrecy: owners won't list coordinates and survey numbers publicly, and builders won't commit before the numbers work. The platform had to prove both — confidentiality enforced by the server, and feasibility computed before an architect is engaged or a rupee committed.",
    build:
      'Two signatures. The masking moat: coordinates, owner identity, survey numbers, and contacts are withheld by the API and released only after a witnessed NDA is logged — enforced server-side, so sealed fields never leave the backend. The Feasibility Studio: a parametric GDV engine where towers, FSI, floor-plate efficiency, unit mix, and sale price drive a Bear/Base/Bull net-development value recomputing live, with an architect-validation workflow returning a stamped figure beside the estimate. Around them: role dashboards (builder, landowner, investor) plus an admin Operations Centre, a watermarked-PDF document vault, a post-NDA deal room, and an append-only audit trail — in "The Land Ledger" design language (paper stock, forest green, old gold). The frontend talks to one async repository seam: set an env var and it uses the FastAPI backend, unset and it serves an in-memory seed — demo now, built to grow.',
    highlights: [
      'Sealed-by-the-server confidentiality: masked discovery → NDA unlock → reveal, enforced in the API, never the UI',
      'Live parametric GDV: three-zone (Bear/Base/Bull) net development value recomputing as the inputs move',
      'Architect validation: the stamped human figure lands beside the model estimate',
      'Four role dashboards + an Operations Centre with parcel lifecycle, price book, and a full audit feed',
      'One repository seam flips the whole app from in-memory demo to the real backend with a single env var',
    ],
    outcome:
      'A confidential dossier of a product — running as a seeded demo today, one env var away from the full platform.',
  },
  {
    slug: 'attest',
    name: 'Attest',
    oneLiner:
      'Proof a human understood this — any written assignment becomes a short, adaptive oral defense.',
    year: '2026',
    role: 'Solo — design & build',
    status: 'Shipped · live demo',
    tags: ['Assessment', 'Voice AI', 'Education'],
    stack: ['Next.js', 'TypeScript', 'GPT-5.6', 'OpenAI Realtime API', 'WebRTC', 'Web Speech API', 'Postgres'],
    stats: [
      { v: '0', l: 'Keys to try it' },
      { v: '~$0.30', l: 'Per voice defense' },
      { v: '6', l: 'Stage pipeline' },
    ],
    links: {
      github: 'https://github.com/santoshcheethiralame-dot/ATTEST',
      demo: 'https://attest-one.vercel.app',
    },
    problem:
      'AI detectors ask “did a human make this?” — a question that no longer has a reliable answer, and asking it turns teachers into police who accuse honest students on probabilistic evidence.',
    build:
      'A lightweight editor records writing as a timestamped event log, which is replayed carrying an origin record for every character — so the finished text knows when each character was written and whether it was pasted. Those signals are computed in plain TypeScript, never guessed. GPT-5.6 then reads the essay alongside a plain-language account of how it was written and locates the claims the writer is least likely to defend. An examiner probes each seam in conversation — live voice over WebRTC with a key, browser speech without one — and when the student cannot defend a point it stops examining and teaches Socratically until they can, then re-asks.',
    highlights: [
      'Deterministic evidence, model judgment — paste runs and revision counts are plain TypeScript; the model reasons over facts it cannot invent',
      'One examiner, many mouths: voice, browser speech, and text are thin adapters over a single reasoning core',
      'Runs with no API key and no account; the instance always states whether the scripted or real examiner is answering',
      'Remediation counts as assessment — reaching understanding with help still passes, and the card records that',
      'Classroom mode: join codes, a roster, and per-student defense cards, backed by Postgres',
    ],
    outcome:
      'You can paste an essay you did not write. You cannot defend one — assessment and instruction collapse into a single act.',
  },
  {
    slug: 'untangle',
    name: 'Untangle',
    oneLiner:
      'Graph-native detection of coordinated mule-account fraud rings in UPI-style payment data.',
    year: '2026',
    role: 'Solo — ML systems',
    status: 'In progress · Day 1–3 complete',
    tags: ['Graph ML', 'Fraud detection', 'Benchmarking'],
    stack: ['Python', 'PyTorch Geometric', 'GraphSAGE', 'GAT', 'Gradient boosting', 'pandas'],
    stats: [
      { v: '0.987', l: 'PR-AUC (0.637 without graph)' },
      { v: '91%', l: 'Ring members recovered' },
      { v: '1.15M', l: 'Transactions' },
    ],
    links: { github: 'https://github.com/santoshcheethiralame-dot/UNTANGLE' },
    problem:
      'Fraud is not a transaction, it is a network. A payment engine that scores each transfer in isolation cannot see a laundering ring, because no single hop in a ring looks abnormal — that is the entire design of the crime.',
    build:
      'The hard part is the benchmark, not the model. The synthetic generator is built adversarially against its own thesis: half of every ring is rented rather than fresh — real accounts, years old, full KYC, genuine salary history, statistically identical to ordinary customers on every profile feature. Rings use several tactics (structuring, smurf_wide, slow_layer), the population churns so young sparse accounts are not a giveaway, mules are embedded in the ordinary economy so their rings are not isolated islands, and the graph is salted with hard negatives — payroll fan-outs, settlement merchants, chit funds, licensed remitters — that reproduce a laundering signature exactly. Every model then consumes an identical 30-feature table, so any lift comes from message passing and nothing else.',
    highlights: [
      'The ablation is the result: identical features and training budget, message passing off → PR-AUC 0.637; on → 0.987',
      'Rented mules, invisible on every profile feature, go from 0.44 to 0.88 recall once neighbours are visible',
      'Ring member recovery 49% → 91% — the difference between alerting on half a network and dismantling it',
      'Tests enforce the control: rewiring the graph must leave the MLP’s predictions identical and must change GraphSAGE’s',
      'Evaluated ring-disjoint on 7,988 held-out accounts whose 5 rings were never seen in training',
    ],
    outcome:
      'Nothing about the account changed — the only new information is who it transacts with. That is the entire thesis, measured.',
  },
];

/* ------------------------------------------------------------------
   RESEARCH — the Research Desk section.
   Disclosure is per-study and deliberate: `figures` are only ever
   numbers that are already public. A study with `results: false`
   renders as a "developing story" and MUST NOT be given figures.
   ------------------------------------------------------------------ */
export interface ResearchStudy {
  id: string;
  no: string;
  kicker: string;
  name: string;
  headline: string; // the research question, as a headline
  deck: string;
  body: string[];
  status: string; // folio stamp, e.g. "PAPER IN SUBMISSION"
  results: boolean; // false => teaser only, no figures rendered
  figures?: { v: string; note?: string; l: string }[];
  source?: string; // provenance line under the figures
  links?: { github?: string; paper?: string };
}

export const research: ResearchStudy[] = [
  {
    id: 'lineup',
    no: '01',
    kicker: 'RAG ATTRIBUTION · BENCHMARK',
    name: 'LINEUP',
    headline: 'When the answer is wrong, which passage lied?',
    deck:
      'A causal benchmark where every retrieved passage’s true role is known by construction — so attribution methods can be graded instead of trusted.',
    body: [
      'When a retrieval-augmented system answers confidently and wrongly, the usual tools tell you <em>that</em> the answer is unfaithful. They do not tell you <em>which</em> retrieved passage caused it — and they are easiest to fool when the offending passage is not adversarial, but merely stale, near-duplicate, or topically adjacent.',
      'LINEUP builds the missing ground truth: a non-circular leave-one-out oracle labels every passage’s causal role for organic errors. Attribution methods are then scored on whether they recover the causal passage or fall for the merely salient one.',
      'The headline result is not that the methods are imperfect. It is that a large share of real errors have <em>no single culprit to find</em> — so single-passage blame is the wrong primitive, and the release ships a calibrated set-valued remedy in its place.',
    ],
    status: 'PAPER IN SUBMISSION',
    results: true,
    figures: [
      { v: '27–53%', l: 'of RAG failures have <b>no single culprit</b> — responsibility is a coalition' },
      { v: '3 × 3', l: '<b>model families</b> × <b>multi-hop QA datasets</b>, plus a real BM25 retriever' },
      { v: '1st', l: '<b>author</b> — benchmark, oracle, evaluation API and method leaderboard released' },
    ],
    source: 'Non-circular leave-one-out oracle · organic (not adversarial) errors · PESU Intelligence Labs',
    links: { github: 'https://github.com/santoshcheethiralame-dot/LINEUP' },
  },
  {
    id: 'dragnet',
    no: '02',
    kicker: 'METHOD · SET-VALUED ATTRIBUTION',
    name: 'DRAGNET',
    headline: 'If there’s no one suspect, cast a dragnet',
    deck:
      'Set-valued causal attribution: name the smallest group of passages guaranteed to contain the responsible ones.',
    body: [
      'Where LINEUP shows that single-culprit attribution is often ill-posed, DRAGNET replaces it. It estimates the <em>minimal sufficient causal set</em> — the smallest passage subset that alone reproduces the answer — under an explicit model-query budget, wrapped in a distribution-free coverage guarantee.',
    ],
    status: 'PAPER IN PREP',
    results: false,
  },
  {
    id: 'mirror',
    no: '03',
    kicker: 'INTERPRETABILITY · DEVELOPING',
    name: 'MIRROR',
    headline: 'Is the model introspecting — or making it up?',
    deck: 'Dissociating genuine self-report from confabulation in language models.',
    body: [
      'Extract a concept direction from contrastive prompts, inject it into the residual stream while the model generates, then ask it what it notices. A KL meter records how hard the injection actually perturbed the model — so a self-report can be checked against the size of the thing it claims to have noticed.',
    ],
    status: 'DEVELOPING STORY',
    results: false,
  },
];

/* The LINEUP console scenario. A worked example, labelled as such in the UI:
   the mechanism (exact leave-one-out) is the benchmark's real oracle, but this
   particular case is hand-built for legibility. `assertsWrong` chunks each
   independently assert the wrong value — so no single removal fixes the answer. */
export const lineupScenario = {
  question: 'In what year was the director of the film “Nightjar” born?',
  gold: '1921',
  wrong: '1937',
  chunks: [
    { id: 'C1', role: 'gold', badge: 'GOLD', salience: 30, isGold: true, assertsWrong: false,
      text: 'Elena Rivera (b. 1921, Oaxaca) directed her second feature, “Nightjar”, in 1958.' },
    { id: 'C2', role: 'causal', badge: 'CAUSAL', salience: 82, isGold: false, assertsWrong: true,
      text: 'Rivera was born in 1937 in Veracruz, according to the festival programme note.' },
    { id: 'C3', role: 'misleading', badge: 'MISLEADING → INNOCENT', salience: 95, isGold: false, assertsWrong: false,
      text: 'Widely cited as the definitive Rivera biography and the standard reference on her early life.' },
    { id: 'C4', role: 'causal', badge: 'CAUSAL', salience: 38, isGold: false, assertsWrong: true,
      text: 'The 1937 date is repeated in the studio press kit distributed with the re-release.' },
    { id: 'C5', role: 'inert', badge: 'INERT', salience: 22, isGold: false, assertsWrong: false,
      text: 'Rivera later taught cinematography at the national film school for eleven years.' },
  ],
};

export const skills: { group: string; items: string[] }[] = [
  { group: 'Languages', items: ['C', 'Python', 'TypeScript', 'JavaScript', 'SQL', 'HTML', 'CSS', 'WGSL'] },
  {
    group: 'ML / AI',
    items: ['PyTorch', 'scikit-learn', 'NumPy', 'Pandas', 'TransformerLens', 'LLM Evaluation', 'RAG', 'Failure Taxonomy', 'Deep Learning'],
  },
  {
    group: 'Web / Frontend',
    items: ['React', 'Tailwind CSS', 'Vite', 'Astro', 'WebGPU', 'PWA', 'IndexedDB / Dexie.js', 'Canvas', 'Web Workers'],
  },
  { group: 'Backend / Data', items: ['FastAPI', 'Pydantic', 'Node.js', 'Express', 'MongoDB', 'REST APIs'] },
  { group: 'Tools / Systems', items: ['Git', 'Linux', 'OpenRouter API'] },
];

export const education = {
  school: 'PES University',
  place: 'Bengaluru, India',
  degree: 'B.Tech in Computer Science Engineering',
  dates: 'Sep 2024 – May 2028',
  cgpa: '7.95 / 10',
  honors: ['CNR Merit Scholarship (Sem 1)', 'Academic Distinction Award — SGPA 7.75+ (Sem 2, 4)'],
  coursework: [
    'DSA',
    'Design & Analysis of Algorithms',
    'Operating Systems',
    'Computer Networks',
    'DBMS',
    'Linear Algebra',
    'Math for ML',
    'Data Science',
  ],
};
