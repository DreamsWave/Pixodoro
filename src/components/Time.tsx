import { useState, useEffect } from "react";
import styled, { useTheme } from "styled-components";
import { useAppSelector, usePixelSize } from "../hooks";
import { selectTimer } from "../features/timer/timerSlice";

const Colon = styled.div<{ pixelSize: number; color?: string }>`
  display: flex;
  height: ${({ pixelSize }) => pixelSize * 3}px;
  width: ${({ pixelSize }) => pixelSize}px;
  position: relative;
  margin-left: ${({ pixelSize }) => pixelSize}px;
  margin-right: ${({ pixelSize }) => pixelSize}px;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: ${({ pixelSize }) => pixelSize}px;
    width: ${({ pixelSize }) => pixelSize}px;
    background-color: ${({ color }) => color ?? "gray"};
  }
  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    height: ${({ pixelSize }) => pixelSize}px;
    width: ${({ pixelSize }) => pixelSize}px;
    background-color: ${({ color }) => color ?? "gray"};
  }
`;

const TimeBase = styled.div<{ pixelSize: number }>`
  display: flex;
  align-items: center;
  position: absolute;
  font-size: ${({ pixelSize }) => pixelSize * 3.5}px;
  min-height: ${({ pixelSize }) => pixelSize * 3.5}px;
`;

function Time() {
  const [mins, setMins] = useState<string>("00");
  const [secs, setSecs] = useState<string>("00");
  const { secondsLeft, status } = useAppSelector(selectTimer);
  const theme = useTheme();
  const { pixelSize } = usePixelSize();

  useEffect(() => {
    const m = Math.floor(secondsLeft / 60);
    const s = secondsLeft % 60;
    setMins(String(m < 10 ? "0" + m : m));
    setSecs(String(s < 10 ? "0" + s : s));
  }, [secondsLeft]);

  return (
    <TimeBase pixelSize={pixelSize}>
      <span style={{ marginTop: 4 }}>{mins}</span>
      <Colon
        pixelSize={pixelSize}
        color={
          status === "pomodoro" ? theme.color?.primary : theme.color?.secondary
        }
      />
      <span style={{ marginTop: 4, marginLeft: 2 }}>{secs}</span>
    </TimeBase>
  );
}

export default Time;
