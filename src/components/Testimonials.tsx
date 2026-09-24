"use client";

const REVIEWS = [
  { initials: "RA", cls: "a2", name: "Riya Aggarwal", role: "HR Lead · IT Services", quote: "Our Diwali gifting finally felt premium. Clients actually called to thank us — the packaging did half the work." },
  { initials: "SM", cls: "a1", name: "Sneha Mehta", role: "Bengaluru", quote: "The Royal Chakna Box was the star of our house party. Beautifully presented and genuinely delicious." },
  { initials: "VN", cls: "a3", name: "Vikram Nair", role: "Admin Head · Fintech", quote: "Custom branding was seamless and 400 boxes arrived on time. They're our default corporate gift now." },
  { initials: "PK", cls: "a4", name: "Priya & Karan", role: "Wedding · Jaipur", quote: "Wedding welcome kits that wowed every guest. The team customised everything to our theme." },
];

export default function Testimonials() {
  return (
    <section className="section" id="says">
      <div className="wrap">
        <div className="says-head">
          <div className="eyebrow pp reveal" style={{ justifyContent: "center" }}>What People Are Saying</div>
          <h2 className="reveal" data-d="1" style={{ marginTop: 14 }}>Loved across India.</h2>
          <p className="sub reveal" data-d="2">From house parties to boardrooms — here&apos;s what they tell us.</p>
        </div>
        <div className="says-track reveal">
          {REVIEWS.map((r) => (
            <article key={r.name} className="scard">
              <div className="stars">★★★★★</div>
              <p className="q">&ldquo;{r.quote}&rdquo;</p>
              <div className="who">
                <div className={`av ${r.cls}`}>{r.initials}</div>
                <div>
                  <b>{r.name}</b>
                  <span>{r.role}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
