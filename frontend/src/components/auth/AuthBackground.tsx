import React from 'react';

export const AuthBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none">
      {/* Deep Midnight Base Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-[#050B14] to-[#081525]" />

      {/* Radial Cyan Glow Orbs */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(0,163,255,0.12),transparent_70%)] blur-3xl animate-pulse-slow" />
      <div className="absolute top-1/3 -left-48 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(0,210,255,0.08),transparent_70%)] blur-3xl" />
      <div className="absolute bottom-0 -right-48 w-[700px] h-[600px] bg-[radial-gradient(circle,rgba(0,112,243,0.1),transparent_70%)] blur-3xl" />

      {/* Faint Subtle Data Grid Lines Overlay */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />

      {/* Subtle Top & Bottom Cinematic Vignettes */}
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#030712] to-transparent opacity-80" />
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#030712] to-transparent opacity-80" />
    </div>
  );
};
