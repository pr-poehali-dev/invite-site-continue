import { useState, useRef } from "react";
import { C } from "@/components/wedding/wedding-config";
import WeddingTop from "@/components/wedding/WeddingTop";
import WeddingBottom from "@/components/wedding/WeddingBottom";

const MUSIC_URL = "https://cdn.poehali.dev/projects/c533460a-ce3f-405a-b498-c59832d6dc6c/bucket/88a2b646-3b15-4b33-991d-93cb18d29bed.mp3";

export default function Index() {
  const [gone, setGone] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [showMusicPrompt, setShowMusicPrompt] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleTouch = () => {
    if (gone) return;
    setGone(true);
    setShowMusicPrompt(true);
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
    setShowMusicPrompt(false);
    const audio = audioRef.current;
    if (!audio) return;
    try {
      await audio.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  };

  const declineMusic = () => {
    setShowMusicPrompt(false);
  };

  return (
    <div style={{ background: C.cream, minHeight: "100vh", fontFamily: "'Montserrat', sans-serif", color: C.text, overflowX: "hidden" }}>

      <audio ref={audioRef} loop preload="auto" style={{ display: "none" }}>
        <source src={MUSIC_URL} type="audio/mpeg" />
      </audio>

      {/* ПРЕДЛОЖЕНИЕ ВКЛЮЧИТЬ МУЗЫКУ */}
      {showMusicPrompt && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 300,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: "rgba(42,37,30,0.45)",
          backdropFilter: "blur(6px)",
          animation: "softAppear 0.6s ease forwards",
        }}>
          <div style={{
            background: C.cream,
            border: `1px solid ${C.border}`,
            borderRadius: 4,
            padding: "40px 36px",
            textAlign: "center",
            maxWidth: 320,
            width: "90vw",
            boxShadow: "0 20px 60px rgba(42,37,30,0.2)",
          }}>
            <p style={{ fontSize: 28, marginBottom: 12 }}>♪</p>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(18px,5vw,22px)",
              color: C.text, lineHeight: 1.6, marginBottom: 8,
            }}>
              Включить музыку?
            </p>
            <p style={{
              fontSize: 12, color: C.textMuted, letterSpacing: "0.05em",
              marginBottom: 28, lineHeight: 1.7,
            }}>
              River Flows In You · Yiruma
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={acceptMusic} style={{
                flex: 1, padding: "11px 0",
                background: C.sage, border: "none", borderRadius: 2,
                color: "#fff", fontSize: 12, letterSpacing: "0.15em",
                textTransform: "uppercase", cursor: "pointer",
                fontFamily: "'Montserrat', sans-serif",
                transition: "opacity 0.2s",
              }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
              >
                Да, включить
              </button>
              <button onClick={declineMusic} style={{
                flex: 1, padding: "11px 0",
                background: "transparent", border: `1px solid ${C.sagePale}`, borderRadius: 2,
                color: C.textMuted, fontSize: 12, letterSpacing: "0.15em",
                textTransform: "uppercase", cursor: "pointer",
                fontFamily: "'Montserrat', sans-serif",
                transition: "opacity 0.2s",
              }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.7")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
              >
                Без музыки
              </button>
            </div>
          </div>
        </div>
      )}

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
