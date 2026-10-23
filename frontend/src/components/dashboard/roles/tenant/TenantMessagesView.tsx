import React, { useState } from 'react';
import {
  MessageSquare,
  Search,
  Send,
  Paperclip,
  CheckCheck,
  Plus
} from 'lucide-react';

export const TenantMessagesView: React.FC = () => {
  const [activeConvId, setActiveConvId] = useState('CONV-1');
  const [messageInput, setMessageInput] = useState('');
  const [conversations, setConversations] = useState([
    {
      id: 'CONV-1',
      title: 'Legal Team',
      subtitle: 'Riverside Tower - Unit 501',
      lastMsg: 'Re: Agreement Draft',
      time: '10:30 AM',
      messages: [
        { sender: 'Legal Team', text: 'Please find the updated agreement draft attached for Riverside Tower Unit 501.', time: '10:00 AM', isMe: false },
        { sender: 'Arjun Patel', text: 'Thank you. I will review and confirm.', time: '10:05 AM', isMe: true },
      ]
    },
    {
      id: 'CONV-2',
      title: 'Property Team',
      subtitle: 'Maintenance Update',
      lastMsg: 'Technician assigned for HVAC inspection.',
      time: 'Yesterday',
      messages: [
        { sender: 'Property Team', text: 'Technician assigned for HVAC inspection.', time: 'Yesterday', isMe: false }
      ]
    },
    {
      id: 'CONV-3',
      title: 'Finance Team',
      subtitle: 'Invoice Clarification',
      lastMsg: 'Updated GST breakdown generated.',
      time: '12 Sep',
      messages: [
        { sender: 'Finance Team', text: 'Updated GST breakdown generated.', time: '12 Sep', isMe: false }
      ]
    },
    {
      id: 'CONV-4',
      title: 'Account Manager',
      subtitle: 'General Discussion',
      lastMsg: 'Welcome to MARG tenant workspace.',
      time: '8 Sep',
      messages: [
        { sender: 'Account Manager', text: 'Welcome to MARG tenant workspace.', time: '8 Sep', isMe: false }
      ]
    }
  ]);

  const activeConv = conversations.find((c) => c.id === activeConvId) || conversations[0];

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;

    const newMsg = {
      sender: 'Arjun Patel',
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
      {/* Header Banner */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-[#00B8FF]" />
            <span>Conversations</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Communicate with your legal and property team.
          </p>
        </div>
        <button
          onClick={() => alert('New Message thread started.')}
          className="px-4 py-2 rounded-xl bg-[#00B8FF] hover:bg-[#0098D4] text-white font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-sky-500/20"
        >
          <Plus className="w-4 h-4" />
          <span>New Message</span>
        </button>
      </div>

      {/* Main 2-Pane Chat Workspace (Ref Panel 9) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[600px]">
        {/* Left Pane: Threads List (Ref Panel 9) */}
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
                  <span className="text-[10px] text-slate-400 block font-mono mt-0.5">{conv.subtitle}</span>
                  <p className="text-[11px] text-[#00B8FF] truncate mt-1">{conv.lastMsg}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Pane: Conversation Area (Ref Panel 9) */}
        <div className="lg:col-span-8 p-6 rounded-2xl bg-[#081525] border border-white/10 flex flex-col justify-between">
          {/* Thread Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <h3 className="font-extrabold text-white text-sm">{activeConv.title}</h3>
              <span className="text-xs text-[#00B8FF] font-mono">{activeConv.subtitle}</span>
            </div>
          </div>

          {/* Messages Feed */}
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

          {/* Input Footer */}
          <div className="flex items-center gap-2 pt-2 border-t border-white/10">
            <button
              onClick={() => alert('Attachment file selector opened.')}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 cursor-pointer"
            >
              <Paperclip className="w-4 h-4" />
            </button>

            <input
              type="text"
              placeholder="Type your message..."
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

export default TenantMessagesView;
