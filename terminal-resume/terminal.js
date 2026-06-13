// Terminal state
const state = {
  history: [],
  historyIndex: -1,
  theme: localStorage.getItem("terminal-theme") || "midnight",
  commandCount: 0,
  isTyping: false,
  skipTyping: null,
};

// Status vibes
const vibes = [
  "building things",
  "shipping fast",
  "caffeinated",
  "in the zone",
  "thinking...",
  "exploring ideas",
  "debugging life",
  "writing code",
  "making things",
  "iterating",
  "deep work",
  "async mode",
  "refactoring",
  "solving problems",
  "learning always",
  "code && coffee",
  "push to prod",
  "open to work",
];

// Available themes
const themes = ["midnight", "phosphor", "amber", "matrix", "contrast", "desert"];

// ============================
// COMMANDS REGISTRY
// ============================
const commands = {
  help: {
    desc: "show available commands",
    fn: () => {
      const lines = [
        "",
        '  <span class="bold white">Available Commands</span>',
        "",
        '  <span class="muted">--- resume ---</span>',
        '  <span class="cmd">whoami</span>        about me',
        '  <span class="cmd">tldr</span>          ultra-short bio',
        '  <span class="cmd">experience</span>    work history',
        '  <span class="cmd">skills</span>        technical skills',
        '  <span class="cmd">education</span>     education background',
        "",
        '  <span class="muted">--- portfolio ---</span>',
        '  <span class="cmd">projects</span>      notable projects',
        "",
        '  <span class="muted">--- connect ---</span>',
        '  <span class="cmd">pitch</span>         30-second elevator pitch',
        '  <span class="cmd">contact</span>       find me online',
        '  <span class="cmd">download</span>      download resume PDF',
        "",
        '  <span class="muted">--- terminal ---</span>',
        '  <span class="cmd">theme</span>         list/change themes',
        '  <span class="cmd">clear</span>         clear the terminal',
        '  <span class="cmd">music</span>         toggle music player',
        "",
        '  <span class="muted">tip: shift+tab to cycle themes</span>',
        "",
      ];
      return lines.join("\n");
    },
  },

  whoami: {
    desc: "about me",
    fn: () => {
      return `
  <span class="bold white">Parthiban Gowthaman</span>
  ┌─────────────────────────────────────────────────────┐
  │  AI-native Engineer @ OakNorth Bank                  │
  │  Pricing Optimization Pod                            │
  │  Location: Bengaluru, India                          │
  │  Target: Dubai / Abu Dhabi · Open to opportunities   │
  └─────────────────────────────────────────────────────┘

  12+ years across data science, ML & applied AI. Now building LLM-native systems in fintech.

  <span class="muted">→ next:</span> <span class="cmd">experience</span>
`;
    },
  },

  about: {
    desc: "alias for whoami",
    fn: () => commands.whoami.fn(),
  },

  tldr: {
    desc: "ultra-short bio",
    fn: () => {
      return `
  <span class="bold white">Parthiban Gowthaman</span> — AI-native Engineer @ OakNorth Bank (Pricing Optimization).
  12+ years across data science, ML & applied AI. Now building LLM-native systems in fintech. Targeting Dubai / Abu Dhabi.
`;
    },
  },

  experience: {
    desc: "work experience",
    fn: () => {
      return `
  <span class="bold white">Work Experience</span>

  <span class="accent">AI-native Engineer</span> <span class="muted">@ OakNorth Bank</span>
  <span class="muted">Apr 2026 - Present | Pricing Optimization Pod | Bengaluru, India</span>

  <span class="accent">VP Machine Learning</span> <span class="muted">@ OakNorth Credit Intelligence</span>
  <span class="muted">Apr 2025 - Apr 2026 | Bengaluru, India</span>

  <span class="accent">DVP Machine Learning</span> <span class="muted">@ OakNorth Credit Intelligence</span>
  <span class="muted">Apr 2023 - Apr 2025 | Bengaluru, India</span>

  <span class="accent">AVP Machine Learning</span> <span class="muted">@ OakNorth Credit Intelligence</span>
  <span class="muted">Nov 2021 - May 2023 | Bengaluru, India</span>

  <span class="accent">Manager - Advanced Analytics COE</span> <span class="muted">@ Flex</span>
  <span class="muted">Jul 2017 - Oct 2021 | Chennai, India</span>

  <span class="accent">Asst. Manager - Advanced Analytics COE</span> <span class="muted">@ Flextronics</span>
  <span class="muted">May 2015 - 2017 | Chennai, India</span>

  <span class="accent">Predictive Data Analyst</span> <span class="muted">@ Quantium Analytics</span>
  <span class="muted">Jun 2013 - Apr 2015 | Hyderabad, India</span>

  <span class="muted">→ next:</span> <span class="cmd">skills</span>
`;
    },
  },

  prev: {
    desc: "alias for experience",
    fn: () => commands.experience.fn(),
  },

  skills: {
    desc: "technical skills",
    fn: () => {
      return `
  <span class="bold white">Technical Skills</span>

  <span class="accent">LLMs & AI Engineering</span>
  <span class="accent">•</span> LLM Orchestration (LangChain, LlamaIndex, CrewAI)
  <span class="accent">•</span> Agentic Workflow Automation
  <span class="accent">•</span> RAG Pipelines & Vector Databases
  <span class="accent">•</span> LLM Evals & Prompt Engineering
  <span class="accent">•</span> Claude API · Prompt Caching · Batch Processing

  <span class="accent">Machine Learning & Data Science</span>
  <span class="accent">•</span> Predictive Modelling & Statistical Analysis
  <span class="accent">•</span> Time Series Forecasting
  <span class="accent">•</span> Pricing Optimization
  <span class="accent">•</span> Credit Risk & Financial Analytics

  <span class="accent">Languages & Tools</span>
  <span class="accent">•</span> Python · SQL
  <span class="accent">•</span> REST APIs · BEA API · Census API
  <span class="accent">•</span> Claude Code (AI-assisted development)
  <span class="accent">•</span> Firecrawl

  <span class="accent">Cloud Platforms</span>
  <span class="accent">•</span> Azure ML Studio
  <span class="accent">•</span> Google Cloud Platform

  <span class="muted">→ next:</span> <span class="cmd">projects</span>
`;
    },
  },

  education: {
    desc: "education",
    fn: () => {
      return `
  <span class="bold white">Certifications</span>

  <span class="accent">AI Coding for Real Engineers</span>
  <span class="muted">Matt Pocock | Jun 2026</span>
  <span class="muted">Claude Code · Steering · Planning · Feedback Loops · AFK Agents · Human-in-the-Loop Patterns</span>

  <span class="bold white">Education</span>

  <span class="accent">Masters in Financial Economics</span>
  <span class="muted">Madras School of Economics | 2011 - 2013</span>

  <span class="accent">Bachelor of Engineering (BE)</span>
  <span class="muted">Electrical & Electronics Engineering</span>
  <span class="muted">Anna University | 2005 - 2009</span>
`;
    },
  },

  projects: {
    desc: "notable projects",
    fn: () => {
      return `
  <span class="bold white">Projects</span>

  <span class="accent">[+] mse-rate-intelligence-agent</span> <span class="muted">[OakNorth Bank]</span>
  <span class="muted">Tools: Python, Claude API, Firecrawl, Agentic Workflow</span>
  Treasury teams traditionally track competitor savings rates manually —
  a slow, inconsistent process that misses time-sensitive signals. I built
  an agentic system at OakNorth Bank that continuously monitors interest
  rate data published on Money Saving Expert using Firecrawl for reliable
  data extraction, and Claude for intelligent change detection. When rates
  shift, the agent automatically alerts the treasury team with a structured
  briefing — identifying which institutions are actively competing for
  deposits and signalling who is looking to raise money in the current
  rate environment. What was a manual, reactive process is now a
  real-time competitive intelligence feed.

  <span class="accent">[+] terminal-resume</span> <span class="success">[this site!]</span>
  <span class="muted">Interactive CLI-style resume website</span>
  Built with Claude Code, verified by a human.

  <span class="accent">[+] cre-scenario-engine</span> <span class="muted">[OakNorth Credit Intelligence]</span>
  <span class="muted">Tools: Python, Claude Code, AI-assisted coding, statsmodels</span>
  OakNorth Credit Intelligence's Commercial Real Estate scenario analysis system needed a complete
  rebuild to support evolving portfolio requirements. Rather than following
  the traditional development cycle, I led the full rebuild using an
  AI-assisted coding approach with Claude Code — designing architecture,
  writing, and validating code collaboratively with AI. The entire system
  was rebuilt from scratch and shipped in under a month, a timeline that
  would typically take a quarter or more. The new engine supports dynamic
  scenario modeling across CRE loan portfolios using macroeconomic
  indicators, giving credit analysts richer stress-testing capabilities.

  <span class="accent">[+] customer-insights-automation</span> <span class="muted">[OakNorth Credit Intelligence]</span>
  <span class="muted">Tools: Python, Claude API, Prompt Engineering</span>
  OakNorth Credit Intelligence's credit analysts were spending significant time manually rewriting
  and polishing customer insight narratives — a repetitive task that required
  no human judgment. I built an automated pipeline using the Claude API that
  takes raw analyst inputs and generates clean, consistently structured
  customer insight write-ups. The system integrates seamlessly into existing
  workflows, reducing turnaround time and ensuring uniform quality of output
  across the entire credit team.

  <span class="accent">[+] genai-impact-naics-sic</span> <span class="muted">[OakNorth Credit Intelligence]</span>
  <span class="muted">Tools: Python, Claude API, Parallel Processing, Prompt Caching</span>
  Analyzing GenAI disruption risk across industry codes hits hard limits in
  Claude's UI due to sandbox constraints — running it at scale interactively
  is simply not possible. I engineered a backend pipeline at OakNorth Credit Intelligence using the
  Claude API that runs 100 NAICS/SIC codes in parallel, with prompt caching
  implemented to dramatically reduce token costs across repeated structural
  prompts. This turned a manual, one-at-a-time analysis into a scalable
  automated intelligence system — delivering industry-level GenAI impact
  assessments efficiently and cost-effectively at a scale no UI-based tool
  can match.

  <span class="accent">[+] deep-research-analyst</span> <span class="muted">[OakNorth Credit Intelligence]</span>
  <span class="muted">Tools: Python, CrewAI, Multi-Agent Framework, Web Search, Claude</span>
  Researching an industry using a standard LLM UI is a single-pass experience
  — one query, one synthesis, one response. For deep due diligence on
  NAICS/SIC codes, that's simply not enough. I built a multi-agent research
  system at OakNorth Credit Intelligence using CrewAI where specialized AI agents divide
  responsibilities — market sizing, competitive landscape, GenAI disruption
  risk, regulatory environment — work in parallel, and synthesize findings
  into a structured, repeatable industry intelligence report. A credit analyst
  simply inputs a NAICS or SIC code and receives a comprehensive research
  brief that would otherwise take hours of manual web research to produce.

  <span class="accent">[+] bea-census-data-automation</span> <span class="muted">[OakNorth Credit Intelligence]</span>
  <span class="muted">Tools: Python, BEA API, Census API, REST</span>
  OakNorth Credit Intelligence's credit team was manually downloading economic data from the Bureau
  of Economic Analysis and US Census Bureau — a time-consuming, error-prone
  process repeated across the team on a regular basis. I replaced this
  entirely with a programmatic API integration layer, allowing any team
  member to pull the latest BEA and Census datasets with a single API call.
  This eliminated manual effort, ensured data freshness and consistency
  across the team, and freed up analyst time for higher-value work.

  <span class="muted">→ next:</span> <span class="cmd">contact</span>
`;
    },
  },



  contact: {
    desc: "find me",
    fn: () => {
      return `
  <span class="bold white">Contact</span>

  • <a href="https://www.linkedin.com/in/parthiban-gowthaman-50257017/" target="_blank" rel="noopener">LinkedIn</a>
  • <a href="https://github.com/ParthibanGowthaman/terminal-resume" target="_blank" rel="noopener">GitHub</a>
  • <a href="mailto:gowthamparthiban@gmail.com">Email</a>
  • <span class="muted">Bengaluru, India · Open to Dubai / Abu Dhabi</span>

  <span class="muted">→ that's the full picture. let's talk.</span>
`;
    },
  },

  social: {
    desc: "alias for contact",
    fn: () => commands.contact.fn(),
  },

  download: {
    desc: "download resume",
    fn: () => {
      const link = document.createElement("a");
      link.href = "resume.pdf";
      link.download = "Parthiban_Gowthaman_Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return `  <span class="success">Downloading resume...</span>`;
    },
  },

  theme: {
    desc: "change theme",
    fn: (args) => {
      if (!args || args.length === 0) {
        let output = '\n  <span class="bold white">Available Themes</span>\n\n';
        themes.forEach((t) => {
          const current = t === state.theme ? ' <span class="muted">(current)</span>' : "";
          output += `  • <span class="cmd">${t}</span>${current}\n`;
        });
        output += '\n  usage: <span class="cmd">theme [name]</span> or shift+tab to cycle\n';
        return output;
      }
      const themeName = args[0].toLowerCase();
      if (themes.includes(themeName)) {
        setTheme(themeName);
        return `\n  theme changed to <span class="accent">${themeName}</span>\n`;
      }
      return `\n  <span class="error">unknown theme: ${themeName}</span>\n  type <span class="cmd">theme</span> to see available themes.\n`;
    },
  },

  clear: {
    desc: "clear terminal",
    fn: () => {
      setTimeout(() => {
        document.getElementById("output").innerHTML = "";
        boot();
      }, 10);
      return "";
    },
  },

  music: {
    desc: "toggle music player",
    fn: () => {
      const player = document.getElementById("music-player");
      if (player) {
        player.classList.toggle("visible");
        return player.classList.contains("visible")
          ? "\n  music player shown. click play to start.\n"
          : "\n  music player hidden.\n";
      }
      return '\n  <span class="error">music player not available</span>\n';
    },
  },

  pitch: {
    desc: "30-second pitch",
    fn: () => {
      return `
  <span class="bold white">The Pitch</span>

  I'm an AI engineer with 12+ years across data science, ML & applied AI —
  now building LLM-native systems at OakNorth Bank in the Pricing
  Optimization pod.

  My edge: I don't just use AI tools, I build with them. Agentic pipelines,
  RAG systems, multi-agent workflows, real-time intelligence agents — shipped
  in production, in fintech, where accuracy and reliability actually matter.

  I come from banking and credit intelligence, which means I understand
  the domain problems UAE's financial institutions are trying to solve with AI —
  not just the technology.

  I'm actively targeting Dubai and Abu Dhabi. If you're building AI-native
  systems in fintech, risk, or credit — let's talk.

  type <span class="cmd">contact</span> to reach me
`;
    },
  },

  relocate: {
    desc: "relocation intent",
    fn: () => {
      return `
  <span class="bold white">Relocation</span>

  <span class="accent">•</span> Currently based in Bengaluru, India
  <span class="accent">•</span> Actively targeting Dubai & Abu Dhabi
  <span class="accent">•</span> UAE's AI & fintech ecosystem is exactly where I want to build
  <span class="accent">•</span> Open to relocation discussions immediately

  type <span class="cmd">contact</span> to start the conversation
`;
    },
  },

  // Easter eggs
  sudo: {
    desc: "nice try",
    fn: () => '\n  <span class="error">nice try, but you don\'t have sudo access here.</span>\n',
  },
  rm: {
    desc: "nice try",
    fn: (args) => {
      if (args && args.join(" ").includes("-rf")) {
        return '\n  <span class="error">NICE TRY! this terminal is protected.</span>\n';
      }
      return '\n  <span class="error">rm: command not available in this terminal</span>\n';
    },
  },
  exit: {
    desc: "exit terminal",
    fn: () => '\n  <span class="muted">there is no escape. you\'re stuck here with me.</span>\n',
  },
  vim: {
    desc: "editor wars",
    fn: () => '\n  <span class="accent">vim is great.</span> but this isn\'t that kind of terminal.\n',
  },
  emacs: {
    desc: "editor wars",
    fn: () => '\n  <span class="muted">emacs users... i see you.</span>\n',
  },
  ls: {
    desc: "list files",
    fn: () => '\n  README.md  resume.pdf  projects/  skills.md\n\n  <span class="muted">try: whoami, experience, skills, projects</span>\n',
  },
  cat: {
    desc: "cat file",
    fn: (args) => {
      if (!args || args.length === 0) return '\n  <span class="error">cat: missing file argument</span>\n';
      const file = args[0].toLowerCase();
      if (file.includes("readme")) return commands.whoami.fn();
      if (file.includes("resume")) return commands.experience.fn();
      if (file.includes("skill")) return commands.skills.fn();
      return `\n  <span class="error">cat: ${args[0]}: no such file</span>\n`;
    },
  },
  cd: {
    desc: "change directory",
    fn: () => '\n  <span class="muted">you\'re already home.</span>\n',
  },
  pwd: {
    desc: "print working directory",
    fn: () => "\n  /home/parthiban\n",
  },
  echo: {
    desc: "echo text",
    fn: (args) => (args ? "\n  " + args.join(" ") + "\n" : "\n"),
  },
  date: {
    desc: "show date",
    fn: () => "\n  " + new Date().toString() + "\n",
  },
  neofetch: {
    desc: "system info",
    fn: () => `
  <span class="accent">       _</span>          parthiban@resume
  <span class="accent">      (_)</span>         ----------------
  <span class="accent">   ___ _  ___</span>     OS: Human 1.0
  <span class="accent">  / __| |/ _ \\</span>    Host: Bengaluru, India
  <span class="accent">  \\__ \\ |  __/</span>    Kernel: Coffee-powered
  <span class="accent">  |___/_|\\___|</span>    Uptime: Always learning
                    Shell: bash
                    Terminal: parthiban-resume
`,
  },
  hire: {
    desc: "hire me",
    fn: () => {
      return `
  <span class="bold white success">Let's work together!</span>

  <span class="accent">•</span> 12+ years across data science, ML & applied AI
  <span class="accent">•</span> Building LLM-native systems in fintech (pricing, credit, risk)
  <span class="accent">•</span> Proven at shipping fast with AI-assisted development
  <span class="accent">•</span> Deep domain: banking, credit intelligence, financial analytics
  <span class="accent">•</span> Open to Dubai / Abu Dhabi — UAE's AI & fintech ecosystem

  <span class="muted">→ start here:</span> <span class="cmd">whoami</span>
`;
    },
  },
  search: {
    desc: "search content",
    fn: (args) => {
      if (!args || args.length === 0) {
        return '\n  usage: <span class="cmd">search [term]</span>\n  example: <span class="cmd">search python</span>\n';
      }
      const term = args.join(' ').toLowerCase();
      const searchable = [
        { cmd: 'whoami', keywords: ['parthiban', 'gowthaman', 'oaknorth', 'about', 'ml', 'bengaluru', 'dubai', 'abu dhabi', 'uae'] },
        { cmd: 'experience', keywords: ['work', 'job', 'career', 'oaknorth', 'flex', 'flextronics', 'quantium', 'history', 'vp', 'manager', 'pricing', 'credit intelligence'] },
        { cmd: 'skills', keywords: ['python', 'llm', 'llms', 'evals', 'agentic', 'automation', 'machine learning', 'tech', 'stack', 'rag', 'langchain', 'sql', 'pricing'] },
        { cmd: 'projects', keywords: ['project', 'build', 'portfolio', 'terminal', 'claude'] },
        { cmd: 'education', keywords: ['degree', 'university', 'masters', 'bachelor', 'anna', 'madras', 'economics'] },
        { cmd: 'contact', keywords: ['email', 'linkedin', 'social', 'hire', 'reach'] },
      ];
      const matches = searchable.filter(s => s.keywords.some(k => k.includes(term) || term.includes(k)));
      if (matches.length === 0) {
        return `\n  <span class="muted">no results for "${term}"</span>\n  try: skills, experience, projects\n`;
      }
      let output = `\n  <span class="bold white">results for "${term}":</span>\n\n`;
      matches.forEach(m => {
        output += `  • type <span class="cmd">${m.cmd}</span>\n`;
      });
      return output;
    },
  },
};

// ============================
// UTILITY FUNCTIONS
// ============================
function isMobile() {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}

function appendOutput(text) {
  const output = document.getElementById("output");
  output.innerHTML += text;
  scrollToBottom();
}

function typeOutput(html, speed = 8) {
  return new Promise((resolve) => {
    const output = document.getElementById("output");
    const container = document.createElement("span");
    output.appendChild(container);

    // Parse HTML into tokens: tags (rendered instantly) and text chars (typed one by one)
    const tokens = [];
    const tagRegex = /(<[^>]+>)/g;
    let lastIndex = 0;
    let match;
    while ((match = tagRegex.exec(html)) !== null) {
      if (match.index > lastIndex) {
        // Push individual text characters
        for (const ch of html.slice(lastIndex, match.index)) {
          tokens.push({ type: "char", value: ch });
        }
      }
      tokens.push({ type: "tag", value: match[1] });
      lastIndex = tagRegex.lastIndex;
    }
    if (lastIndex < html.length) {
      for (const ch of html.slice(lastIndex)) {
        tokens.push({ type: "char", value: ch });
      }
    }

    let i = 0;
    let buffer = "";

    function flush() {
      container.innerHTML = buffer;
      scrollToBottom();
    }

    function finishAll() {
      // Render everything remaining
      for (; i < tokens.length; i++) {
        buffer += tokens[i].value;
      }
      flush();
      state.isTyping = false;
      state.skipTyping = null;
      resolve();
    }

    // Allow skipping
    state.skipTyping = finishAll;
    state.isTyping = true;

    function step() {
      if (!state.isTyping) return; // already skipped

      // Process next token(s)
      if (i >= tokens.length) {
        state.isTyping = false;
        state.skipTyping = null;
        flush();
        resolve();
        return;
      }

      const token = tokens[i++];
      buffer += token.value;

      // Tags render instantly — keep going until we hit a char
      if (token.type === "tag") {
        step();
        return;
      }

      // Newlines render instantly too
      if (token.value === "\n") {
        flush();
        step();
        return;
      }

      flush();
      setTimeout(step, speed);
    }

    step();
  });
}

function scrollToBottom() {
  const terminal = document.getElementById("terminal-body");
  terminal.scrollTop = terminal.scrollHeight;
}

function setTheme(themeName) {
  document.body.className = `theme-${themeName}`;
  state.theme = themeName;
  localStorage.setItem("terminal-theme", themeName);
}

function cycleTheme() {
  const currentIndex = themes.indexOf(state.theme);
  const nextIndex = (currentIndex + 1) % themes.length;
  setTheme(themes[nextIndex]);
  appendOutput(`\n  <span class="muted">theme: ${themes[nextIndex]}</span>\n\n`);
  scrollToBottom();
}

function updateTime() {
  const timeEl = document.getElementById("status-time");
  if (timeEl) {
    const time = new Date().toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
    timeEl.textContent = time;
  }
}

function updateVibe() {
  const vibeEl = document.getElementById("status-vibe");
  if (vibeEl) {
    const randomVibe = vibes[Math.floor(Math.random() * vibes.length)];
    vibeEl.textContent = randomVibe;
  }
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function getCompletions(partial) {
  const cmdNames = Object.keys(commands);
  return cmdNames.filter((c) => c.startsWith(partial.toLowerCase()));
}

async function executeCommand(input) {
  const trimmed = input.trim();
  if (!trimmed) return;

  // If typing animation is running, skip it first
  if (state.isTyping && state.skipTyping) {
    state.skipTyping();
  }

  state.history.push(trimmed);
  state.historyIndex = state.history.length;
  state.commandCount++;

  const parts = trimmed.split(/\s+/);
  const cmd = parts[0].toLowerCase();
  const args = parts.slice(1);

  appendOutput(`<span class="prompt">∴</span> <span class="accent">${escapeHtml(trimmed)}</span>\n`);

  const inputEl = document.getElementById("command-input");

  if (commands[cmd]) {
    const result = await commands[cmd].fn(args);
    if (result) {
      // Skip typing animation for 'clear' and 'theme' (instant feedback commands)
      if (cmd === "clear" || cmd === "theme") {
        appendOutput(result + "\n");
      } else {
        inputEl.disabled = true;
        await typeOutput(result + "\n");
        inputEl.disabled = false;
        if (!isMobile()) inputEl.focus();
      }
    }
  } else {
    appendOutput(
      `\n  <span class="error">command not found: ${cmd}</span>\n  type <span class="cmd">help</span> for available commands.\n\n`
    );
  }

  scrollToBottom();
  updateVibe();
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ============================
// BOOT SEQUENCE
// ============================
async function boot() {
  const output = document.getElementById("output");
  const lines = [
    "initializing terminal...",
    "loading modules... done",
    "open to Dubai · Abu Dhabi · remote",
  ];

  for (const line of lines) {
    output.innerHTML += `<span class="muted">${line}</span>\n`;
    await sleep(150);
    scrollToBottom();
  }

  output.innerHTML += '\n';

  output.innerHTML += `<span class="accent ascii-art">  ██████╗  █████╗ ██████╗ ████████╗██╗  ██╗██╗██████╗  █████╗ ███╗   ██╗
  ██╔══██╗██╔══██╗██╔══██╗╚══██╔══╝██║  ██║██║██╔══██╗██╔══██╗████╗  ██║
  ██████╔╝███████║██████╔╝   ██║   ███████║██║██████╔╝███████║██╔██╗ ██║
  ██╔═══╝ ██╔══██║██╔══██╗   ██║   ██╔══██║██║██╔══██╗██╔══██║██║╚██╗██║
  ██║     ██║  ██║██║  ██║   ██║   ██║  ██║██║██████╔╝██║  ██║██║ ╚████║
  ╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═══╝</span>`;
  output.innerHTML += `<span class="ascii-name bold accent">  PARTHIBAN</span>`;
  scrollToBottom();

  const pitchOutput = commands.pitch.fn()
    .replace('<span class="bold white">The Pitch</span>\n', '')
    .replace('\n\n\n', '\n\n')
    .replace('  <span class="muted">→ start here:</span> <span class="cmd">whoami</span>', '  <span class="muted">want to know more? click</span> <span class="cmd">whoami</span> <span class="muted">·</span> <span class="cmd">experience</span> <span class="muted">·</span> <span class="cmd">skills</span> <span class="muted">·</span> <span class="cmd">projects</span> <span class="muted">·</span> <span class="cmd">contact</span> <span class="muted">below ↓</span>');
  await typeOutput(pitchOutput + "\n");

  if (!isMobile()) document.getElementById("command-input").focus();
}

// ============================
// INITIALIZE
// ============================
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("command-input");
  const form = document.getElementById("command-form");

  setTheme(state.theme);
  updateTime();
  updateVibe();
  setInterval(updateTime, 1000);
  setInterval(updateVibe, 8000);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const value = input.value;
    input.value = "";
    await executeCommand(value);
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (state.historyIndex > 0) {
        state.historyIndex--;
        input.value = state.history[state.historyIndex] || "";
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (state.historyIndex < state.history.length - 1) {
        state.historyIndex++;
        input.value = state.history[state.historyIndex] || "";
      } else {
        state.historyIndex = state.history.length;
        input.value = "";
      }
    } else if (e.shiftKey && e.key === "Tab") {
      e.preventDefault();
      cycleTheme();
    } else if (e.key === "Tab" && !e.shiftKey) {
      e.preventDefault();
      const value = input.value.trim();
      if (value) {
        const completions = getCompletions(value);
        if (completions.length === 1) {
          input.value = completions[0] + " ";
        } else if (completions.length > 1) {
          appendOutput(`<span class="prompt">∴</span> <span class="accent">${value}</span>\n`);
          appendOutput(`<span class="muted">${completions.join("  ")}</span>\n\n`);
          scrollToBottom();
        }
      }
    } else if (e.ctrlKey && e.key === "l") {
      e.preventDefault();
      document.getElementById("output").innerHTML = "";
    } else if (e.ctrlKey && e.key === "c") {
      e.preventDefault();
      if (state.isTyping && state.skipTyping) {
        state.skipTyping();
        input.disabled = false;
        if (!isMobile()) input.focus();
      } else {
        appendOutput(`<span class="prompt">∴</span> <span class="accent">${input.value}</span>^C\n\n`);
        input.value = "";
      }
    }
  });

  document.getElementById("terminal").addEventListener("click", (e) => {
    const cmdSpan = e.target.closest("#output .cmd");
    if (cmdSpan) {
      const cmd = cmdSpan.textContent.trim();
      if (cmd) {
        executeCommand(cmd);
        return;
      }
    }
    if (e.target.tagName !== "A" && !e.target.closest(".cmd-shortcut")) {
      if (state.isTyping && state.skipTyping) {
        state.skipTyping();
        input.disabled = false;
      }
      if (!isMobile()) input.focus();
    }
  });

  document.querySelectorAll(".cmd-shortcut").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const cmd = btn.dataset.cmd;
      if (cmd) {
        await executeCommand(cmd);
        if (!isMobile()) input.focus();
      }
    });
  });

  document.getElementById("help-btn")?.addEventListener("click", async () => {
    await executeCommand("help");
  });

  boot();
});
