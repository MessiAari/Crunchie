"use client";

const MOODS = [
  { name: "Spicy", mood: "spicy", heat: "🌶🌶🌶", top: "Bold & fiery", desc: "Masala puffs, peri-peri nuts and chilli namkeen with a real kick.", link: "Explore spicy" },
  { name: "Sweet", mood: "sweet", heat: "✦✦✦", top: "Soft & indulgent", desc: "Caramel clusters, chocolate bites and honey-glazed trail mixes.", link: "Explore sweet" },
  { name: "Cheesy", mood: "cheesy", heat: "◆◆◆", top: "Rich & savoury", desc: "Cheddar puffs, herbed crackers and creamy cheese-dusted bites.", link: "Explore cheesy" },
];

export default function Mood() {
  return (
    <section className="mood" id="mood">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <div className="eyebrow reveal">Shop by Mood</div>
            <h2 className="reveal" data-d="1" style={{ marginTop: 16 }}>
              What are you<br />craving today?
            </h2>
          </div>
          <p className="sub reveal" data-d="2">Pick a feeling. We&apos;ll match the crunch.</p>
        </div>
        <div className="mood-grid">
          {MOODS.map((m, i) => (
            <a key={m.name} className="mcard reveal" data-d={String(i + 1)} href="#bestsellers">
              <div className={`mbg ${m.mood}`} />
              <div className="mheat">{m.heat}</div>
              <div className="mtop">{m.top}</div>
              <div className="mbody">
                <h3>{m.name}</h3>
                <p>{m.desc}</p>
                <span className="mlink">
                  {m.link} <span className="arrow">→</span>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
