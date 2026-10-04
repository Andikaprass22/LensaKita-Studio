export function CinematicOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[60] overflow-hidden"
    >
      {/* Vignette — darkens the frame edges for a filmic falloff */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_26%,rgba(0,0,0,0.78)_100%)]" />
      {/* Warm light leak in the top-right corner */}
      <div className="absolute inset-0 bg-[radial-gradient(75%_60%_at_90%_-5%,rgba(209,125,42,0.20),transparent_62%)]" />
      {/* Cool counter-light bottom-left, keeps it from looking flat */}
      <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_5%_105%,rgba(120,140,175,0.10),transparent_65%)]" />
      <div className="film-grain absolute inset-0" />
    </div>
  )
}
