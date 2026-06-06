export function CTAButton({
  className = "",
  children,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className={`
        px-5 py-2
        rounded-lg
        cursor-pointer
        transition-all duration-300
        bg-primary
        hover:bg-accent
        hover:scale-105
        ${className}
      `}
    >
      {children}
    </button>
  );
}

export function GhostButton({
  className = "",
  children,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className={`
        px-5 py-2
        rounded-lg
        cursor-pointer
        transition-all duration-300
        text-white
        border border-white/10
        bg-white/5
        backdrop-blur-sm
        hover:bg-white/10
        hover:border-white/20
        ${className}
      `}
    >
      {children}
    </button>
  );
}