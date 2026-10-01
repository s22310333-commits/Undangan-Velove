
import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";
import "./wishes.css";
import {
  CalendarDays,
  Clock3,
  MapPin,
  Heart,
  Camera,
  Gift,
  Send,
  Music2,
} from "lucide-react";

// =====================================
// DETAIL ACARA
// =====================================

const EVENT_DATE = "2026-10-09T18:00:00+08:00";
const EVENT_LABEL = "Jumat, 9 Oktober 2026";
const EVENT_TIME = "18.00 WITA";
const VENUE = "The Sentra Hotel Manado";
const ADDRESS = "Manado, Sulawesi Utara";
const MAP_URL =
  "https://www.google.com/maps/search/?api=1&query=The+Sentra+Hotel+Manado";
const MAP_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.4734043426943!2d124.91358827501351!3d1.4877187984983218!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32870bf597ddf1a1%3A0xab699cffbafa14b0!2sThe%20Sentra%20Manado!5e0!3m2!1sid!2sid!4v1790869931465!5m2!1sid!2sid";

const WHATSAPP_NUMBER = "";

// =====================================
// NAMA TAMU DARI URL
// =====================================

function getGuestName() {
  const params = new URLSearchParams(window.location.search);
  const guestName = params.get("to")?.trim();
  return guestName || "Teman & Keluarga";
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

        <g fill="#a9bb91" opacity=".85">
          <ellipse cx="50" cy="55" rx="25" ry="9" transform="rotate(30 50 55)" />
          <ellipse cx="80" cy="100" rx="26" ry="9" transform="rotate(-28 80 100)" />
          <ellipse cx="270" cy="43" rx="27" ry="9" transform="rotate(-30 270 43)" />
          <ellipse cx="300" cy="90" rx="24" ry="9" transform="rotate(28 300 90)" />
          <ellipse cx="455" cy="37" rx="28" ry="9" transform="rotate(25 455 37)" />
          <ellipse cx="620" cy="51" rx="28" ry="9" transform="rotate(-25 620 51)" />
          <ellipse cx="650" cy="105" rx="24" ry="8" transform="rotate(25 650 105)" />
        </g>

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
  const [coverVisible, setCoverVisible] = useState(true);
  const [invitationStarted, setInvitationStarted] = useState(false);
  const [heroLeaving, setHeroLeaving] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [activeGalleryPhoto, setActiveGalleryPhoto] = useState(0);
  const [wishes, setWishes] = useState([]);
  const [wishLoading, setWishLoading] = useState(true);
  const [wishSending, setWishSending] = useState(false);
  const [wishStatus, setWishStatus] = useState("");

  const guest = getGuestName();

  // Mengambil ucapan yang sudah tersimpan di Supabase.
  useEffect(() => {
    const loadWishes = async () => {
      setWishLoading(true);

      try {
        const { data, error } = await supabase
          .from("wishes")
          .select("id, name, message, created_at")
          .order("created_at", { ascending: false })
          .limit(100);

        if (error) throw error;
        setWishes(data ?? []);
      } catch (error) {
        console.error("Gagal mengambil ucapan:", error);
        setWishStatus("Ucapan belum dapat dimuat. Silakan refresh halaman.");
      } finally {
        setWishLoading(false);
      }
    };

    loadWishes();
  }, []);


  // Menentukan foto galeri yang sedang berada di area fokus layar.
  useEffect(() => {
    const galleryItems = document.querySelectorAll(".gallery-item");
    if (!galleryItems.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              Math.abs(a.boundingClientRect.top - window.innerHeight / 2) -
              Math.abs(b.boundingClientRect.top - window.innerHeight / 2)
          );

        if (visibleEntries.length) {
          setActiveGalleryPhoto(
            Number(visibleEntries[0].target.dataset.galleryIndex)
          );
        }
      },
      {
        root: null,
        rootMargin: "-35% 0px -35% 0px",
        threshold: 0,
      }
    );

    galleryItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  // Membuka undangan dari sampul
  const openInvitation = () => {
    window.history.replaceState(
      null,
      "",
      window.location.pathname + window.location.search
    );

    window.scrollTo(0, 0);
    setOpened(true);

    window.setTimeout(() => {
      setCoverVisible(false);
    }, 1000);
  };

  // Transisi beranda ke isi undangan
  const goToInvitation = () => {
    if (invitationStarted || heroLeaving) return;

    setHeroLeaving(true);

    window.setTimeout(() => {
      setInvitationStarted(true);
      setHeroLeaving(false);
    }, 750);
  };

  // Efek scroll reveal: elemen muncul perlahan saat masuk ke layar.
  // Efek dijalankan setelah sampul dibuka agar halaman pembuka tetap utuh.
  useEffect(() => {
    if (!opened) return;

    const revealGroups = [
      [".intro", [".decor", ".eyebrow", "h2", ".intro > p:not(.eyebrow)", ".heart-divider"]],
      [".details", [".eyebrow", "h2", ".section-subtitle", ".countdown", ".detail-card", ".primary-button", ".map-embed"]],
      [".quote-section", [".quote-flower", "p", "span"]],
      [".gallery", [".eyebrow", "h2", ".section-subtitle", ".gallery-item"]],
      [".wishes", [".wish-icon", ".eyebrow", "h2", ".section-subtitle", ".wish-form"]],
      [".footer", [".footer-flower", "p", "strong", "small"]],
    ];

    const revealItems = [];
    revealGroups.forEach(([sectionSelector, selectors]) => {
      const section = document.querySelector(sectionSelector);
      if (!section) return;

      const items = section.querySelectorAll(selectors.join(","));
      items.forEach((item, index) => {
        item.classList.add("scroll-reveal");
        item.style.transitionDelay = `${Math.min(index, 5) * 75}ms`;
        revealItems.push(item);
      });
    });

    if (!("IntersectionObserver" in window)) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -8% 0px",
        threshold: 0.08,
      }
    );

    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [opened]);

  // Setelah hero selesai menghilang, arahkan ke bagian intro
  useEffect(() => {
    if (!invitationStarted) return;

    window.scrollTo({ top: 0, behavior: "auto" });

    const timer = window.setTimeout(() => {
      document.getElementById("intro")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 80);

    return () => window.clearTimeout(timer);
  }, [invitationStarted]);

  // Menyimpan ucapan ke Supabase agar bisa dilihat semua pengunjung.
  const sendWish = async (e) => {
    e.preventDefault();

    const cleanName = name.trim() || guest;
    const cleanMessage = message.trim();

    if (!cleanMessage || wishSending) return;

    setWishSending(true);
    setWishStatus("");

    try {
      const { data, error } = await supabase
        .from("wishes")
        .insert([{ name: cleanName, message: cleanMessage }])
        .select("id, name, message, created_at")
        .single();

      if (error) throw error;

      setWishes((currentWishes) => [data, ...currentWishes]);
      setName("");
      setMessage("");
      setWishStatus("Ucapan berhasil dikirim. Terima kasih! ♡");
    } catch (error) {
      console.error("Gagal mengirim ucapan:", error);
      setWishStatus("Ucapan gagal dikirim. Coba lagi beberapa saat.");
    } finally {
      setWishSending(false);
    }
  };

  return (
    <main>
      {/* =================================
          HALAMAN PEMBUKA
      ================================= */}

      {coverVisible && (
        <div className={`cover ${opened ? "cover-closing" : ""}`}>
          <img
            className="cover-background"
            src="/foto1.jpeg"
            alt=""
            aria-hidden="true"
          />
          <div className="cover-overlay" aria-hidden="true" />
          <div className="cover-flower flower-a">✿</div>
          <div className="cover-flower flower-b">❀</div>

          <div className="cover-content">
            <p className="eyebrow">YOU ARE INVITED TO</p>

            <p className="cover-script">Velove's</p>
            <h1>Birthday Party</h1>

            <div className="cover-line" />

            <p className="cover-date">9/10/2026</p>

            <p className="cover-to">
              Dear, <strong>{guest}</strong>
            </p>

            <button
              className="open-button"
              onClick={openInvitation}
              type="button"
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

      <div className={`site ${opened ? "site-visible" : ""} ${
        opened && !invitationStarted ? "home-locked" : ""
      }`}>
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
            BERANDA
        ================================= */}

        {(!invitationStarted || heroLeaving) && (
          <section
            className={`hero ${heroLeaving ? "hero-leaving" : ""}`}
            id="home"
          >
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

              <button
                className="primary-button"
                type="button"
                onClick={goToInvitation}
              >
                See the invitation <span aria-hidden="true">💌</span>
              </button>
            </div>

            <div className="hero-photo">
              <div className="photo-frame">
                <img
                  src="/cover.jpeg"
                  alt="Foto Velove"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
              <span className="photo-caption">made with love</span>
            </div>

            <FloralDecoration position="bottom" />
          </section>
        )}

        {/* =================================
            INTRO / UNDANGAN
        ================================= */}

        <section
          className={`intro section ${
            invitationStarted ? "intro-enter" : ""
          }`}
          id="intro"
        >
          <span className="decor">✿</span>

          <p className="eyebrow">WITH LOVE & JOY</p>
          <h2>You're warmly invited</h2>

          <p>
            I would love to have you {guest}{" "}
            to join me as I celebrate this special milestone
            and step into seventeen.
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
            A night filled with
            memories, laughter & celebration
            
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

          <div className="map-embed">
            <iframe
              src={MAP_EMBED_URL}
              title="Peta lokasi The Sentra Manado"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
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
            
          </p>

          <div className="gallery-grid">
            {["foto1.jpeg", "foto2.jpeg", "foto3.jpeg", "foto4.jpeg", "foto11.jpeg"].map((foto, index) => (
  <div
    className={`gallery-item ${
      activeGalleryPhoto === index + 1 ? "gallery-item-active" : ""
    }`}
    data-gallery-index={index + 1}
    key={foto}
  >
    <img
      src={`/${foto}`}
      alt={`Galeri foto ${index + 1}`}
      onError={(e) => {
        e.currentTarget.style.display = "none";
      }}
    />
    <div className="gallery-placeholder">
      <Camera size={22} />
      <span>Foto {index + 1}</span>
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
            
          </p>

          <form onSubmit={sendWish} className="wish-form">
            <label>
              Your name
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tulis namamu..."
              />
            </label>

            <label>
              your wish
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Happy birthday, Velove..."
                required
                rows={4}
              />
            </label>

            <button
              className="primary-button"
              type="submit"
              disabled={wishSending}
            >
              {wishSending ? "Sending..." : "Send wishes"} <Send size={16} />
            </button>
          </form>

          {wishStatus && (
            <p className="wish-status" role="status">
              {wishStatus}
            </p>
          )}

          <div className="wish-list" aria-live="polite">
            <h3>Ucapan dari teman & keluarga</h3>

            {wishLoading ? (
              <p className="wish-empty">Memuat ucapan...</p>
            ) : wishes.length === 0 ? (
              <p className="wish-empty">
                Belum ada ucapan. Jadilah yang pertama mengirimkan doa! ♡
              </p>
            ) : (
              <div className="wish-list-items">
                {wishes.map((wish) => (
                  <article className="wish-card" key={wish.id}>
                    <div className="wish-card-heading">
                      <strong>{wish.name}</strong>
                      <time dateTime={wish.created_at}>
                        {new Date(wish.created_at).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </time>
                    </div>
                    <p>{wish.message}</p>
                  </article>
                ))}
              </div>
            )}
          </div>
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