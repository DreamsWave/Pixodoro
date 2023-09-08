import styled from "styled-components";
import PixelCircle from "./PixelCircle";
import { POMODORO_STATUS } from "../types";
import { selectPixelSize } from "../features/pixelSize/pixelSizeSlice";
import { useAppSelector } from "../hooks";
import { useState, useEffect } from "react";

const TimeBase = styled.span`
  display: inline-flex;
  position: absolute;
  font-size: 1.6rem;
`;

type TimeProps = {
  seconds?: number;
  status?: POMODORO_STATUS;
};
function Time({ seconds = 0, status = "pomodoro" }: TimeProps) {
  const [mins, setMins] = useState<string>("00");
  const [secs, setSecs] = useState<string>("00");

  useEffect(() => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    setMins(String(m < 10 ? "0" + m : m));
    setSecs(String(s < 10 ? "0" + s : s));
  }, [seconds]);

  return (
    <TimeBase>
      {mins}
      <span style={{ color: status === "pomodoro" ? "tomato" : "forestgreen" }}>
        :
      </span>
      {secs}
    </TimeBase>
  );
}

const ClockBase = styled.div<{ pixelSize: number }>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

type ClockProps = {
  progress?: number;
  status?: POMODORO_STATUS;
  secondsLeft?: number;
};
function Clock({
  progress = 0,
  status = "pomodoro",
  secondsLeft = 0,
}: ClockProps) {
  const pixelSize = useAppSelector(selectPixelSize);
  return (
    <ClockBase pixelSize={pixelSize}>
      <PixelCircle
        progress={progress}
        color={status === "pomodoro" ? "tomato" : "forestgreen"}
      />
      <Time seconds={secondsLeft} status={status} />
    </ClockBase>
  );
}

export default Clock;
