import React from 'react';

export interface IconProps {
  className?: string;
}

// 1. Python (Official dual snake logo)
export const PythonIcon: React.FC<IconProps> = ({ className = "size-7" }) => (
  <svg className={className} viewBox="0 0 128 128" fill="none">
    <path d="M63.5 8C40.6 8 42.1 18 42.1 18l.1 10.3h21.9v3.1H33.5C21.4 31.4 12 39.8 12 55.7c0 18.5 7.9 22.8 17.6 22.8h10.5V64.8c0-7.8 6.9-14.2 15.3-14.2h21.9c6.9 0 12.5-5.8 12.5-12.7V18c0-.1.3-10-26.3-10zm-11.8 7.3c2.6 0 4.7 2.1 4.7 4.7 0 2.6-2.1 4.7-4.7 4.7-2.6 0-4.7-2.1-4.7-4.7 0-2.6 2.1-4.7 4.7-4.7z" fill="url(#py-blue)" />
    <path d="M64.5 120c22.9 0 21.4-10 21.4-10l-.1-10.3H63.9v-3.1h30.6c12.1 0 21.5-8.4 21.5-24.3 0-18.5-7.9-22.8-17.6-22.8H87.9v13.7c0 7.8-6.9 14.2-15.3 14.2H50.7c-6.9 0-12.5 5.8-12.5 12.7V110s-.3 10 26.3 10zm11.8-7.3c-2.6 0-4.7-2.1-4.7-4.7 0-2.6 2.1-4.7 4.7-4.7 2.6 0 4.7 2.1 4.7 4.7 0 2.6-2.1 4.7-4.7 4.7z" fill="url(#py-yellow)" />
    <defs>
      <linearGradient id="py-blue" x1="12" y1="8" x2="84.9" y2="78.5" gradientUnits="userSpaceOnUse">
        <stop stopColor="#387EB8" />
        <stop offset="1" stopColor="#366994" />
      </linearGradient>
      <linearGradient id="py-yellow" x1="116" y1="120" x2="43.1" y2="49.5" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFE873" />
        <stop offset="1" stopColor="#FFD43B" />
      </linearGradient>
    </defs>
  </svg>
);

// 2. React (Official cyan atom logo)
export const ReactIcon: React.FC<IconProps> = ({ className = "size-7" }) => (
  <svg className={className} viewBox="-11.5 -10.23174 23 20.46348" fill="none">
    <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
    <g stroke="#61DAFB" strokeWidth="1" fill="none">
      <ellipse rx="11" ry="4.2" />
      <ellipse rx="11" ry="4.2" transform="rotate(60)" />
      <ellipse rx="11" ry="4.2" transform="rotate(120)" />
    </g>
  </svg>
);

// 3. TypeScript (Official blue TS square)
export const TypeScriptIcon: React.FC<IconProps> = ({ className = "size-7" }) => (
  <svg className={className} viewBox="0 0 128 128">
    <rect width="128" height="128" rx="20" fill="#3178C6" />
    <path d="M72.9 83.4c2.8 4.2 6.7 6.6 12 6.6 5 0 8.3-2.5 8.3-6.1 0-4.2-3.4-5.8-9.6-8.5-8.8-3.7-14.7-8.3-14.7-17.7 0-9.8 7.6-17.2 19.4-17.2 8.1 0 14.1 2.8 18.2 8.9l-8.6 5.5c-2.4-3.6-5.2-4.9-9.6-4.9-4.3 0-7.2 2.3-7.2 5.5 0 3.6 3.1 5.1 9.4 7.7 9.8 4.1 15.1 8.8 15.1 18.5 0 11.2-8.6 18.2-20.9 18.2-10.2 0-17.7-3.9-22-11.4l10.2-6.6zM27 52.8h37.4v10.3H49.1v49.4H37.3V63.1H27V52.8z" fill="#FFF" />
  </svg>
);

// 4. Next.js (Official N logo)
export const NextjsIcon: React.FC<IconProps> = ({ className = "size-7" }) => (
  <svg className={className} viewBox="0 0 180 180" fill="none">
    <circle cx="90" cy="90" r="86" fill="#000" stroke="#FFF" strokeWidth="6" />
    <path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="url(#next-grad)" />
    <rect x="115" y="54" width="12" height="72" fill="url(#next-grad2)" />
    <defs>
      <linearGradient id="next-grad" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFF" />
        <stop offset="1" stopColor="#FFF" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="next-grad2" x1="121" y1="54" x2="120.799" y2="106.875" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFF" />
        <stop offset="1" stopColor="#FFF" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);

// 5. Node.js (Official Hexagon)
export const NodejsIcon: React.FC<IconProps> = ({ className = "size-7" }) => (
  <svg className={className} viewBox="0 0 128 128" fill="none">
    <path d="M64 8l52 30v60l-52 30-52-30V38l52-30z" fill="#339933" />
    <path d="M64 16.5L108 42v51.5L64 119 20 93.5V42L64 16.5z" fill="#026E00" />
    <path d="M64 34c11.5 0 17 6.4 17 14.5 0 14.5-20.2 12.3-20.2 21.4 0 3.2 2.7 5.1 7.2 5.1 6.3 0 11.2-2.8 15.5-6.5l4.3 6.6c-5.2 4.7-12 7.7-19.8 7.7-11.2 0-16.7-6.5-16.7-14.7 0-14.3 20.3-12.7 20.3-21.3 0-2.8-2.3-4.7-6.5-4.7-5.5 0-10.2 2.3-14.5 5.7l-4.5-6.7c5.6-4.9 12.3-7.1 17.9-7.1z" fill="#FFF" />
  </svg>
);

// 6. Tailwind CSS (Official wave logo)
export const TailwindIcon: React.FC<IconProps> = ({ className = "size-7" }) => (
  <svg className={className} viewBox="0 0 128 128" fill="none">
    <path d="M32 48c6.4-12.8 16-16 28.8-9.6 7.4 3.7 12.8 9.1 18.6 15 9.6 9.6 20.8 20.8 45 20.8 12.8 0 22.4-9.6 28.8-28.8-6.4 12.8-16 16-28.8 9.6-7.4-3.7-12.8-9.1-18.6-15C96.2 30.4 85 19.2 60.8 19.2c-12.8 0-22.4 9.6-28.8 28.8zM3.2 96C9.6 83.2 19.2 80 32 86.4c7.4 3.7 12.8 9.1 18.6 15 9.6 9.6 20.8 20.8 45 20.8 12.8 0 22.4-9.6 28.8-28.8-6.4 12.8-16 16-28.8 9.6-7.4-3.7-12.8-9.1-18.6-15-9.6-9.6-20.8-20.8-45-20.8-12.8 0-22.4 9.6-28.8 28.8z" fill="#38BDF8" />
  </svg>
);

// 7. FastAPI (Official lightning star logo)
export const FastAPIIcon: React.FC<IconProps> = ({ className = "size-7" }) => (
  <svg className={className} viewBox="0 0 128 128" fill="none">
    <circle cx="64" cy="64" r="56" fill="#009688" />
    <path d="M68 24L36 72h24l-8 32 40-52H68l8-28z" fill="#FFF" />
  </svg>
);

// 8. PostgreSQL (Official Elephant)
export const PostgresIcon: React.FC<IconProps> = ({ className = "size-7" }) => (
  <svg className={className} viewBox="0 0 128 128" fill="none">
    <path d="M64 12c-26.5 0-48 21.5-48 48 0 18.8 10.9 35.1 26.8 43-1.2-3.8-1.8-8-1.8-12.5 0-14.4 7.6-26.9 19-34-2.8-4.1-4.5-9.1-4.5-14.5 0-14.4 11.6-26 26-26s26 11.6 26 26c0 5.4-1.7 10.4-4.5 14.5 11.4 7.1 19 19.6 19 34 0 4.5-.6 8.7-1.8 12.5 15.9-7.9 26.8-24.2 26.8-43 0-26.5-21.5-48-48-48z" fill="#336791" />
    <circle cx="56" cy="46" r="4" fill="#FFF" />
    <circle cx="72" cy="46" r="4" fill="#FFF" />
    <path d="M64 54v14m-8-4l8 4 8-4" stroke="#FFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// 9. MongoDB (Official Leaf)
export const MongoIcon: React.FC<IconProps> = ({ className = "size-7" }) => (
  <svg className={className} viewBox="0 0 128 128" fill="none">
    <path d="M64 6C61 7.5 30 45 30 75.5c0 23 16 39.5 34 46.5 18-7 34-23.5 34-46.5C98 45 67 7.5 64 6z" fill="#47A248" />
    <path d="M64 6v116c18-7 34-23.5 34-46.5C98 45 67 7.5 64 6z" fill="#499D4A" />
    <path d="M64 117c-.5 0-1-.2-1.4-.6-2.2-2.2-2.1-7.8-2.1-8.2 0-12.7 7.5-23.5 7.5-38.2 0-9.8-3.4-18.7-4-24.6 0-.3-.1-.5-.1-.7.2-2.3 2.1-4.4 2.1-4.4s.2 1.6.3 2.6c1.1 9.4 5.3 17.6 5.3 27.1 0 15.1-7.6 26.3-7.6 38.8 0 .4 0 5.4-2.2 7.7-.4.3-.8.5-1.4.5h-.1z" fill="#FFF" opacity="0.8" />
  </svg>
);

// 10. Supabase (Official emerald lightning)
export const SupabaseIcon: React.FC<IconProps> = ({ className = "size-7" }) => (
  <svg className={className} viewBox="0 0 128 128" fill="none">
    <path d="M72.2 119.4c-2.3 3.1-7.4 1.7-7.7-2.1L60 70H18.6c-4.2 0-6.6-4.8-4-8.2L55.8 8.6c2.3-3.1 7.4-1.7 7.7 2.1L68 58h41.4c4.2 0 6.6 4.8 4 8.2l-41.2 53.2z" fill="url(#supabase-grad)" />
    <defs>
      <linearGradient id="supabase-grad" x1="16" y1="8" x2="112" y2="120" gradientUnits="userSpaceOnUse">
        <stop stopColor="#24E498" />
        <stop offset="1" stopColor="#3ECF8E" />
      </linearGradient>
    </defs>
  </svg>
);

// 11. Docker (Official whale)
export const DockerIcon: React.FC<IconProps> = ({ className = "size-7" }) => (
  <svg className={className} viewBox="0 0 128 128" fill="none">
    <path d="M124.5 59.8c-2.5-.9-10.4-1.7-14.7 2.1-.7.6-1.3 1.3-1.8 2.1-4.4-2.8-10.5-3.3-15.6-1.5-6.6 2.3-11.4 7.5-13.8 14.1-13.4.8-27 4.2-38.4 11.2-12.8 7.9-20.9 20.3-23.7 34.6-.3 1.5.8 2.9 2.3 2.9 23.3 0 45-6.5 63.8-18.4 17.5-11.1 27.9-28.7 28.5-49.4.1-1.3-.9-2.3-2.1-2.5-.2-.1-9.9-.4-14.5 4.8z" fill="#2496ED" />
    <g fill="#2496ED">
      <rect x="42" y="32" width="10" height="9" rx="1" />
      <rect x="54" y="32" width="10" height="9" rx="1" />
      <rect x="30" y="43" width="10" height="9" rx="1" />
      <rect x="42" y="43" width="10" height="9" rx="1" />
      <rect x="54" y="43" width="10" height="9" rx="1" />
      <rect x="66" y="43" width="10" height="9" rx="1" />
      <rect x="30" y="54" width="10" height="9" rx="1" />
      <rect x="42" y="54" width="10" height="9" rx="1" />
      <rect x="54" y="54" width="10" height="9" rx="1" />
      <rect x="66" y="54" width="10" height="9" rx="1" />
    </g>
  </svg>
);

// 12. Kubernetes (Official helm wheel)
export const KubernetesIcon: React.FC<IconProps> = ({ className = "size-7" }) => (
  <svg className={className} viewBox="0 0 128 128" fill="none">
    <circle cx="64" cy="64" r="56" fill="#326CE5" />
    <path d="M64 24l22 13v25l-22 13-22-13V37l22-13z" stroke="#FFF" strokeWidth="4" fill="none" />
    <circle cx="64" cy="64" r="9" fill="#FFF" />
    <path d="M64 24v16m22 21l14 8m-14 17l14 8m-36 5v16m-22-21l-14 8m14-17l-14-8m36-29V24" stroke="#FFF" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

// 13. Playwright (Official dual masks)
export const PlaywrightIcon: React.FC<IconProps> = ({ className = "size-7" }) => (
  <svg className={className} viewBox="0 0 128 128" fill="none">
    <path d="M48 20C26 20 16 38 16 64s14 44 32 44c18 0 24-14 24-28 0-10-6-16-14-16s-12 4-16 4-6-4-6-10c0-14 8-38 12-38z" fill="#2EAD33" />
    <circle cx="36" cy="52" r="5" fill="#FFF" />
    <path d="M80 20c22 0 32 18 32 44s-14 44-32 44c-18 0-24-14-24-28 0-10 6-16 14-16s12 4 16 4 6-4 6-10c0-14-8-38-12-38z" fill="#E65C40" />
    <circle cx="92" cy="52" r="5" fill="#FFF" />
  </svg>
);

// 14. Pytest (Official Flask)
export const PytestIcon: React.FC<IconProps> = ({ className = "size-7" }) => (
  <svg className={className} viewBox="0 0 128 128" fill="none">
    <path d="M54 16h20v24l28 56H26l28-56V16z" stroke="#0096D6" strokeWidth="8" strokeLinejoin="round" fill="#0096D6" fillOpacity="0.15" />
    <line x1="48" y1="16" x2="80" y2="16" stroke="#0096D6" strokeWidth="8" strokeLinecap="round" />
    <path d="M38 84h52l6 12H32l6-12z" fill="#FFE033" />
    <circle cx="56" cy="68" r="4" fill="#0096D6" />
    <circle cx="70" cy="56" r="3" fill="#FFE033" />
    <circle cx="68" cy="74" r="5" fill="#0096D6" />
  </svg>
);

// 15. Jest (Official clown shoe)
export const JestIcon: React.FC<IconProps> = ({ className = "size-7" }) => (
  <svg className={className} viewBox="0 0 128 128" fill="none">
    <path d="M28 32c10-14 26-16 38-6 10 8 16 22 14 36-2 14-12 24-24 26-14 2-28-4-32-18-4-14 0-28 4-38z" fill="#C21325" />
    <circle cx="36" cy="30" r="8" fill="#FFF" />
    <circle cx="66" cy="22" r="8" fill="#FFF" />
    <path d="M52 74c20 6 42-2 56-16 6-6 12-4 12 4s-10 24-24 32c-16 10-38 12-54 4l10-24z" fill="#99424F" />
  </svg>
);

// 16. Git (Official orange branching diamond)
export const GitIcon: React.FC<IconProps> = ({ className = "size-7" }) => (
  <svg className={className} viewBox="0 0 128 128" fill="none">
    <g transform="translate(64, 64) rotate(45) translate(-64, -64)">
      <rect x="20" y="20" width="88" height="88" rx="16" fill="#F05032" />
      <g transform="translate(64, 64) rotate(-45) translate(-64, -64)">
        <circle cx="48" cy="48" r="7" fill="#FFF" />
        <circle cx="48" cy="80" r="7" fill="#FFF" />
        <circle cx="80" cy="64" r="7" fill="#FFF" />
        <path d="M48 48v32M48 64a16 16 0 0 0 16 16h16" stroke="#FFF" strokeWidth="5" strokeLinecap="round" fill="none" />
      </g>
    </g>
  </svg>
);

// 17. Vercel (Official Triangle)
export const VercelIcon: React.FC<IconProps> = ({ className = "size-7" }) => (
  <svg className={className} viewBox="0 0 128 128" fill="none">
    <path d="M64 20L116 108H12L64 20Z" fill="#FFF" />
  </svg>
);

// 18. LangChain (Official Parrot / Linked Chain)
export const LangChainIcon: React.FC<IconProps> = ({ className = "size-7" }) => (
  <svg className={className} viewBox="0 0 128 128" fill="none">
    <circle cx="64" cy="64" r="54" fill="#00A67E" fillOpacity="0.15" stroke="#00A67E" strokeWidth="3" />
    <path d="M44 48c0-8.8 7.2-16 16-16h8c8.8 0 16 7.2 16 16v4h-10v-4c0-3.3-2.7-6-6-6h-8c-3.3 0-6 2.7-6 6v12c0 3.3 2.7 6 6 6h4v10h-4c-8.8 0-16-7.2-16-16V48z" fill="#00A67E" />
    <path d="M84 80c0 8.8-7.2 16-16 16h-8c-8.8 0-16-7.2-16-16v-4h10v4c0 3.3 2.7 6 6 6h8c3.3 0 6-2.7 6-6V68c0-3.3-2.7-6-6-6h-4V52h4c8.8 0 16 7.2 16 16v12z" fill="#00F0FF" />
  </svg>
);

// 19. MCP / Model Context Protocol (Anthropic Official Connected Tools)
export const MCPIcon: React.FC<IconProps> = ({ className = "size-7" }) => (
  <svg className={className} viewBox="0 0 128 128" fill="none">
    <circle cx="64" cy="64" r="54" stroke="#D97706" strokeWidth="3" fill="#D97706" fillOpacity="0.12" />
    <path d="M40 64h48M64 40v48M48 48l32 32M80 48L48 80" stroke="#00F0FF" strokeWidth="4" strokeLinecap="round" />
    <circle cx="64" cy="64" r="10" fill="#D97706" stroke="#FFF" strokeWidth="2.5" />
    <circle cx="40" cy="64" r="5" fill="#00F0FF" />
    <circle cx="88" cy="64" r="5" fill="#00F0FF" />
    <circle cx="64" cy="40" r="5" fill="#00F0FF" />
    <circle cx="64" cy="88" r="5" fill="#00F0FF" />
  </svg>
);

// 20. OpenAI / Groq / Gemini (Official AI spiral)
export const LLMApiIcon: React.FC<IconProps> = ({ className = "size-7" }) => (
  <svg className={className} viewBox="0 0 128 128" fill="none">
    <path d="M110 54a26 26 0 0 0-4.6-21.7 26.5 26.5 0 0 0-25-11.4 26.6 26.6 0 0 0-21.6-9.6 26.5 26.5 0 0 0-25 15.6 26.5 26.5 0 0 0-18.7 13.6 26.5 26.5 0 0 0 3.3 27.3 26 26 0 0 0 4.6 21.7 26.5 26.5 0 0 0 25 11.4 26.6 26.6 0 0 0 21.6 9.6 26.5 26.5 0 0 0 25-15.6 26.5 26.5 0 0 0 18.7-13.6 26.5 26.5 0 0 0-3.3-27.3z" stroke="#10A37F" strokeWidth="5" strokeLinejoin="round" fill="#10A37F" fillOpacity="0.15" />
    <path d="M64 46v36m-18-26l36 16m-36 0l36-16" stroke="#10A37F" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

// 21. RAG & CAG Architecture (Vector Knowledge retrieval)
export const RAGIcon: React.FC<IconProps> = ({ className = "size-7" }) => (
  <svg className={className} viewBox="0 0 128 128" fill="none">
    <circle cx="64" cy="64" r="54" stroke="#00F0FF" strokeWidth="3" fill="#00F0FF" fillOpacity="0.1" />
    <rect x="42" y="34" width="44" height="60" rx="8" stroke="#00F0FF" strokeWidth="3.5" fill="#030816" />
    <line x1="52" y1="48" x2="76" y2="48" stroke="#00F0FF" strokeWidth="3" strokeLinecap="round" />
    <line x1="52" y1="60" x2="76" y2="60" stroke="#FFF" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="52" y1="72" x2="68" y2="72" stroke="#FFF" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M78 78l18 18" stroke="#38BDF8" strokeWidth="4" strokeLinecap="round" />
    <circle cx="76" cy="76" r="10" stroke="#38BDF8" strokeWidth="3.5" fill="#00F0FF" fillOpacity="0.3" />
  </svg>
);

// 22. Agentic AI & Multi-Agent (Autonomous Nodes)
export const AgenticIcon: React.FC<IconProps> = ({ className = "size-7" }) => (
  <svg className={className} viewBox="0 0 128 128" fill="none">
    <circle cx="64" cy="34" r="13" fill="#00F0FF" fillOpacity="0.25" stroke="#00F0FF" strokeWidth="3" />
    <circle cx="34" cy="86" r="13" fill="#3B82F6" fillOpacity="0.25" stroke="#3B82F6" strokeWidth="3" />
    <circle cx="94" cy="86" r="13" fill="#10B981" fillOpacity="0.25" stroke="#10B981" strokeWidth="3" />
    <circle cx="64" cy="64" r="8" fill="#FFF" />
    <line x1="64" y1="47" x2="64" y2="56" stroke="#00F0FF" strokeWidth="3" />
    <line x1="45" y1="78" x2="57" y2="69" stroke="#3B82F6" strokeWidth="3" />
    <line x1="83" y1="78" x2="71" y2="69" stroke="#10B981" strokeWidth="3" />
    <circle cx="64" cy="34" r="4" fill="#00F0FF" />
    <circle cx="34" cy="86" r="4" fill="#3B82F6" />
    <circle cx="94" cy="86" r="4" fill="#10B981" />
  </svg>
);

// 23. YOLO / Computer Vision (Ultralytics Vision Target)
export const YOLOIcon: React.FC<IconProps> = ({ className = "size-7" }) => (
  <svg className={className} viewBox="0 0 128 128" fill="none">
    <rect x="22" y="22" width="84" height="84" rx="14" stroke="#00F0FF" strokeWidth="3" strokeDasharray="10 6" fill="#00F0FF" fillOpacity="0.08" />
    <circle cx="64" cy="64" r="24" stroke="#EF4444" strokeWidth="3.5" fill="none" />
    <circle cx="64" cy="64" r="6" fill="#EF4444" />
    <line x1="64" y1="32" x2="64" y2="44" stroke="#EF4444" strokeWidth="3" />
    <line x1="64" y1="84" x2="64" y2="96" stroke="#EF4444" strokeWidth="3" />
    <line x1="32" y1="64" x2="44" y2="64" stroke="#EF4444" strokeWidth="3" />
    <line x1="84" y1="64" x2="96" y2="64" stroke="#EF4444" strokeWidth="3" />
  </svg>
);

// 24. FAISS & Vector Embeddings
export const FAISSIcon: React.FC<IconProps> = ({ className = "size-7" }) => (
  <svg className={className} viewBox="0 0 128 128" fill="none">
    <circle cx="36" cy="40" r="6" fill="#38BDF8" />
    <circle cx="70" cy="30" r="7" fill="#00F0FF" />
    <circle cx="92" cy="52" r="5" fill="#38BDF8" />
    <circle cx="48" cy="74" r="8" fill="#00F0FF" />
    <circle cx="84" cy="88" r="6" fill="#818CF8" />
    <circle cx="30" cy="96" r="5" fill="#818CF8" />
    <line x1="36" y1="40" x2="70" y2="30" stroke="#00F0FF" strokeWidth="2" strokeOpacity="0.5" />
    <line x1="70" y1="30" x2="92" y2="52" stroke="#00F0FF" strokeWidth="2" strokeOpacity="0.5" />
    <line x1="70" y1="30" x2="48" y2="74" stroke="#00F0FF" strokeWidth="2" strokeOpacity="0.7" />
    <line x1="48" y1="74" x2="84" y2="88" stroke="#818CF8" strokeWidth="2" strokeOpacity="0.6" />
    <line x1="48" y1="74" x2="30" y2="96" stroke="#818CF8" strokeWidth="2" strokeOpacity="0.5" />
  </svg>
);

// 25. Prompt & Skill Design
export const PromptDesignIcon: React.FC<IconProps> = ({ className = "size-7" }) => (
  <svg className={className} viewBox="0 0 128 128" fill="none">
    <circle cx="64" cy="64" r="54" stroke="#A855F7" strokeWidth="3" fill="#A855F7" fillOpacity="0.12" />
    <path d="M38 42h52v44H38z" rx="6" stroke="#C084FC" strokeWidth="3" fill="#0d0818" />
    <path d="M48 54l8 8-8 8m14 0h16" stroke="#00F0FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// 26. REST APIs & Microservices
export const MicroservicesIcon: React.FC<IconProps> = ({ className = "size-7" }) => (
  <svg className={className} viewBox="0 0 128 128" fill="none">
    <rect x="24" y="24" width="34" height="34" rx="8" fill="#6366F1" fillOpacity="0.25" stroke="#6366F1" strokeWidth="3" />
    <rect x="70" y="24" width="34" height="34" rx="8" fill="#3B82F6" fillOpacity="0.25" stroke="#3B82F6" strokeWidth="3" />
    <rect x="24" y="70" width="34" height="34" rx="8" fill="#00F0FF" fillOpacity="0.25" stroke="#00F0FF" strokeWidth="3" />
    <rect x="70" y="70" width="34" height="34" rx="8" fill="#10B981" fillOpacity="0.25" stroke="#10B981" strokeWidth="3" />
    <path d="M58 41h12M41 58v12M87 58v12M58 87h12" stroke="#FFF" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

// 27. Message Queues & Streams
export const MessageQueueIcon: React.FC<IconProps> = ({ className = "size-7" }) => (
  <svg className={className} viewBox="0 0 128 128" fill="none">
    <rect x="20" y="32" width="88" height="20" rx="6" fill="#F59E0B" fillOpacity="0.2" stroke="#F59E0B" strokeWidth="3" />
    <rect x="20" y="58" width="88" height="20" rx="6" fill="#F59E0B" fillOpacity="0.3" stroke="#F59E0B" strokeWidth="3" />
    <rect x="20" y="84" width="88" height="20" rx="6" fill="#F59E0B" fillOpacity="0.4" stroke="#F59E0B" strokeWidth="3" />
    <circle cx="36" cy="42" r="4" fill="#00F0FF" />
    <circle cx="56" cy="42" r="4" fill="#00F0FF" />
    <circle cx="76" cy="42" r="4" fill="#00F0FF" />
    <path d="M96 68l12-10-12-10" stroke="#00F0FF" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// 28. WebSocket (Real-Time bidirectional)
export const WebSocketIcon: React.FC<IconProps> = ({ className = "size-7" }) => (
  <svg className={className} viewBox="0 0 128 128" fill="none">
    <circle cx="64" cy="64" r="54" stroke="#6366F1" strokeWidth="3" strokeDasharray="8 6" />
    <path d="M34 50h44l-10-12m26 40H50l10 12" stroke="#00F0FF" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="34" cy="50" r="4.5" fill="#00F0FF" />
    <circle cx="94" cy="78" r="4.5" fill="#00F0FF" />
  </svg>
);

// 29. Zod Schema Validation
export const ZodIcon: React.FC<IconProps> = ({ className = "size-7" }) => (
  <svg className={className} viewBox="0 0 128 128" fill="none">
    <path d="M64 14L22 34v34c0 28 19 44 42 50 23-6 42-22 42-50V34L64 14z" fill="#3068B7" fillOpacity="0.25" stroke="#3068B7" strokeWidth="4" />
    <path d="M46 48h36L52 80h30" stroke="#FFF" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// 30. JWT / OAuth & RBAC
export const JWTIcon: React.FC<IconProps> = ({ className = "size-7" }) => (
  <svg className={className} viewBox="0 0 128 128" fill="none">
    <circle cx="64" cy="64" r="48" stroke="#FB015B" strokeWidth="6" strokeDasharray="74 22" />
    <circle cx="64" cy="64" r="34" stroke="#00B9F1" strokeWidth="5" strokeDasharray="52 18" />
    <circle cx="64" cy="64" r="20" stroke="#D63AFF" strokeWidth="4" />
    <circle cx="64" cy="64" r="5" fill="#FFF" />
  </svg>
);

// 31. Payment Gateways / Stripe
export const PaymentGatewayIcon: React.FC<IconProps> = ({ className = "size-7" }) => (
  <svg className={className} viewBox="0 0 128 128" fill="none">
    <rect x="18" y="32" width="92" height="64" rx="10" fill="#635BFF" fillOpacity="0.2" stroke="#635BFF" strokeWidth="3.5" />
    <line x1="18" y1="50" x2="110" y2="50" stroke="#635BFF" strokeWidth="6" />
    <rect x="30" y="70" width="22" height="12" rx="3" fill="#00F0FF" />
    <circle cx="82" cy="76" r="6" fill="#F59E0B" />
    <circle cx="92" cy="76" r="6" fill="#EF4444" fillOpacity="0.8" />
  </svg>
);

// 32. shadcn/ui
export const ShadcnIcon: React.FC<IconProps> = ({ className = "size-7" }) => (
  <svg className={className} viewBox="0 0 256 256" fill="none">
    <path d="M208 128l-80 80M192 40L40 192" stroke="#FFF" strokeWidth="24" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// 33. Performance Optimization (Lighthouse Speedometer)
export const PerformanceIcon: React.FC<IconProps> = ({ className = "size-7" }) => (
  <svg className={className} viewBox="0 0 128 128" fill="none">
    <circle cx="64" cy="64" r="54" stroke="#10B981" strokeWidth="3" fill="#10B981" fillOpacity="0.12" />
    <path d="M30 84 A 44 44 0 1 1 98 84" stroke="#10B981" strokeWidth="6" strokeLinecap="round" fill="none" />
    <line x1="64" y1="64" x2="88" y2="42" stroke="#00F0FF" strokeWidth="4.5" strokeLinecap="round" />
    <circle cx="64" cy="64" r="7" fill="#00F0FF" />
  </svg>
);

// 34. Responsive Systems
export const ResponsiveIcon: React.FC<IconProps> = ({ className = "size-7" }) => (
  <svg className={className} viewBox="0 0 128 128" fill="none">
    <rect x="18" y="26" width="62" height="46" rx="6" stroke="#38BDF8" strokeWidth="3" fill="#0a1226" />
    <line x1="38" y1="72" x2="60" y2="72" stroke="#38BDF8" strokeWidth="3" />
    <line x1="49" y1="72" x2="49" y2="80" stroke="#38BDF8" strokeWidth="3" />
    <line x1="34" y1="80" x2="64" y2="80" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
    <rect x="70" y="44" width="40" height="60" rx="8" stroke="#00F0FF" strokeWidth="3.5" fill="#040814" />
    <line x1="84" y1="96" x2="96" y2="96" stroke="#00F0FF" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

// 35. Component Architecture
export const ComponentIcon: React.FC<IconProps> = ({ className = "size-7" }) => (
  <svg className={className} viewBox="0 0 128 128" fill="none">
    <rect x="22" y="22" width="38" height="38" rx="8" fill="#3B82F6" fillOpacity="0.3" stroke="#3B82F6" strokeWidth="3" />
    <rect x="68" y="22" width="38" height="38" rx="8" fill="#00F0FF" fillOpacity="0.3" stroke="#00F0FF" strokeWidth="3" />
    <rect x="22" y="68" width="38" height="38" rx="8" fill="#10B981" fillOpacity="0.3" stroke="#10B981" strokeWidth="3" />
    <rect x="68" y="68" width="38" height="38" rx="8" fill="#A855F7" fillOpacity="0.3" stroke="#A855F7" strokeWidth="3" />
    <circle cx="41" cy="41" r="5" fill="#FFF" />
    <circle cx="87" cy="41" r="5" fill="#FFF" />
    <circle cx="41" cy="87" r="5" fill="#FFF" />
    <circle cx="87" cy="87" r="5" fill="#FFF" />
  </svg>
);

// 36. SQLite (Official blue database cylinders)
export const SQLiteIcon: React.FC<IconProps> = ({ className = "size-7" }) => (
  <svg className={className} viewBox="0 0 128 128" fill="none">
    <path d="M32 28C32 20 46 14 64 14s32 6 32 14v72c0 8-14 14-32 14s-32-6-32-14V28z" fill="#003B57" fillOpacity="0.3" stroke="#003B57" strokeWidth="4" />
    <ellipse cx="64" cy="28" rx="32" ry="14" fill="#003B57" stroke="#38BDF8" strokeWidth="2.5" />
    <path d="M32 52c0 8 14 14 32 14s32-6 32-14" stroke="#38BDF8" strokeWidth="2.5" />
    <path d="M32 76c0 8 14 14 32 14s32-6 32-14" stroke="#38BDF8" strokeWidth="2.5" />
  </svg>
);

// 37. Agile / Scrum Delivery
export const AgileIcon: React.FC<IconProps> = ({ className = "size-7" }) => (
  <svg className={className} viewBox="0 0 128 128" fill="none">
    <path d="M64 20 A 44 44 0 1 1 20 64" stroke="#00F0FF" strokeWidth="5" strokeLinecap="round" fill="none" />
    <path d="M20 50l0 14 14 0" stroke="#00F0FF" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="64" cy="64" r="8" fill="#3B82F6" />
    <line x1="64" y1="40" x2="64" y2="56" stroke="#FFF" strokeWidth="3" strokeLinecap="round" />
    <line x1="64" y1="64" x2="76" y2="64" stroke="#FFF" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

// Dynamic icon resolution
export const getSkillOriginIcon = (name: string): React.FC<IconProps> => {
  const lower = name.toLowerCase();

  // AI & Multi-Agent
  if (lower.includes('rag') || lower.includes('cag')) return RAGIcon;
  if (lower.includes('agentic') || lower.includes('multi-agent')) return AgenticIcon;
  if (lower.includes('mcp')) return MCPIcon;
  if (lower.includes('langchain')) return LangChainIcon;
  if (lower.includes('faiss') || lower.includes('vector')) return FAISSIcon;
  if (lower.includes('llm') || lower.includes('groq') || lower.includes('openai') || lower.includes('gemini')) return LLMApiIcon;
  if (lower.includes('yolo') || lower.includes('computer vision')) return YOLOIcon;
  if (lower.includes('prompt') || lower.includes('skill design')) return PromptDesignIcon;

  // Backend
  if (lower.includes('python') || lower.includes('fastapi')) return PythonIcon;
  if (lower.includes('node.js') || lower.includes('express')) return NodejsIcon;
  if (lower.includes('rest api') || lower.includes('microservices')) return MicroservicesIcon;
  if (lower.includes('queue') || lower.includes('stream')) return MessageQueueIcon;
  if (lower.includes('websocket')) return WebSocketIcon;
  if (lower.includes('jwt') || lower.includes('oauth') || lower.includes('rbac')) return JWTIcon;
  if (lower.includes('payment')) return PaymentGatewayIcon;
  if (lower.includes('zod')) return ZodIcon;

  // Frontend
  if (lower.includes('typescript')) return TypeScriptIcon;
  if (lower.includes('react')) return ReactIcon;
  if (lower.includes('next.js') || lower.includes('nextjs')) return NextjsIcon;
  if (lower.includes('tailwind')) return TailwindIcon;
  if (lower.includes('shadcn')) return ShadcnIcon;
  if (lower.includes('performance') || lower.includes('cwv')) return PerformanceIcon;
  if (lower.includes('responsive')) return ResponsiveIcon;
  if (lower.includes('component')) return ComponentIcon;

  // Databases
  if (lower.includes('postgres')) return PostgresIcon;
  if (lower.includes('mongo')) return MongoIcon;
  if (lower.includes('supabase')) return SupabaseIcon;
  if (lower.includes('sqlite') || lower.includes('sql')) return SQLiteIcon;

  // DevOps & Testing
  if (lower.includes('playwright')) return PlaywrightIcon;
  if (lower.includes('pytest')) return PytestIcon;
  if (lower.includes('jest')) return JestIcon;
  if (lower.includes('docker')) return DockerIcon;
  if (lower.includes('kubernetes')) return KubernetesIcon;
  if (lower.includes('vercel')) return VercelIcon;
  if (lower.includes('git')) return GitIcon;
  if (lower.includes('agile') || lower.includes('scrum')) return AgileIcon;

  return RAGIcon;
};
