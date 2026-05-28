import { useState, useRef } from "react";
import { C } from "@/components/wedding/wedding-config";
import WeddingTop from "@/components/wedding/WeddingTop";
import WeddingBottom from "@/components/wedding/WeddingBottom";

export default function Index() {
  const [gone, setGone] = useState(false);
  const [playing, setPlaying] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleTouch = () => {
    if (gone) return;
    setGone(true);
    setTimeout(() => {
      contentRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 900);
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play();
      setPlaying(true);
    }
  };

  return (
    <div style={{ background: C.cream, minHeight: "100vh", fontFamily: "'Montserrat', sans-serif", color: C.text, overflowX: "hidden" }}>

      {/* АУДИО — гость включает сам */}
      <audio ref={audioRef} loop style={{ display: "none" }}>
        <source src="" type="audio/mpeg" />
      </audio>

      {/* ПЛАВАЮЩАЯ КНОПКА МУЗЫКИ */}
      <button
        onClick={toggleMusic}
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 200,
          width: 48,
          height: 48,
          borderRadius: "50%",
          background: playing ? C.sage : "rgba(250,246,239,0.92)",
          border: `1px solid ${playing ? C.sage : "rgba(107,125,94,0.3)"}`,
          backdropFilter: "blur(8px)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 18,
          boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
          transition: "all 0.3s ease",
          color: playing ? "#fff" : C.sage,
        }}
        title={playing ? "Выключить музыку" : "Включить музыку"}
      >
        ♪
      </button>

      {/* ВЕРХНЯЯ ПОЛОВИНА: интро, герой, таймер, история, календарь */}
      <WeddingTop gone={gone} onTouch={handleTouch} />

      {/* НИЖНЯЯ ПОЛОВИНА: программа, место, дресс-код, RSVP, финал */}
      <div ref={contentRef}>
        <WeddingBottom />
      </div>

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
