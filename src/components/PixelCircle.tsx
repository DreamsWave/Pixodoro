import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { circlePixelsPosition } from "../constants";
import { selectPixelSize } from "../features/pixelSize/pixelSizeSlice";
import { useAppSelector } from "../hooks";

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
  margin: ${({ pixelSize }) => pixelSize}px auto;
`;

type PixeledCircleProps = {
  progress?: number;
  color?: string;
};
function PixelCircle({ progress = 0, color = "red" }: PixeledCircleProps) {
  const [activePixels, setActivePixels] = useState<number>(0);
  const pixelsRef = useRef<HTMLSpanElement[]>([]);
  const DIAMETER = 22;
  const pixelSize = useAppSelector(selectPixelSize);

  useEffect(() => {
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
          active={i < activePixels}
          ref={(el) => (pixelsRef.current[i] = el!)}
        />
      ))}
    </PixeledCircleBase>
  );
}

export default PixelCircle;
