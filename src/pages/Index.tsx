import { useState, useRef } from "react";
import { C } from "@/components/wedding/wedding-config";
import WeddingTop from "@/components/wedding/WeddingTop";
import WeddingBottom from "@/components/wedding/WeddingBottom";

const MUSIC_URL = "https://cdn.poehali.dev/projects/c533460a-ce3f-405a-b498-c59832d6dc6c/bucket/88a2b646-3b15-4b33-991d-93cb18d29bed.mp3";

export default function Index() {
  const [gone, setGone] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleTouch = () => {
    if (gone) return;
    setGone(true);
    setShowBanner(true);
    setTimeout(() => {
      contentRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 900);
  };

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      try {
        await audio.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    }
  };

  const acceptMusic = async () => {
    setShowBanner(false);
    const audio = audioRef.current;
    if (!audio) return;
    try {
      await audio.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  };

  return (
    <div style={{ background: C.cream, minHeight: "100vh", fontFamily: "'Montserrat', sans-serif", color: C.text, overflowX: "hidden" }}>

      <audio ref={audioRef} loop preload="auto" style={{ display: "none" }}>
        <source src={MUSIC_URL} type="audio/mpeg" />
      </audio>

      {/* НЕНАВЯЗЧИВЫЙ БАННЕР СВЕРХУ */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0,
        zIndex: 300,
        transform: showBanner ? "translateY(0)" : "translateY(-100%)",
        transition: "transform 0.6s cubic-bezier(0.4,0,0.2,1)",
        background: "rgba(250,246,239,0.97)",
        borderBottom: `1px solid ${C.border}`,
        backdropFilter: "blur(8px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        gap: 16, padding: "10px 20px",
      }}>
        <span style={{ fontSize: 14, color: C.textMuted, letterSpacing: "0.04em" }}>
          ♪ <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 15, color: C.text }}>River Flows In You</span> · Yiruma
        </span>
        <button onClick={acceptMusic} style={{
          padding: "5px 16px",
          background: C.sage, border: "none", borderRadius: 20,
          color: "#fff", fontSize: 11, letterSpacing: "0.12em",
          textTransform: "uppercase", cursor: "pointer",
          fontFamily: "'Montserrat', sans-serif",
          transition: "opacity 0.2s", whiteSpace: "nowrap",
        }}
          onMouseEnter={e => (e.currentTarget.style.opacity = "0.82")}
          onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
        >
          Включить
        </button>
        <button onClick={() => setShowBanner(false)} style={{
          background: "none", border: "none", cursor: "pointer",
          color: C.textMuted, fontSize: 16, lineHeight: 1, padding: "2px 4px",
          opacity: 0.5,
        }}>✕</button>
      </div>

      {/* КНОПКА МУЗЫКИ — правый верхний угол */}
      <button
        onClick={toggleMusic}
        style={{
          position: "fixed",
          top: 20, right: 20,
          zIndex: 200,
          width: 44, height: 44,
          borderRadius: "50%",
          background: playing ? C.sage : "rgba(250,246,239,0.92)",
          border: `1px solid ${playing ? C.sage : "rgba(107,125,94,0.3)"}`,
          backdropFilter: "blur(8px)",
          cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 18,
          boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
          transition: "all 0.3s ease",
          color: playing ? "#fff" : C.sage,
        }}
        title={playing ? "Выключить музыку" : "Включить музыку"}
      >
        {playing ? "♫" : "♪"}
      </button>

      <div ref={contentRef}>
        <WeddingTop gone={gone} onTouch={handleTouch} />
      </div>

      <WeddingBottom />

      <style>{`
        @keyframes softAppear {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        input::placeholder, textarea::placeholder { color: rgba(138,126,114,0.55); }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #FAF6EF; }
        ::-webkit-scrollbar-thumb { background: rgba(107,125,94,0.3); border-radius: 2px; }
      `}</style>
    </div>
  );
}
