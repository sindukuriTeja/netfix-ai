import React, { useState, useEffect } from 'react';
import { Sparkles, X, Send } from 'lucide-react';

interface ClientAskAiModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrompt?: string;
}

export const ClientAskAiModal: React.FC<ClientAskAiModalProps> = ({
  isOpen,
  onClose,
  initialPrompt = '',
}) => {
  const [prompt, setPrompt] = useState(initialPrompt);
  const [chatLog, setChatLog] = useState<{ role: 'user' | 'assistant'; text: string }[]>([
    {
      role: 'assistant',
      text: 'Hello Vikram. I am your MARG Legal AI Assistant. Ask me anything regarding your active matters, documents, deadlines, or pending approvals.'
    }
  ]);

  useEffect(() => {
    if (initialPrompt) setPrompt(initialPrompt);
  }, [initialPrompt]);

  if (!isOpen) return null;

  const handleSend = () => {
    if (!prompt.trim()) return;

    setChatLog((prev) => [
      ...prev,
      { role: 'user', text: prompt },
      {
        role: 'assistant',
        text: `Analysis for client inquiry: "${prompt}". Based on your 5 active matters and 18 shared documents, all compliance filings for MAT-301 are up to date. Next deadline is 28 Sep 2026 for written submission approval.`
      }
    ]);
    setPrompt('');
  };

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-[#081525] border border-[#00B8FF]/30 rounded-2xl p-6 max-w-lg w-full space-y-4 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-white p-1 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 border-b border-white/10 pb-3">
          <Sparkles className="w-5 h-5 text-[#00B8FF]" />
          <h3 className="font-extrabold text-white text-base">Client Legal AI Assistant</h3>
        </div>

        <div className="p-4 rounded-xl bg-[#04121F] border border-white/5 h-64 overflow-y-auto space-y-3 text-xs">
          {chatLog.map((msg, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-xl max-w-sm ${
                msg.role === 'user' ? 'bg-[#00B8FF]/20 text-white ml-auto text-right' : 'bg-white/5 text-slate-200'
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 pt-2 border-t border-white/10">
          <input
            type="text"
            placeholder="Type your question..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 px-4 py-2.5 rounded-xl bg-[#041828] border border-white/10 text-xs text-white focus:outline-none focus:border-[#00B8FF]"
          />
          <button
            onClick={handleSend}
            className="px-4 py-2.5 rounded-xl bg-[#00B8FF] hover:bg-[#0098D4] text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-lg shadow-sky-500/20"
          >
            <span>Ask</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientAskAiModal;
