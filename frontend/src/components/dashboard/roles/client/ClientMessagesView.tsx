import React, { useState } from 'react';
import {
  MessageSquare,
  Search,
  Send,
  Paperclip,
  CheckCheck
} from 'lucide-react';

export const ClientMessagesView: React.FC = () => {
  const [activeConvId, setActiveConvId] = useState('MAT-301');
  const [messageInput, setMessageInput] = useState('');
  const [conversations, setConversations] = useState([
    {
      id: 'MAT-301',
      title: 'MAT-301 Corporate Structuring',
      participant: 'Amit Sharma (Legal Lead)',
      lastMsg: 'Please review the settlement draft attached.',
      time: '10:30 AM',
      unread: 2,
      messages: [
        { sender: 'Amit Sharma', text: 'Hello Vikram, we have completed the draft for Section 73 tax structuring.', time: '09:15 AM', isMe: false },
        { sender: 'Vikram Reddy', text: 'Thanks Amit. Does this include the revised escrow clause?', time: '09:40 AM', isMe: true },
        { sender: 'Amit Sharma', text: 'Yes, Clause 4.0 covers the escrow terms as requested. Please review the settlement draft attached.', time: '10:30 AM', isMe: false },
      ]
    },
    {
      id: 'MAT-299',
      title: 'MAT-299 Commercial Lease',
      participant: 'Priya Mehta (Legal Advisory)',
      lastMsg: 'Landlord agreed to 5-year lock-in clause.',
      time: 'Yesterday',
      unread: 0,
      messages: [
        { sender: 'Priya Mehta', text: 'Landlord agreed to 5-year lock-in clause.', time: 'Yesterday', isMe: false }
      ]
    },
    {
      id: 'GEN-001',
      title: 'General Legal Counsel Inquiry',
      participant: 'MARG Legal Helpdesk',
      lastMsg: 'Your account representative has been assigned.',
      time: '2 days ago',
      unread: 0,
      messages: [
        { sender: 'MARG Legal Helpdesk', text: 'Your account representative has been assigned.', time: '2 days ago', isMe: false }
      ]
    }
  ]);

  const activeConv = conversations.find((c) => c.id === activeConvId) || conversations[0];

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;

    const newMsg = {
      sender: 'Vikram Reddy',
      text: messageInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true
    };

    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeConvId
          ? { ...c, messages: [...c.messages, newMsg], lastMsg: messageInput, time: 'Just now' }
          : c
      )
    );
    setMessageInput('');
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="pb-3 border-b border-white/10">
        <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-[#00B8FF]" />
          <span>Messages — Secure Legal Communication</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Direct messaging with your assigned MARG legal counsel and account managers.
        </p>
      </div>

      {/* Main 2-Pane Split Chat Layout (Ref Panel 9) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[600px]">
        {/* Left Pane: Conversations List (Ref Panel 9) */}
        <div className="lg:col-span-4 p-4 rounded-2xl bg-[#081525] border border-white/10 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#041828] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00B8FF]"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>

            <div className="space-y-1.5 overflow-y-auto max-h-[480px]">
              {conversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => setActiveConvId(conv.id)}
                  className={`w-full text-left p-3 rounded-xl transition-all cursor-pointer border ${
                    activeConvId === conv.id
                      ? 'bg-[#00B8FF]/10 border-[#00B8FF]/40 text-white'
                      : 'bg-[#041828]/50 border-white/5 text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs truncate max-w-[160px]">{conv.title}</span>
                    <span className="text-[10px] text-slate-500 font-mono">{conv.time}</span>
                  </div>
                  <span className="text-[11px] text-[#00B8FF] block font-mono mt-0.5">{conv.participant}</span>
                  <p className="text-[11px] text-slate-400 truncate mt-1">{conv.lastMsg}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Pane: Active Thread Workspace (Ref Panel 9) */}
        <div className="lg:col-span-8 p-6 rounded-2xl bg-[#081525] border border-white/10 flex flex-col justify-between">
          {/* Thread Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00B8FF] to-indigo-600 flex items-center justify-center font-bold text-xs text-white">
                VR
              </div>
              <div>
                <h3 className="font-extrabold text-white text-sm">{activeConv.title}</h3>
                <span className="text-xs text-[#00B8FF] font-mono">{activeConv.participant}</span>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 my-4 p-4 rounded-xl bg-[#04121F] border border-white/5 overflow-y-auto space-y-3">
            {activeConv.messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-md p-3.5 rounded-2xl text-xs space-y-1 ${
                    msg.isMe
                      ? 'bg-gradient-to-r from-[#00B8FF] to-indigo-600 text-white rounded-br-none shadow-md'
                      : 'bg-[#081828] border border-white/10 text-slate-200 rounded-bl-none'
                  }`}
                >
                  <span className="text-[10px] opacity-75 font-bold block">{msg.sender}</span>
                  <p className="leading-relaxed">{msg.text}</p>
                  <div className="flex items-center justify-end gap-1 text-[9px] opacity-60 font-mono">
                    <span>{msg.time}</span>
                    {msg.isMe && <CheckCheck className="w-3 h-3 text-sky-200" />}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input Box */}
          <div className="flex items-center gap-2 pt-2 border-t border-white/10">
            <button
              onClick={() => alert('Attachment selector opened.')}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 cursor-pointer"
              title="Attach document"
            >
              <Paperclip className="w-4 h-4" />
            </button>

            <input
              type="text"
              placeholder="Type your message to legal counsel..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 px-4 py-2.5 rounded-xl bg-[#041828] border border-white/10 text-xs text-white focus:outline-none focus:border-[#00B8FF]"
            />

            <button
              onClick={handleSendMessage}
              className="px-4 py-2.5 rounded-xl bg-[#00B8FF] hover:bg-[#0098D4] text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-lg shadow-sky-500/20"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientMessagesView;
