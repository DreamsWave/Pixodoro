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

const ControlsBase = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ theme: { pixelSize } }) => pixelSize}px;
  margin-top: ${({ theme: { pixelSize } }) => pixelSize * 3}px;
`;

type ControlsProps = {
  running?: boolean;
  handleTimerStop: () => void;
  handleTimerEnd: () => void;
  handleTimerToggle: () => void;
  handleTimerSwitch: () => void;
};
function Controls({
  running = false,
  handleTimerStop,
  handleTimerToggle,
  handleTimerSwitch,
}: ControlsProps) {
  const theme = useTheme();
  const { status } = useAppSelector(selectTimer);
  return (
    <ControlsBase>
      {running ? (
        <Button handleClick={handleTimerToggle}>
          <PixelIcon
            pixelPositions={pauseIconPixelPositions}
            color={
              status === "pomodoro"
                ? theme.colors.primary
                : theme.colors.secondary
            }
          />
        </Button>
      ) : (
        <Button handleClick={handleTimerToggle}>
          <PixelIcon
            pixelPositions={playIconPixelPositions}
            color={
              status === "pomodoro"
                ? theme.colors.primary
                : theme.colors.secondary
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
                ? theme.colors.primary
                : theme.colors.secondary
            }
          />
        </Button>
      ) : (
        <Button handleClick={handleTimerSwitch}>
          <PixelIcon
            pixelPositions={skipIconPixelPositions}
            color={
              status === "pomodoro"
                ? theme.colors.primary
                : theme.colors.secondary
            }
          />
        </Button>
      )}
    </ControlsBase>
  );
}

export default Controls;
