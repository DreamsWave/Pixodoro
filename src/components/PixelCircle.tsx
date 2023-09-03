import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

// prettier-ignore
const circlePixelsPosition = [[11, 0],[12, 0],[13, 0],[14, 1],[15, 1],[16, 2],[17, 2],[18, 3],[19, 4],[19, 5],[20, 6],[20, 7],[21, 8],[21, 9],[21, 10],[21, 11],[21, 12],[21, 13],[20, 14],[20, 15],[19, 16],[19, 17],[18, 18],[17, 19],[16, 19],[15, 20],[14, 20],[13, 21],[12, 21],[11, 21],[10, 21],[9, 21],[8, 21],[7, 20],[6, 20],[5, 19],[4, 19],[3, 18],[2, 17],[2, 16],[1, 15],[1, 14],[0, 13],[0, 12],[0, 11],[0, 10],[0, 9],[0, 8],[1, 7],[1, 6],[2, 5],[2, 4],[3, 3],[4, 2],[5, 2],[6, 1],[7, 1],[8, 0],[9, 0],[10, 0]];

type PixelProps = {
  pixelSize: number;
  color: string;
  positionX: number;
  positionY: number;
  active?: boolean;
};
const Pixel = styled.span<PixelProps>`
  display: flex;
  width: ${({ pixelSize }) => pixelSize}px;
  height: ${({ pixelSize }) => pixelSize}px;
  background-color: ${({ color, active }) => (active ? color : "grey")};
  position: absolute;
  top: ${({ pixelSize, positionY }) => pixelSize * positionY}px;
  left: ${({ pixelSize, positionX }) => pixelSize * positionX}px;
`;

type PixeledCircleBaseProps = {
  pixelSize: number;
  diameter: number;
};
const PixeledCircleBase = styled.div<PixeledCircleBaseProps>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ diameter, pixelSize }) => diameter * pixelSize}px;
  height: ${({ diameter, pixelSize }) => diameter * pixelSize}px;
  margin: auto;
  border: 1px solid black;
`;

type PixeledCircleProps = {
  pixelSize: number;
  progress?: number;
};
function PixelCircle({ pixelSize, progress = 0 }: PixeledCircleProps) {
  const [activePixels, setActivePixels] = useState<number>(0);
  const pixelsRef = useRef<HTMLSpanElement[]>([]);
  const DIAMETER = 22;
  const color = "red";

  useEffect(() => {
    console.log(Math.round((progress / 10) * 6));
    setActivePixels(Math.round((progress / 10) * 6));
  }, [progress]);

  return (
    <PixeledCircleBase pixelSize={pixelSize} diameter={DIAMETER}>
      {circlePixelsPosition.map(([positionX, positionY], i) => (
        <Pixel
          key={i}
          pixelSize={pixelSize}
          color={color}
          positionX={positionX}
          positionY={positionY}
          active={i <= activePixels}
          ref={(el) => (pixelsRef.current[i] = el!)}
        />
      ))}
    </PixeledCircleBase>
  );
}

export default PixelCircle;
