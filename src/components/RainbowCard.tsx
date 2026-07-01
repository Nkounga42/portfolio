import { useState } from "react";

const styles = `
  @property --angle {
    syntax: '<angle>';
    initial-value: 0deg;
    inherits: false;
  }

  @keyframes rainbow-spin {
    to { --angle: 360deg; }
  }

  .rainbow-ring {
    position: absolute;
    inset: -4px;
    border-radius: 24px;
    background: conic-gradient(
      from var(--angle),
      #ff0000, #ff7700, #ffff00, #00ff00,
      #0099ff, #6600ff, #ff00ff, #ff0000
    );
    animation: rainbow-spin var(--spin-duration, 3s) linear infinite;
    filter: blur(var(--ring-blur, 8px));
    opacity: 0.9;
  }

  .rainbow-ring-sharp {
    position: absolute;
    inset: -3px;
    border-radius: 23px;
    background: conic-gradient(
      from var(--angle),
      #ff0000, #ff7700, #ffff00, #00ff00,
      #0099ff, #6600ff, #ff00ff, #ff0000
    );
    animation: rainbow-spin var(--spin-duration, 3s) linear infinite;
    opacity: 0.6;
  }
`;

export default function RainbowCard({ children, className }: { children?: React.ReactNode; className?: string }) {
  const [speed] = useState(3);
  const [blur] = useState(8);

  return (
    <>
      <style>{styles}</style>

      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "", 
      }}>

        <div className={className+ "transition-transform flex-1 items-center bg-black  justify-center -translate-y-1 "} style={{ position: "relative", borderRadius: "20px" }}>
          <div
            className="rainbow-ring"
            style={{
              // custom CSS properties cast to satisfy React's style typing
              ...( { ["--spin-duration"]: `${speed}s`, ["--ring-blur"]: `${blur}px` } as React.CSSProperties ),
            }}
          />
          <div
            className="rainbow-ring-sharp"
            style={({ ["--spin-duration"]: `${speed}s` } as React.CSSProperties)}
          />

           
          <div style={{
            position: "relative",
            zIndex: 1, 
            // overflow: "hidden",
          }}  >
             { children }
          </div>  
        </div>
      
      </div>
    </>
  );
}