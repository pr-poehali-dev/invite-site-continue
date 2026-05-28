import { useState, useEffect, useRef } from "react";

const WEDDING_DATE = new Date("2026-08-18T10:00:00");

const IMG_MOUNTAINS = "https://cdn.poehali.dev/projects/c533460a-ce3f-405a-b498-c59832d6dc6c/files/4285e0e5-d18a-41b7-9313-fc12c3c7a21a.jpg";
const IMG_GIRL = "https://cdn.poehali.dev/projects/c533460a-ce3f-405a-b498-c59832d6dc6c/files/75f5d55d-8be2-4909-affc-9337c724d5cc.jpg";
const IMG_BOY = "https://cdn.poehali.dev/projects/c533460a-ce3f-405a-b498-c59832d6dc6c/files/86d0d7bf-8155-492c-ab86-ca6a24ed9118.jpg";
const IMG_COUPLE = "https://cdn.poehali.dev/projects/c533460a-ce3f-405a-b498-c59832d6dc6c/files/f61e5f21-4496-4ac1-b5d7-b862edb7d04a.jpg";
const IMG_NEWYEAR = "https://cdn.poehali.dev/projects/c533460a-ce3f-405a-b498-c59832d6dc6c/files/bd59f64d-99f6-4c29-aa90-0da7c9ef8327.jpg";

function useCountdown(target: Date) {
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) { setTime({ d: 0, h: 0, m: 0, s: 0 }); return; }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTime({ d, h, m, s });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);
  return time;
}

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.9s ease ${delay}s, transform 0.9s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function Seal({ cracked, onClick }: { cracked: boolean; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      style={{ width: 110, height: 110, position: "relative", cursor: "pointer", margin: "0 auto" }}
    >
      <svg viewBox="0 0 110 110" width="110" height="110">
        <defs>
          <radialGradient id="sealGrad" cx="50%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#c8960c" />
            <stop offset="100%" stopColor="#7a3e0a" />
          </radialGradient>
        </defs>
        <circle cx="55" cy="55" r="52" fill="url(#sealGrad)" />
        <circle cx="55" cy="55" r="46" fill="none" stroke="#f0c85a" strokeWidth="1.5" strokeDasharray="4 3" />
        <text x="55" y="48" textAnchor="middle" fill="#fef3c7" fontFamily="Cormorant Garamond, serif" fontSize="18" fontWeight="600">А</text>
        <text x="55" y="70" textAnchor="middle" fill="#fef3c7" fontFamily="Cormorant Garamond, serif" fontSize="14" fontWeight="400">&amp;</text>
        <text x="55" y="88" textAnchor="middle" fill="#fef3c7" fontFamily="Cormorant Garamond, serif" fontSize="18" fontWeight="600">Т</text>
        {cracked && (
          <>
            <line x1="55" y1="3" x2="42" y2="55" stroke="#1a0800" strokeWidth="1.5" opacity="0.8" />
            <line x1="55" y1="3" x2="68" y2="55" stroke="#1a0800" strokeWidth="1.5" opacity="0.8" />
            <line x1="28" y1="28" x2="55" y2="55" stroke="#1a0800" strokeWidth="1" opacity="0.6" />
            <line x1="82" y1="28" x2="55" y2="55" stroke="#1a0800" strokeWidth="1" opacity="0.6" />
            <line x1="8" y1="70" x2="55" y2="55" stroke="#1a0800" strokeWidth="1" opacity="0.5" />
          </>
        )}
      </svg>
    </div>
  );
}

const SCHEDULE = [
  { time: "10:00", title: "Алтай той", place: "с. Новый Бельтир, ул. Кара-Кем, 5", desc: "Встреча гостей, традиционные угощения и праздничное начало дня", icon: "🌅" },
  { time: "14:00", title: "Прогулка и катание", place: "Живописные окрестности Алтая", desc: "Тёплая прогулка, красивые моменты и живые эмоции", icon: "🏔️" },
  { time: "16:00", title: "Банкет", place: "Кафе «Таштажу», с. Кош-Агач, ул. Каменистая, 27", desc: "Праздничный стол, музыка, тосты и первый танец молодожёнов", icon: "🥂" },
  { time: "22:00", title: "Завершение вечера", place: "Под алтайским небом", desc: "Финальные тосты, тёплые объятия и прощание под звёздами", icon: "✨" },
];

const DRESS_COLORS = [
  { name: "Молочный", hex: "#FAF7F2" },
  { name: "Бежевый", hex: "#E8DCC8" },
  { name: "Кремовый", hex: "#F5ECD7" },
  { name: "Пудровый", hex: "#E8C5B8" },
  { name: "Светло-серый", hex: "#D8D8D8" },
  { name: "Нежно-оливковый", hex: "#C8D4B8" },
  { name: "Песочный", hex: "#D4BC8C" },
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
  const [envelopePhase, setEnvelopePhase] = useState<"closed" | "cracking" | "opening" | "open">("closed");
  const [formData, setFormData] = useState({ name: "", attending: "", wish: "" });
  const [submitted, setSubmitted] = useState(false);
  const { d, h, m, s } = useCountdown(WEDDING_DATE);

  const handleSealClick = () => {
    if (envelopePhase !== "closed") return;
    setEnvelopePhase("cracking");
    setTimeout(() => setEnvelopePhase("opening"), 600);
    setTimeout(() => setEnvelopePhase("open"), 1800);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div style={{ background: "#0d0a08", minHeight: "100vh", fontFamily: "'Montserrat', sans-serif", color: "#f5ecd7", overflowX: "hidden" }}>

      {/* СЕКЦИЯ 1: КОНВЕРТ */}
      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", padding: "40px 20px" }}>
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          {Array.from({ length: 30 }).map((_, i) => (
            <div key={i} style={{
              position: "absolute",
              left: `${(i * 37 + 5) % 100}%`,
              top: `${(i * 53 + 10) % 100}%`,
              width: `${1 + (i % 3)}px`,
              height: `${1 + (i % 3)}px`,
              background: "#c8960c",
              borderRadius: "50%",
              opacity: 0.15 + (i % 5) * 0.07,
              animation: `float ${4 + (i % 6)}s ease-in-out ${(i % 4)}s infinite alternate`,
            }} />
          ))}
        </div>

        <div style={{
          width: "min(480px, 92vw)",
          position: "relative",
          transition: "transform 1.2s cubic-bezier(0.34,1.56,0.64,1)",
          transform: envelopePhase === "open" ? "scale(1.04)" : "scale(1)",
        }}>
          <div style={{
            background: "linear-gradient(145deg, #1e140c 0%, #2a1a0e 50%, #1a0f08 100%)",
            border: "1px solid rgba(200,150,12,0.4)",
            borderRadius: 8,
            padding: "60px 40px 48px",
            boxShadow: "0 0 80px rgba(200,150,12,0.12), 0 30px 80px rgba(0,0,0,0.8), inset 0 1px 0 rgba(200,150,12,0.2)",
            position: "relative",
            overflow: "hidden",
          }}>
            <div style={{ position: "absolute", top: 0, left: "10%", right: "10%", height: 1, background: "linear-gradient(90deg, transparent, #c8960c, transparent)" }} />

            <div style={{ textAlign: "center", position: "relative", zIndex: 5 }}>
              <div style={{
                transition: "transform 0.6s ease, opacity 0.6s ease",
                transform: envelopePhase === "cracking" || envelopePhase === "opening" ? "scale(1.15)" : "scale(1)",
                opacity: envelopePhase === "opening" ? 0.6 : 1,
                marginBottom: 28,
              }}>
                <Seal cracked={envelopePhase !== "closed"} onClick={handleSealClick} />
              </div>

              {envelopePhase === "closed" && (
                <p style={{ color: "#c8960c", fontSize: 12, letterSpacing: "0.25em", textTransform: "uppercase", marginTop: 8, opacity: 0.8 }}>
                  нажмите на печать
                </p>
              )}

              <div style={{
                opacity: envelopePhase === "open" ? 1 : 0,
                transform: envelopePhase === "open" ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s",
                pointerEvents: envelopePhase === "open" ? "auto" : "none",
              }}>
                <div style={{ width: 40, height: 1, background: "#c8960c", margin: "0 auto 24px" }} />
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(13px, 3vw, 15px)", letterSpacing: "0.3em", color: "#c8960c", textTransform: "uppercase", marginBottom: 16 }}>
                  Вам письмо
                </p>
                <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(38px, 10vw, 64px)", fontWeight: 300, lineHeight: 1.1, color: "#fef3c7", marginBottom: 20, letterSpacing: "0.02em" }}>
                  Аэлита<br /><span style={{ fontSize: "0.5em", color: "#c8960c", letterSpacing: "0.3em" }}>&amp;</span><br />Тузагаш
                </h1>
                <div style={{ width: 60, height: 1, background: "rgba(200,150,12,0.4)", margin: "0 auto 20px" }} />
                <p style={{ fontSize: "clamp(13px, 3.5vw, 15px)", letterSpacing: "0.1em", color: "#d4bc8c", lineHeight: 1.8 }}>
                  Приглашаем вас на свадьбу
                </p>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(22px, 6vw, 32px)", fontWeight: 400, color: "#c8960c", marginTop: 8, letterSpacing: "0.05em" }}>
                  18 августа 2026 года
                </p>
                <div style={{ width: 40, height: 1, background: "#c8960c", margin: "20px auto 0" }} />
              </div>

              {(envelopePhase === "cracking" || envelopePhase === "opening") && (
                <div style={{ paddingTop: 20, color: "#c8960c", opacity: 0.5, fontSize: 12, letterSpacing: "0.2em" }}>открываем…</div>
              )}
            </div>
          </div>
        </div>

        {envelopePhase === "open" && (
          <div style={{ marginTop: 48, opacity: 0, animation: "fadeInUp 1s ease 1s forwards" }}>
            <svg width="24" height="40" viewBox="0 0 24 40" fill="none">
              <line x1="12" y1="0" x2="12" y2="32" stroke="#c8960c" strokeWidth="1" opacity="0.6" />
              <polyline points="4,24 12,36 20,24" stroke="#c8960c" strokeWidth="1" fill="none" opacity="0.6" />
            </svg>
          </div>
        )}
      </section>

      {/* СЕКЦИЯ 2: ТАЙМЕР */}
      <section style={{ padding: "100px 20px", textAlign: "center", background: "linear-gradient(180deg, #0d0a08 0%, #120d08 50%, #0d0a08 100%)" }}>
        <FadeIn>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(14px, 3vw, 16px)", letterSpacing: "0.3em", color: "#c8960c", textTransform: "uppercase", marginBottom: 40 }}>
            До нашего дня осталось…
          </p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div style={{ display: "flex", gap: "clamp(12px, 4vw, 48px)", justifyContent: "center", alignItems: "flex-start" }}>
            {[{ v: d, l: "дней" }, { v: h, l: "часов" }, { v: m, l: "минут" }, { v: s, l: "секунд" }].map(({ v, l }, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(44px, 12vw, 80px)",
                  fontWeight: 300,
                  color: "#fef3c7",
                  lineHeight: 1,
                  minWidth: "clamp(60px, 18vw, 100px)",
                  background: "rgba(200,150,12,0.06)",
                  border: "1px solid rgba(200,150,12,0.2)",
                  borderRadius: 4,
                  padding: "12px 8px 8px",
                  position: "relative",
                }}>
                  {pad(v)}
                </div>
                <p style={{ fontSize: 10, letterSpacing: "0.2em", color: "#c8960c", textTransform: "uppercase", marginTop: 8 }}>{l}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* СЕКЦИЯ 3: ИСТОРИЯ */}
      <section style={{ padding: "100px 20px", maxWidth: 900, margin: "0 auto" }}>
        <FadeIn>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(14px, 3vw, 16px)", letterSpacing: "0.3em", color: "#c8960c", textTransform: "uppercase", textAlign: "center", marginBottom: 64 }}>
            Наша история
          </p>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 40, marginBottom: 80 }}>
          <FadeIn delay={0.1}>
            <div style={{ textAlign: "center" }}>
              <div style={{ width: "100%", maxWidth: 280, margin: "0 auto", aspectRatio: "3/4", overflow: "hidden", borderRadius: 4, border: "1px solid rgba(200,150,12,0.2)", position: "relative" }}>
                <img src={IMG_GIRL} alt="Аэлита в детстве" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "sepia(0.3) brightness(0.85)" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 50%, rgba(13,10,8,0.9) 100%)" }} />
              </div>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(15px, 3.5vw, 18px)", fontStyle: "italic", color: "#d4bc8c", marginTop: 20, lineHeight: 1.7, padding: "0 10px" }}>
                «Интересно, каким будет мой будущий муж, когда я вырасту?..»
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.25}>
            <div style={{ textAlign: "center" }}>
              <div style={{ width: "100%", maxWidth: 280, margin: "0 auto", aspectRatio: "3/4", overflow: "hidden", borderRadius: 4, border: "1px solid rgba(200,150,12,0.2)", position: "relative" }}>
                <img src={IMG_BOY} alt="Тузагаш в детстве" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "sepia(0.3) brightness(0.85)" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 50%, rgba(13,10,8,0.9) 100%)" }} />
              </div>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(15px, 3.5vw, 18px)", fontStyle: "italic", color: "#d4bc8c", marginTop: 20, lineHeight: 1.7, padding: "0 10px" }}>
                «Интересно, какой будет моя будущая жена?..»
              </p>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.1}>
          <div style={{ textAlign: "center" }}>
            <div style={{ width: "100%", maxWidth: 560, margin: "0 auto", aspectRatio: "16/9", overflow: "hidden", borderRadius: 4, border: "1px solid rgba(200,150,12,0.3)", position: "relative" }}>
              <img src={IMG_COUPLE} alt="Аэлита и Тузагаш" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.85)" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 40%, rgba(13,10,8,0.7) 100%)" }} />
              <div style={{ position: "absolute", bottom: 24, left: 0, right: 0, textAlign: "center" }}>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(18px, 5vw, 24px)", color: "#fef3c7", letterSpacing: "0.05em" }}>И вот мы встретились…</p>
              </div>
            </div>
            <div style={{ marginTop: 48 }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(22px, 6vw, 36px)", fontWeight: 300, lineHeight: 1.8, color: "#fef3c7", letterSpacing: "0.03em" }}>
                Два сердца.<br />
                Две судьбы.<br />
                <span style={{ color: "#c8960c" }}>Одна любовь.</span><br />
                Один путь на двоих.
              </p>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* СЕКЦИЯ 4: КАЛЕНДАРЬ */}
      <section style={{ padding: "100px 20px", background: "linear-gradient(180deg, #0d0a08 0%, #120d08 50%, #0d0a08 100%)", textAlign: "center" }}>
        <FadeIn>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(14px, 3vw, 16px)", letterSpacing: "0.3em", color: "#c8960c", textTransform: "uppercase", marginBottom: 48 }}>
            Дата нашей свадьбы
          </p>
        </FadeIn>
        <FadeIn delay={0.15}>
          <div style={{ maxWidth: 420, margin: "0 auto", border: "1px solid rgba(200,150,12,0.2)", borderRadius: 4, overflow: "hidden", background: "rgba(200,150,12,0.03)" }}>
            <div style={{ background: "rgba(200,150,12,0.1)", padding: "16px 0", borderBottom: "1px solid rgba(200,150,12,0.2)" }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, color: "#fef3c7", letterSpacing: "0.1em" }}>Август 2026</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", padding: "12px 8px 8px" }}>
              {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map(dayLabel => (
                <div key={dayLabel} style={{ textAlign: "center", fontSize: 10, letterSpacing: "0.1em", color: "#c8960c", padding: "4px 0 8px", textTransform: "uppercase" }}>{dayLabel}</div>
              ))}
              {AUGUST_2026.flat().map((day, i) => (
                <div key={i} style={{ textAlign: "center", padding: "4px 2px" }}>
                  {day !== "" && (
                    <span style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 34,
                      height: 34,
                      borderRadius: day === 18 ? "50%" : 2,
                      fontFamily: day === 18 ? "'Cormorant Garamond', serif" : undefined,
                      fontSize: day === 18 ? 18 : 13,
                      fontWeight: day === 18 ? 500 : 400,
                      color: day === 18 ? "#0d0a08" : "#d4bc8c",
                      background: day === 18 ? "#c8960c" : "transparent",
                      border: day === 18 ? "2px solid #f0c85a" : "none",
                      boxShadow: day === 18 ? "0 0 20px rgba(200,150,12,0.6)" : "none",
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
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(16px, 4vw, 20px)", fontStyle: "italic", color: "#d4bc8c", marginTop: 40, lineHeight: 1.8 }}>
            День, который станет началом нашей новой истории…
          </p>
        </FadeIn>
      </section>

      {/* СЕКЦИЯ 5: ПРОГРАММА */}
      <section style={{ padding: "100px 20px", maxWidth: 700, margin: "0 auto" }}>
        <FadeIn>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(14px, 3vw, 16px)", letterSpacing: "0.3em", color: "#c8960c", textTransform: "uppercase", textAlign: "center", marginBottom: 64 }}>
            Программа дня
          </p>
        </FadeIn>
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", left: "clamp(24px, 8vw, 60px)", top: 0, bottom: 0, width: 1, background: "linear-gradient(180deg, transparent, rgba(200,150,12,0.4) 10%, rgba(200,150,12,0.4) 90%, transparent)", pointerEvents: "none" }} />
          {SCHEDULE.map((item, i) => (
            <FadeIn key={i} delay={i * 0.12}>
              <div style={{ display: "flex", gap: "clamp(20px, 6vw, 48px)", marginBottom: 56, position: "relative" }}>
                <div style={{ flexShrink: 0, width: "clamp(48px, 16vw, 120px)", textAlign: "right", paddingRight: 24, position: "relative", display: "flex", flexDirection: "column", alignItems: "flex-end", justifyContent: "flex-start", paddingTop: 2 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#c8960c", boxShadow: "0 0 12px rgba(200,150,12,0.8)", position: "absolute", right: -5, top: 6 }} />
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(18px, 5vw, 24px)", color: "#c8960c", lineHeight: 1 }}>{item.time}</p>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: "clamp(18px, 5vw, 22px)", marginBottom: 0 }}>{item.icon}</p>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(20px, 5vw, 26px)", fontWeight: 400, color: "#fef3c7", marginBottom: 6, lineHeight: 1.2 }}>{item.title}</h3>
                  <p style={{ fontSize: "clamp(11px, 2.5vw, 13px)", color: "#c8960c", letterSpacing: "0.05em", marginBottom: 8 }}>{item.place}</p>
                  <p style={{ fontSize: "clamp(12px, 3vw, 14px)", color: "#8a7a66", lineHeight: 1.7 }}>{item.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* СЕКЦИЯ 6: МЕСТО */}
      <section style={{ padding: "100px 20px", background: "linear-gradient(180deg, #0d0a08 0%, #120d08 50%, #0d0a08 100%)", textAlign: "center" }}>
        <FadeIn>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(14px, 3vw, 16px)", letterSpacing: "0.3em", color: "#c8960c", textTransform: "uppercase", marginBottom: 48 }}>
            Место проведения
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(18px, 4.5vw, 22px)", color: "#d4bc8c", marginBottom: 40, fontStyle: "italic" }}>
            Ждём вас по адресу:
          </p>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24, maxWidth: 700, margin: "0 auto 48px" }}>
          {[
            { title: "Алтай той", addr: "с. Новый Бельтир", street: "ул. Кара-Кем, дом 5", time: "10:00", maps: "https://maps.google.com/?q=%D0%9D%D0%BE%D0%B2%D1%8B%D0%B9+%D0%91%D0%B5%D0%BB%D1%8C%D1%82%D0%B8%D1%80+%D1%83%D0%BB+%D0%9A%D0%B0%D1%80%D0%B0-%D0%9A%D0%B5%D0%BC+5" },
            { title: "Банкет · Кафе «Таштажу»", addr: "с. Кош-Агач", street: "ул. Каменистая, 27", time: "16:00", maps: "https://maps.google.com/?q=%D0%9A%D0%BE%D1%88-%D0%90%D0%B3%D0%B0%D1%87+%D1%83%D0%BB+%D0%9A%D0%B0%D0%BC%D0%B5%D0%BD%D0%B8%D1%81%D1%82%D0%B0%D1%8F+27" },
          ].map((loc, i) => (
            <FadeIn key={i} delay={i * 0.15}>
              <div style={{ border: "1px solid rgba(200,150,12,0.25)", borderRadius: 4, padding: "32px 24px", background: "rgba(200,150,12,0.04)", position: "relative" }}>
                <div style={{ position: "absolute", top: 16, right: 16, fontSize: 11, letterSpacing: "0.15em", color: "#c8960c" }}>{loc.time}</div>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: "#fef3c7", marginBottom: 8 }}>{loc.title}</p>
                <p style={{ fontSize: 13, color: "#c8960c", marginBottom: 4 }}>{loc.addr}</p>
                <p style={{ fontSize: 13, color: "#8a7a66", marginBottom: 20 }}>{loc.street}</p>
                <a
                  href={loc.maps}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "inline-block", padding: "8px 20px", border: "1px solid rgba(200,150,12,0.4)", borderRadius: 2, fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#c8960c", textDecoration: "none" }}
                >
                  Открыть карту
                </a>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.3}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(15px, 3.5vw, 18px)", fontStyle: "italic", color: "#8a7a66", maxWidth: 500, margin: "0 auto", lineHeight: 1.8 }}>
            Пусть эта дорога приведёт вас к одному из самых счастливых дней нашей жизни.
          </p>
        </FadeIn>
      </section>

      {/* СЕКЦИЯ 7: ДРЕСС-КОД */}
      <section style={{ padding: "100px 20px", maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
        <FadeIn>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(14px, 3vw, 16px)", letterSpacing: "0.3em", color: "#c8960c", textTransform: "uppercase", marginBottom: 40 }}>
            Дресс-код
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p style={{ fontSize: "clamp(13px, 3.5vw, 15px)", color: "#8a7a66", lineHeight: 1.9, marginBottom: 48, maxWidth: 520, margin: "0 auto 48px" }}>
            Для нас будет особенно приятно, если вы поддержите атмосферу нашего дня, выбрав наряды в пастельных оттенках
          </p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 20, justifyContent: "center", marginBottom: 48 }}>
            {DRESS_COLORS.map((c, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", background: c.hex, border: "1px solid rgba(200,150,12,0.3)", margin: "0 auto 8px", boxShadow: "0 4px 16px rgba(0,0,0,0.4)" }} />
                <p style={{ fontSize: 10, color: "#8a7a66", letterSpacing: "0.05em", maxWidth: 64 }}>{c.name}</p>
              </div>
            ))}
          </div>
        </FadeIn>
        <FadeIn delay={0.3}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(16px, 4vw, 20px)", color: "#d4bc8c", lineHeight: 1.9, fontStyle: "italic", maxWidth: 500, margin: "0 auto" }}>
            Главное для нас — ваше присутствие, улыбки и хорошее настроение.
            <br /><span style={{ color: "#c8960c" }}>Мы будем счастливы разделить этот день вместе с вами.</span>
          </p>
        </FadeIn>
      </section>

      {/* СЕКЦИЯ 8: RSVP */}
      <section style={{ padding: "100px 20px", background: "linear-gradient(180deg, #0d0a08 0%, #120d08 50%, #0d0a08 100%)", textAlign: "center" }}>
        <FadeIn>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(14px, 3vw, 16px)", letterSpacing: "0.3em", color: "#c8960c", textTransform: "uppercase", marginBottom: 24 }}>
            Подтверждение
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(20px, 5vw, 28px)", color: "#fef3c7", lineHeight: 1.6, marginBottom: 48, maxWidth: 480, margin: "0 auto 48px" }}>
            Нам будет очень важно разделить этот день вместе с вами
          </p>
        </FadeIn>
        <FadeIn delay={0.2}>
          {submitted ? (
            <div style={{ padding: "48px 24px", border: "1px solid rgba(200,150,12,0.3)", borderRadius: 4, maxWidth: 480, margin: "0 auto", background: "rgba(200,150,12,0.05)" }}>
              <p style={{ fontSize: 32, marginBottom: 16 }}>♡</p>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, color: "#fef3c7", marginBottom: 8 }}>Спасибо!</p>
              <p style={{ fontSize: 14, color: "#8a7a66" }}>Ваш ответ получен. Мы рады, что вы с нами.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ maxWidth: 480, margin: "0 auto", display: "flex", flexDirection: "column", gap: 20 }}>
              <input
                type="text"
                placeholder="Ваше имя"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                required
                style={{ background: "rgba(200,150,12,0.05)", border: "1px solid rgba(200,150,12,0.2)", borderRadius: 2, padding: "14px 18px", color: "#fef3c7", fontSize: 14, fontFamily: "'Montserrat', sans-serif", outline: "none", width: "100%", boxSizing: "border-box" }}
              />
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                {["С удовольствием буду", "К сожалению, не смогу"].map((opt, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setFormData({ ...formData, attending: opt })}
                    style={{
                      flex: 1,
                      padding: "14px 12px",
                      border: `1px solid ${formData.attending === opt ? "#c8960c" : "rgba(200,150,12,0.2)"}`,
                      borderRadius: 2,
                      background: formData.attending === opt ? "rgba(200,150,12,0.15)" : "rgba(200,150,12,0.03)",
                      color: formData.attending === opt ? "#f0c85a" : "#8a7a66",
                      fontSize: 12,
                      letterSpacing: "0.05em",
                      cursor: "pointer",
                      fontFamily: "'Montserrat', sans-serif",
                      transition: "all 0.3s ease",
                      minWidth: 140,
                    }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              <textarea
                placeholder="Тёплое пожелание молодожёнам (необязательно)"
                value={formData.wish}
                onChange={e => setFormData({ ...formData, wish: e.target.value })}
                rows={3}
                style={{ background: "rgba(200,150,12,0.05)", border: "1px solid rgba(200,150,12,0.2)", borderRadius: 2, padding: "14px 18px", color: "#fef3c7", fontSize: 14, fontFamily: "'Montserrat', sans-serif", outline: "none", resize: "none", width: "100%", boxSizing: "border-box" }}
              />
              <button
                type="submit"
                style={{ padding: "16px", background: "transparent", border: "1px solid #c8960c", borderRadius: 2, color: "#f0c85a", fontSize: 12, letterSpacing: "0.25em", textTransform: "uppercase", cursor: "pointer", fontFamily: "'Montserrat', sans-serif", transition: "all 0.3s ease" }}
              >
                Отправить ответ
              </button>
            </form>
          )}
        </FadeIn>
      </section>

      {/* СЕКЦИЯ 9: ФИНАЛ */}
      <section style={{ padding: "100px 20px 120px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          <img src={IMG_MOUNTAINS} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.1, filter: "blur(2px)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, #0d0a08 0%, rgba(13,10,8,0.6) 50%, #0d0a08 100%)" }} />
        </div>
        <div style={{ position: "relative", zIndex: 1 }}>
          <FadeIn>
            <div style={{ width: 180, aspectRatio: "3/4", margin: "0 auto 40px", overflow: "hidden", borderRadius: 4, border: "1px solid rgba(200,150,12,0.3)" }}>
              <img src={IMG_NEWYEAR} alt="Аэлита и Тузагаш" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.85)" }} />
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(22px, 6vw, 36px)", fontWeight: 300, color: "#fef3c7", lineHeight: 1.7, marginBottom: 24 }}>
              Мы вас ждём<br />
              <span style={{ fontSize: "0.75em", color: "#d4bc8c" }}>и будем счастливы разделить этот важный день вместе с вами</span>
            </p>
          </FadeIn>
          <FadeIn delay={0.25}>
            <div style={{ width: 40, height: 1, background: "#c8960c", margin: "32px auto" }} />
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(16px, 4vw, 20px)", color: "#c8960c", fontStyle: "italic", marginBottom: 40 }}>
              С любовью,<br />
              <span style={{ fontSize: "1.3em", color: "#fef3c7" }}>Аэлита &amp; Тузагаш</span>
            </p>
          </FadeIn>
          <FadeIn delay={0.35}>
            <div style={{ display: "flex", gap: 32, justifyContent: "center", flexWrap: "wrap" }}>
              {[
                { role: "Невеста — Аэлита", phone: "+7 (983) 581-61-97", tel: "+79835816197" },
                { role: "Жених — Тузагаш", phone: "+7 (913) 404-33-19", tel: "+79134043319" },
              ].map((c, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <p style={{ fontSize: 11, letterSpacing: "0.15em", color: "#8a7a66", textTransform: "uppercase", marginBottom: 6 }}>{c.role}</p>
                  <a href={`tel:${c.tel}`} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: "#d4bc8c", textDecoration: "none", letterSpacing: "0.05em" }}>
                    {c.phone}
                  </a>
                </div>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={0.45}>
            <div style={{ marginTop: 64 }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(40px, 12vw, 72px)", color: "rgba(200,150,12,0.08)", fontWeight: 300, letterSpacing: "0.1em", userSelect: "none" }}>
                18.08.2026
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <style>{`
        @keyframes float {
          from { transform: translateY(0px) scale(1); }
          to { transform: translateY(-20px) scale(1.2); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        input::placeholder, textarea::placeholder { color: rgba(138,122,102,0.7); }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0d0a08; }
        ::-webkit-scrollbar-thumb { background: rgba(200,150,12,0.3); border-radius: 2px; }
      `}</style>
    </div>
  );
}
