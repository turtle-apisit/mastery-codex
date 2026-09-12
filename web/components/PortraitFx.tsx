export default function PortraitFx({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  return (
    <div className="portrait-fx">
      <div className="portrait">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} />
      </div>
    </div>
  );
}
