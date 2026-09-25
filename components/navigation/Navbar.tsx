"use client";

import { Menu, X, ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const links = ["About", "Ecosystem", "Marketplace", "Roadmap", "Events"];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const update = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;
      setScrolled(y > 16);
      if (y < 90) setHidden(false);
      else if (delta > 5) setHidden(true);
      else if (delta < -5) setHidden(false);
      lastY.current = y;
    };
    const wheel = (event: WheelEvent) => {
      if (event.deltaY < -2) setHidden(false);
      if (event.deltaY > 2 && window.scrollY > 90) setHidden(true);
    };
    update();
    addEventListener("scroll", update, { passive: true });
    addEventListener("wheel", wheel, { passive: true });
    return () => { removeEventListener("scroll", update); removeEventListener("wheel", wheel); };
  }, []);

  return <header className={`nav ${scrolled ? "nav-scrolled" : ""} ${hidden && !open ? "nav-hidden" : ""}`}>
    <div className="glemo-container nav-inner">
      <a href="#top" className="brand" aria-label="GlemO home"><img src="/brand/glemo-official.png" alt="GlemO" /></a>
      <nav>{links.map(link => <a href={link === "Marketplace" ? "#marketplace" : link === "Ecosystem" ? "#ecosystem" : "#"} key={link}>{link}</a>)}<a className="contact" href="#contact">Contact <ArrowUpRight size={14} /></a></nav>
      <button className="menu" onClick={() => setOpen(!open)} aria-label={open ? "Close navigation" : "Open navigation"}>{open ? <X /> : <Menu />}</button>
    </div>
    {open && <div className="mobile-overlay"><button onClick={() => setOpen(false)} aria-label="Close navigation"><X /></button>{links.map(link => <a href={link === "Marketplace" ? "#marketplace" : link === "Ecosystem" ? "#ecosystem" : "#"} key={link} onClick={() => setOpen(false)}>{link}</a>)}<a href="#contact">Contact <ArrowUpRight /></a></div>}
  </header>;
}
