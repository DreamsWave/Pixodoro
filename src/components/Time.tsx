import { useState, useEffect } from "react";
import styled, { useTheme } from "styled-components";
import { useAppSelector } from "../hooks";
import { selectTimer } from "../features/timer/timerSlice";

const Colon = styled.div<{ color?: string }>`
  display: flex;
  height: ${({ theme: { pixelSize } }) => pixelSize * 3}px;
  width: ${({ theme: { pixelSize } }) => pixelSize}px;
  position: relative;
  margin-left: ${({ theme: { pixelSize } }) => pixelSize}px;
  margin-right: ${({ theme: { pixelSize } }) => pixelSize}px;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: ${({ theme: { pixelSize } }) => pixelSize}px;
    width: ${({ theme: { pixelSize } }) => pixelSize}px;
    background-color: ${({ color }) => color ?? "gray"};
  }
  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    height: ${({ theme: { pixelSize } }) => pixelSize}px;
    width: ${({ theme: { pixelSize } }) => pixelSize}px;
    background-color: ${({ color }) => color ?? "gray"};
  }
`;

const TimeBase = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  font-size: ${({ theme: { pixelSize } }) => pixelSize * 3.5}px;
  min-height: ${({ theme: { pixelSize } }) => pixelSize * 3.5}px;
`;

function Time() {
  const [mins, setMins] = useState<string>("00");
  const [secs, setSecs] = useState<string>("00");
  const { secondsLeft, status } = useAppSelector(selectTimer);
  const theme = useTheme();

  useEffect(() => {
    const m = Math.floor(secondsLeft / 60);
    const s = secondsLeft % 60;
    setMins(String(m < 10 ? "0" + m : m));
    setSecs(String(s < 10 ? "0" + s : s));
  }, [secondsLeft]);

  return (
    <TimeBase>
      <span style={{ marginTop: 4 }}>{mins}</span>
      <Colon
        color={
          status === "pomodoro" ? theme.colors.primary : theme.colors.secondary
        }
      />
      <span style={{ marginTop: 4, marginLeft: 2 }}>{secs}</span>
    </TimeBase>
  );
}

export default Time;
