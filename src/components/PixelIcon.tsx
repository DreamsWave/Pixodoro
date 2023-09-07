type PixelIconProps = {
  color?: string;
  pixelSize?: number;
  pixelPositions: number[][];
};
function PixelIcon({
  color = "#000",
  pixelSize = 8,
  pixelPositions,
}: PixelIconProps) {
  return (
    <svg
      version="1.1"
      width={Math.max(...pixelPositions.map(([x, y]) => x + 1)) * pixelSize}
      height={Math.max(...pixelPositions.map(([x, y]) => y + 1)) * pixelSize}
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
