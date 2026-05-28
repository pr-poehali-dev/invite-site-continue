import { useState, useEffect, useRef } from "react";

// Цветовые токены — светлая молочно-зелёная палитра
const C = {
  bg: "#F8F5F0",
  bgAlt: "#F2EEE8",
  text: "#2C2820",
  textMuted: "#8C8278",
  accent: "#7A8C6E",       // нежно-оливковый
  accentLight: "#A8B89A",
  border: "rgba(44,40,32,0.1)",
  borderAccent: "rgba(122,140,110,0.3)",
};

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
  const [intro, setIntro] = useState<"phrase" | "open">("phrase");
  const [formData, setFormData] = useState({ name: "", attending: "", wish: "" });
  const [submitted, setSubmitted] = useState(false);
  const { d, h, m, s } = useCountdown(WEDDING_DATE);

  const handleTouch = () => {
    if (intro === "phrase") setIntro("open");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Montserrat', sans-serif", color: C.text, overflowX: "hidden" }}>

      {/* СЕКЦИЯ 1: ИНТРО */}
      <section
        onClick={handleTouch}
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          cursor: "default",
          background: C.bg,
        }}
      >
        {/* Мягкое утреннее свечение сверху-справа */}
        <div style={{
          position: "absolute",
          top: "-20%",
          right: "-10%",
          width: "70vw",
          height: "70vw",
          maxWidth: 600,
          maxHeight: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(220,215,195,0.55) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute",
          bottom: "-15%",
          left: "-10%",
          width: "50vw",
          height: "50vw",
          maxWidth: 400,
          maxHeight: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(168,184,154,0.2) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        {/* Фаза 1: фраза */}
        <div style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 32px",
          opacity: intro === "phrase" ? 1 : 0,
          transition: "opacity 1.2s ease",
          pointerEvents: intro === "phrase" ? "auto" : "none",
          textAlign: "center",
        }}>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(22px, 6vw, 38px)",
            fontWeight: 300,
            color: C.text,
            lineHeight: 1.6,
            letterSpacing: "0.01em",
            maxWidth: 520,
            opacity: 0,
            animation: "softAppear 2s ease 0.4s forwards",
          }}>
            У каждой любви<br />есть своя история…
          </p>
        </div>

        {/* Фаза 2: основное приглашение */}
        <div style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 32px",
          opacity: intro === "open" ? 1 : 0,
          transition: "opacity 1.4s ease",
          pointerEvents: intro === "open" ? "auto" : "none",
          textAlign: "center",
        }}>
          <p style={{
            fontSize: 11,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: C.accent,
            marginBottom: 32,
          }}>
            Свадебное приглашение
          </p>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(52px, 14vw, 96px)",
            fontWeight: 300,
            lineHeight: 1,
            color: C.text,
            letterSpacing: "-0.01em",
            marginBottom: 8,
          }}>
            Аэлита
          </h1>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(18px, 4vw, 28px)",
            fontWeight: 300,
            color: C.accentLight,
            letterSpacing: "0.25em",
            marginBottom: 8,
          }}>
            &amp;
          </p>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(52px, 14vw, 96px)",
            fontWeight: 300,
            lineHeight: 1,
            color: C.text,
            letterSpacing: "-0.01em",
            marginBottom: 40,
          }}>
            Тузагаш
          </h1>
          <div style={{ width: 32, height: 1, background: C.borderAccent, margin: "0 auto 32px" }} />
          <p style={{
            fontSize: "clamp(13px, 3vw, 15px)",
            letterSpacing: "0.15em",
            color: C.textMuted,
            lineHeight: 2,
          }}>
            Приглашаем вас разделить<br />
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(20px, 5vw, 26px)", color: C.text, letterSpacing: "0.05em" }}>18 августа 2026</span>
          </p>
        </div>
      </section>

      {/* СЕКЦИЯ 2: ТАЙМЕР */}
      <section style={{ padding: "100px 20px", textAlign: "center", background: C.bgAlt }}>
        <FadeIn>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(14px, 3vw, 16px)", letterSpacing: "0.25em", color: C.textMuted, textTransform: "uppercase", marginBottom: 40 }}>
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
                  color: C.text,
                  lineHeight: 1,
                  minWidth: "clamp(60px, 18vw, 100px)",
                  background: C.bg,
                  border: `1px solid ${C.border}`,
                  borderRadius: 2,
                  padding: "12px 8px 8px",
                }}>
                  {pad(v)}
                </div>
                <p style={{ fontSize: 10, letterSpacing: "0.2em", color: C.accent, textTransform: "uppercase", marginTop: 8 }}>{l}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* СЕКЦИЯ 3: ИСТОРИЯ */}
      <section style={{ padding: "100px 20px", maxWidth: 900, margin: "0 auto" }}>
        <FadeIn>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(14px, 3vw, 16px)", letterSpacing: "0.25em", color: C.textMuted, textTransform: "uppercase", textAlign: "center", marginBottom: 64 }}>
            Наша история
          </p>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 40, marginBottom: 80 }}>
          <FadeIn delay={0.1}>
            <div style={{ textAlign: "center" }}>
              <div style={{ width: "100%", maxWidth: 280, margin: "0 auto", aspectRatio: "3/4", overflow: "hidden", borderRadius: 2, border: `1px solid ${C.border}`, position: "relative" }}>
                <img src={IMG_GIRL} alt="Аэлита в детстве" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "sepia(0.15) brightness(1.02) saturate(0.9)" }} />
              </div>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(15px, 3.5vw, 18px)", fontStyle: "italic", color: C.textMuted, marginTop: 20, lineHeight: 1.7, padding: "0 10px" }}>
                «Интересно, каким будет мой будущий муж, когда я вырасту?..»
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.25}>
            <div style={{ textAlign: "center" }}>
              <div style={{ width: "100%", maxWidth: 280, margin: "0 auto", aspectRatio: "3/4", overflow: "hidden", borderRadius: 2, border: `1px solid ${C.border}`, position: "relative" }}>
                <img src={IMG_BOY} alt="Тузагаш в детстве" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "sepia(0.15) brightness(1.02) saturate(0.9)" }} />
              </div>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(15px, 3.5vw, 18px)", fontStyle: "italic", color: C.textMuted, marginTop: 20, lineHeight: 1.7, padding: "0 10px" }}>
                «Интересно, какой будет моя будущая жена?..»
              </p>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.1}>
          <div style={{ textAlign: "center" }}>
            <div style={{ width: "100%", maxWidth: 560, margin: "0 auto", aspectRatio: "16/9", overflow: "hidden", borderRadius: 2, border: `1px solid ${C.border}`, position: "relative" }}>
              <img src={IMG_COUPLE} alt="Аэлита и Тузагаш" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 50%, rgba(248,245,240,0.85) 100%)" }} />
              <div style={{ position: "absolute", bottom: 24, left: 0, right: 0, textAlign: "center" }}>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(18px, 5vw, 24px)", color: C.text, letterSpacing: "0.05em" }}>И вот мы встретились…</p>
              </div>
            </div>
            <div style={{ marginTop: 48 }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(22px, 6vw, 36px)", fontWeight: 300, lineHeight: 1.9, color: C.text, letterSpacing: "0.03em" }}>
                Два сердца.<br />
                Две судьбы.<br />
                <span style={{ color: C.accent }}>Одна любовь.</span><br />
                Один путь на двоих.
              </p>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* СЕКЦИЯ 4: КАЛЕНДАРЬ */}
      <section style={{ padding: "100px 20px", background: C.bgAlt, textAlign: "center" }}>
        <FadeIn>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(14px, 3vw, 16px)", letterSpacing: "0.25em", color: C.textMuted, textTransform: "uppercase", marginBottom: 48 }}>
            Дата нашей свадьбы
          </p>
        </FadeIn>
        <FadeIn delay={0.15}>
          <div style={{ maxWidth: 420, margin: "0 auto", border: `1px solid ${C.border}`, borderRadius: 2, overflow: "hidden", background: C.bg }}>
            <div style={{ background: C.bgAlt, padding: "16px 0", borderBottom: `1px solid ${C.border}` }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, color: C.text, letterSpacing: "0.1em" }}>Август 2026</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", padding: "12px 8px 8px" }}>
              {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map(dayLabel => (
                <div key={dayLabel} style={{ textAlign: "center", fontSize: 10, letterSpacing: "0.1em", color: C.accent, padding: "4px 0 8px", textTransform: "uppercase" }}>{dayLabel}</div>
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
                      color: day === 18 ? C.bg : C.textMuted,
                      background: day === 18 ? C.accent : "transparent",
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

      {/* СЕКЦИЯ 5: ПРОГРАММА */}
      <section style={{ padding: "100px 20px", maxWidth: 700, margin: "0 auto" }}>
        <FadeIn>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(14px, 3vw, 16px)", letterSpacing: "0.25em", color: C.textMuted, textTransform: "uppercase", textAlign: "center", marginBottom: 64 }}>
            Программа дня
          </p>
        </FadeIn>
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", left: "clamp(24px, 8vw, 60px)", top: 0, bottom: 0, width: 1, background: `linear-gradient(180deg, transparent, ${C.borderAccent} 10%, ${C.borderAccent} 90%, transparent)`, pointerEvents: "none" }} />
          {SCHEDULE.map((item, i) => (
            <FadeIn key={i} delay={i * 0.12}>
              <div style={{ display: "flex", gap: "clamp(20px, 6vw, 48px)", marginBottom: 56, position: "relative" }}>
                <div style={{ flexShrink: 0, width: "clamp(48px, 16vw, 120px)", textAlign: "right", paddingRight: 24, position: "relative", display: "flex", flexDirection: "column", alignItems: "flex-end", justifyContent: "flex-start", paddingTop: 2 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.accent, position: "absolute", right: -4, top: 7 }} />
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(18px, 5vw, 24px)", color: C.accent, lineHeight: 1 }}>{item.time}</p>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: "clamp(18px, 5vw, 22px)", marginBottom: 0 }}>{item.icon}</p>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(20px, 5vw, 26px)", fontWeight: 400, color: C.text, marginBottom: 6, lineHeight: 1.2 }}>{item.title}</h3>
                  <p style={{ fontSize: "clamp(11px, 2.5vw, 13px)", color: C.accent, letterSpacing: "0.05em", marginBottom: 8 }}>{item.place}</p>
                  <p style={{ fontSize: "clamp(12px, 3vw, 14px)", color: C.textMuted, lineHeight: 1.7 }}>{item.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* СЕКЦИЯ 6: МЕСТО */}
      <section style={{ padding: "100px 20px", background: C.bgAlt, textAlign: "center" }}>
        <FadeIn>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(14px, 3vw, 16px)", letterSpacing: "0.25em", color: C.textMuted, textTransform: "uppercase", marginBottom: 48 }}>
            Место проведения
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(18px, 4.5vw, 22px)", color: C.textMuted, marginBottom: 40, fontStyle: "italic" }}>
            Ждём вас по адресу:
          </p>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24, maxWidth: 700, margin: "0 auto 48px" }}>
          {[
            { title: "Алтай той", addr: "с. Новый Бельтир", street: "ул. Кара-Кем, дом 5", time: "10:00", maps: "https://maps.google.com/?q=%D0%9D%D0%BE%D0%B2%D1%8B%D0%B9+%D0%91%D0%B5%D0%BB%D1%8C%D1%82%D0%B8%D1%80+%D1%83%D0%BB+%D0%9A%D0%B0%D1%80%D0%B0-%D0%9A%D0%B5%D0%BC+5" },
            { title: "Банкет · Кафе «Таштажу»", addr: "с. Кош-Агач", street: "ул. Каменистая, 27", time: "16:00", maps: "https://maps.google.com/?q=%D0%9A%D0%BE%D1%88-%D0%90%D0%B3%D0%B0%D1%87+%D1%83%D0%BB+%D0%9A%D0%B0%D0%BC%D0%B5%D0%BD%D0%B8%D1%81%D1%82%D0%B0%D1%8F+27" },
          ].map((loc, i) => (
            <FadeIn key={i} delay={i * 0.15}>
              <div style={{ border: `1px solid ${C.border}`, borderRadius: 2, padding: "32px 24px", background: C.bg, position: "relative" }}>
                <div style={{ position: "absolute", top: 16, right: 16, fontSize: 11, letterSpacing: "0.15em", color: C.accent }}>{loc.time}</div>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: C.text, marginBottom: 8 }}>{loc.title}</p>
                <p style={{ fontSize: 13, color: C.accent, marginBottom: 4 }}>{loc.addr}</p>
                <p style={{ fontSize: 13, color: C.textMuted, marginBottom: 20 }}>{loc.street}</p>
                <a
                  href={loc.maps}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "inline-block", padding: "8px 20px", border: `1px solid ${C.borderAccent}`, borderRadius: 2, fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: C.accent, textDecoration: "none" }}
                >
                  Открыть карту
                </a>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.3}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(15px, 3.5vw, 18px)", fontStyle: "italic", color: C.textMuted, maxWidth: 500, margin: "0 auto", lineHeight: 1.8 }}>
            Пусть эта дорога приведёт вас к одному из самых счастливых дней нашей жизни.
          </p>
        </FadeIn>
      </section>

      {/* СЕКЦИЯ 7: ДРЕСС-КОД */}
      <section style={{ padding: "100px 20px", maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
        <FadeIn>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(14px, 3vw, 16px)", letterSpacing: "0.25em", color: C.textMuted, textTransform: "uppercase", marginBottom: 40 }}>
            Дресс-код
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p style={{ fontSize: "clamp(13px, 3.5vw, 15px)", color: C.textMuted, lineHeight: 1.9, marginBottom: 48, maxWidth: 520, margin: "0 auto 48px" }}>
            Для нас будет особенно приятно, если вы поддержите атмосферу нашего дня, выбрав наряды в пастельных оттенках
          </p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 20, justifyContent: "center", marginBottom: 48 }}>
            {DRESS_COLORS.map((dc, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ width: 52, height: 52, borderRadius: "50%", background: dc.hex, border: `1px solid ${C.border}`, margin: "0 auto 8px", boxShadow: "0 2px 12px rgba(44,40,32,0.08)" }} />
                <p style={{ fontSize: 10, color: C.textMuted, letterSpacing: "0.05em", maxWidth: 64 }}>{dc.name}</p>
              </div>
            ))}
          </div>
        </FadeIn>
        <FadeIn delay={0.3}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(16px, 4vw, 20px)", color: C.textMuted, lineHeight: 1.9, fontStyle: "italic", maxWidth: 500, margin: "0 auto" }}>
            Главное для нас — ваше присутствие, улыбки и хорошее настроение.
            <br /><span style={{ color: C.accent }}>Мы будем счастливы разделить этот день вместе с вами.</span>
          </p>
        </FadeIn>
      </section>

      {/* СЕКЦИЯ 8: RSVP */}
      <section style={{ padding: "100px 20px", background: C.bgAlt, textAlign: "center" }}>
        <FadeIn>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(14px, 3vw, 16px)", letterSpacing: "0.25em", color: C.textMuted, textTransform: "uppercase", marginBottom: 24 }}>
            Подтверждение
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(20px, 5vw, 28px)", color: C.text, lineHeight: 1.6, marginBottom: 48, maxWidth: 480, margin: "0 auto 48px" }}>
            Нам будет очень важно разделить этот день вместе с вами
          </p>
        </FadeIn>
        <FadeIn delay={0.2}>
          {submitted ? (
            <div style={{ padding: "48px 24px", border: `1px solid ${C.border}`, borderRadius: 2, maxWidth: 480, margin: "0 auto", background: C.bg }}>
              <p style={{ fontSize: 28, marginBottom: 16, color: C.accent }}>♡</p>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, color: C.text, marginBottom: 8 }}>Спасибо!</p>
              <p style={{ fontSize: 14, color: C.textMuted }}>Ваш ответ получен. Мы рады, что вы с нами.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ maxWidth: 480, margin: "0 auto", display: "flex", flexDirection: "column", gap: 16 }}>
              <input
                type="text"
                placeholder="Ваше имя"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                required
                style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 2, padding: "14px 18px", color: C.text, fontSize: 14, fontFamily: "'Montserrat', sans-serif", outline: "none", width: "100%", boxSizing: "border-box" }}
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
                      border: `1px solid ${formData.attending === opt ? C.accent : C.border}`,
                      borderRadius: 2,
                      background: formData.attending === opt ? "rgba(122,140,110,0.1)" : C.bg,
                      color: formData.attending === opt ? C.accent : C.textMuted,
                      fontSize: 12,
                      letterSpacing: "0.05em",
                      cursor: "pointer",
                      fontFamily: "'Montserrat', sans-serif",
                      transition: "all 0.25s ease",
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
                style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 2, padding: "14px 18px", color: C.text, fontSize: 14, fontFamily: "'Montserrat', sans-serif", outline: "none", resize: "none", width: "100%", boxSizing: "border-box" }}
              />
              <button
                type="submit"
                style={{ padding: "15px", background: C.accent, border: "none", borderRadius: 2, color: "#fff", fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer", fontFamily: "'Montserrat', sans-serif", transition: "opacity 0.25s ease" }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
              >
                Отправить ответ
              </button>
            </form>
          )}
        </FadeIn>
      </section>

      {/* СЕКЦИЯ 9: ФИНАЛ */}
      <section style={{ padding: "100px 20px 120px", textAlign: "center", position: "relative", overflow: "hidden", background: C.bg }}>
        {/* Фоновый горный пейзаж — очень светло */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          <img src={IMG_MOUNTAINS} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.06, filter: "saturate(0.4)" }} />
        </div>
        <div style={{ position: "relative", zIndex: 1 }}>
          <FadeIn>
            <div style={{ width: 160, aspectRatio: "3/4", margin: "0 auto 40px", overflow: "hidden", borderRadius: 2, border: `1px solid ${C.border}` }}>
              <img src={IMG_NEWYEAR} alt="Аэлита и Тузагаш" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(22px, 6vw, 36px)", fontWeight: 300, color: C.text, lineHeight: 1.7, marginBottom: 24 }}>
              Мы вас ждём<br />
              <span style={{ fontSize: "0.7em", color: C.textMuted }}>и будем счастливы разделить этот важный день вместе с вами</span>
            </p>
          </FadeIn>
          <FadeIn delay={0.25}>
            <div style={{ width: 32, height: 1, background: C.borderAccent, margin: "32px auto" }} />
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(16px, 4vw, 20px)", color: C.textMuted, fontStyle: "italic", marginBottom: 40 }}>
              С любовью,<br />
              <span style={{ fontSize: "1.3em", color: C.text }}>Аэлита &amp; Тузагаш</span>
            </p>
          </FadeIn>
          <FadeIn delay={0.35}>
            <div style={{ display: "flex", gap: 32, justifyContent: "center", flexWrap: "wrap" }}>
              {[
                { role: "Невеста — Аэлита", phone: "+7 (983) 581-61-97", tel: "+79835816197" },
                { role: "Жених — Тузагаш", phone: "+7 (913) 404-33-19", tel: "+79134043319" },
              ].map((ct, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <p style={{ fontSize: 11, letterSpacing: "0.15em", color: C.textMuted, textTransform: "uppercase", marginBottom: 6 }}>{ct.role}</p>
                  <a href={`tel:${ct.tel}`} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: C.text, textDecoration: "none", letterSpacing: "0.05em" }}>
                    {ct.phone}
                  </a>
                </div>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={0.45}>
            <div style={{ marginTop: 72 }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(40px, 12vw, 72px)", color: "rgba(44,40,32,0.06)", fontWeight: 300, letterSpacing: "0.08em", userSelect: "none" }}>
                18.08.2026
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <style>{`
        @keyframes softAppear {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        input::placeholder, textarea::placeholder { color: rgba(140,130,120,0.6); }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #F8F5F0; }
        ::-webkit-scrollbar-thumb { background: rgba(122,140,110,0.3); border-radius: 2px; }
      `}</style>
    </div>
  );
}