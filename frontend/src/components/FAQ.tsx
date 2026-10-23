import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { FAQ_ITEMS } from '../data/landingData';

export const FAQ: React.FC = () => {
  const [openIds, setOpenIds] = useState<string[]>([]);

  const toggleFAQ = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Split FAQs into two columns as shown in reference design
  const leftFaqs = FAQ_ITEMS.slice(0, 4);
  const rightFaqs = FAQ_ITEMS.slice(4);

  return (
    <section id="faqs" className="relative py-10 sm:py-12 lg:py-14 border-t border-sky-400/10 overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sky-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="netfix-container relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 lg:mb-10 gap-4">
          <div className="space-y-2">
            <span className="text-xs font-bold tracking-widest text-sky-400 uppercase">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Questions? We've Got You Covered.
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-slate-400 text-xs sm:text-sm hidden sm:inline">
              Still have questions? Feel free to contact us.
            </span>
            <button
              onClick={scrollToContact}
              className="px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-sky-400/30 backdrop-blur-md transition-all min-h-[40px]"
            >
              Contact Team
            </button>
          </div>
        </div>

        {/* 2-Column Accordion Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 items-start">
          {/* Left Column (Questions 1-4) */}
          <div className="space-y-2.5 sm:space-y-3">
            {leftFaqs.map((faq, index) => {
              const isOpen = openIds.includes(faq.id);
              return (
                <div
                  key={faq.id}
                  className="rounded-2xl bg-[#091527]/60 hover:bg-[#0c1f38]/80 border border-white/[0.08] hover:border-sky-400/25 backdrop-blur-xl transition-all overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => toggleFAQ(faq.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${faq.id}`}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/50 min-h-[56px]"
                  >
                    <span className="text-sm sm:text-base font-semibold text-slate-100 flex items-center gap-2.5">
                      <span className="text-xs font-mono text-sky-400">{index + 1}.</span>
                      {faq.question}
                    </span>
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-slate-300">
                      {isOpen ? <Minus className="w-3.5 h-3.5 text-sky-400" /> : <Plus className="w-3.5 h-3.5" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div
                      id={`faq-answer-${faq.id}`}
                      className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300/90 leading-relaxed border-t border-white/5 animate-in fade-in duration-200"
                    >
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column (Questions 5-7) */}
          <div className="space-y-2.5 sm:space-y-3">
            {rightFaqs.map((faq, index) => {
              const isOpen = openIds.includes(faq.id);
              return (
                <div
                  key={faq.id}
                  className="rounded-2xl bg-[#091527]/60 hover:bg-[#0c1f38]/80 border border-white/[0.08] hover:border-sky-400/25 backdrop-blur-xl transition-all overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => toggleFAQ(faq.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${faq.id}`}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/50 min-h-[56px]"
                  >
                    <span className="text-sm sm:text-base font-semibold text-slate-100 flex items-center gap-2.5">
                      <span className="text-xs font-mono text-sky-400">{index + 5}.</span>
                      {faq.question}
                    </span>
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-slate-300">
                      {isOpen ? <Minus className="w-3.5 h-3.5 text-sky-400" /> : <Plus className="w-3.5 h-3.5" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div
                      id={`faq-answer-${faq.id}`}
                      className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300/90 leading-relaxed border-t border-white/5 animate-in fade-in duration-200"
                    >
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
