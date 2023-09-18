import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { circlePixelsPosition } from "../constants";

type PixelProps = {
  color: string;
  positionX: number;
  positionY: number;
  active?: boolean;
};
const Pixel = styled.span<PixelProps>`
  display: flex;
  width: ${({ theme: { pixelSize } }) => pixelSize}px;
  height: ${({ theme: { pixelSize } }) => pixelSize}px;
  background-color: ${({ color, active, theme }) =>
    active ? color : theme.colors.border};
  position: absolute;
  top: ${({ theme: { pixelSize }, positionY }) => pixelSize * positionY}px;
  left: ${({ theme: { pixelSize }, positionX }) => pixelSize * positionX}px;
`;

type PixeledCircleBaseProps = {
  diameter: number;
};
const PixeledCircleBase = styled.div<PixeledCircleBaseProps>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ diameter, theme: { pixelSize } }) => diameter * pixelSize}px;
  height: ${({ diameter, theme: { pixelSize } }) => diameter * pixelSize}px;
  margin: 0 auto;
`;

type PixeledCircleProps = {
  progress?: number;
  color?: string;
};
function PixelCircle({ progress = 0, color = "red" }: PixeledCircleProps) {
  const [activePixels, setActivePixels] = useState<number>(0);
  const pixelsRef = useRef<HTMLSpanElement[]>([]);
  const DIAMETER = 22;

  useEffect(() => {
    setActivePixels(Math.round((progress / 10) * 6));
  }, [progress]);

  return (
    <PixeledCircleBase diameter={DIAMETER}>
      {circlePixelsPosition.map(([positionX, positionY], i) => (
        <Pixel
          key={i}
          color={color}
          positionX={positionX}
          positionY={positionY}
          active={i < activePixels}
          ref={(el) => (pixelsRef.current[i] = el!)}
        />
      ))}
    </PixeledCircleBase>
  );
}

export default PixelCircle;
