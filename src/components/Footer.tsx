"use client";

import { useToast } from "@/hooks/useToast";

export default function Footer() {
  const { showToast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    showToast("You're on the list — welcome!");
  };

  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand reveal">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/logo.png" alt="Crunchie Wunche" />
            <p>Premium snacking &amp; thoughtfully curated gifting — turning everyday snacking into memorable moments.</p>
            <div className="foot-soc">
              <a href="#" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                </svg>
              </a>
              <a href="#" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M14 8h2V5h-2a4 4 0 0 0-4 4v2H8v3h2v6h3v-6h2.5l.5-3H13V9a1 1 0 0 1 1-1Z" />
                </svg>
              </a>
              <a href="#" aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="3" y="3" width="18" height="18" rx="3" /><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4" />
                </svg>
              </a>
            </div>
          </div>
          <div className="reveal" data-d="1">
            <h4>Shop</h4>
            <a className="fl" href="#categories">Nuts</a>
            <a className="fl" href="#categories">Puffs</a>
            <a className="fl" href="#categories">Chakna Boxes</a>
            <a className="fl" href="#categories">Festive Hampers</a>
          </div>
          <div className="reveal" data-d="2">
            <h4>Company</h4>
            <a className="fl" href="#says">Corporate Orders</a>
            <a className="fl" href="#mood">Shop by Mood</a>
            <a className="fl" href="#bestsellers">Best Sellers</a>
            <a className="fl" href="#says">Reviews</a>
          </div>
          <div className="reveal" data-d="3">
            <h4>Stay in the loop</h4>
            <p style={{ color: "rgba(255,255,255,.6)", fontSize: 14, marginBottom: 6 }}>New drops, festive hampers &amp; offers.</p>
            <form className="foot-news" onSubmit={handleSubmit}>
              <input type="email" placeholder="Your email" aria-label="Email" required />
              <button type="submit">Join</button>
            </form>
            <div className="foot-phone">+91 96101 93125</div>
          </div>
        </div>
        <div className="foot-bottom">
          <p>&copy; 2026 Crunchie Wunche. Crafted for memorable gifting.</p>
          <p>Corporate Gifting · Chakna Boxes · Festive Hampers · Wedding Gifting</p>
        </div>
      </div>
    </footer>
  );
}
