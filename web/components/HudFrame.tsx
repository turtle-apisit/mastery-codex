export default function HudFrame() {
  return (
    <div className="hud-frame" aria-hidden="true">
      <span className="hud-frame-corner tl" />
      <span className="hud-frame-corner tr" />
      <span className="hud-frame-corner bl" />
      <span className="hud-frame-corner br" />
      <span className="hud-frame-scan" />
      <span className="hud-frame-vignette" />
    </div>
  );
}
