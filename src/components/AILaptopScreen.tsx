// The AI portfolio's marquee, continuously scrolling inside the laptop screen.
// Same website-preview GIFs as jack-portfolio's MarqueeSection (hosted on
// motionsites.ai). Two rows scroll in opposite directions on a CSS loop.
const IMAGES = [
  'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
  'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif',
  'https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif',
  'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
  'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
  'https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif',
  'https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif',
  'https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif',
  'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
  'https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif',
  'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif',
  'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
  'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
  'https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif',
  'https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif',
  'https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif',
  'https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif',
  'https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif',
  'https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif',
];

const ROW_1 = IMAGES.slice(0, 11);
const ROW_2 = IMAGES.slice(11);

function Row({ images, reverse }: { images: string[]; reverse?: boolean }) {
  // duplicated exactly once so the -50% translate loops seamlessly
  const doubled = [...images, ...images];
  return (
    <div className={`marquee-row h-1/2 gap-1.5 ${reverse ? 'reverse' : ''}`}>
      {doubled.map((src, i) => (
        <img
          key={i}
          src={src}
          alt=""
          loading="lazy"
          decoding="async"
          className="ml-1.5 h-full w-[150px] flex-shrink-0 rounded-md object-cover"
        />
      ))}
    </div>
  );
}

export default function AILaptopScreen() {
  return (
    <div className="absolute inset-0 flex flex-col justify-center gap-1.5 bg-[#0c0c0d] py-1.5">
      <Row images={ROW_1} />
      <Row images={ROW_2} reverse />
    </div>
  );
}
