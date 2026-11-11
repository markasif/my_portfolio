import React, { useEffect, useRef, useState } from 'react';
import Button from './Button';
import SectionHeader from './SectionHeader';
import { gsap, ScrollTrigger } from '../lib/gsap';

const SERVICE_OPTIONS = [
  'AI & RAG Systems',
  'Agentic AI & MCP',
  'Full Stack Web',
  'Real-Time CRM & Dashboards',
  'E-Commerce Solutions',
  'Other',
];

const Contact: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const otherInputRef = useRef<HTMLInputElement>(null);
  const [selectedServices, setSelectedServices] = useState<string[]>(['AI & RAG Systems']);
  const [otherText, setOtherText] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    message: ''
  });

  // Calculate dynamic completion progress
  const calculateProgress = () => {
    let completed = 0;
    const total = 4;
    if (formData.name.trim().length > 0) completed++;
    if (formData.contact.trim().length > 0) completed++;
    if (selectedServices.length > 0) completed++;
    if (formData.message.trim().length > 0) completed++;
    if (completed === 0) return 25;
    return Math.round((completed / total) * 100);
  };

  const progressPercent = calculateProgress();
  const radius = 15;
  const circumference = 2 * Math.PI * radius; // ~94.25
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  const toggleService = (srv: string) => {
    setSelectedServices(prev => {
      if (prev.includes(srv)) {
        return prev.filter(item => item !== srv);
      } else {
        return [...prev, srv];
      }
    });
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const form = container.querySelector('.contact-form-container');
    if (!form) return;

    // Set initial hidden state so form is hidden before user reaches Contact
    gsap.set(form, {
      y: 50,
      opacity: 0,
      scale: 0.96,
    });

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          // Unobserve immediately: plays ONCE on reach, never replays on scroll back
          observer.unobserve(entry.target);

          gsap.to(form, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
          });
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(form);

    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const phoneNumber = "+919567526150";
    const servicesList = selectedServices
      .map(s => s === 'Other' ? (otherText.trim() ? `Other: ${otherText.trim()}` : 'Other') : s)
      .join(', ');
    const rawMessage = `*NEW PROJECT INQUIRY*\n--------------------\n*NAME:* ${formData.name}\n*CONTACT:* ${formData.contact}\n*SERVICES:* ${servicesList || 'General Inquiry'}\n*MESSAGE:* ${formData.message}`;
    const text = encodeURIComponent(rawMessage);
    window.open(`https://wa.me/${phoneNumber}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contact" ref={containerRef} className="relative flex h-auto w-full flex-col bg-transparent py-8 md:py-10 lg:py-12 xl:py-14 px-6 md:px-8 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12 relative z-10 items-stretch">

        {/* Left Column: Narrative & Direct Channels */}
        <div className="contact-header flex flex-col items-start justify-between lg:w-2/5 pb-2">
          <SectionHeader
            badge="PROJECT INQUIRY"
            title={<>Get In <span className="text-gradient">Touch</span></>}
            description="Looking to develop enterprise agentic AI systems, custom MCP tools, real-time dashboards, or scalable web platforms? Let's build together."
            descriptionClassName="max-w-md"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 sm:gap-5 w-full pt-8 lg:pt-0">
            {/* Email */}
            <a href="mailto:apasif243@gmail.com" className="flex items-center gap-5 group cursor-pointer transition-transform hover:translate-x-1">
              <div className="size-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary border border-primary/10 group-hover:bg-primary group-hover:text-slate-950 transition-all duration-500 shadow-[0_0_12px_rgba(0,240,255,0.1)]">
                <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.272H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-400 mb-0.5">EMAIL_ID</span>
                <span className="text-sm font-bold text-slate-700 dark:text-slate-200">apasif243@gmail.com</span>
              </div>
            </a>

            {/* LinkedIn */}
            <a href="https://www.linkedin.com/in/asifap/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-5 group cursor-pointer transition-transform hover:translate-x-1">
              <div className="size-10 rounded-xl bg-blue-500/5 flex items-center justify-center text-blue-400 border border-blue-500/10 group-hover:bg-[#0A66C2] group-hover:text-white transition-all duration-500">
                <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.77v8.37H6.46v-8.37M7.85 6.4a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-400 mb-0.5">LINKEDIN</span>
                <span className="text-sm font-bold text-slate-700 dark:text-slate-200">linkedin.com/in/asifap</span>
              </div>
            </a>

            {/* GitHub */}
            <a href="https://github.com/markasif" target="_blank" rel="noopener noreferrer" className="flex items-center gap-5 group cursor-pointer transition-transform hover:translate-x-1">
              <div className="size-10 rounded-xl bg-slate-500/5 flex items-center justify-center text-slate-400 border border-slate-500/10 group-hover:bg-slate-900 group-hover:text-white transition-all duration-500">
                <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-400 mb-0.5">GITHUB</span>
                <span className="text-sm font-bold text-slate-700 dark:text-slate-200">github.com/markasif</span>
              </div>
            </a>

            {/* Telegram */}
            <a href="https://t.me/telmeasif" target="_blank" rel="noopener noreferrer" className="flex items-center gap-5 group cursor-pointer transition-transform hover:translate-x-1">
              <div className="size-10 rounded-xl bg-sky-500/5 flex items-center justify-center text-sky-400 border border-sky-500/10 group-hover:bg-[#229ED9] group-hover:text-white transition-all duration-500">
                <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-400 mb-0.5">TELEGRAM</span>
                <span className="text-sm font-bold text-slate-700 dark:text-slate-200">@telmeasif</span>
              </div>
            </a>

            {/* WhatsApp / Phone */}
            <a href="https://wa.me/+919567526150" target="_blank" rel="noopener noreferrer" className="flex items-center gap-5 group cursor-pointer transition-transform hover:translate-x-1">
              <div className="size-10 rounded-xl bg-emerald-500/5 flex items-center justify-center text-emerald-400 border border-emerald-500/10 group-hover:bg-[#25D366] group-hover:text-white transition-all duration-500">
                <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.276-.1-.477-.15-.678.15-.2.301-.778.978-.954 1.179-.176.2-.351.226-.652.075s-1.27-.468-2.42-1.493c-.895-.798-1.5-1.784-1.676-2.085-.175-.301-.019-.464.132-.614.136-.135.301-.351.451-.527.151-.176.201-.301.301-.502.101-.2.051-.376-.025-.526-.075-.151-.678-1.633-.929-2.235-.244-.587-.492-.507-.678-.516-.175-.009-.376-.011-.577-.011s-.527.075-.803.376c-.276.301-1.054 1.03-1.054 2.512s1.079 2.913 1.23 3.114c.15.201 2.123 3.242 5.143 4.547.718.31 1.279.496 1.716.635.722.23 1.379.197 1.9.12.579-.087 1.78-.727 2.031-1.43.251-.703.251-1.305.176-1.43-.076-.126-.277-.201-.578-.352zM12.04 2C6.54 2 2.07 6.47 2.07 11.97c0 1.94.55 3.82 1.6 5.43L2 22l4.74-1.63c1.55.95 3.34 1.48 5.3 1.48 5.5 0 9.97-4.47 9.97-9.97 0-5.5-4.47-9.88-9.97-9.88zm0 18.25c-1.74 0-3.41-.5-4.85-1.44l-.35-.23-2.82.97.98-2.75-.24-.38a8.216 8.216 0 0 1-1.28-4.45c0-4.57 3.72-8.29 8.29-8.29 4.57 0 8.29 3.72 8.29 8.29 0 4.58-3.72 8.29-8.29 8.29z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-400 mb-0.5">WHATSAPP / PHONE</span>
                <span className="text-sm font-bold text-slate-700 dark:text-slate-200">+91 9567526150</span>
              </div>
            </a>
          </div>
        </div>

        {/* Right Column: Contact Card with No Shadow & Clean Line Inputs */}
        <div className="contact-form-container lg:w-3/5 relative flex flex-col justify-center">
          {/* Form Card: Shadow Removed, WebMCP & Schema.org Instrumented */}
          <form
            name="contact_inquiry"
            itemScope
            itemType="https://schema.org/ContactAction"
            data-mcp-tool="submit_project_inquiry"
            data-mcp-description="Direct project inquiry form to contact Mohammed Asif with name, email, target AI/Web services, and project details via WhatsApp."
            onSubmit={handleSubmit}
            className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] bg-gradient-to-br from-[#00F0FF] via-[#00e1f0] to-[#00d0e6] p-6 sm:p-8 md:p-9 flex flex-col gap-5 sm:gap-6 text-slate-950"
          >
            {/* Circular Progress Ring in Top-Right Corner */}
            <div 
              className="absolute top-5 right-5 sm:top-7 sm:right-7 z-20 flex items-center justify-center pointer-events-none"
              title={`Progress: ${progressPercent}%`}
            >
              <div className="relative size-9 sm:size-10 flex items-center justify-center">
                <svg className="size-full -rotate-90" viewBox="0 0 36 36">
                  {/* Background Track */}
                  <circle
                    cx="18"
                    cy="18"
                    r={radius}
                    stroke="currentColor"
                    strokeWidth="2.5"
                    fill="transparent"
                    className="text-slate-950/20"
                  />
                  {/* Dynamic Progress Arc */}
                  <circle
                    cx="18"
                    cy="18"
                    r={radius}
                    stroke="currentColor"
                    strokeWidth="2.5"
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    className="text-slate-950 transition-all duration-500 ease-out"
                  />
                </svg>
                {/* Center Percentage / Checkmark */}
                <span className="absolute text-[8px] sm:text-[9px] font-mono font-black text-slate-950">
                  {progressPercent === 100 ? '✓' : `${progressPercent}%`}
                </span>
              </div>
            </div>

            {/* Inputs Grid: Full Name & Email Address side-by-side with Line Design */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 pr-12 md:pr-14">
              {/* Full Name */}
              <div className="flex flex-col gap-1 group">
                <label htmlFor="contact-name" className="text-sm sm:text-base font-semibold text-slate-950/90 group-focus-within:text-slate-950 transition-colors">
                  Full Name
                </label>
                <input
                  id="contact-name"
                  required
                  type="text"
                  name="name"
                  autoComplete="name"
                  placeholder="e.g. John Doe"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-transparent border-b border-slate-950/30 focus:border-slate-950 py-1.5 sm:py-2 text-sm sm:text-base font-medium text-slate-950 placeholder:text-slate-950/35 outline-none transition-colors"
                />
              </div>

              {/* Email Address */}
              <div className="flex flex-col gap-1 group">
                <label htmlFor="contact-email" className="text-sm sm:text-base font-semibold text-slate-950/90 group-focus-within:text-slate-950 transition-colors">
                  Email Address
                </label>
                <input
                  id="contact-email"
                  required
                  type="email"
                  name="contact"
                  autoComplete="email"
                  placeholder="you@company.com"
                  value={formData.contact}
                  onChange={handleInputChange}
                  className="w-full bg-transparent border-b border-slate-950/30 focus:border-slate-950 py-1.5 sm:py-2 text-sm sm:text-base font-medium text-slate-950 placeholder:text-slate-950/35 outline-none transition-colors"
                />
              </div>
            </div>

            {/* Checkbox Services Grid with 'Other' as a Line Design */}
            <div className="flex flex-col gap-2 pt-1">
              <span className="text-sm sm:text-base font-semibold text-slate-950/90">
                I am interested in (Select Services)
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5">
                {SERVICE_OPTIONS.filter(s => s !== 'Other').map((s) => {
                  const isSelected = selectedServices.includes(s);

                  return (
                    <div
                      key={s}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={0}
                      onClick={() => toggleService(s)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          toggleService(s);
                        }
                      }}
                      className={`px-3 py-2 sm:py-2.5 rounded-xl text-xs font-bold tracking-wide border transition-all text-left flex items-center justify-between gap-1.5 cursor-pointer select-none ${
                        isSelected
                          ? 'bg-slate-950 text-white border-slate-950 shadow-md'
                          : 'bg-black/5 text-slate-950 border-slate-950/20 hover:bg-black/10 hover:border-slate-950/40'
                      }`}
                    >
                      <span className="truncate">{s}</span>

                      {/* Checkbox Indicator */}
                      <span
                        className={`size-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                          isSelected ? 'border-primary bg-primary' : 'border-slate-950/40'
                        }`}
                      >
                        {isSelected && (
                          <svg className="size-2.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3.5} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </span>
                    </div>
                  );
                })}

                {/* 6th Option: 'Other' with seamless inline text (No rectangle box) */}
                {selectedServices.includes('Other') ? (
                  <div className="px-3 py-2 sm:py-2.5 rounded-xl text-xs font-bold tracking-wide border transition-all text-left flex items-center justify-between gap-1.5 bg-slate-950 text-white border-slate-950 shadow-md min-h-[38px]">
                    <div className="flex items-center gap-1.5 w-full min-w-0">
                      <span className="text-xs font-bold text-white shrink-0">Other:</span>
                      <input
                        ref={otherInputRef}
                        type="text"
                        aria-label="Specify custom service requirement"
                        placeholder="Type here..."
                        value={otherText}
                        onChange={(e) => setOtherText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            (e.target as HTMLInputElement).blur();
                          }
                        }}
                        className="w-full bg-transparent border-0 border-none outline-none ring-0 focus:ring-0 focus:outline-none focus:border-none text-xs sm:text-sm font-semibold text-white placeholder:text-white/40 p-0 m-0 leading-tight transition-colors shadow-none"
                      />
                    </div>
                    <button
                      type="button"
                      role="checkbox"
                      aria-checked={true}
                      aria-label="Toggle Other service selection"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleService('Other');
                      }}
                      className="size-3.5 rounded-full border border-primary bg-primary flex items-center justify-center shrink-0 cursor-pointer transition-all"
                    >
                      <svg className="size-2.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div
                    role="checkbox"
                    aria-checked={false}
                    tabIndex={0}
                    onClick={() => {
                      toggleService('Other');
                      setTimeout(() => otherInputRef.current?.focus(), 50);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        toggleService('Other');
                        setTimeout(() => otherInputRef.current?.focus(), 50);
                      }
                    }}
                    className="px-3 py-2 sm:py-2.5 rounded-xl text-xs font-bold tracking-wide border transition-all text-left flex items-center justify-between gap-1.5 cursor-pointer select-none bg-black/5 text-slate-950 border-slate-950/20 hover:bg-black/10 hover:border-slate-950/40 min-h-[38px]"
                  >
                    <span>Other</span>
                    <span className="size-3.5 rounded-full border border-slate-950/40 shrink-0" />
                  </div>
                )}
              </div>
            </div>

            {/* Project Details Message */}
            <div className="flex flex-col gap-1 group pt-1">
              <label htmlFor="contact-message" className="text-sm sm:text-base font-semibold text-slate-950/90 group-focus-within:text-slate-950 transition-colors">
                Tell me a little about the project...
              </label>
              <textarea
                id="contact-message"
                required
                name="message"
                rows={3}
                placeholder="What are your key goals, timelines, or requirements?"
                value={formData.message}
                onChange={handleInputChange}
                className="w-full bg-transparent border-b border-slate-950/30 focus:border-slate-950 py-1.5 sm:py-2 text-sm sm:text-base font-medium text-slate-950 placeholder:text-slate-950/35 outline-none transition-colors resize-none"
              />
            </div>

            {/* Action CTA Button - Secondary Button Design */}
            <div className="pt-2 flex justify-start">
              <Button
                type="submit"
                variant="secondary"
                size="sm"
                arrowDirection="right"
                className="w-fit"
              >
                Let&apos;s get started!
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
