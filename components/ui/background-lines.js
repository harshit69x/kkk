"use client";

export function BackgroundLines({ 
  children,
  className = "",
  svgOptions = { duration: 10 }
}) {
  return (
    <div className={`relative w-full min-h-screen overflow-hidden ${className}`}>
      <div className="absolute inset-0 w-full h-full bg-grid-black/[0.02] -z-10" />
      <div className="absolute inset-0 flex items-center justify-center w-full h-full bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black dark:bg-grid-white/[0.02] -z-10" />
      {children}
    </div>
  );
}
