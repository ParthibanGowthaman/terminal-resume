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
const themes = ["midnight", "phosphor", "amber", "matrix", "contrast"];

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
  ┌────────────────────────────────────────────────┐
  │  VP Machine Learning @ ONCI                     │
  │  Location: Bengaluru, India                     │
  │  Status: LLM Driver · Open to opportunities     │
  └────────────────────────────────────────────────┘

  12+ years in ML & analytics. Now driving LLM solutions.

  type <span class="cmd">experience</span> to see my work history
  type <span class="cmd">skills</span> to see my technical stack
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
  <span class="bold white">Parthiban Gowthaman</span> — VP Machine Learning @ ONCI.
  12+ years in ML & analytics. Now driving LLM solutions.
`;
    },
  },

  experience: {
    desc: "work experience",
    fn: () => {
      return `
  <span class="bold white">Work Experience</span>

  <span class="accent">VP Machine Learning</span> <span class="muted">@ ONCI</span>
  <span class="muted">Apr 2025 - Present | Bengaluru, India</span>

  <span class="accent">DVP Machine Learning</span> <span class="muted">@ ONCI</span>
  <span class="muted">Apr 2023 - Apr 2025 | Bengaluru, India</span>

  <span class="accent">AVP Machine Learning</span> <span class="muted">@ ONCI</span>
  <span class="muted">Nov 2021 - May 2023 | Bengaluru, India</span>

  <span class="accent">Manager - Advanced Analytics COE</span> <span class="muted">@ Flex</span>
  <span class="muted">Jul 2017 - Oct 2021 | Chennai, India</span>

  <span class="accent">Asst. Manager - Advanced Analytics COE</span> <span class="muted">@ Flextronics</span>
  <span class="muted">May 2015 - 2017 | Chennai, India</span>

  <span class="accent">Predictive Data Analyst</span> <span class="muted">@ Quantium Analytics</span>
  <span class="muted">Jun 2013 - Apr 2015 | Hyderabad, India</span>

  <span class="muted">type</span> <span class="cmd">skills</span> <span class="muted">to see my tech stack</span>
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

  <span class="accent">•</span> Python
  <span class="accent">•</span> LLMs
  <span class="accent">•</span> LLM Evals
  <span class="accent">•</span> Agentic Workflow Automation

  <span class="muted">type</span> <span class="cmd">projects</span> <span class="muted">to see what I've built</span>
`;
    },
  },

  education: {
    desc: "education",
    fn: () => {
      return `
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

  <span class="accent">[+] terminal-resume</span> <span class="success">[this site!]</span>
  <span class="muted">Interactive CLI-style resume website</span>
  <span class="muted">Built with Claude Code, verified by a human</span>
`;
    },
  },



  contact: {
    desc: "find me",
    fn: () => {
      return `
  <span class="bold white">Contact</span>

  • <a href="https://www.linkedin.com/in/parthiban-gowthaman-50257017/" target="_blank" rel="noopener">LinkedIn</a>
  • <a href="mailto:gowthamparthiban@gmail.com">Email</a>
  • <span class="muted">Bengaluru, India</span>
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
      return `
  <span class="muted">To add a downloadable PDF:</span>
  <span class="muted">1. Save your resume as resume.pdf in the project folder</span>
  <span class="muted">2. The download link will work automatically</span>

  <span class="warning">PDF not configured yet.</span>
`;
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

  <span class="accent">•</span> I bring strong engineering skills
  <span class="accent">•</span> Experience with scalable systems
  <span class="accent">•</span> Team player & mentor
  <span class="accent">•</span> Always learning, always shipping

  type <span class="cmd">contact</span> to get in touch
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
        { cmd: 'whoami', keywords: ['parthiban', 'gowthaman', 'onci', 'about', 'ml', 'bengaluru'] },
        { cmd: 'experience', keywords: ['work', 'job', 'career', 'onci', 'flex', 'flextronics', 'quantium', 'history', 'vp', 'manager'] },
        { cmd: 'skills', keywords: ['python', 'llm', 'llms', 'evals', 'agentic', 'automation', 'machine learning', 'tech', 'stack'] },
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
    "connecting to parthiban.dev... connected",
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
  await sleep(100);

  output.innerHTML += `
<div class="welcome-text">ML practitioner. LLM driver. problem solver.
welcome to my terminal resume. type <span class="cmd">help</span> to see commands.</div>
`;
  scrollToBottom();

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
