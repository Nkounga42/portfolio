 
const BlurOverlay = () => {
  return (
    <div className="absolute bottom-0 left-0 inset-0 h-1/2 pointer-events-none flex flex-col ">
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className={`w-full h-full backdrop-blur-sm bg-white/5`}
          style={{ backdropFilter: `blur(${i * 10}px)` }}
        > 
        </div>
      ))}
    </div>
  );
};


export default BlurOverlay;
