import { useState, useEffect, useRef } from "react";
import { IMG_PEONY2 } from "./wedding-config";

export function useCountdown(target: Date) {
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) { setTime({ d: 0, h: 0, m: 0, s: 0 }); return; }
      setTime({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);
  return time;
}

export function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

export function FadeIn({ children, delay = 0, up = true }: { children: React.ReactNode; delay?: number; up?: boolean }) {
  const { ref, visible } = useInView();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : up ? "translateY(28px)" : "none",
      transition: `opacity 1s ease ${delay}s, transform 1s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
}

export function PeonyCorner({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  const styles: React.CSSProperties = {
    position: "absolute",
    width: "clamp(120px, 22vw, 220px)",
    height: "clamp(120px, 22vw, 220px)",
    backgroundImage: `url(${IMG_PEONY2})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    opacity: 0.22,
    pointerEvents: "none",
    ...(pos === "tl" && { top: -20, left: -20, transform: "rotate(0deg)" }),
    ...(pos === "tr" && { top: -20, right: -20, transform: "rotate(90deg)" }),
    ...(pos === "bl" && { bottom: -20, left: -20, transform: "rotate(270deg)" }),
    ...(pos === "br" && { bottom: -20, right: -20, transform: "rotate(180deg)" }),
  };
  return <div style={styles} />;
}
