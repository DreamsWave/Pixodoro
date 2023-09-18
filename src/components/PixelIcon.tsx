import { usePixel } from "../features/pixel/usePixel";

type PixelIconProps = {
  color?: string;
  pixelPositions: number[][];
};
function PixelIcon({ color = "#000", pixelPositions }: PixelIconProps) {
  const { pixelSize } = usePixel();
  return (
    <svg
      version="1.1"
      width={Math.max(...pixelPositions.map(([x]) => x + 1)) * pixelSize}
      height={Math.max(...pixelPositions.map(([, y]) => y + 1)) * pixelSize}
      xmlns="http://www.w3.org/2000/svg"
      shape-rendering="crispEdges"
    >
      {pixelPositions.map(([x, y], i) => (
        <rect
          key={i}
          x={x * pixelSize}
          y={y * pixelSize}
          width={pixelSize}
          height={pixelSize}
          fill={color}
        />
      ))}
    </svg>
  );
}

export default PixelIcon;
