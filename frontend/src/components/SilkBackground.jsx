import Silk from "./Silk";

export default function SilkBackground() {
  return (
     <>
      <div className="silk-bg">
        <Silk
          speed={4}
          scale={1}
          color="#7B7481"
          noiseIntensity={1.2}
          rotation={0}
        />
      </div>

      <div className="silk-overlay"></div>
    </>
  );
}