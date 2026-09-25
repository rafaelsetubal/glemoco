/**
 * ============================================================================
 * glemO.co — GALLERY & EVENTS CONFIGURATION
 * ============================================================================
 * 
 * To add a new photo to the events carousel:
 * 1. Place your image file in the `/public/events/` folder (e.g., `nova-foto.webp` or `evento-sp.jpg`).
 * 2. Add an entry below to the `galleryEvents` array:
 * 
 *    {
 *      image: "nova-foto.webp",
 *      title: "Nome do Evento",
 *      detail: "2026 · Cidade / Detalhe"
 *    },
 * 
 * That's it! The carousel, controls, and lightbox will automatically update.
 * ============================================================================
 */

export interface GalleryEventItem {
  id?: string;
  image: string;
  title: string;
  detail: string;
}

export const galleryEvents: GalleryEventItem[] = [
  {
    id: "web-summit-rio-2026",
    image: "imgCarrossel13.webp",
    title: "Web Summit Rio",
    detail: "2026 · Rio de Janeiro",
  },
  {
    id: "summit-abrainc-2025",
    image: "imgCarrossel4.webp",
    title: "Summit ABRAINC",
    detail: "2025 · São Paulo",
  },
  {
    id: "inc-minas-2025",
    image: "imgInc1.webp",
    title: "INC Minas",
    detail: "2025 · Belo Horizonte",
  },
  {
    id: "abrainc-stand-2025",
    image: "imgCarrossel5.webp",
    title: "glemO na ABRAINC",
    detail: "2025 · Estande de exposição",
  },
  {
    id: "inc-interior-paulista",
    image: "imgCarrossel9.webp",
    title: "INC Interior Paulista",
    detail: "Galeria de eventos",
  },
  {
    id: "glemo-showcase-2026",
    image: "imgCarrossel14.webp",
    title: "glemO Showcase",
    detail: "2026 · Web Summit Rio",
  },
  {
    id: "nova-experiencia-2025",
    image: "imgCarrossel8.webp",
    title: "Uma nova experiência imobiliária",
    detail: "2025 · INC Minas",
  },
  {
    id: "glemo-web-summit-stand",
    image: "imgCarrossel15.webp",
    title: "glemO no Web Summit",
    detail: "2026 · Estande de exposição",
  },
];
