import { useRef, useState } from 'react';

const KEYFRAMES = `
@keyframes rotateBalls {
  from { transform: translateX(-50%) translateY(-50%) rotate(360deg); }
  to   { transform: translateX(-50%) translateY(-50%) rotate(0deg); }
}
@keyframes blink {
  0%, 45%, 51%, 96%, 100% { height: 52px; }
  48%, 98% { height: 10px; }
}
`;

export default function AiAssistant() {
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const cx = left + width / 2;
    const cy = top + height / 2;
    const dx = (e.clientX - cx) / (width / 2);
    const dy = (e.clientY - cy) / (height / 2);
    setTilt({ x: dy * -15, y: dx * 15 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <>
      <style>{KEYFRAMES}</style>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          perspective: '1000px',
          cursor: 'pointer',
          userSelect: 'none',
          padding: isHovered ? 0 : 4,
          transition: 'padding 0.3s ease',
          display: 'inline-block',
        }}
      >
        <div
          style={{
            width: 192,
            height: 192,
            borderRadius: 48,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transformStyle: 'preserve-3d',
            transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(50px)`,
            transition: 'transform 0.2s ease, width 0.3s ease, height 0.3s ease, border-radius 0.3s ease',
            boxShadow: isHovered
              ? '0 10px 40px rgba(0,0,60,0.25), inset 0 0 10px rgba(255,255,255,0.5)'
              : '0 4px 20px rgba(0,0,30,0.15)',
          }}
        >
          {/* Animated blur balls background */}
          <div style={{
            position: 'absolute', inset: 0,
            borderRadius: 'inherit',
            overflow: 'hidden',
            backgroundColor: 'rgba(255,255,255,0.8)',
            zIndex: 0,
          }}>
            <div style={{
              position: 'absolute', left: '50%', top: '50%',
              animation: `rotateBalls 10s linear infinite`,
              animationPlayState: isHovered ? 'paused' : 'running',
            }}>
              {[
                { color: '#ec4899', style: { top: 0, left: '50%', transform: 'translateX(-50%)' } },
                { color: '#9147ff', style: { bottom: 0, left: '50%', transform: 'translateX(-50%)' } },
                { color: '#34d399', style: { top: '50%', left: 0, transform: 'translateY(-50%)' } },
                { color: '#05e0f5', style: { top: '50%', right: 0, transform: 'translateY(-50%)' } },
              ].map((ball, i) => (
                <span key={i} style={{
                  position: 'absolute',
                  width: 96, height: 96,
                  borderRadius: '50%',
                  filter: 'blur(30px)',
                  backgroundColor: ball.color,
                  ...ball.style,
                }} />
              ))}
            </div>
            {/* Backdrop blur layer */}
            <div style={{ position: 'absolute', inset: 0, backdropFilter: 'blur(50px)' }} />
          </div>

          {/* Eyes (idle) */}
          {!isHovered && (
            <div style={{
              position: 'absolute', zIndex: 2,
              display: 'flex', gap: 32, alignItems: 'center',
              bottom: '50%',
              left: '50%',
              transform: 'translateX(-50%)',
            }}>
              {[0, 1].map(i => (
                <span key={i} style={{
                  display: 'block',
                  width: 26, height: 52,
                  backgroundColor: '#fff',
                  borderRadius: 16,
                  animation: 'blink 10s infinite linear',
                }} />
              ))}
            </div>
          )}

          {/* Happy eyes (hover) */}
          {isHovered && (
            <div style={{
              position: 'absolute', zIndex: 2,
              display: 'flex', alignItems: 'center',
              color: '#fff',
              bottom: '50%',
              left: '50%',
              transform: 'translateX(-50%)',
            }}>
              {[0, 1].map(i => (
                <svg key={i} fill="none" viewBox="0 0 24 24" width={60}>
                  <path fill="currentColor" d="M8.28386 16.2843C8.9917 15.7665 9.8765 14.731 12 14.731C14.1235 14.731 15.0083 15.7665 15.7161 16.2843C17.8397 17.8376 18.7542 16.4845 18.9014 15.7665C19.4323 13.1777 17.6627 11.1066 17.3088 10.5888C16.3844 9.23666 14.1235 8 12 8C9.87648 8 7.61556 9.23666 6.69122 10.5888C6.33728 11.1066 4.56771 13.1777 5.09858 15.7665C5.24582 16.4845 6.16034 17.8376 8.28386 16.2843Z" />
                </svg>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}