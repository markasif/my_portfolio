import React, { useLayoutEffect, useRef, useState } from 'react';

const Contact: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    service: 'Web Development',
    message: ''
  });

  useLayoutEffect(() => {
    const gsap = (window as any).gsap;
    if (!gsap) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      });

      tl.from('.contact-header', {
        x: -50,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out"
      })
      .from('.contact-form-container', {
        y: 60,
        opacity: 0,
        scale: 0.95,
        duration: 1.2,
        ease: "power4.out"
      }, "-=0.8");
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const phoneNumber = "+919567526150";
    const text = `*NEW PROJECT INQUIRY*%0A--------------------%0A*NAME:* ${formData.name}%0A*CONTACT:* ${formData.contact}%0A*SERVICE:* ${formData.service}%0A*MESSAGE:* ${formData.message}`;
    window.open(`https://wa.me/${phoneNumber}?text=${text}`, '_blank');
  };

  return (
    <section id="contact" ref={containerRef} className="w-full bg-transparent py-6 md:py-8 lg:py-10 xl:py-12 px-6 md:px-8 lg:px-12 relative overflow-hidden">
      {/* Structural Accents */}
      
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20 relative z-10">
        
        {/* Left Column: Narrative & Info */}
        <div className="contact-header flex flex-col items-start lg:justify-between lg:w-2/5 pb-2">
          <div className="flex flex-col gap-6 border-l-4 border-primary pl-6">
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-black uppercase tracking-[0.6em] text-primary">PROJECT INQUIRY</span>
              <div className="h-[1px] w-12 bg-primary/20"></div>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-slate-900 dark:text-white font-display leading-[0.9]">
              Get In <span className="text-gradient">Touch</span>
            </h2>
            <p className="max-w-md text-sm md:text-base text-slate-500 dark:text-slate-400 font-light leading-relaxed">
              Ready to collaborate on your next project? Let's transform your vision into an elite digital product.
            </p>
          </div>


          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 w-full pt-10 lg:pt-0">
            {/* Email */}
            <a href="mailto:markasif@email.com" className="flex items-center gap-5 group cursor-pointer transition-transform hover:translate-x-1">
              <div className="size-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary border border-primary/10 group-hover:bg-primary group-hover:text-slate-950 transition-all duration-500">
                <span className="material-symbols-outlined text-lg">mail</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">EMAIL_ID</span>
                <span className="text-sm font-bold text-slate-700 dark:text-slate-200">markasif@email.com</span>
              </div>
            </a>

            {/* LinkedIn */}
            <a href="https://www.linkedin.com/in/asifap/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-5 group cursor-pointer transition-transform hover:translate-x-1">
              <div className="size-10 rounded-xl bg-blue-500/5 flex items-center justify-center text-blue-400 border border-blue-500/10 group-hover:bg-blue-500 group-hover:text-white transition-all duration-500">
                <span className="material-symbols-outlined text-lg">share</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">LINKEDIN_PROF</span>
                <span className="text-sm font-bold text-slate-700 dark:text-slate-200">linkedin.com/in/asifap</span>
              </div>
            </a>

            {/* GitHub */}
            <a href="https://github.com/markasif" target="_blank" rel="noopener noreferrer" className="flex items-center gap-5 group cursor-pointer transition-transform hover:translate-x-1">
              <div className="size-10 rounded-xl bg-slate-500/5 flex items-center justify-center text-slate-400 border border-slate-500/10 group-hover:bg-slate-900 group-hover:text-white transition-all duration-500">
                <span className="material-symbols-outlined text-lg">code</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">GITHUB_ARCHIVE</span>
                <span className="text-sm font-bold text-slate-700 dark:text-slate-200">github.com/markasif</span>
              </div>
            </a>

            {/* Telegram */}
            <a href="https://t.me/telmeasif" target="_blank" rel="noopener noreferrer" className="flex items-center gap-5 group cursor-pointer transition-transform hover:translate-x-1">
              <div className="size-10 rounded-xl bg-sky-500/5 flex items-center justify-center text-sky-400 border border-sky-500/10 group-hover:bg-sky-500 group-hover:text-white transition-all duration-500">
                <span className="material-symbols-outlined text-lg">send</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">TELEGRAM_COMM</span>
                <span className="text-sm font-bold text-slate-700 dark:text-slate-200">@telmeasif</span>
              </div>
            </a>

            {/* Phone */}
            <a href="tel:+919567526150" className="flex items-center gap-5 group cursor-pointer transition-transform hover:translate-x-1">
              <div className="size-10 rounded-xl bg-emerald-500/5 flex items-center justify-center text-emerald-400 border border-emerald-500/10 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500">
                <span className="material-symbols-outlined text-lg">call</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">DIRECT_LINE</span>
                <span className="text-sm font-bold text-slate-700 dark:text-slate-200">+91 9567526150</span>
              </div>
            </a>
          </div>
        </div>

        {/* Right Column: Inquiry Form */}
        <div className="contact-form-container lg:w-3/5 relative">
          {/* Form Background Ornaments */}
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
          
          <form 
            onSubmit={handleSubmit}
            className="relative overflow-hidden rounded-[2.5rem] border border-white/10 glass-card p-8 md:p-12 shadow-2xl flex flex-col gap-6 md:gap-8 group/form"
          >
            {/* Form Brackets */}
            <div className="absolute top-0 left-0 size-8 border-t-2 border-l-2 border-primary/20 rounded-tl-[2.5rem]"></div>
            <div className="absolute bottom-0 right-0 size-8 border-b-2 border-r-2 border-primary/20 rounded-br-[2.5rem]"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/60 ml-1">Full Name</label>
                <input 
                  required
                  type="text" 
                  name="name"
                  placeholder="Your Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-slate-900/40 dark:bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all shadow-inner"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/60 ml-1">Contact Details</label>
                <input 
                  required
                  type="text" 
                  name="contact"
                  placeholder="Email or Phone No."
                  value={formData.contact}
                  onChange={handleInputChange}
                  className="w-full bg-slate-900/40 dark:bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all shadow-inner"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 relative">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/60 ml-1">Select Service</label>
              <div className="relative">
                <select 
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  className="w-full bg-slate-900/40 dark:bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all shadow-inner appearance-none cursor-pointer"
                >
                  <option value="Web Development" className="bg-slate-900 text-white">Web Development</option>
                  <option value="Mobile App" className="bg-slate-900 text-white">Mobile Application</option>
                  <option value="UI/UX Design" className="bg-slate-900 text-white">UI/UX Design</option>
                  <option value="AI Integration" className="bg-slate-900 text-white">AI Integration</option>
                  <option value="Full Project" className="bg-slate-900 text-white">Full Stack Project</option>
                </select>
                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-primary/60">
                   <span className="material-symbols-outlined text-xl">expand_more</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/60 ml-1">Project Details</label>
              <textarea 
                required
                name="message"
                rows={4}
                placeholder="Tell me about your project goals..."
                value={formData.message}
                onChange={handleInputChange}
                className="w-full bg-slate-900/40 dark:bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all shadow-inner resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="group relative flex items-center justify-center gap-4 overflow-hidden rounded-2xl h-16 md:h-20 bg-slate-900 dark:bg-white/5 border border-slate-800 dark:border-white/10 text-white/60 text-[10px] md:text-[11px] font-black uppercase tracking-[0.5em] transition-all  hover:text-primary active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-3">
                SEND TO WHATSAPP
                <span className="material-symbols-outlined text-xl transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">send</span>
              </span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
