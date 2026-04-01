// ============================================================================
// FILE: src/views/CTOView.tsx
// DESCRIPTION: CTO / Engineering Lead — Interactive terminal OS portfolio
// ============================================================================

import { useState, useEffect, useRef, useCallback } from 'react';
import { PROJECTS, EVENTS, SKILLS } from '../data/portfolio';
import BackButton from '../components/BackButton';
import '../styles/views/_cto.scss';

interface Props {
  onBack: () => void;
}

interface HistoryLine {
  type: 'input' | 'output';
  text: string;
}

const BOOT_LINES = [
  '  ╔══════════════════════════════════════════╗',
  '  ║   DIVINE-OS v2.1.0 — Web3 Architect     ║',
  '  ╚══════════════════════════════════════════╝',
  '  Kernel: Polkadot Edition · Nsukka, Nigeria',
  '  Loading [blockchain] [community] [frontend] [content]',
  '  ████████████████████ 100%  ALL SYSTEMS NOMINAL',
  '',
  "  Type 'help' to view available commands.",
];

export default function CTOView({ onBack }: Props) {
  const [history, setHistory] = useState<HistoryLine[]>([]);
  const [ready, setReady] = useState(false);
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [cmdIndex, setCmdIndex] = useState(-1);
  const [showMatrix, setShowMatrix] = useState(false);

  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Boot sequence
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < BOOT_LINES.length) {
        setHistory((prev) => [...prev, { type: 'output', text: BOOT_LINES[i] }]);
        i++;
      } else {
        clearInterval(interval);
        setReady(true);
      }
    }, 130);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [history, ready]);

  // Focus input when ready
  useEffect(() => {
    if (ready && inputRef.current) inputRef.current.focus();
  }, [ready]);

  // Matrix rain
  useEffect(() => {
    if (!showMatrix || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const cols = Math.floor(canvas.width / 14);
    const drops = new Array(cols).fill(1);
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*';

    const interval = setInterval(() => {
      ctx.fillStyle = 'rgba(0,0,0,0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#00FF41';
      ctx.font = '14px monospace';

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * 14, drops[i] * 14);
        if (drops[i] * 14 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    }, 33);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      setShowMatrix(false);
    }, 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [showMatrix]);

  const pushOutput = useCallback((lines: string[]) => {
    setHistory((prev) => [...prev, ...lines.map((text) => ({ type: 'output' as const, text }))]);
  }, []);

  const runCommand = useCallback((cmd: string) => {
    const trimmed = cmd.trim();
    setHistory((prev) => [...prev, { type: 'input', text: `divine@portfolio:~$ ${trimmed}` }]);

    if (trimmed) {
      setCmdHistory((prev) => [...prev, trimmed]);
      setCmdIndex(-1);
    }

    const lower = trimmed.toLowerCase();

    if (lower === 'help') {
      pushOutput([
        '',
        '  Available commands:',
        '  ─────────────────────────────────────',
        '  whoami          Who is Divine?',
        '  ls              List directories',
        '  ls projects/    List all shipped projects',
        '  ls events/      List events & conferences',
        '  cat about.txt   Full bio & background',
        '  cat contact.txt Contact information',
        '  skill --list    Technical skill tree',
        '  git log         Career milestones',
        '  ping employer   Check availability',
        '  open <name>     View project details',
        '  sudo hire me    Execute hire protocol',
        '  matrix          Enter the matrix',
        '  clear           Clear terminal',
        '',
      ]);
    } else if (lower === 'whoami') {
      pushOutput([
        '',
        '  Name:        Anyadike Divine',
        '  Role:        Web3 Frontend Architect',
        '  Location:    Nsukka, Nigeria',
        '  Ecosystems:  Polkadot · Sui · 0G · Solana · Kusama · Mandala · Encode',
        '  POW Score:   9,847',
        '  Availability: Open to opportunities',
        '',
      ]);
    } else if (lower === 'ls') {
      pushOutput([
        '',
        '  drwxr-xr-x  projects/',
        '  drwxr-xr-x  events/',
        '  -rw-r--r--  about.txt',
        '  -rw-r--r--  contact.txt',
        '  -rw-r--r--  skills.json',
        '  -rw-r--r--  README.md',
        '',
      ]);
    } else if (lower === 'ls projects/') {
      const lines = ['', '  STATUS    PROJECT            CHAIN          TYPE', '  ──────────────────────────────────────────────────'];
      PROJECTS.forEach((p) => {
        const status = p.status === 'LIVE' ? '[LIVE]' : '[WIP] ';
        lines.push(`  ${status}  ${p.name.padEnd(18)} ${p.chain.padEnd(14)} ${p.type}`);
      });
      lines.push('');
      pushOutput(lines);
    } else if (lower === 'ls events/') {
      const lines = ['', '  YEAR  EVENT                        ROLE', '  ──────────────────────────────────────────────────'];
      EVENTS.forEach((e) => {
        lines.push(`  ${e.year}  ${e.name.padEnd(28)} ${e.role}`);
      });
      lines.push('');
      pushOutput(lines);
    } else if (lower === 'cat about.txt') {
      pushOutput([
        '',
        '  ┌─────────────────────────────────────────────────────┐',
        '  │  ABOUT — Anyadike Divine                            │',
        '  └─────────────────────────────────────────────────────┘',
        '',
        '  Web3 frontend architect from Nsukka, Nigeria, with 4+ years',
        '  of experience building decentralized applications across',
        '  multiple blockchain ecosystems.',
        '',
        '  Started with React & TypeScript, evolved into a full-stack',
        '  Web3 developer specializing in DeFi protocols, NFT platforms,',
        '  and community-driven applications. Core contributor to the',
        '  Polkadot ecosystem with projects spanning DApps, DeFi, and',
        '  real-world asset tokenization.',
        '',
        '  Beyond code: community manager, technical writer, hackathon',
        '  regular, and ecosystem ambassador bridging Nigerian developers',
        '  with global Web3 opportunities.',
        '',
      ]);
    } else if (lower === 'cat contact.txt') {
      pushOutput([
        '',
        '  ┌─────────────────────────────────────────┐',
        '  │  CONTACT INFORMATION                     │',
        '  └─────────────────────────────────────────┘',
        '',
        '  Email:    anyadikedivine@gmail.com',
        '  Twitter:  @anaborejustin',
        '  GitHub:   github.com/Sage-senpai',
        '  LinkedIn: linkedin.com/in/anyadikedivine',
        '',
      ]);
    } else if (lower === 'skill --list') {
      pushOutput([
        '',
        '  Skill Tree:',
        '  ──────────────────────────────────',
        '',
        '  Technical Development',
        ...Object.entries(SKILLS).map(([skill, level]) => {
          const bar = '█'.repeat(Math.round(level / 5)) + '░'.repeat(20 - Math.round(level / 5));
          return `  ├── ${skill.padEnd(17)} ${bar} ${level}%`;
        }),
        '',
      ]);
    } else if (lower === 'git log') {
      pushOutput([
        '',
        '  commit a1b2c3d (HEAD -> main)',
        '  Date: 2026',
        '  Feat: Building Prizm Protocol on Solana — AI-driven DeFi analytics',
        '',
        '  commit e4f5g6h',
        '  Date: 2025',
        '  Feat: Shipped MXCH on Sui, EquiShare on 0G, multiple ecosystem wins',
        '',
        '  commit i7j8k9l',
        '  Date: 2024',
        '  Feat: Sub0 Bangkok workshop, ETH Safari speaker, 4 DApps shipped',
        '',
        '  commit m0n1o2p',
        '  Date: 2023',
        '  Feat: Polkadot Hackathon finalist, Encode Club bootcamp graduate',
        '',
        '  commit q3r4s5t',
        '  Date: 2022',
        '  Init: First Substrate project, joined Polkadot ecosystem',
        '',
        '  commit u6v7w8x',
        '  Date: 2021',
        '  Init: Started Web3 journey — React + TypeScript foundations',
        '',
      ]);
    } else if (lower === 'ping employer') {
      const lines: HistoryLine[] = [];
      const addPingLine = (i: number) => {
        setTimeout(() => {
          setHistory((prev) => [
            ...prev,
            {
              type: 'output',
              text: `  Reply from Divine: bytes=32 time=${Math.floor(Math.random() * 20 + 5)}ms TTL=128`,
            },
          ]);
          if (i === 3) {
            setTimeout(() => {
              pushOutput([
                '',
                '  --- employer ping statistics ---',
                '  4 packets transmitted, 4 received, 0% packet loss',
                '',
                '  STATUS: AVAILABLE FOR HIRE',
                '  Contact: anyadikedivine@gmail.com',
                '  Twitter: @anaborejustin',
                '',
              ]);
            }, 400);
          }
        }, i * 500);
      };
      pushOutput(['', '  PING employer (divine.web3.dev): 56 data bytes']);
      for (let i = 0; i < 4; i++) addPingLine(i);
      return;
    } else if (lower.startsWith('open ')) {
      const name = trimmed.slice(5).trim();
      const project = PROJECTS.find(
        (p) => p.name.toLowerCase() === name.toLowerCase() || p.id.toLowerCase() === name.toLowerCase()
      );
      if (project) {
        pushOutput([
          '',
          `  ┌── ${project.name} ──────────────────────────────────`,
          `  │ Chain:  ${project.chain}`,
          `  │ Type:   ${project.type}`,
          `  │ Status: ${project.status}`,
          `  │`,
          `  │ ${project.description}`,
          `  │`,
          `  │ Tech: ${project.tech.join(' · ')}`,
          `  │ GitHub: ${project.githubUrl}`,
          `  │ Live:   ${project.liveUrl}`,
          `  └──────────────────────────────────────────────`,
          '',
        ]);
      } else {
        pushOutput([`  Project "${name}" not found. Try: ls projects/`]);
      }
    } else if (lower === 'sudo hire me') {
      const stages = [
        '  [sudo] verifying credentials...',
        '  ██░░░░░░░░░░░░░░░░░░ 10%  Checking POW score...',
        '  ████████░░░░░░░░░░░░ 40%  Validating skill tree...',
        '  ████████████████░░░░ 80%  Cross-referencing projects...',
        '  ████████████████████ 100% ALL CHECKS PASSED',
        '',
        '  ✓ Transaction complete. Hire request approved.',
        '',
        '  Contact: anyadikedivine@gmail.com',
        '  Twitter: @anaborejustin',
        '  GitHub:  github.com/Sage-senpai',
        '',
      ];
      stages.forEach((line, i) => {
        setTimeout(() => {
          setHistory((prev) => [...prev, { type: 'output', text: line }]);
        }, i * 300);
      });
      return;
    } else if (lower === 'matrix') {
      setShowMatrix(true);
    } else if (lower === 'clear') {
      setHistory([]);
    } else if (trimmed === '') {
      // Empty enter
    } else {
      pushOutput([`  command not found: ${trimmed} · try 'help'`]);
    }
  }, [pushOutput]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      runCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length > 0) {
        const newIndex = cmdIndex < cmdHistory.length - 1 ? cmdIndex + 1 : cmdIndex;
        setCmdIndex(newIndex);
        setInput(cmdHistory[cmdHistory.length - 1 - newIndex] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (cmdIndex > 0) {
        const newIndex = cmdIndex - 1;
        setCmdIndex(newIndex);
        setInput(cmdHistory[cmdHistory.length - 1 - newIndex] || '');
      } else {
        setCmdIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (input === 'ls ') setInput('ls projects/');
      else if (input === 'open ') setInput(`open ${PROJECTS[0].name.toLowerCase()}`);
      else if (input === '') setInput('help');
    }
  };

  return (
    <div className="cto" onClick={() => inputRef.current?.focus()}>
      {showMatrix && <canvas ref={canvasRef} className="cto__matrix-canvas" />}

      <div className="cto__titlebar">
        <div className="cto__traffic-lights">
          <div className="cto__light cto__light--red" />
          <div className="cto__light cto__light--yellow" />
          <div className="cto__light cto__light--green" />
        </div>
        <span className="cto__titlebar-text">DIVINE-OS Terminal — v2.1.0</span>
        <BackButton onBack={onBack} />
      </div>

      <div className="cto__body" ref={bodyRef}>
        {history.map((line, i) => (
          <div key={i} className={`cto__line cto__line--${line.type}`}>
            {line.text}
          </div>
        ))}

        {ready && (
          <div className="cto__prompt-line">
            <span className="cto__prompt-user">divine</span>
            <span className="cto__prompt-path">@portfolio:~$ </span>
            <input
              ref={inputRef}
              className="cto__input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              spellCheck={false}
              autoComplete="off"
            />
            <div className="cto__cursor" />
          </div>
        )}
      </div>
    </div>
  );
}
