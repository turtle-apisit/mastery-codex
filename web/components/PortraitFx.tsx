import MatrixRain from "./MatrixRain";

export default function PortraitFx({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  return (
    <div className="portrait-fx">
      <div className="portrait-rays" aria-hidden="true" />
      <div className="portrait-glow" aria-hidden="true" />
      <span className="ssj-flame f1" aria-hidden="true"><i /></span>
      <span className="ssj-flame f2" aria-hidden="true"><i /></span>
      <span className="ssj-flame f3" aria-hidden="true"><i /></span>
      <span className="ssj-flame f4" aria-hidden="true"><i /></span>
      <span className="ssj-flame f5" aria-hidden="true"><i /></span>
      <span className="ssj-flame f6" aria-hidden="true"><i /></span>
      <span className="ssj-flame f7" aria-hidden="true"><i /></span>
      <span className="ssj-spark s1" aria-hidden="true" />
      <span className="ssj-spark s2" aria-hidden="true" />
      <span className="ssj-spark s3" aria-hidden="true" />
      <div className="ssj-shock" aria-hidden="true" />
      <div className="ssj-shock sh2" aria-hidden="true" />
      <div className="summon-circle outer" aria-hidden="true" />
      <div className="summon-circle inner" aria-hidden="true" />
      <span className="ember e1" aria-hidden="true" />
      <span className="ember e2" aria-hidden="true" />
      <span className="ember e3" aria-hidden="true" />
      <span className="ember e4" aria-hidden="true" />
      <span className="ember e5" aria-hidden="true" />
      <span className="ember e6" aria-hidden="true" />
      <span className="ember e7" aria-hidden="true" />
      <span className="ember e8" aria-hidden="true" />
      <span className="twinkle t1" aria-hidden="true" />
      <span className="twinkle t2" aria-hidden="true" />
      <span className="twinkle t3" aria-hidden="true" />
      <span className="twinkle t4" aria-hidden="true" />
      <span className="twinkle t5" aria-hidden="true" />
      <span className="twinkle t6" aria-hidden="true" />
      <div className="reticle" aria-hidden="true">
        <span className="tl" />
        <span className="tr" />
        <span className="bl" />
        <span className="br" />
      </div>
      <div className="portrait cut-sm">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} />
      </div>
    </div>
  );
}
