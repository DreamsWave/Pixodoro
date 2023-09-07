import styled from "styled-components";
import PixelCircle from "./PixelCircle";
import { POMODORO_STATUS } from "../types";
import Time from "./Time";

const ClockBase = styled.div<{ pixelSize: number }>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

type ClockProps = {
  pixelSize?: number;
  progress?: number;
  status?: POMODORO_STATUS;
  secondsLeft?: number;
};
function Clock({
  pixelSize = 8,
  progress = 0,
  status = "pomodoro",
  secondsLeft = 0,
}: ClockProps) {
  return (
    <ClockBase pixelSize={pixelSize}>
      <PixelCircle
        pixelSize={pixelSize}
        progress={progress}
        color={status === "pomodoro" ? "tomato" : "forestgreen"}
      />
      <Time seconds={secondsLeft} status={status} />
    </ClockBase>
  );
}

export default Clock;
