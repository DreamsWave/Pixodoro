import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { circlePixelsPosition } from "../constants";
import { DefaultTheme } from "styled-components/dist/types";

type PixelProps = {
  color?: string;
  $top?: number;
  $left?: number;
  $active?: boolean;
  theme: DefaultTheme;
};
const Pixel = styled.span.attrs(
  ({
    theme,
    $active = false,
    $top = 0,
    $left = 0,
    color = "#333",
  }: PixelProps) => ({
    style: {
      background: $active ? color : theme.colors.border,
      top: theme.pixelSize * $top,
      left: theme.pixelSize * $left,
    },
  })
)`
  display: flex;
  position: absolute;
  width: ${({ theme }) => theme.pixelSize}px;
  height: ${({ theme }) => theme.pixelSize}px;
`;

type PixeledCircleBaseProps = {
  $diameter: number;
};
const PixeledCircleBase = styled.div<PixeledCircleBaseProps>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ $diameter, theme: { pixelSize } }) => $diameter * pixelSize}px;
  height: ${({ $diameter, theme: { pixelSize } }) => $diameter * pixelSize}px;
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
    <PixeledCircleBase $diameter={DIAMETER}>
      {circlePixelsPosition.map(([positionX, positionY], i) => (
        <Pixel
          key={i}
          color={color}
          // @ts-ignore
          $top={positionY}
          $left={positionX}
          $active={i < activePixels}
          ref={(el) => (pixelsRef.current[i] = el!)}
        />
      ))}
    </PixeledCircleBase>
  );
}

export default PixelCircle;
