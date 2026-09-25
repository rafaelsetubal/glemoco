"use client";

interface FeaturedMarketMetricProps {
  topLabel?: string;
  value?: string;
  bottomLabel?: string;
  className?: string;
}

export function FeaturedMarketMetric({
  topLabel = "GLOBAL RESIDENTIAL SEGMENT",
  value = "US$ 290T",
  bottomLabel = "USD 700B+ ANNUAL TRANSACTION VOLUME",
  className = "",
}: FeaturedMarketMetricProps) {
  return (
    <div className={`featured-market-metric ${className}`}>
      {/* Top Edge Cyan Glow & Flare Light Point */}
      <div className="metric-glow-edge" aria-hidden="true" />
      <div className="metric-flare-dot" aria-hidden="true" />

      {/* Blueprint Corner Markers */}
      <div className="metric-corner-marker-tl" aria-hidden="true" />
      <div className="metric-corner-marker-br" aria-hidden="true" />

      {/* Panel Body */}
      <div className="metric-panel-body">
        <span className="metric-micro-label metric-top-label">{topLabel}</span>
        <div className="metric-primary-value">
          <strong>{value}</strong>
        </div>
        <span className="metric-micro-label metric-bottom-label">{bottomLabel}</span>
      </div>
    </div>
  );
}
