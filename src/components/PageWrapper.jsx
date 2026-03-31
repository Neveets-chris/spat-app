import { useEffect, useRef, useState } from "react";

function AnimatedBlock({ children, delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible
          ? "opacity-100 translate-y-0 blur-none"
          : "opacity-0 translate-y-10 blur-sm"
      }`}
    >
      {children}
    </div>
  );
}

export default function PageWrapper({ children }) {
  const blocs = Array.isArray(children) ? children : [children];

  return (
    <div className="space-y-6">
      {blocs.map((bloc, i) => (
        <AnimatedBlock key={i} delay={i * 80}>
          {bloc}
        </AnimatedBlock>
      ))}
    </div>
  );
}
