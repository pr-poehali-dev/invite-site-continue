import { C, WEDDING_DATE, AUGUST_2026, IMG_PEONY1, IMG_PEONY2, IMG_AELITA_KID, IMG_TUZAGASH_KID, IMG_COUPLE } from "./wedding-config";
import { FadeIn, PeonyCorner, useCountdown } from "./wedding-shared";

interface WeddingTopProps {
  gone: boolean;
  onTouch: () => void;
}

export default function WeddingTop({ gone, onTouch }: WeddingTopProps) {
  const { d, h, m, s } = useCountdown(WEDDING_DATE);
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <>
      {/* ИНТРО — полноэкранный оверлей */}
      <div
        onClick={onTouch}
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
        <div style={{ position: "absolute", top: 0, right: 0, width: "45vw", maxWidth: 340, opacity: 0.35, pointerEvents: "none" }}>
          <img src={IMG_PEONY1} alt="" style={{ width: "100%", mixBlendMode: "multiply" }} />
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, width: "38vw", maxWidth: 280, opacity: 0.25, pointerEvents: "none", transform: "rotate(180deg)" }}>
          <img src={IMG_PEONY2} alt="" style={{ width: "100%", mixBlendMode: "multiply" }} />
        </div>
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
    </>
  );
}
