import styled, { useTheme } from "styled-components";
import Button from "./Button";
import PixelIcon from "./PixelIcon";
import {
  pauseIconPixelPositions,
  playIconPixelPositions,
  skipIconPixelPositions,
  stopIconPixelPositions,
} from "../constants";
import { useAppSelector } from "../hooks";
import { selectTimer } from "../features/timer/timerSlice";
import { usePixel } from "../features/pixel/usePixel";

const ControlsBase = styled.div<{ pixelSize: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ pixelSize }) => pixelSize}px;
  margin-top: ${({ pixelSize }) => pixelSize * 3}px;
`;

type ControlsProps = {
  running?: boolean;
  handleTimerStop: () => void;
  handleTimerEnd: () => void;
  handleTimerToggle: () => void;
};
function Controls({
  running = false,
  handleTimerStop,
  handleTimerEnd,
  handleTimerToggle,
}: ControlsProps) {
  const { pixelSize } = usePixel();
  const theme = useTheme();
  const { status } = useAppSelector(selectTimer);
  return (
    <ControlsBase pixelSize={pixelSize}>
      {running ? (
        <Button handleClick={handleTimerToggle}>
          <PixelIcon
            pixelPositions={pauseIconPixelPositions}
            color={
              status === "pomodoro"
                ? theme.color?.primary
                : theme.color?.secondary
            }
          />
        </Button>
      ) : (
        <Button handleClick={handleTimerToggle}>
          <PixelIcon
            pixelPositions={playIconPixelPositions}
            color={
              status === "pomodoro"
                ? theme.color?.primary
                : theme.color?.secondary
            }
          />
        </Button>
      )}
      {running ? (
        <Button handleClick={handleTimerStop}>
          <PixelIcon
            pixelPositions={stopIconPixelPositions}
            color={
              status === "pomodoro"
                ? theme.color?.primary
                : theme.color?.secondary
            }
          />
        </Button>
      ) : (
        <Button handleClick={handleTimerEnd}>
          <PixelIcon
            pixelPositions={skipIconPixelPositions}
            color={
              status === "pomodoro"
                ? theme.color?.primary
                : theme.color?.secondary
            }
          />
        </Button>
      )}
    </ControlsBase>
  );
}

export default Controls;
