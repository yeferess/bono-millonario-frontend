import Image from "next/image";

const particulas = [
  { color: "#FFFFFF", tx: "-140px", ty: "-90px" },
  { color: "#16234A", tx: "150px", ty: "-70px" },
  { color: "#7C3AED", tx: "-160px", ty: "80px" },
  { color: "#06B6D4", tx: "140px", ty: "100px" },
  { color: "#FFFFFF", tx: "0px", ty: "-160px" },
  { color: "#16234A", tx: "0px", ty: "160px" },
  { color: "#7C3AED", tx: "-100px", ty: "0px" },
  { color: "#06B6D4", tx: "100px", ty: "0px" },
];

export function IntroSplash() {
  return (
    <div className="intro-overlay" aria-hidden="true">
      {particulas.map((p, i) => (
        <span
          key={i}
          className="intro-particula"
          style={{
            backgroundColor: p.color,
            ["--tx" as string]: p.tx,
            ["--ty" as string]: p.ty,
            animationDelay: `${0.25 + i * 0.03}s`,
          }}
        />
      ))}
      <Image
        src="/logo.png"
        alt="Bono Millonario"
        width={220}
        height={110}
        priority
        className="intro-logo"
      />
    </div>
  );
}
