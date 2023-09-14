import styled, { useTheme } from "styled-components";
import Button from "./Button";
import PixelIcon from "./PixelIcon";
import {
  pauseIconPixelPositions,
  playIconPixelPositions,
  skipIconPixelPositions,
  stopIconPixelPositions,
} from "../constants";
import { useAppSelector, usePixelSize } from "../hooks";
import { selectTimer } from "../features/timer/timerSlice";

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
  const { pixelSize } = usePixelSize();
  const theme = useTheme();
  const { status } = useAppSelector(selectTimer);
  return (
    <ControlsBase pixelSize={pixelSize}>
      {running ? (
        <Button handleClick={handleTimerToggle} noBorder>
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
        <Button handleClick={handleTimerToggle} noBorder>
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
        <Button handleClick={handleTimerStop} noBorder>
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
        <Button handleClick={handleTimerEnd} noBorder>
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
