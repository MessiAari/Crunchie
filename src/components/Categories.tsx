"use client";

const CATEGORIES = [
  { name: "Nuts", sub: "Roasted & salted", bg: "cg1", img: "/assets/Images/Nuts/Paan Panache Almond/2302 closeup.jpg", href: "/products?category=nuts" },
  { name: "Puffs", sub: "Light & airy", bg: "cg2", img: "/assets/Images/Puff/Quinoa Puff/Chipotle/1620.jpg", href: "/products?category=protein-snacks" },
  { name: "Chakna Boxes", sub: "Party-ready", bg: "cg3", img: null, href: "/products?category=chakna-boxes" },
  { name: "Trail Mixes", sub: "Energy blends", bg: "cg4", img: "/assets/Images/Nuts/Nutri Blend HM/9388.jpg", href: "/products?category=healthy-indulgences" },
  { name: "Namkeen", sub: "Classic Indian", bg: "cg5", img: null, href: "/products?category=chakna-boxes" },
  { name: "Protein Bites", sub: "High-protein", bg: "cg6", img: null, href: "/products?category=protein-snacks" },
];

function CategoryIcon({ name }: { name: string }) {
  switch (name) {
    case "Chakna Boxes":
      return (
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <rect x="14" y="20" width="36" height="26" rx="5" fill="#F59E3C" />
          <path d="M14 28h36M32 20v26" stroke="#8a5a12" strokeWidth="2.5" />
        </svg>
      );
    case "Namkeen":
      return (
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <path d="M20 24h24l-3 22H23z" fill="#E5484D" />
          <path d="M20 24c0-5 24-5 24 0" stroke="#a31d22" strokeWidth="3" />
        </svg>
      );
    case "Protein Bites":
      return (
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <rect x="22" y="16" width="20" height="32" rx="6" fill="#2563EB" />
          <path d="M26 24h12M26 32h12M26 40h8" stroke="#fff" strokeWidth="2.4" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Categories() {
  return (
    <section className="cats" id="categories">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <div className="eyebrow reveal">Shop by Category</div>
            <h2 className="reveal" data-d="1" style={{ marginTop: 16, fontSize: "clamp(30px,3.8vw,50px)" }}>
              Find your crunch.
            </h2>
          </div>
          <p className="sub reveal" data-d="2">Hand-sorted by type — explore the range and build your own box.</p>
        </div>
      </div>
      <div className="cat-row reveal">
        {CATEGORIES.map((cat) => (
          <a key={cat.name} className="cat" href={cat.href}>
            <div className={`cat-orb ${cat.bg}`}>
              <div className="ico">
                {cat.img ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={cat.img} alt={cat.name} />
                ) : (
                  <CategoryIcon name={cat.name} />
                )}
              </div>
            </div>
            <b>{cat.name}</b>
            <span>{cat.sub}</span>
          </a>
        ))}
        <div className="cat more">
          <div className="cat-orb">
            <div className="ico" style={{ color: "var(--muted)" }}>
              <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </div>
          </div>
          <b>More soon</b>
          <span>Always growing</span>
        </div>
      </div>
    </section>
  );
}
