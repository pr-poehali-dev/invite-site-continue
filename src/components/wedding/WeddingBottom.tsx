import { useState, useEffect, useRef } from "react";
import { C, SCHEDULE, DRESS_COLORS, IMG_WINTER } from "./wedding-config";
import { FadeIn } from "./wedding-shared";

const IMG_BOTANICAL = "https://cdn.poehali.dev/projects/c533460a-ce3f-405a-b498-c59832d6dc6c/files/87a92a96-7ed9-41bb-9af5-91138d62885a.jpg";

// Анимированный снегопад на Canvas
function Snowfall() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const flakes = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: 0.8 + Math.random() * 2.2,
      speed: 0.4 + Math.random() * 1.2,
      drift: (Math.random() - 0.5) * 0.4,
      opacity: 0.3 + Math.random() * 0.6,
    }));

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      flakes.forEach(f => {
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${f.opacity})`;
        ctx.fill();
        f.y += f.speed;
        f.x += f.drift;
        if (f.y > canvas.height) { f.y = -4; f.x = Math.random() * canvas.width; }
        if (f.x > canvas.width)  f.x = 0;
        if (f.x < 0) f.x = canvas.width;
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 2 }} />;
}

export default function WeddingBottom() {
  const [formData, setFormData] = useState({ name: "", attending: "", wish: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      {/* ПРОГРАММА */}
      <section style={{ padding: "100px 20px", maxWidth: 700, margin: "0 auto", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${IMG_BOTANICAL})`, backgroundSize: "cover", backgroundPosition: "center", opacity: 0.05, pointerEvents: "none" }} />
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
            { title: "Алтай той",       addr: "с. Новый Бельтир", street: "ул. Кара-Кем, дом 5",  time: "10:00", maps: "https://maps.google.com/?q=Новый+Бельтир" },
            { title: "Банкет · «Туштажу»", addr: "с. Кош-Агач",   street: "ул. Каменистая, 27",    time: "16:00", maps: "https://maps.google.com/?q=Кош-Агач+Каменистая+27" },
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

      {/* ПЛАВНЫЙ ПЕРЕХОД К ТЁМНОМУ */}
      <div style={{ height: 200, background: `linear-gradient(180deg, ${C.creamAlt} 0%, #141210 100%)` }} />

      {/* ФИНАЛ — тёмный фон + снегопад */}
      <section style={{ position: "relative", overflow: "hidden", background: C.dark2 }}>

        {/* Фото на весь экран, без обрезки, без поворота */}
        <div style={{ position: "relative", width: "100%", lineHeight: 0 }}>
          <img
            src={IMG_WINTER}
            alt="Аэлита и Тузагаш"
            style={{ width: "100%", height: "auto", display: "block", objectFit: "contain" }}
          />
          {/* Лёгкое затемнение сверху */}
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "25%", background: "linear-gradient(180deg, rgba(20,18,16,0.55) 0%, transparent 100%)", pointerEvents: "none" }} />
          {/* Плавный тёмный переход снизу — на всю высоту нижней трети */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "60%", background: "linear-gradient(180deg, transparent 0%, rgba(20,18,16,0.7) 50%, #141210 100%)", pointerEvents: "none" }} />
          {/* Снегопад поверх фото */}
          <Snowfall />
        </div>

        {/* Текстовый блок на тёмном фоне */}
        <div style={{ padding: "60px 20px 100px", textAlign: "center", position: "relative", zIndex: 3 }}>
          <FadeIn>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(22px,6vw,36px)", fontWeight: 300, color: "#F5F0E8", lineHeight: 1.75, marginBottom: 20 }}>
              Мы вас ждём<br />
              <span style={{ fontSize: "0.7em", color: "rgba(245,240,232,0.6)" }}>и будем счастливы разделить этот важный день вместе с вами</span>
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div style={{ width: 36, height: 1, background: "rgba(201,132,122,0.5)", margin: "28px auto" }} />
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(16px,4vw,20px)", color: "rgba(245,240,232,0.55)", fontStyle: "italic", marginBottom: 36 }}>
              С любовью,<br />
              <span style={{ fontSize: "1.25em", color: "#F5F0E8" }}>Аэлита &amp; Тузагаш</span>
            </p>
          </FadeIn>
          <FadeIn delay={0.25}>
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
          <FadeIn delay={0.35}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(38px,11vw,68px)", color: "rgba(245,240,232,0.05)", fontWeight: 300, letterSpacing: "0.08em", userSelect: "none", marginTop: 60 }}>
              18.08.2026
            </p>
          </FadeIn>
        </div>

        {/* Снегопад поверх всего финала */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1 }}>
          <Snowfall />
        </div>
      </section>
    </>
  );
}