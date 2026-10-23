import React, { useState, useRef } from 'react';

interface NetfixCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  interactive?: boolean;
}

export const NetfixCard: React.FC<NetfixCardProps> = ({
  children,
  className = '',
  onClick,
  interactive = true,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || window.innerWidth < 768) return;
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Calculate rotation range (-7deg to 7deg for smooth corporate enterprise AI feel)
    const rotateX = ((mouseY - height / 2) / (height / 2)) * -7;
    const rotateY = ((mouseX - width / 2) / (width / 2)) * 7;

    setRotate({ x: rotateX, y: rotateY });
    setGlarePos({
      x: (mouseX / width) * 100,
      y: (mouseY / height) * 100,
      opacity: 0.3,
    });
  };

  const handleMouseEnter = () => {
    if (!interactive) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (!interactive) return;
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      className="netfix-card-container"
      onClick={onClick}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`netfix-card ${isHovered ? 'is-hovered' : ''} ${className}`}
        style={{
          transform: isHovered
            ? `perspective(1000px) rotateX(${rotate.x.toFixed(2)}deg) rotateY(${rotate.y.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`
            : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
          transition: isHovered ? 'transform 0.08s ease-out' : 'transform 0.4s ease-out',
        }}
      >
        {/* Background Grid Particles & Scanning Lines */}
        <div className="netfix-card-particles" />
        <div className="netfix-card-lines" />

        {/* Dynamic Glare Sheen Effect */}
        <div
          className="netfix-card-glare"
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(0, 184, 255, ${glarePos.opacity}), transparent 65%)`,
            opacity: isHovered ? 1 : 0,
          }}
        />

        {/* Corner Brackets */}
        <div className="netfix-card-corner netfix-card-corner-tl" />
        <div className="netfix-card-corner netfix-card-corner-tr" />
        <div className="netfix-card-corner netfix-card-corner-bl" />
        <div className="netfix-card-corner netfix-card-corner-br" />

        {/* Inner Content */}
        <div className="netfix-card-content">
          {children}
        </div>
      </div>
    </div>
  );
};
