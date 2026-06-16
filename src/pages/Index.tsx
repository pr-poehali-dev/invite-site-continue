import { useState, useRef } from "react";
import { C } from "@/components/wedding/wedding-config";
import WeddingTop from "@/components/wedding/WeddingTop";
import WeddingBottom from "@/components/wedding/WeddingBottom";

const MUSIC_URL = "https://cdn.poehali.dev/projects/c533460a-ce3f-405a-b498-c59832d6dc6c/files/Yiruma_-_River_Flows_In_You_48096897.mp3";

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

  return (
    <div style={{ background: C.cream, minHeight: "100vh", fontFamily: "'Montserrat', sans-serif", color: C.text, overflowX: "hidden" }}>

      <audio ref={audioRef} loop preload="none" style={{ display: "none" }}>
        <source src={MUSIC_URL} type="audio/mpeg" />
      </audio>

      {/* КНОПКА МУЗЫКИ — правый верхний угол */}
      <button
        onClick={toggleMusic}
        style={{
          position: "fixed",
          top: 20,
          right: 20,
          zIndex: 200,
          width: 44,
          height: 44,
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
