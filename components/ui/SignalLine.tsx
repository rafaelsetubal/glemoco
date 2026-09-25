export function SignalLine({ className = "" }: { className?: string }) {
  return <div aria-hidden="true" className={`signal-line ${className}`} />;
}
