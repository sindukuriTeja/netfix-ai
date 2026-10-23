import React from 'react';

export const VideoBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      {/* Full-Page Fixed Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover filter brightness-[0.65] contrast-[1.05]"
      >
        <source src="/backend.mp4" type="video/mp4" />
      </video>

      {/* Atmospheric Dark Navy Glass Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020C16]/80 via-[#020C16]/82 to-[#020C16]/88" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(0,184,255,0.12),transparent_75%)]" />
    </div>
  );
};
