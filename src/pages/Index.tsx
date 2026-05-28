import { useState, useEffect, useRef } from "react";

// Реальные фото
const IMG_AELITA_KID   = "https://cdn.poehali.dev/projects/c533460a-ce3f-405a-b498-c59832d6dc6c/bucket/b8756935-f9f1-4b61-8055-698fa021cb79.jpg";
const IMG_TUZAGASH_KID = "https://cdn.poehali.dev/projects/c533460a-ce3f-405a-b498-c59832d6dc6c/bucket/75bd0595-f611-4f1e-afa6-1fd53f260f34.jpg";
const IMG_COUPLE       = "https://cdn.poehali.dev/projects/c533460a-ce3f-405a-b498-c59832d6dc6c/bucket/dbfd4d9b-fbb2-4a61-8a5b-34015743516d.jpg";
const IMG_WINTER       = "https://cdn.poehali.dev/projects/c533460a-ce3f-405a-b498-c59832d6dc6c/bucket/b016fc4d-c95b-46ec-92ca-de6217717a68.jpg";
const IMG_PEONY1       = "https://cdn.poehali.dev/projects/c533460a-ce3f-405a-b498-c59832d6dc6c/files/3f8863d1-887c-456d-a8ff-d67ebababcd3.jpg";
const IMG_PEONY2       = "https://cdn.poehali.dev/projects/c533460a-ce3f-405a-b498-c59832d6dc6c/files/e16a5631-207c-42cb-905c-5e786977d9e0.jpg";

const WEDDING_DATE = new Date("2026-08-18T10:00:00");

// Палитра: светло-природная → тёмная к финалу
const C = {
  cream:       "#FAF6EF",
  creamAlt:    "#F3EDE3",
  sage:        "#6B7D5E",
  sageLight:   "#9EAD8E",
  sagePale:    "#D4DCCA",
  dustyRose:   "#C9847A",
  text:        "#2A251E",
  textMuted:   "#8A7E72",
  border:      "rgba(42,37,30,0.1)",
  dark1:       "#1C1A16",
  dark2:       "#141210",
};

function useCountdown(target: Date) {
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

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function FadeIn({ children, delay = 0, up = true }: { children: React.ReactNode; delay?: number; up?: boolean }) {
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

// Декоративный пион-уголок
function PeonyCorner({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
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

const SCHEDULE = [
  { time: "10:00", title: "Алтай той", place: "с. Новый Бельтир, ул. Кара-Кем, 5", desc: "Встреча гостей, традиционные угощения и праздничное начало дня", icon: "🌿" },
  { time: "14:00", title: "Прогулка и катание", place: "Живописные окрестности Алтая", desc: "Тёплая прогулка, красивые моменты и живые эмоции", icon: "🏔️" },
  { time: "16:00", title: "Банкет", place: "Кафе «Таштажу», с. Кош-Агач, ул. Каменистая, 27", desc: "Праздничный стол, музыка, тосты и первый танец молодожёнов", icon: "🌸" },
  { time: "22:00", title: "Завершение вечера", place: "Под алтайским небом", desc: "Финальные тосты, тёплые объятия и прощание под звёздами", icon: "✨" },
];

const DRESS_COLORS = [
  { name: "Молочный",       hex: "#FAF7F2" },
  { name: "Бежевый",        hex: "#E8DCC8" },
  { name: "Кремовый",       hex: "#F5ECD7" },
  { name: "Пудровый",       hex: "#E8C5B8" },
  { name: "Светло-серый",   hex: "#D8D8D8" },
  { name: "Оливковый",      hex: "#C8D4B8" },
  { name: "Песочный",       hex: "#D4BC8C" },
];

const AUGUST_2026 = [
  ["", "", "", "", "", 1, 2],
  [3, 4, 5, 6, 7, 8, 9],
  [10, 11, 12, 13, 14, 15, 16],
  [17, 18, 19, 20, 21, 22, 23],
  [24, 25, 26, 27, 28, 29, 30],
  [31, "", "", "", "", "", ""],
];

export default function Index() {
  const [gone, setGone] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [formData, setFormData] = useState({ name: "", attending: "", wish: "" });
  const [submitted, setSubmitted] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { d, h, m, s } = useCountdown(WEDDING_DATE);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const pad = (n: number) => String(n).padStart(2, "0");

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
        {playing ? "♪" : "♪"}
      </button>

      {/* ИНТРО — полноэкранный оверлей */}
      <div
        onClick={handleTouch}
        style={{
          position: "fixed", inset: 0, zIndex: 100,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: C.cream,
          cursor: "default",
          opacity: gone ? 0 : 1,
          pointerEvents: gone ? "none" : "auto",
          transition: "opacity 1.2s cubic-bezier(0.4,0,0.2,1)",
          overflow: "hidden",
        }}
      >
        {/* Пионы-декор на интро */}
        <div style={{ position: "absolute", top: 0, right: 0, width: "45vw", maxWidth: 340, opacity: 0.35, pointerEvents: "none" }}>
          <img src={IMG_PEONY1} alt="" style={{ width: "100%", mixBlendMode: "multiply" }} />
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, width: "38vw", maxWidth: 280, opacity: 0.25, pointerEvents: "none", transform: "rotate(180deg)" }}>
          <img src={IMG_PEONY2} alt="" style={{ width: "100%", mixBlendMode: "multiply" }} />
        </div>

        {/* Фоновый градиент */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 70% 20%, rgba(210,220,190,0.4) 0%, transparent 60%)", pointerEvents: "none" }} />

        <div style={{ textAlign: "center", padding: "40px 32px", position: "relative", zIndex: 1 }}>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(24px, 6.5vw, 42px)",
            fontWeight: 300,
            color: C.text,
            lineHeight: 1.7,
            letterSpacing: "0.01em",
            maxWidth: 500,
            margin: "0 auto 0",
            opacity: 0,
            animation: "softAppear 2.2s cubic-bezier(0.4,0,0.2,1) 0.3s forwards",
          }}>
            У каждой любви<br />есть своя история…
          </p>
          <p style={{
            fontSize: 11,
            letterSpacing: "0.25em",
            color: C.sageLight,
            marginTop: 32,
            textTransform: "uppercase",
            opacity: 0,
            animation: "softAppear 2s ease 1.8s forwards",
          }}>
            коснитесь, чтобы открыть
          </p>
        </div>
      </div>

      {/* ─── ОСНОВНОЙ КОНТЕНТ ─── */}
      <div ref={contentRef}>

        {/* ГЕРОЙ */}
        <section style={{
          minHeight: "100vh",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          position: "relative", overflow: "hidden",
          padding: "80px 32px 60px",
          textAlign: "center",
          background: C.cream,
        }}>
          <PeonyCorner pos="tr" />
          <PeonyCorner pos="bl" />

          <p style={{
            fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase",
            color: C.sage, marginBottom: 28,
            opacity: gone ? 1 : 0,
            transform: gone ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 1s ease 0.5s, transform 1s ease 0.5s",
          }}>
            Свадебное приглашение
          </p>

          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(56px, 15vw, 100px)", fontWeight: 300,
            lineHeight: 1, color: C.text, letterSpacing: "-0.01em", marginBottom: 0,
            opacity: gone ? 1 : 0,
            transform: gone ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 1s ease 0.7s, transform 1s ease 0.7s",
          }}>Аэлита</h1>

          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(20px, 5vw, 32px)", fontWeight: 300,
            color: C.dustyRose, letterSpacing: "0.2em",
            margin: "4px 0",
            opacity: gone ? 1 : 0,
            transition: "opacity 1s ease 0.9s",
          }}>&amp;</p>

          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(56px, 15vw, 100px)", fontWeight: 300,
            lineHeight: 1, color: C.text, letterSpacing: "-0.01em", marginBottom: 40,
            opacity: gone ? 1 : 0,
            transform: gone ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 1s ease 1s, transform 1s ease 1s",
          }}>Тузагаш</h1>

          <div style={{ width: 48, height: 1, background: C.sagePale, margin: "0 auto 28px", opacity: gone ? 1 : 0, transition: "opacity 1s ease 1.2s" }} />

          <p style={{
            fontSize: "clamp(13px, 3vw, 15px)", letterSpacing: "0.12em",
            color: C.textMuted, lineHeight: 2.2,
            opacity: gone ? 1 : 0,
            transition: "opacity 1s ease 1.3s",
          }}>
            Приглашаем вас разделить<br />
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(22px, 5.5vw, 30px)", color: C.text, letterSpacing: "0.05em" }}>
              18 августа 2026
            </span>
          </p>
        </section>

        {/* ТАЙМЕР */}
        <section style={{ padding: "90px 20px", textAlign: "center", background: C.creamAlt, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${IMG_PEONY1})`, backgroundSize: "cover", backgroundPosition: "center", opacity: 0.04 }} />
          <FadeIn>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(14px, 3vw, 16px)", letterSpacing: "0.25em", color: C.textMuted, textTransform: "uppercase", marginBottom: 40 }}>
              До нашего дня осталось…
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div style={{ display: "flex", gap: "clamp(10px, 3vw, 40px)", justifyContent: "center" }}>
              {[{ v: d, l: "дней" }, { v: h, l: "часов" }, { v: m, l: "минут" }, { v: s, l: "секунд" }].map(({ v, l }, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(44px, 11vw, 76px)", fontWeight: 300,
                    color: C.text, lineHeight: 1,
                    minWidth: "clamp(58px, 16vw, 96px)",
                    background: C.cream,
                    border: `1px solid ${C.border}`,
                    borderRadius: 2, padding: "12px 6px 8px",
                  }}>{pad(v)}</div>
                  <p style={{ fontSize: 10, letterSpacing: "0.2em", color: C.sage, textTransform: "uppercase", marginTop: 8 }}>{l}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </section>

        {/* ИСТОРИЯ */}
        <section style={{ padding: "100px 20px", maxWidth: 900, margin: "0 auto" }}>
          <FadeIn>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(13px, 3vw, 15px)", letterSpacing: "0.3em", color: C.sage, textTransform: "uppercase", textAlign: "center", marginBottom: 64 }}>
              Наша история
            </p>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 40, marginBottom: 80 }}>
            <FadeIn delay={0.1}>
              <div style={{ textAlign: "center" }}>
                <div style={{ width: "100%", maxWidth: 280, margin: "0 auto", aspectRatio: "3/4", overflow: "hidden", borderRadius: 2, border: `1px solid ${C.border}`, position: "relative" }}>
                  <img src={IMG_AELITA_KID} alt="Аэлита в детстве" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", filter: "sepia(0.1) brightness(1.05)" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 55%, rgba(250,246,239,0.9) 100%)" }} />
                </div>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(15px, 3.5vw, 18px)", fontStyle: "italic", color: C.textMuted, marginTop: 20, lineHeight: 1.7, padding: "0 10px" }}>
                  «Интересно, каким будет мой будущий муж, когда я вырасту?..»
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.25}>
              <div style={{ textAlign: "center" }}>
                <div style={{ width: "100%", maxWidth: 280, margin: "0 auto", aspectRatio: "3/4", overflow: "hidden", borderRadius: 2, border: `1px solid ${C.border}`, position: "relative" }}>
                  <img src={IMG_TUZAGASH_KID} alt="Тузагаш в детстве" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", filter: "sepia(0.1) brightness(1.05)" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 55%, rgba(250,246,239,0.9) 100%)" }} />
                </div>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(15px, 3.5vw, 18px)", fontStyle: "italic", color: C.textMuted, marginTop: 20, lineHeight: 1.7, padding: "0 10px" }}>
                  «Интересно, какой будет моя будущая жена?..»
                </p>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.1}>
            <div style={{ textAlign: "center" }}>
              <div style={{ width: "100%", maxWidth: 580, margin: "0 auto", aspectRatio: "3/4", overflow: "hidden", borderRadius: 2, border: `1px solid ${C.border}`, position: "relative" }}>
                <img src={IMG_COUPLE} alt="Аэлита и Тузагаш" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 55%, rgba(250,246,239,0.95) 100%)" }} />
                <div style={{ position: "absolute", bottom: 28, left: 0, right: 0, textAlign: "center" }}>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(18px, 5vw, 24px)", color: C.text, letterSpacing: "0.04em" }}>
                    И вот мы встретились…
                  </p>
                </div>
              </div>
              <div style={{ marginTop: 52 }}>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(22px, 6vw, 36px)", fontWeight: 300, lineHeight: 1.9, color: C.text }}>
                  Два сердца.<br />Две судьбы.<br />
                  <span style={{ color: C.dustyRose }}>Одна любовь.</span><br />
                  Один путь на двоих.
                </p>
              </div>
            </div>
          </FadeIn>
        </section>

        {/* КАЛЕНДАРЬ */}
        <section style={{ padding: "100px 20px", background: C.creamAlt, textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, right: 0, width: "30vw", maxWidth: 240, opacity: 0.15, pointerEvents: "none" }}>
            <img src={IMG_PEONY2} alt="" style={{ width: "100%", mixBlendMode: "multiply" }} />
          </div>
          <FadeIn>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(13px, 3vw, 15px)", letterSpacing: "0.3em", color: C.sage, textTransform: "uppercase", marginBottom: 48 }}>
              Дата нашей свадьбы
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div style={{ maxWidth: 420, margin: "0 auto", border: `1px solid ${C.border}`, borderRadius: 2, overflow: "hidden", background: C.cream }}>
              <div style={{ background: C.creamAlt, padding: "16px 0", borderBottom: `1px solid ${C.border}` }}>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, color: C.text, letterSpacing: "0.1em" }}>Август 2026</p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", padding: "12px 8px 8px" }}>
                {["Пн","Вт","Ср","Чт","Пт","Сб","Вс"].map(dl => (
                  <div key={dl} style={{ textAlign: "center", fontSize: 10, letterSpacing: "0.1em", color: C.sage, padding: "4px 0 8px", textTransform: "uppercase" }}>{dl}</div>
                ))}
                {AUGUST_2026.flat().map((day, i) => (
                  <div key={i} style={{ textAlign: "center", padding: "4px 2px" }}>
                    {day !== "" && (
                      <span style={{
                        display: "inline-flex", alignItems: "center", justifyContent: "center",
                        width: 34, height: 34,
                        borderRadius: day === 18 ? "50%" : 2,
                        fontFamily: day === 18 ? "'Cormorant Garamond', serif" : undefined,
                        fontSize: day === 18 ? 16 : 13,
                        color: day === 18 ? "#fff" : C.textMuted,
                        background: day === 18 ? C.dustyRose : "transparent",
                        fontWeight: day === 18 ? 500 : 400,
                      }}>
                        {day === 18 ? "♡" : day}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(16px, 4vw, 20px)", fontStyle: "italic", color: C.textMuted, marginTop: 40, lineHeight: 1.8 }}>
              День, который станет началом нашей новой истории…
            </p>
          </FadeIn>
        </section>

        {/* ПРОГРАММА */}
        <section style={{ padding: "100px 20px", maxWidth: 700, margin: "0 auto" }}>
          <FadeIn>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(13px, 3vw, 15px)", letterSpacing: "0.3em", color: C.sage, textTransform: "uppercase", textAlign: "center", marginBottom: 64 }}>
              Программа дня
            </p>
          </FadeIn>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: "clamp(24px,8vw,60px)", top: 0, bottom: 0, width: 1, background: `linear-gradient(180deg, transparent, ${C.sagePale} 10%, ${C.sagePale} 90%, transparent)`, pointerEvents: "none" }} />
            {SCHEDULE.map((item, i) => (
              <FadeIn key={i} delay={i * 0.12}>
                <div style={{ display: "flex", gap: "clamp(20px,6vw,48px)", marginBottom: 56, position: "relative" }}>
                  <div style={{ flexShrink: 0, width: "clamp(48px,16vw,120px)", textAlign: "right", paddingRight: 24, position: "relative", display: "flex", flexDirection: "column", alignItems: "flex-end", paddingTop: 2 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.dustyRose, position: "absolute", right: -4, top: 7 }} />
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(18px,5vw,24px)", color: C.sage, lineHeight: 1 }}>{item.time}</p>
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: "clamp(18px,5vw,22px)", marginBottom: 2 }}>{item.icon}</p>
                    <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(20px,5vw,26px)", fontWeight: 400, color: C.text, marginBottom: 6, lineHeight: 1.2 }}>{item.title}</h3>
                    <p style={{ fontSize: "clamp(11px,2.5vw,13px)", color: C.sage, letterSpacing: "0.04em", marginBottom: 6 }}>{item.place}</p>
                    <p style={{ fontSize: "clamp(12px,3vw,14px)", color: C.textMuted, lineHeight: 1.7 }}>{item.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* МЕСТО */}
        <section style={{ padding: "100px 20px", background: C.creamAlt, textAlign: "center" }}>
          <FadeIn>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(13px,3vw,15px)", letterSpacing: "0.3em", color: C.sage, textTransform: "uppercase", marginBottom: 40 }}>
              Место проведения
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(18px,4.5vw,22px)", color: C.textMuted, marginBottom: 40, fontStyle: "italic" }}>
              Ждём вас по адресу:
            </p>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px,1fr))", gap: 20, maxWidth: 700, margin: "0 auto 48px" }}>
            {[
              { title: "Алтай той", addr: "с. Новый Бельтир", street: "ул. Кара-Кем, дом 5", time: "10:00", maps: "https://maps.google.com/?q=Новый+Бельтир" },
              { title: "Банкет · «Таштажу»", addr: "с. Кош-Агач", street: "ул. Каменистая, 27", time: "16:00", maps: "https://maps.google.com/?q=Кош-Агач+Каменистая+27" },
            ].map((loc, i) => (
              <FadeIn key={i} delay={i * 0.15}>
                <div style={{ border: `1px solid ${C.border}`, borderRadius: 2, padding: "28px 22px", background: C.cream, position: "relative" }}>
                  <div style={{ position: "absolute", top: 14, right: 14, fontSize: 11, letterSpacing: "0.15em", color: C.sage }}>{loc.time}</div>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: C.text, marginBottom: 6 }}>{loc.title}</p>
                  <p style={{ fontSize: 13, color: C.sage, marginBottom: 3 }}>{loc.addr}</p>
                  <p style={{ fontSize: 13, color: C.textMuted, marginBottom: 18 }}>{loc.street}</p>
                  <a href={loc.maps} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", padding: "7px 18px", border: `1px solid ${C.sagePale}`, borderRadius: 2, fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: C.sage, textDecoration: "none" }}>
                    Открыть карту
                  </a>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.3}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(15px,3.5vw,18px)", fontStyle: "italic", color: C.textMuted, maxWidth: 500, margin: "0 auto", lineHeight: 1.9 }}>
              Пусть эта дорога приведёт вас к одному из самых счастливых дней нашей жизни.
            </p>
          </FadeIn>
        </section>

        {/* ДРЕСС-КОД */}
        <section style={{ padding: "100px 20px", maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <FadeIn>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(13px,3vw,15px)", letterSpacing: "0.3em", color: C.sage, textTransform: "uppercase", marginBottom: 36 }}>
              Дресс-код
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p style={{ fontSize: "clamp(13px,3.5vw,15px)", color: C.textMuted, lineHeight: 1.9, maxWidth: 520, margin: "0 auto 44px" }}>
              Для нас будет особенно приятно, если вы поддержите атмосферу нашего дня, выбрав наряды в пастельных оттенках
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 18, justifyContent: "center", marginBottom: 44 }}>
              {DRESS_COLORS.map((dc, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ width: 52, height: 52, borderRadius: "50%", background: dc.hex, border: `1px solid ${C.border}`, margin: "0 auto 7px", boxShadow: "0 2px 10px rgba(44,40,32,0.08)" }} />
                  <p style={{ fontSize: 10, color: C.textMuted, maxWidth: 64 }}>{dc.name}</p>
                </div>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(16px,4vw,20px)", color: C.textMuted, lineHeight: 1.9, fontStyle: "italic", maxWidth: 500, margin: "0 auto" }}>
              Главное для нас — ваше присутствие, улыбки и хорошее настроение.<br />
              <span style={{ color: C.sage }}>Мы будем счастливы разделить этот день вместе с вами.</span>
            </p>
          </FadeIn>
        </section>

        {/* RSVP */}
        <section style={{ padding: "100px 20px", background: C.creamAlt, textAlign: "center" }}>
          <FadeIn>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(13px,3vw,15px)", letterSpacing: "0.3em", color: C.sage, textTransform: "uppercase", marginBottom: 20 }}>
              Подтверждение
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(20px,5vw,28px)", color: C.text, lineHeight: 1.6, maxWidth: 480, margin: "0 auto 44px" }}>
              Нам будет очень важно разделить этот день вместе с вами
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            {submitted ? (
              <div style={{ padding: "44px 24px", border: `1px solid ${C.border}`, borderRadius: 2, maxWidth: 480, margin: "0 auto", background: C.cream }}>
                <p style={{ fontSize: 28, marginBottom: 14, color: C.dustyRose }}>♡</p>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, color: C.text, marginBottom: 8 }}>Спасибо!</p>
                <p style={{ fontSize: 14, color: C.textMuted }}>Ваш ответ получен. Мы рады, что вы с нами.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ maxWidth: 480, margin: "0 auto", display: "flex", flexDirection: "column", gap: 14 }}>
                <input type="text" placeholder="Ваше имя" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required
                  style={{ background: C.cream, border: `1px solid ${C.border}`, borderRadius: 2, padding: "13px 16px", color: C.text, fontSize: 14, fontFamily: "'Montserrat',sans-serif", outline: "none", width: "100%" }} />
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  {["С удовольствием буду", "К сожалению, не смогу"].map((opt, i) => (
                    <button key={i} type="button" onClick={() => setFormData({ ...formData, attending: opt })}
                      style={{ flex: 1, padding: "13px 10px", border: `1px solid ${formData.attending === opt ? C.sage : C.border}`, borderRadius: 2, background: formData.attending === opt ? "rgba(107,125,94,0.1)" : C.cream, color: formData.attending === opt ? C.sage : C.textMuted, fontSize: 12, letterSpacing: "0.04em", cursor: "pointer", fontFamily: "'Montserrat',sans-serif", transition: "all 0.25s", minWidth: 140 }}>
                      {opt}
                    </button>
                  ))}
                </div>
                <textarea placeholder="Тёплое пожелание (необязательно)" value={formData.wish} onChange={e => setFormData({ ...formData, wish: e.target.value })} rows={3}
                  style={{ background: C.cream, border: `1px solid ${C.border}`, borderRadius: 2, padding: "13px 16px", color: C.text, fontSize: 14, fontFamily: "'Montserrat',sans-serif", outline: "none", resize: "none", width: "100%" }} />
                <button type="submit"
                  style={{ padding: "14px", background: C.sage, border: "none", borderRadius: 2, color: "#fff", fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer", fontFamily: "'Montserrat',sans-serif", transition: "opacity 0.25s" }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = "0.82")}
                  onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
                  Отправить ответ
                </button>
              </form>
            )}
          </FadeIn>
        </section>

        {/* ── ПЛАВНЫЙ ПЕРЕХОД К ТЁМНОМУ ── */}
        <div style={{ height: 200, background: `linear-gradient(180deg, ${C.creamAlt} 0%, #2A2520 100%)` }} />

        {/* ФИНАЛ — тёмный */}
        <section style={{ padding: "80px 20px 120px", textAlign: "center", position: "relative", overflow: "hidden", background: C.dark1 }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${IMG_PEONY1})`, backgroundSize: "cover", backgroundPosition: "center", opacity: 0.06 }} />

          <div style={{ position: "relative", zIndex: 1 }}>
            <FadeIn>
              <div style={{ width: "min(260px, 70vw)", aspectRatio: "1", margin: "0 auto 44px", overflow: "hidden", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.12)", position: "relative" }}>
                <img src={IMG_WINTER} alt="Аэлита и Тузагаш" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", transform: "rotate(90deg) scale(1.3)" }} />
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(22px,6vw,36px)", fontWeight: 300, color: "#F5F0E8", lineHeight: 1.75, marginBottom: 20 }}>
                Мы вас ждём<br />
                <span style={{ fontSize: "0.7em", color: "rgba(245,240,232,0.6)" }}>и будем счастливы разделить этот важный день вместе с вами</span>
              </p>
            </FadeIn>

            <FadeIn delay={0.25}>
              <div style={{ width: 36, height: 1, background: "rgba(201,132,122,0.5)", margin: "28px auto" }} />
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(16px,4vw,20px)", color: "rgba(245,240,232,0.55)", fontStyle: "italic", marginBottom: 36 }}>
                С любовью,<br />
                <span style={{ fontSize: "1.25em", color: "#F5F0E8" }}>Аэлита &amp; Тузагаш</span>
              </p>
            </FadeIn>

            <FadeIn delay={0.35}>
              <div style={{ display: "flex", gap: 32, justifyContent: "center", flexWrap: "wrap" }}>
                {[
                  { role: "Невеста — Аэлита", phone: "+7 (983) 581-61-97", tel: "+79835816197" },
                  { role: "Жених — Тузагаш",  phone: "+7 (913) 404-33-19", tel: "+79134043319" },
                ].map((ct, i) => (
                  <div key={i} style={{ textAlign: "center" }}>
                    <p style={{ fontSize: 11, letterSpacing: "0.15em", color: "rgba(245,240,232,0.4)", textTransform: "uppercase", marginBottom: 6 }}>{ct.role}</p>
                    <a href={`tel:${ct.tel}`} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: "#F5F0E8", textDecoration: "none", letterSpacing: "0.05em" }}>{ct.phone}</a>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.45}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(38px,11vw,68px)", color: "rgba(245,240,232,0.05)", fontWeight: 300, letterSpacing: "0.08em", userSelect: "none", marginTop: 60 }}>
                18.08.2026
              </p>
            </FadeIn>
          </div>
        </section>

      </div>{/* /contentRef */}

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
