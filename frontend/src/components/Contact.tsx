import React, { useState } from 'react';
import { Phone, Mail, MessageSquare, Copy, Check } from 'lucide-react';
import { CONTACT_ITEMS } from '../data/landingData';

export const Contact: React.FC = () => {
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const handleAction = (item: typeof CONTACT_ITEMS[0]) => {
    if (item.type === 'phone' || item.type === 'email') {
      navigator.clipboard?.writeText(item.value);
      setCopiedType(item.type);
      setTimeout(() => setCopiedType(null), 2000);
    } else if (item.type === 'whatsapp') {
      // Friendly placeholder notification without breaking or external fake links
      setCopiedType('whatsapp');
      setTimeout(() => setCopiedType(null), 2500);
    }
  };

  return (
    <section id="contact" className="relative py-10 sm:py-12 lg:py-14 border-t border-sky-400/10 overflow-hidden">
      <div className="netfix-container relative z-10">
        {/* Section Header */}
        <div className="mb-8 lg:mb-10">
          <span className="text-xs font-bold tracking-widest text-sky-400 uppercase">
            LET'S CONNECT
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1 mb-2">
            Get in Touch
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl">
            For platform access, business enquiries or further information, reach out to the MARG Group team.
          </p>
        </div>

        {/* 3 Contact Glass Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-4">
          {CONTACT_ITEMS.map((item) => {
            const isCopied = copiedType === item.type;

            return (
              <div
                key={item.type}
                onClick={() => handleAction(item)}
                className="group relative flex items-center gap-4 p-5 sm:p-6 rounded-2xl bg-[#091527]/60 hover:bg-[#0c1f38]/90 border border-white/[0.08] hover:border-sky-400/35 backdrop-blur-xl shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              >
                {/* Icon Container */}
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105 ${
                    item.type === 'whatsapp'
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.25)]'
                      : 'bg-sky-500/15 text-sky-400 border border-sky-400/25 group-hover:shadow-[0_0_20px_rgba(0,163,255,0.25)]'
                  }`}
                >
                  {item.type === 'phone' && <Phone className="w-6 h-6" />}
                  {item.type === 'email' && <Mail className="w-6 h-6" />}
                  {item.type === 'whatsapp' && <MessageSquare className="w-6 h-6" />}
                </div>

                {/* Text Content */}
                <div className="flex-1 min-w-0">
                  <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-0.5">
                    {item.label}
                  </span>
                  <span className="block text-sm sm:text-base font-bold text-white truncate group-hover:text-sky-200 transition-colors">
                    {item.value}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] text-sky-400/80 mt-1">
                    {isCopied ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">
                          {item.type === 'whatsapp' ? 'Initiating connect...' : 'Copied to clipboard'}
                        </span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 opacity-60" />
                        <span>Click to {item.type === 'whatsapp' ? 'connect' : 'copy'}</span>
                      </>
                    )}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
