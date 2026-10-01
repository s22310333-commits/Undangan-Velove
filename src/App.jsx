
import { useEffect, useState } from "react";
import {
  CalendarDays,
  Clock3,
  MapPin,
  Heart,
  Camera,
  Gift,
  Send,
  ArrowDown,
  Music2,
} from "lucide-react";

// =====================================
// DETAIL ACARA
// =====================================

const EVENT_DATE = "2026-10-24T18:00:00+08:00";
const EVENT_LABEL = "Sabtu, 24 Oktober 2026";
const EVENT_TIME = "18.00 WITA";
const VENUE = "The Sentra Hotel Manado";
const ADDRESS = "Manado, Sulawesi Utara";
const MAP_URL =
  "https://www.google.com/maps/search/?api=1&query=The+Sentra+Hotel+Manado";

// Isi nomor WhatsApp tanpa tanda +.
// Contoh: 6281234567890
const WHATSAPP_NUMBER = "";

// =====================================
// NAMA TAMU DARI URL
// =====================================

function getGuestName() {
  const params = new URLSearchParams(window.location.search);
  return params.get("to") || "Teman & Keluarga";
}

// =====================================
// DEKORASI BUNGA PASTEL
// =====================================

function FloralDecoration({ position = "top" }) {
  return (
    <div
      className={`floral-decoration floral-${position}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 700 150" fill="none">
        <defs>
          <radialGradient id="petalPink">
            <stop offset="0%" stopColor="#fff8f0" />
            <stop offset="75%" stopColor="#eeb8c0" />
            <stop offset="100%" stopColor="#d99ca8" />
          </radialGradient>

          <radialGradient id="petalCream">
            <stop offset="0%" stopColor="#fffdf3" />
            <stop offset="100%" stopColor="#e9d6b0" />
          </radialGradient>
        </defs>

        {/* Batang bunga */}
        <g
          stroke="#8b9d72"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <path d="M5 145 Q100 70 210 100 T410 75 T700 110" />
          <path d="M100 105 Q75 55 40 50" />
          <path d="M220 99 Q245 40 290 36" />
          <path d="M400 80 Q430 35 470 27" />
          <path d="M570 94 Q600 45 650 45" />
        </g>

        {/* Daun */}
        <g fill="#a9bb91" opacity=".85">
          <ellipse
            cx="50"
            cy="55"
            rx="25"
            ry="9"
            transform="rotate(30 50 55)"
          />
          <ellipse
            cx="80"
            cy="100"
            rx="26"
            ry="9"
            transform="rotate(-28 80 100)"
          />
          <ellipse
            cx="270"
            cy="43"
            rx="27"
            ry="9"
            transform="rotate(-30 270 43)"
          />
          <ellipse
            cx="300"
            cy="90"
            rx="24"
            ry="9"
            transform="rotate(28 300 90)"
          />
          <ellipse
            cx="455"
            cy="37"
            rx="28"
            ry="9"
            transform="rotate(25 455 37)"
          />
          <ellipse
            cx="620"
            cy="51"
            rx="28"
            ry="9"
            transform="rotate(-25 620 51)"
          />
          <ellipse
            cx="650"
            cy="105"
            rx="24"
            ry="8"
            transform="rotate(25 650 105)"
          />
        </g>

        {/* Bunga pink */}
        {[
          [105, 83, 17],
          [330, 67, 19],
          [515, 77, 15],
          [660, 70, 18],
        ].map(([x, y, r], index) => (
          <g key={index} transform={`translate(${x} ${y})`}>
            {Array.from({ length: 6 }).map((_, i) => (
              <ellipse
                key={i}
                cx="0"
                cy={-r * 0.68}
                rx={r * 0.38}
                ry={r * 0.7}
                fill="url(#petalPink)"
                transform={`rotate(${i * 60})`}
              />
            ))}
            <circle r={r * 0.23} fill="#d5a75e" />
          </g>
        ))}

        {/* Bunga krem */}
        <g transform="translate(210 110)">
          {Array.from({ length: 6 }).map((_, i) => (
            <ellipse
              key={i}
              cx="0"
              cy="-10"
              rx="6"
              ry="12"
              fill="url(#petalCream)"
              transform={`rotate(${i * 60})`}
            />
          ))}
          <circle r="4" fill="#d5ad65" />
        </g>

        <g transform="translate(420 30)">
          {Array.from({ length: 6 }).map((_, i) => (
            <ellipse
              key={i}
              cx="0"
              cy="-9"
              rx="5"
              ry="11"
              fill="url(#petalCream)"
              transform={`rotate(${i * 60})`}
            />
          ))}
          <circle r="3.5" fill="#d5ad65" />
        </g>
      </svg>
    </div>
  );
}

// =====================================
// COUNTDOWN
// =====================================

function Countdown() {
  const [left, setLeft] = useState({});

  useEffect(() => {
    const update = () => {
      const distance = new Date(EVENT_DATE).getTime() - Date.now();

      if (distance <= 0) {
        setLeft({ selesai: true });
        return;
      }

      setLeft({
        hari: Math.floor(distance / (1000 * 60 * 60 * 24)),
        jam: Math.floor((distance / (1000 * 60 * 60)) % 24),
        menit: Math.floor((distance / (1000 * 60)) % 60),
        detik: Math.floor((distance / 1000) % 60),
      });
    };

    update();
    const timer = setInterval(update, 1000);

    return () => clearInterval(timer);
  }, []);

  if (left.selesai) {
    return (
      <p className="countdown-done">
        The celebration has begun! ♡
      </p>
    );
  }

  return (
    <div className="countdown">
      {["hari", "jam", "menit", "detik"].map((unit) => (
        <div className="count-box" key={unit}>
          <strong>
            {String(left[unit] ?? 0).padStart(2, "0")}
          </strong>
          <span>{unit}</span>
        </div>
      ))}
    </div>
  );
}

// =====================================
// KOMPONEN UTAMA
// =====================================

export default function App() {
  const [opened, setOpened] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const guest = getGuestName();

  // Mengirim ucapan melalui WhatsApp
  const sendWish = (e) => {
    e.preventDefault();

    const text = `Halo Velove!\n\n${message}\n\nDari: ${
      name.trim() || guest
    }`;

    const url = WHATSAPP_NUMBER
      ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
      : `https://wa.me/?text=${encodeURIComponent(text)}`;

    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <main>
      {/* =================================
          HALAMAN PEMBUKA
      ================================= */}

      {!opened && (
        <div className="cover">
          <div className="cover-flower flower-a">✿</div>
          <div className="cover-flower flower-b">❀</div>

          <div className="cover-content">
            <p className="eyebrow">YOU ARE INVITED TO</p>

            <p className="cover-script">Velove's</p>
            <h1>Birthday Party</h1>

            <div className="cover-line" />

            <p className="cover-date">24 . 10 . 2026</p>

            <p className="cover-to">
              Dear, <strong>{guest}</strong>
            </p>

            <button
              className="open-button"
              onClick={() => setOpened(true)}
            >
              OPEN INVITATION <span>♡</span>
            </button>
          </div>

          <p className="cover-footer">
            A little celebration, a lot of love
          </p>
        </div>
      )}

      {/* =================================
          HALAMAN UTAMA
      ================================= */}

      <div className={`site ${opened ? "site-visible" : ""}`}>
        {/* NAVIGASI */}

        <nav className="nav">
          <a href="#home" className="brand">
            V<span>♡</span>
          </a>

          <div className="nav-links">
            <a href="#home">Home</a>
            <a href="#details">Details</a>
            <a href="#gallery">Gallery</a>
            <a href="#wishes">Wishes</a>
          </div>
        </nav>

        {/* =================================
            BERANDA DENGAN BUNGA
        ================================= */}

        <section className="hero" id="home">
          <FloralDecoration position="top" />

          <div className="hero-inner">
            <p className="eyebrow">
              A SPECIAL DAY TO CELEBRATE
            </p>

            <h2>
              Let’s Celebrate
              <br />
              <em>Velove’s Birthday</em>
            </h2>

            <p className="hero-copy">
              A little party, sweet memories, and the people
              who make life beautiful.
            </p>

            <div className="hero-date">
              <CalendarDays size={17} />
              {EVENT_LABEL}
            </div>

            <a className="primary-button" href="#details">
              See the invitation <ArrowDown size={15} />
            </a>
          </div>

          <div className="hero-photo">
            <div className="photo-frame">
              <img
                src="/cover.jpg"
                alt="Foto Velove"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
              <div className="photo-placeholder">
                Your favorite photo
                <br />
                goes here ♡
              </div>
            </div>
            <span className="photo-caption">made with love</span>
          </div>

          <FloralDecoration position="bottom" />
        </section>

        {/* =================================
            INTRO
        ================================= */}

        <section className="intro section">
          <span className="decor">✿</span>

          <p className="eyebrow">WITH LOVE & JOY</p>
          <h2>You're warmly invited</h2>

          <p>
            Dengan penuh sukacita, kami mengundang {guest}
            {" "}untuk hadir dan merayakan hari spesial Velove.
            Kehadiranmu akan menjadi bagian dari kebahagiaan
            hari itu.
          </p>

          <div className="heart-divider">
            <span />
            ♡
            <span />
          </div>
        </section>

        {/* =================================
            DETAIL ACARA
        ================================= */}

        <section className="details section" id="details">
          <p className="eyebrow">SAVE THE DATE</p>
          <h2>The celebration</h2>

          <p className="section-subtitle">
            Mari luangkan waktu untuk berbagi tawa dan
            menciptakan kenangan indah.
          </p>

          <Countdown />

          <div className="detail-cards">
            <article className="detail-card">
              <div className="detail-icon">
                <CalendarDays />
              </div>
              <h3>Date</h3>
              <p>{EVENT_LABEL}</p>
            </article>

            <article className="detail-card">
              <div className="detail-icon">
                <Clock3 />
              </div>
              <h3>Time</h3>
              <p>{EVENT_TIME}</p>
            </article>

            <article className="detail-card">
              <div className="detail-icon">
                <MapPin />
              </div>
              <h3>Location</h3>
              <p>
                {VENUE}
                <br />
                <small>{ADDRESS}</small>
              </p>
            </article>
          </div>

          <a
            className="primary-button"
            href={MAP_URL}
            target="_blank"
            rel="noreferrer"
          >
            Open Google Maps <span>↗</span>
          </a>
        </section>

        {/* =================================
            KUTIPAN
        ================================= */}

        <section className="quote-section">
          <div className="quote-flower">❀</div>

          <p>
            “The more you celebrate your life,
            <br />
            the more there is in life to celebrate.”
          </p>

          <span>♡</span>
        </section>

        {/* =================================
            GALERI FOTO
        ================================= */}

        <section className="gallery section" id="gallery">
          <p className="eyebrow">LITTLE MOMENTS</p>
          <h2>Sweet memories</h2>

          <p className="section-subtitle">
            Beberapa momen yang ingin kami kenang.
          </p>

          <div className="gallery-grid">
            {[1, 2, 3, 4].map((n) => (
              <div
                className={`gallery-item gallery-${n}`}
                key={n}
              >
                <img
                  src={`/foto${n}.jpg`}
                  alt={`Galeri foto ${n}`}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />

                <div className="gallery-placeholder">
                  <Camera size={22} />
                  <span>Foto {n}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =================================
            FORM UCAPAN
        ================================= */}

        <section className="wishes section" id="wishes">
          <div className="wish-icon">
            <Gift />
          </div>

          <p className="eyebrow">SEND SOME LOVE</p>
          <h2>Leave a birthday wish</h2>

          <p className="section-subtitle">
            Tuliskan doa dan ucapan terbaikmu untuk Velove.
          </p>

          <form onSubmit={sendWish} className="wish-form">
            <label>
              Nama kamu
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tulis namamu..."
              />
            </label>

            <label>
              Ucapan & doa
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Happy birthday, Velove..."
                required
                rows={4}
              />
            </label>

            <button className="primary-button" type="submit">
              Send wishes <Send size={16} />
            </button>
          </form>
        </section>

        {/* =================================
            FOOTER
        ================================= */}

        <footer className="footer">
          <div className="footer-flower">✿</div>

          <p>
            Thank you for being part of this special day.
          </p>

          <strong>
            With love, Velove <Heart size={14} fill="currentColor" />
          </strong>

          <small>© 2026 • Birthday Invitation</small>
        </footer>

        <a
          className="music-button"
          href="#home"
          aria-label="Back to top"
        >
          <Music2 size={17} />
        </a>
      </div>
    </main>
  );
}