"use client";

import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Globe2, X } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { galleryEvents } from "@/lib/gallery-data";

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v7.6h2.79v-7.6H6.46M7.86 6.3a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function SpotifyIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.485 17.305a.753.753 0 0 1-1.036.248c-2.836-1.733-6.406-2.126-10.61-1.164a.754.754 0 1 1-.337-1.47c4.6-1.05 8.562-.603 11.735 1.34a.754.754 0 0 1 .248 1.046zm1.464-3.255a.944.944 0 0 1-1.3.311c-3.245-1.995-8.193-2.573-12.032-1.407a.944.944 0 1 1-.552-1.803c4.388-1.332 9.837-.685 13.573 1.6a.944.944 0 0 1 .311 1.299zm.126-3.393c-3.89-2.31-10.31-2.524-14.032-1.394a1.132 1.132 0 1 1-.652-2.169c4.277-1.298 11.365-1.046 15.828 1.603a1.132 1.132 0 0 1-1.144 1.96z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.301-.15-1.781-.879-2.057-.98-.277-.101-.478-.15-.678.15-.2.3-.778.98-.954 1.18-.175.2-.351.226-.652.075s-1.272-.469-2.423-1.496c-.896-.799-1.501-1.787-1.677-2.088-.175-.301-.019-.464.132-.614.136-.135.301-.351.451-.527.15-.176.2-.301.3-.501.1-.2.05-.376-.025-.527s-.678-1.635-.929-2.237c-.245-.587-.494-.507-.678-.517-.175-.009-.376-.01-.577-.01s-.527.075-.803.376c-.276.301-1.054 1.03-1.054 2.512 0 1.482 1.079 2.912 1.23 3.113.15.201 2.124 3.243 5.145 4.549.719.311 1.28.497 1.718.636.722.23 1.379.198 1.898.12.578-.087 1.781-.728 2.032-1.431.251-.703.251-1.306.176-1.431-.076-.125-.276-.201-.577-.351zM12.042 21.944c-1.788 0-3.539-.481-5.07-1.392l-.364-.216-3.769.989 1.006-3.674-.236-.375a9.924 9.924 0 0 1-1.524-5.267c0-5.495 4.472-9.967 9.972-9.967 2.662 0 5.165 1.036 7.046 2.919a9.907 9.907 0 0 1 2.916 7.048c-.001 5.496-4.473 9.969-9.977 9.969zM12.042 0C5.398 0 .008 5.391.008 12.036c0 2.12.552 4.19 1.603 6.012L0 24l6.113-1.604a12.007 12.007 0 0 0 5.929 1.554h.005c6.643 0 12.033-5.391 12.035-12.037 0-3.218-1.253-6.243-3.529-8.52A12.002 12.002 0 0 0 12.042 0z" />
    </svg>
  );
}

const social = [
  { label: "Instagram", icon: InstagramIcon, href: "https://www.instagram.com/portalglemo/" },
  { label: "YouTube", icon: YouTubeIcon, href: "https://www.youtube.com/@portalglemo" },
  { label: "LinkedIn", icon: LinkedInIcon, href: "https://www.linkedin.com/company/portal-glemo/" },
  { label: "Facebook", icon: FacebookIcon, href: "https://www.facebook.com/portalglemo" },
  { label: "Spotify podcast", icon: SpotifyIcon, href: "https://open.spotify.com/show/66MsHnQI7EVqOgy9TrrgT7" },
  { label: "WhatsApp", icon: WhatsAppIcon, href: "https://api.whatsapp.com/send?phone=5531996390738" },
];
const contact = "mailto:gleisson@glemo.co";

export function ClosingSections() {
  const { t } = useI18n();
  const [start, setStart] = useState(0);
  const [selected, setSelected] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);

  const eventItems = galleryEvents.map((item, i) => {
    const translated = t.closing.events.items[i];
    return {
      image: item.image,
      title: translated?.title || item.title,
      detail: translated?.detail || item.detail,
    };
  });

  const openPhoto = (index: number) => { setSelected(index); dialog.current?.showModal(); };
  const stepPhoto = (delta: number) => setSelected(index => (index + delta + eventItems.length) % eventItems.length);

  return <div className="closing-chapters">
    <section className="leadership-section" id="leadership" aria-labelledby="leadership-title">
      <div className="glemo-container leadership-layout">
        <div className="leadership-copy">
          <p className="closing-eyebrow">{t.closing.leadership.eyebrow}</p>
          <h2 id="leadership-title">
            {t.closing.leadership.titleMain}<br />
            <em>{t.closing.leadership.titleHighlight}</em>
          </h2>
          <p className="closing-description">{t.closing.leadership.description}</p>
          <a className="closing-button" href="https://www.linkedin.com/in/gherit/" target="_blank" rel="noopener noreferrer">
            {t.closing.leadership.button} <ArrowUpRight size={15} />
          </a>
          <dl className="leadership-facts">
            <div>
              <dt>{t.closing.leadership.facts.expVal}</dt>
              <dd>{t.closing.leadership.facts.expLabel}</dd>
            </div>
            <div>
              <dt>{t.closing.leadership.facts.companiesVal}</dt>
              <dd>{t.closing.leadership.facts.companiesLabel}</dd>
            </div>
            <div>
              <dt>{t.closing.leadership.facts.expertiseVal}</dt>
              <dd>{t.closing.leadership.facts.expertiseLabel}</dd>
            </div>
          </dl>
        </div>
        <div className="leadership-portrait">
          <svg className="leadership-skyline" viewBox="0 0 700 520" fill="none" aria-hidden="true"><path d="M40 520V220l70-40 70 40v300M240 520V85l65-40 65 40v435M440 520V130l80-45 100 55v380M110 180v340M305 45v475M520 85v435" /></svg>
          <img src="/founder/gleisson-herit-cutout.webp" alt="Gleisson Herit speaking about real estate and technology" loading="lazy" width="1254" height="1200" />
          <p className="leadership-attribution">
            <strong>{t.closing.leadership.attributionName}</strong>
            <span>{t.closing.leadership.attributionRole}</span>
          </p>
        </div>
      </div>
    </section>

    <section className="events-section" id="events" aria-labelledby="events-title">
      <div className="glemo-container events-layout">
        <header className="events-intro">
          <p className="closing-eyebrow">{t.closing.events.eyebrow}</p>
          <h2 id="events-title">
            {t.closing.events.titleMain}<br />
            <em>{t.closing.events.titleHighlight}</em>
          </h2>
          <p className="closing-description">{t.closing.events.description}</p>
          <div className="events-controls">
            <button aria-label="Previous events" onClick={() => setStart((start + eventItems.length - 1) % eventItems.length)}>
              <ArrowLeft size={18} />
            </button>
            <button aria-label="Next events" onClick={() => setStart((start + 1) % eventItems.length)}>
              <ArrowRight size={18} />
            </button>
            <span aria-live="polite">
              {String(start + 1).padStart(2, "0")} / {String(eventItems.length).padStart(2, "0")}
            </span>
          </div>
        </header>
        <div className="events-gallery">
          {Array.from({ length: 5 }, (_, offset) => {
            const index = (start + offset) % eventItems.length;
            const event = eventItems[index];
            return <button className={`event-photo ${offset === 0 ? "event-photo--featured" : ""}`} key={index} onClick={() => openPhoto(index)} aria-label={`View photo: ${event.title}, ${event.detail}`}>
              <img src={`/events/${event.image}`} alt={event.title} loading="lazy" />
              <span className="event-caption"><strong>{event.title}</strong><small>{event.detail}</small></span><span className="event-arrow"><ArrowUpRight size={17} /></span>
            </button>;
          })}
        </div>
      </div>
      <dialog ref={dialog} className="event-lightbox" onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }} onKeyDown={event => { if (event.key === "ArrowRight") stepPhoto(1); if (event.key === "ArrowLeft") stepPhoto(-1); }}>
        <button className="lightbox-close" onClick={() => dialog.current?.close()} aria-label="Close photo"><X /></button>
        <img src={`/events/${eventItems[selected].image}`} alt={eventItems[selected].title} />
        <div className="lightbox-caption">
          <button onClick={() => stepPhoto(-1)} aria-label="Previous photo"><ArrowLeft /></button>
          <p>{eventItems[selected].title}<small>{eventItems[selected].detail}</small></p>
          <button onClick={() => stepPhoto(1)} aria-label="Next photo"><ArrowRight /></button>
        </div>
      </dialog>
    </section>

    <section className="closing-cta" id="contact" aria-labelledby="closing-title">
      <div className="closing-cta-globe" aria-hidden="true">
        <img src="/closing/globe.webp" alt="" className="closing-cta-globe-img" />
        <div className="closing-cta-globe-glow" />
      </div>
      <div className="glemo-container closing-cta-layout">
        <div className="closing-cta-content">
          <h2 id="closing-title">
            {t.closing.cta.titleMain}<br />
            <em>{t.closing.cta.titleHighlight}</em>
          </h2>
          <div className="closing-actions">
            <a className="closing-button closing-button--primary closing-button--cta-talk" href={contact}>
              {t.closing.cta.buttonSecondary} <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>

    <footer className="closing-footer"><div className="glemo-container closing-footer-layout">
      <a href="#top" aria-label="glemO home"><img className="closing-logo" src="/events/glemo.white.svg" alt="glemO" width="104" height="36" /></a>
      <nav aria-label="Footer navigation">
        <a href="#ecosystem">{t.nav.ecosystem}</a>
        <a href="#marketplace">{t.nav.marketplace}</a>
        <a href="#roadmap">{t.nav.roadmap}</a>
        <a href={contact}>{t.nav.contact}</a>
      </nav>
      <div className="closing-socials">{social.map(({ label, icon: Icon, href }) => <a href={href} key={label} aria-label={label} title={label} target="_blank" rel="noopener noreferrer"><Icon /></a>)}<a href="https://www.glemo.com.br/" aria-label="glemO portal" title="glemO portal" target="_blank" rel="noopener noreferrer"><Globe2 size={18} /></a></div>
      <p className="closing-copyright">© {new Date().getFullYear()} {t.closing.footer.copyright}</p>
    </div></footer>
  </div>;
}
