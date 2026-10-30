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
  resume: '/resume',
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
      "Research intern on RAG reliability. Led a study that queried every subset of the retrieved passages for 603 natural multi-hop errors across three model families and three datasets. For 49% of the errors, no single passage reproduces the mistake, and removing the passages that do repairs the answer no more often than removing a random one. Paper under review at TMLR; the protocol and every subset generation are released.",
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
    slug: 'injunct',
    name: 'Injunct',
    oneLiner:
      'Turns the rules in your AGENTS.md into checks that stop a coding agent’s edit before it lands, after proving each one against your own git history.',
    year: '2026',
    role: 'Hackathon build',
    status: 'Built · hackday',
    tags: ['Coding agents', 'Developer tools', 'Open weights'],
    stack: ['Python 3.12 (standard library only)', 'SQLite', 'Gemma 4 (open weights)', 'Claude Code hooks', 'opencode', 'GitHub Actions'],
    stats: [
      { v: '53→70%', l: 'First-try pass rate, 300 runs' },
      { v: '0%', l: 'False positives on control tasks' },
      { v: '446', l: 'Tests, no network or key' },
    ],
    links: {},
    problem:
      'Every repository now tells its coding agents what to do, in prose. An agent mostly follows it and skips it under pressure, and nobody can say which instructions are actually enforced and which are wishes. Teams find out when the migration is missing again.',
    build:
      'Injunct reads AGENTS.md, CLAUDE.md and CONTRIBUTING.md and has a model fill in one of twelve typed checks for each instruction a machine can verify. Every check is then replayed against the repository’s own commits: it must catch the case that created it and stay silent on work that shipped, or it only advises. Proven rules refuse the edit before it is written, in Claude Code, opencode, a git hook, a GitHub Action or any CI, and every refusal names the next step. A model never decides what blocks, and nothing a model writes is executed.',
    highlights: [
      'A rule has to earn the right to block: replayed against past commits first, and retired in public when work keeps succeeding over it',
      'Twelve typed checks: the model only fills in the blanks, it never writes a checker',
      'coverage shows how much of an AGENTS.md is guarded; on astral-sh/uv, suggested rewrites take it from 3% to 13%, each proven on 69 commits',
      '300-run ablation: first-try pass 53.3% → 70.0%, repeat mistakes 58.1% → 31.0%, 0% false positives on control tasks',
      'Standard library and one SQLite file; Gemma 4 on the free Gemini API, or any OpenAI-compatible endpoint',
    ],
    outcome: 'Agent instructions you can measure: which ones are enforced, which could be, and which need a human.',
  },
  {
    slug: 'featherrouge',
    name: 'featherrouge',
    oneLiner:
      'A bit-identical, pure-Python speedup for Google’s rouge-score: the same scores to the last digit, up to 870× faster on long texts.',
    year: '2026',
    role: 'Two-person team, with Mounika P T',
    status: 'Top 10 · Confluence buildathon (IEEE CS)',
    tags: ['NLP evaluation', 'Performance', 'Exactness'],
    stack: ['Python', 'Bit-parallel LCS', 'rouge-score 0.1.2', 'nltk', 'NumPy', 'Hypothesis'],
    stats: [
      { v: '870×', l: 'Faster LCS at 4,096 tokens' },
      { v: '5.5×', l: 'Faster end to end, CNN/DailyMail' },
      { v: '0', l: 'Mismatches in 3,000,000 fuzz cases' },
    ],
    links: {},
    problem:
      'rouge-score is how most people score summaries: 9,063,958 downloads in 30 days, no release since July 2022. Its ROUGE-L fills a table with one Python step per pair of words, so two 4,096-word texts cost 16,777,216 cells.',
    build:
      'featherrouge packs each row of the LCS table into one Python integer and updates it with two bitwise lines (Allison and Dix, Hyyrö), so Python’s big-integer arithmetic does the scan in C. It keeps every row, so ROUGE-Lsum can run upstream’s own backtrace with upstream’s own tie rule. Each word is tokenized once and stemmed once. One call, install(), patches rouge_score in place, and Hugging Face evaluate gets faster with it.',
    highlights: [
      'Every precision, recall and F value compares equal with ==; a SHA-256 over all 11,490 CNN/DailyMail scores matches',
      '3,000,000 index-list fuzz cases and 60,000 text-level cases with 0 mismatches, and the fuzzers fail when a bug is planted',
      'Hugging Face’s default path runs 5.5× faster end to end, 8.5× with the stemmer',
      'Pure Python: no compiled code, no new dependencies, and a hash guard leaves unfamiliar library versions untouched',
    ],
    outcome: 'A drop-in speedup with its proof attached: nothing about the scores changes.',
  },
  {
    slug: 'smudge',
    name: 'Smudge',
    oneLiner:
      'A detective game for 14–16 year olds: question three AI suspects, measure in the lab, and strike through the one sworn lie to write a stolen science law back.',
    year: '2026',
    role: 'Team Strikethrough (3) · server, agents and case kits',
    status: 'In progress · agentathon, education track',
    tags: ['AI agents', 'Education', 'Game'],
    stack: ['Python / FastAPI', 'Phaser 3', 'TypeScript', 'Tone.js', 'Groq + Gemini (free tiers)'],
    stats: [
      { v: '9', l: 'Cases, one law each' },
      { v: '30', l: 'Synthesised voices' },
      { v: '229', l: 'Server tests, no keys' },
    ],
    links: {},
    problem:
      'Physics homework asks for a number nobody needs. In Smudge the number is the evidence: the only way to catch the liar is to take the measurement and do the maths.',
    build:
      'A truth engine in code decides every fact of a case. Each suspect is its own agent that sees only its slice of the truth, behind a firewall, also code, that blocks confessions, the case’s numbers and suspects pointing at each other. A release gate has a detective agent play every case without the lab and with it: without, it must score near chance; with, it must name the culprit. The model router falls back across Groq models, Gemini, a disk cache and scripted lines, so the game never stalls. Every sound is synthesised in Tone.js. Budget: ₹0.',
    highlights: [
      'Nine cases from ρ = m/V to P = mgh/t, each a district with its own law, suspects and lab',
      'Code decides the truth and filters every reply; the models only voice the suspects',
      'Release gate: without the lab the detective scores 0.33–0.67, with it 0.78–1.0, and failing seeds stay out of the pool',
      'Thirty voices, a score and ambience per district, all synthesised in Tone.js with no audio files',
    ],
    outcome: 'A game where the maths is the only way to win the argument.',
  },
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
  {
    slug: 'showme',
    name: 'ShowMe',
    oneLiner:
      'Ask any question and GPT-5.6 draws you a custom animation, live — real running code, built for your exact confusion.',
    year: '2026',
    role: 'Solo — design & build',
    status: 'Shipped · live demo',
    tags: ['Generative UI', 'Education', 'LLM'],
    stack: ['Next.js 16', 'TypeScript', 'React', 'Tailwind CSS', 'GPT-5.6 (Responses API, streaming)', 'HTML5 Canvas', 'Vercel'],
    stats: [
      { v: '0', l: 'Keys or accounts to try it' },
      { v: '1', l: 'Self-contained HTML doc, no libraries' },
      { v: 'GPT-5.6', l: 'Responses API · streamed token-by-token' },
    ],
    links: {
      github: 'https://github.com/santoshcheethiralame-dot/ShowMe',
      demo: 'https://showme-sandy.vercel.app',
    },
    problem:
      'Everyone learning about a pendulum gets the same static textbook diagram — but nobody has the same confusion. One person doesn’t get why it speeds up, another doesn’t get why it comes back at all. A fixed picture can’t answer your question, and the 3Blue1Brown-style custom animation that could takes weeks to make.',
    build:
      'A single carefully engineered instruction to GPT-5.6 returns one self-contained HTML document — inline canvas plus vanilla JS, no libraries, no external requests — that animates the real mechanism rather than decoration. It streams token by token over the Responses API, so a 20-second generation feels alive instead of frozen and you watch the code being written. A stream cut off before its closing tag is rejected rather than rendered as a blank frame; the output runs in an allow-scripts-only iframe with an injected error watchdog, so model-written code can never touch the app and a failure surfaces a one-click Redraw. While it draws, the app asks what you think — committing to a guess first (the pretesting effect) improves retention, so the loading time itself teaches.',
    highlights: [
      'It builds, it doesn’t describe — the model writes a working canvas program, so a wrong mechanism visibly looks wrong',
      'Streamed token-by-token over the Responses API; a truncated stream is rejected, never rendered as a blank frame',
      'Model output runs sandboxed in an allow-scripts-only iframe with an error watchdog — it can never reach the app',
      'Steerable like a tutor — Simpler / Go deeper / Give an example redraws at your level, and misconceptions are corrected on screen',
      'Accessible by design: an extractable plain-text explanation for screen readers, and a static labelled frame under prefers-reduced-motion',
    ],
    outcome:
      'Textbooks give everyone the same picture; ShowMe draws you yours — a custom explainer in seconds instead of weeks.',
  },
  {
    slug: 'corridor',
    name: 'Corridor',
    oneLiner:
      'An ambulance green-corridor that talks to each vehicle directly — early, directional, and different for every car — instead of one broadcast siren everyone reacts to at once.',
    year: '2026',
    role: 'Solo — hackathon',
    status: 'Built · measured',
    tags: ['Coordination', 'Realtime', 'Simulation'],
    stack: ['Node.js (zero deps)', 'Web Audio (acoustic modem)', 'DeviceMotion / Orientation', 'Canvas'],
    stats: [
      { v: '−34.1%', l: 'Ambulance transit (5.8 km, 11 junctions)' },
      { v: '100', l: 'Seeded runs per arm' },
      { v: '0', l: 'Dependencies — npm install fetches nothing' },
    ],
    links: { github: 'https://github.com/santoshcheethiralame-dot/CORRIDOR' },
    problem:
      'A siren is a broadcast with no addressing. Everyone in earshot gets the identical signal at the identical instant and each decides independently what to do, so they all move into the same gaps at once and traffic clumps around the ambulance instead of parting. Yielding is a coordination failure, not a compliance failure.',
    build:
      'A corridor is the opposite object — early, directional, and different for every vehicle: “12 holds, 13 eases left, 14 takes the bus bay, 15 does nothing.” An assignment engine decides each vehicle’s move and three independent rings deliver it: a network ring, a phone-to-phone mesh, and — when both fail — an acoustic modem that rides the siren’s own sound, each ring surviving the one above it failing. Zero dependencies: npm install fetches nothing because there is nothing to fetch.',
    highlights: [
      'Measured −34.1% ambulance transit (20:22 → 13:25) over a real 5.8 km route with 11 junctions, 100 seeded runs per arm',
      'The only variable between arms is what information reaches a driver — identical traffic, drivers and lights',
      'Three-ring fallback: network → phone mesh → an acoustic modem that transmits assignments over the siren itself',
      '334 assertions, including the ones only found on real hardware',
    ],
    outcome:
      'A green corridor that opens ahead of the ambulance instead of clumping around it — the coordination argument, the engine, and the measurement in one repository.',
  },
  {
    slug: 'batch',
    name: 'Batch',
    oneLiner:
      'Scan a barcode and see what is actually in a product, what the label is arranged to hide, and what the evidence says — with every claim carrying its source.',
    year: '2026',
    role: 'Solo — design & build',
    status: 'Shipped · live demo',
    tags: ['Consumer', 'Transparency', 'Data'],
    stack: ['Next.js', 'TypeScript', 'Open Food Facts', 'Europe PMC / FDA / CPSC', 'Gemini (photo fallback)', 'BarcodeDetector / WASM'],
    stats: [
      { v: '0–100', l: 'Score, every component openable' },
      { v: '122', l: 'Tests — no network or key needed' },
      { v: '0', l: 'Data sent anywhere — profile and shelf stay on device' },
    ],
    links: { github: 'https://github.com/santoshcheethiralame-dot/BATCH', demo: 'https://batchscan.vercel.app' },
    problem:
      'A packaged-food score you cannot interrogate is a score you should not trust — and front-of-pack claims like “low fat” or “high in protein” are legally defined numeric terms that products routinely fail while printing anyway. Indian packs bury additives as bare INS numbers inside function names that databases miss.',
    build:
      'Batch builds a 0–100 score from three individually openable sub-scores — nutrition (official Nutri-Score or a labelled approximation), NOVA processing, and every declared additive scored on its regulatory position rather than folklore — and shows the source for every claim, always. It recovers INS numbers from Indian ingredient text, adds sugar back together when it is split across names, checks front-of-pack claims against EU Regulation 1924/2006, and where no database has the barcode, transcribes the pack from a photo with Gemini, inventing nothing. Uncertainty is stated, not hidden; a gap is never a pass.',
    highlights: [
      'Never shows a composite score without its components, and carries a source for every claim',
      'Calibrated over alarming — MSG is scored low because the trials failed to reproduce the scare; an app that is wrong and loud is dead',
      'Catches real regulated-claim failures: a “low fat” biscuit at 17 g fat/100 g against a 3 g legal limit',
      'Allergens shown first and never merged — “contains” and “may contain” stay separate facts; nothing is inferred',
      'Profile and scan history live in the browser only — no accounts, nothing sent anywhere',
    ],
    outcome:
      'The truth about everything you buy — a score you can open all the way down, with the receipts attached.',
  },
  {
    slug: 'highwater',
    name: 'highwater',
    oneLiner:
      'A Jepsen-style durability experiment on Couchbase — the first to show that a “majority”-acknowledged write can be acknowledged and then lost.',
    year: '2026',
    role: 'Solo — systems',
    status: 'Built',
    tags: ['Distributed systems', 'Jepsen', 'Correctness'],
    stack: ['Go', 'gocbcore (patched)', 'DCP tap', 'Porcupine (linearizability)'],
    stats: [
      { v: '56', l: 'Acknowledged writes lost at “majority”' },
      { v: '0', l: 'Lost at persistToMajority' },
      { v: 'NOT', l: 'Linearizable — no valid total order exists' },
    ],
    links: { github: 'https://github.com/santoshcheethiralame-dot/HighWater' },
    problem:
      '`majority` durability promises a majority of nodes hold your write in memory — it says nothing about disk. Kill that majority before the flush completes and the write is gone; the documentation says so plainly, but nobody had shown it. Couchbase is one of the very few major distributed databases with no published Jepsen analysis.',
    build:
      'Rather than treat the database as a black box, highwater taps the DCP stream so it can watch a durable write arrive as a prepare followed by a commit or an abort — distinguishing “never prepared” from “prepared then aborted,” which a client cannot. It drives the cluster into the ambiguous window, kills the majority before the disk flush, and checks the result two independent ways: a direct value comparison and Porcupine, a general linearizability checker that knows nothing about durability levels. Both arms agree.',
    highlights: [
      'Caught 56 acknowledged writes lost at durability level “majority” (50 regressed, 6 absent), and 0 at persistToMajority',
      'History proven NOT LINEARIZABLE by Porcupine, independently of the direct value comparison',
      'Taps DCP prepare/commit/abort to separate “never prepared” from “prepared then aborted” — the half black-box chaos testing misses',
      'Ships the gocbcore patch that made observing the ambiguous window possible',
    ],
    outcome:
      'The missing Jepsen result for Couchbase: majority durability is a memory guarantee, and highwater is the experiment that makes the loss visible.',
  },
  {
    slug: 'lift',
    name: 'LIFT',
    oneLiner:
      'A revenue-recovery agent that reports what it caused — measured against a control arm left completely alone, with the cost of getting it charged against the same ledger.',
    year: '2026',
    role: 'Solo — hackathon',
    status: 'Built · Razorpay Buildathon',
    tags: ['Causal measurement', 'Fintech', 'Agents'],
    stack: ['TypeScript', 'Node.js (zero runtime deps)', 'Counterfactual estimator'],
    stats: [
      { v: '+24.4pp', l: 'Mean causal lift (oracle +24.9pp)' },
      { v: '30', l: 'Independent batches · 300 records each' },
      { v: '127', l: 'Tests · ~15s, no network or key' },
    ],
    links: { github: 'https://github.com/santoshcheethiralame-dot/LIFT' },
    problem:
      'Every dunning tool reports how much it recovered; none subtract the money that was arriving anyway. Businesses with no automation already recover 20–31%, and Stripe Smart Retries audits at 25–35% — so a large share of every recovery figure in this market is money that was coming regardless, and nobody subtracts it.',
    build:
      'LIFT holds out a control arm that is left completely untouched and measures recovery against it, then charges the cost of acting and the billing that walked away to the same ledger — so the reported number is net caused revenue, not gross invoiced. A near-unbiased counterfactual estimator reports +24.4pp where the oracle truth is +24.9pp; the distribution over 30 batches is the claim, and a single seed is the thing you can watch run. Zero runtime dependencies.',
    highlights: [
      'Reports causal lift, not gross recovery: +24.4pp mean across 30 batches, oracle +24.9pp — nearly unbiased',
      'Charges cost of acting and billing that walked to the same ledger, so the headline is net, not invoiced',
      'Honest about variance — the demo seed runs nearly a full SD above the mean, and the README says so',
      '127 tests in ~15s with no network, no API key, and zero runtime dependencies',
    ],
    outcome:
      'A recovery agent you can trust the number from — because it subtracts the money that was arriving anyway, which is the whole project.',
  },
];

/* ------------------------------------------------------------------
   RESEARCH — the Research Desk section.
   Every number below is copied from the paper or repo it belongs to;
   nothing is rounded up. Three papers are under double-blind review, so
   nothing here links to a PDF. Set `results: false` on a study to pull
   its figures and widget and leave only the headline and deck.
   ------------------------------------------------------------------ */
export interface ResearchStudy {
  id: string;
  no: string;
  kicker: string;
  name: string; // short stamp, e.g. "NO SINGLE CULPRIT"
  headline: string; // the research question, as a headline
  title: string; // the paper's actual title
  deck: string;
  body: string[];
  byline: string;
  status: string; // folio stamp, e.g. "UNDER REVIEW · TMLR"
  results: boolean; // false => teaser only, no figures or widget rendered
  figures?: { v: string; note?: string; l: string }[];
  source?: string; // provenance line under the figures
  links?: { github?: string; paper?: string };
}

export const research: ResearchStudy[] = [
  {
    id: 'culprit',
    no: '01',
    kicker: 'RAG ATTRIBUTION · EXHAUSTIVE ENUMERATION',
    name: 'NO SINGLE CULPRIT',
    headline: 'When the answer is wrong, which passage lied?',
    title: 'No Single Culprit: Plural, Non-Monotone Sufficiency in Multi-Hop RAG Errors',
    deck:
      'For half of the errors, no single passage did it alone. Attribution tools that name one culprit do one job well, and fail at the one people want them for: fixing the answer.',
    body: [
      'Debugging a RAG system usually starts from a wrong answer and asks which retrieved passage caused it. Attribution methods answer with a ranking, and the top passage gets the blame. That assumes two things: one passage is enough to reproduce the error, and adding more context never undoes it. Nobody had checked either assumption error by error.',
      'So I checked by brute force. Six passages give 63 proper subsets, few enough to query them all. Qwen2.5-7B, Phi-3.5-mini and Mistral-7B made 603 natural errors on HotpotQA, 2WikiMultiHopQA and MuSiQue. For each error, the model answered from every subset, and I recorded every <em>minimal sufficient set</em>: a smallest group of passages that makes the model repeat its mistake.',
      'For 49% of errors, no single passage is sufficient. 59% have more than one minimal set, and for 27%, two of those sets share no passage. Support is also <em>non-monotone</em>: for 63% of errors, adding one passage to a sufficient set changes the answer. Decoding noise would have to be at least 15 times what I measured to explain that. On these errors, 28% of leave-one-out’s causal labels fall outside every minimal set.',
      'Attribution is asked to do three jobs, and the results pull them apart. Naming one sufficient explanation mostly works. Recovering all the responsible evidence hits a hard limit: when an error has several minimal sets with no passage in common, one passage can belong to only one of them. Repair is the job that fails. Removing the smallest sufficient set restores the gold answer for 19% of errors, about the same as removing a random passage (17%).',
      'Every rate comes with its conditions stated: the passage order the model saw, a strict answer matcher reported beside a looser one, and error labels from each model’s own judge, checked by hand. A second enumeration on another machine returns the identical family for 81% of errors. The protocol and every subset generation are released.',
    ],
    byline: 'Santosh Cheethirala · PESU Intelligence Labs',
    status: 'UNDER REVIEW · TMLR',
    results: true,
    figures: [
      { v: '49%', note: 'CI 45–53', l: 'of errors have <b>no sufficient single passage</b>' },
      { v: '59%', l: 'have <b>more than one</b> minimal sufficient set. For 27%, two of them share no passage' },
      { v: '63%', l: 'are <b>non-monotone</b>: adding one passage to a sufficient set changes the answer' },
      { v: '19 vs 17%', l: 'repaired by removing the smallest sufficient set, against removing a <b>random passage</b>' },
    ],
    source: '603 natural errors · 3 models × 3 datasets · 63 subsets per error · 26,724 one-step additions tested',
  },
  {
    id: 'precise',
    no: '02',
    kicker: 'INTERPRETABILITY · METROLOGY',
    name: 'PRECISE ≠ TRUE',
    headline: 'Every check passed. The direction was wrong.',
    title: 'Precise but Not True: Per-Coordinate Standardisation Collapses Fitted Directions at Near-Zero Norm Gains',
    deck:
      'Interpretability trusts a probe when it predicts well and when reruns agree. In metrology that is precision. Trueness needs a reference value, and an MLP neuron’s input weights are one.',
    body: [
      'A probe fitted to a model’s activations returns a direction. That direction then gets compared with weights, used to steer the model, or reported as what the model represents. The right answer is rarely available, so people trust the direction on checks it can run by itself: held-out accuracy, and agreement across restarts and folds. MLP neurons are the exception. A neuron reads one direction of its layer norm’s output, that direction is written in its weights, and any method can be scored against it.',
      'Scoring the standard probe this way turned up a failure the usual checks miss. Where a norm gain is near zero, one coordinate barely varies. Standardising each coordinate before fitting is recommended practice and a library default. It divides a tiny weight on that coordinate by the coordinate’s tiny spread, so the returned direction lands almost entirely on a coordinate the model barely reads. In Llama-3.2-1B layer 3, a capitalisation probe puts 0.11% of its squared norm on two such coordinates; after the division they hold 99.99%. Test accuracy is 0.9985 and fold agreement is 0.997.',
      'The collapse appears in the standard scikit-learn probe across six model families up to 8B, and in two unrelated direction estimators. Added to the model, a collapsed direction moves it less than a random direction does. The exposed layers can be read from the gains alone: 28 of 36 public models have at least one. Dropping the near-constant coordinates before fitting removes the collapse.',
    ],
    byline: 'Santosh Cheethirala',
    status: 'UNDER REVIEW · TMLR',
    results: true,
    figures: [
      { v: '99.99%', l: 'of the probe’s direction on <b>two coordinates</b> the model barely reads, at accuracy 0.9985' },
      { v: '6', l: '<b>model families</b> up to 8B where the standard probe collapses' },
      { v: '28 / 36', l: 'public models with a layer that <b>the gains alone flag</b>' },
      { v: '25–81×', l: 'less next-token effect than a <b>random direction</b>, at 7–8B' },
    ],
    source: 'Every main-text result pre-registered before its data',
  },
  {
    id: 'instrument',
    no: '03',
    kicker: 'INTROSPECTION · CONSTRUCT VALIDITY',
    name: 'AUDITING THE INSTRUMENT',
    headline: 'Is the model introspecting, or just perturbed?',
    title: 'Auditing the Instrument: What Concept-Injection Experiments Measure About LLM Introspection',
    deck:
      'Inject a concept into a model’s activations, ask whether it notices, and read YES as introspection. Before deciding what that shows, test the instrument.',
    body: [
      'Concept-injection experiments add a concept vector to a model’s residual stream and ask whether it notices an injected thought. Each result rests on three assumptions about the instrument: the vector is <em>live</em>, the <em>dose</em> means the same thing across models and prompts, and the <em>readout</em> reports the injection rather than something else. I tested all three on nine open models from four families, using controls with known answers and pre-registering every arm.',
      'Each assumption fails somewhere. The health checks in use can’t tell live vectors from dead ones (pooled AUCs 0.52 to 0.55). The same fraction of the residual norm moves the next token 25 to 480 times more in one model than in another. At the published strength, Gemma-3-27B puts less than 10⁻⁴ of its first-token probability on YES or NO, so the YES/NO readout is taken after the model has mostly stopped answering YES or NO.',
      'Where a readout does work, it registers the perturbation, not the content. On Llama-3.1-8B the model localizes an injected sentence 96.7% of the time, but random vectors of the same norm reach 92.3%, and it can’t say which of ten concepts was injected (12.5%, against 9.2% for random vectors). The same controls apply to safety steering: unrelated vectors matched in effect move a model’s report of being evaluated more than the evaluation-awareness vector does. The paper ships a reporting checklist. It tests the instrument and does not rule on whether models introspect.',
    ],
    byline: 'Santosh Cheethirala',
    status: 'UNDER REVIEW · TACL',
    results: true,
    source: '9 open models · 4 families · 30 concepts · every arm and amendment filed before its data',
  },
  {
    id: 'missingmass',
    no: '04',
    kicker: 'AI SAFETY · CAPTURE–RECAPTURE',
    name: 'MISSING MASS',
    headline: 'How complete was the audit?',
    title: 'How Complete Was the Audit? Estimating What Red Teams, Auditors and Interpretability Tools Miss',
    deck:
      'Safety evaluations report what they found. None report how much they missed. The overlap between repeated runs of a tool can put a number on it.',
    body: [
      'An alignment audit finds three hidden behaviours. A red team finds twelve jailbreak strategies. Neither number says whether the model has three problems, or whether the audit found the three easiest of thirty. That is what decides whether to ship or keep looking.',
      'The overlap between repeated runs carries that information. When independent runs keep finding the same failure modes, the search is close to saturation; when each run finds mostly new ones, a lot is still undiscovered. Capture–recapture statistics turn this into estimates, and software testing uses the same idea for residual bugs. With Kushal, I’m applying it to AI-safety discovery tools, and validating it first on testbeds where the failures were planted and the truth is known.',
      'The early results separate two quantities. <em>Audit coverage</em>, the share of detectable failure mass already found, can be estimated: in simulation its bias stays within 0.009 in every cell where its assumptions hold. The <em>number</em> of failure modes cannot be estimated; when some failures are much harder to find than others, count estimates are only lower bounds. Along the way, the standard bootstrap interval for coverage turned out to cover the truth only about 76% of the time at a nominal 95%, so we built one that reaches 0.90 to 0.95.',
    ],
    byline: 'Santosh Cheethirala & Kushal',
    status: 'PRE-REGISTRATION · v0.2',
    results: true,
    figures: [
      { v: '≤ 0.009', l: 'largest <b>bias of estimated coverage</b> across 14 clean simulation cells' },
      { v: '76% → 0.90–0.95', l: 'how often the <b>95% interval</b> covers the truth: standard bootstrap → ours' },
      { v: '1,744', l: 'checks against the <b>R reference</b> implementations, matching to 3×10⁻¹²' },
      { v: '$0', l: 'compute budget: <b>open models</b>, CPU and free Kaggle GPUs' },
    ],
    source: 'Targeting arXiv in Dec 2026 · lab notebook, pre-registration and estimator library are public',
    links: { github: 'https://github.com/santoshcheethiralame-dot/missingmass' },
  },
];

/* A "Corrections & Clarifications" box, newspaper style: one line per study,
   each naming the check the field trusted and what the measurement found. */
export const corrections: { desk: string; text: string; pending?: boolean }[] = [
  {
    desk: 'RAG attribution',
    text: 'A wrong RAG answer was traced to one culprit passage. For 49% of 603 natural errors, no single passage reproduces the error alone.',
  },
  {
    desk: 'Probing',
    text: 'Agreement across restarts was taken as evidence that a fitted direction is right. At one GPT-Neo layer, restarts agreed at 1.00 on directions with a median alignment of 0.01 to the true weights.',
  },
  {
    desk: 'Introspection',
    text: 'A YES under concept injection was read as introspection. At the published strength, the model puts less than 10⁻⁴ of its first-token probability on YES or NO.',
  },
  {
    desk: 'Safety audits',
    text: 'Audits reported what they found, but not how much they missed. A correction is being prepared.',
    pending: true,
  },
];

/* Study 01's console: one real error from the paper (Figure 1: HotpotQA,
   Qwen2.5-7B, first run, enumeration bound 3). Subsets are written as sorted
   passage letters. Only sizes 0–3 and the full context were queried in this
   run; sizes 4–5 are honestly reported as not queried. */
export const culpritCase = {
  model: 'Qwen2.5-7B',
  dataset: 'HotpotQA',
  question:
    'Considered the strongest recorded tropical cyclone, which cyclone had a film made about it in 2007?',
  gold: '1999 Odisha cyclone',
  wrong: 'Kathantara',
  bound: 3,
  passages: [
    { id: 'A', label: 'Article on another cyclone', gold: false },
    { id: 'B', label: 'Article on “Kathantara”, the 2007 film', gold: true },
    { id: 'C', label: 'Article on another cyclone', gold: false },
    { id: 'D', label: 'Article on another cyclone', gold: false },
    { id: 'E', label: 'Article on another cyclone', gold: false },
    { id: 'F', label: 'Article on the 1999 Odisha cyclone', gold: true },
  ],
  // every queried subset that makes the model repeat "Kathantara"
  sufficient: ['AB', 'BC', 'BE', 'ABC', 'ABE', 'BCD', 'BCE', 'BCF', 'ABCDEF'],
  minimal: ['AB', 'BC', 'BE'],
  // a sufficient set, and a one-larger superset that is not
  violations: [['AB', 'ABD'], ['AB', 'ABF'], ['BE', 'BDE'], ['BE', 'BEF']],
  // the answers the paper states for non-reproducing subsets
  answers: { ABF: '1999 Odisha cyclone', ABD: 'Cyclone Hondo' } as Record<string, string>,
};

/* Study 01's scorecard: the three jobs attribution is asked to do (Section 5). */
export const attributionJobs = [
  {
    job: 'Name one explanation',
    verdict: 'WORKS',
    a: { v: 98, l: 'ContextCite’s top passage lies in a minimal sufficient set' },
    b: { v: 56, l: 'a random passage does' },
  },
  {
    job: 'Recover all the evidence',
    verdict: 'CAPPED',
    a: { v: 45, l: 'ContextCite recall where every minimal set is disjoint' },
    b: { v: 45, l: 'the most any single passage can reach there' },
  },
  {
    job: 'Repair the answer',
    verdict: 'FAILS',
    a: { v: 19, l: 'removing the smallest sufficient set restores gold' },
    b: { v: 17, l: 'removing a random passage does' },
  },
];

/* Study 03's localization readout (Table 2, Llama-3.1-8B): accuracy at naming
   which of 10 sentences got the injection (chance 0.10), real concept vectors
   against random directions of the same norm. 600 trials per cell and arm. */
export const localization = {
  layers: [1, 2, 3, 4, 8],
  strengths: [2, 5, 8],
  primary: { layer: 2, strength: 5 },
  real: [
    [0.96, 0.61, 0.51],
    [0.29, 0.97, 0.66],
    [0.19, 0.88, 0.74],
    [0.21, 0.83, 0.95],
    [0.13, 0.36, 0.56],
  ],
  random: [
    [0.70, 0.66, 0.42],
    [0.25, 0.92, 0.60],
    [0.12, 0.83, 0.74],
    [0.11, 0.64, 0.91],
    [0.12, 0.26, 0.56],
  ],
};

/* Study 03's three assumptions, and where each one breaks. */
export const instrumentChecks = [
  {
    k: 'LIVE',
    q: 'Does the vector change anything?',
    v: '0.52–0.55',
    fail: 'pooled AUC of the health checks in use at telling live vectors from dead ones. Chance is 0.50.',
  },
  {
    k: 'DOSE',
    q: 'Does a strength mean the same thing in every model?',
    v: '25–480×',
    fail: 'more next-token effect in one model than another, from the same fraction of the residual norm.',
  },
  {
    k: 'READOUT',
    q: 'Does a YES report the injection?',
    v: '< 10⁻⁴',
    fail: 'of Gemma-3-27B’s first-token probability is on YES or NO at the published strength.',
  },
];

export const skills: { group: string; items: string[] }[] = [
  {
    group: 'Languages',
    items: ['C', 'Python', 'TypeScript', 'JavaScript', 'Rust', 'SQL', 'HTML', 'CSS', 'WGSL'],
  },
  // Class sizes are kept within 9–12 so the board's panels sit on roughly the same
  // height. ML/AI at 21 and Web at 17 next to Research at 7 left ragged dead space.
  {
    group: 'ML / AI',
    items: [
      'PyTorch', 'NumPy', 'scikit-learn', 'Pandas', 'SciPy', 'Matplotlib',
      'Deep Learning', 'Graph Neural Networks', 'Synthetic Data', 'Quantization', 'vLLM',
      'Sparse Autoencoders',
    ],
  },
  {
    group: 'Interpretability / LLM',
    items: [
      'Mechanistic Interpretability', 'TransformerLens', 'Activation Patching',
      'Linear Probing', 'Steering Vectors', 'Concept Injection', 'HuggingFace Transformers',
      'LLM Evaluation', 'RAG', 'Failure Taxonomy',
    ],
  },
  // Agents: what Injunct and Smudge are made of, and the plumbing they run on
  {
    group: 'Agents',
    items: [
      'Multi-Agent Systems', 'Agent Guardrails', 'Claude Code Hooks', 'Agent Skills',
      'opencode', 'LLM Routing & Fallback', 'Open-Weight Models', 'Groq', 'Gemini API',
      'Ollama', 'Tool Calling', 'Structured Outputs',
    ],
  },
  {
    group: 'Web / Frontend',
    items: [
      'React', 'Next.js', 'React Router', 'Astro', 'Vite', 'Tailwind CSS',
      'PWA', 'IndexedDB / Dexie.js', 'Web Workers', 'Leaflet',
    ],
  },
  {
    group: 'Backend / Data',
    items: [
      'FastAPI', 'Pydantic', 'SQLAlchemy', 'PostgreSQL', 'MongoDB', 'Node.js',
      'Express', 'REST APIs', 'JWT Auth', 'OpenAI Realtime API', 'Rate Limiting', 'Streamlit',
    ],
  },
  {
    group: 'Tools / Systems',
    items: [
      'Git', 'GitHub Actions', 'Docker', 'Linux', 'Distributed Systems', 'pytest',
      'Vitest', 'Playwright', 'Vercel', 'Hugging Face Hub', 'Kaggle GPU', 'OpenRouter API',
    ],
  },
  {
    group: 'Research / Methods',
    items: [
      'Conformal Prediction', 'Causal Inference', 'Experimental Design',
      'Statistical Inference', 'Benchmark Design', 'Pre-registration', 'Capture–Recapture',
      'Bootstrap Intervals', 'Bit-Parallel Algorithms', 'Differential Fuzzing',
      'Scientific Writing', 'LaTeX',
    ],
  },
  {
    group: 'Graphics / Realtime',
    items: [
      'WebGPU', 'WebRTC', 'Canvas', 'SVG / Data Viz', 'Framer Motion', 'GSAP', 'Web Speech API',
      'Phaser 3', 'Tone.js',
    ],
  },
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
