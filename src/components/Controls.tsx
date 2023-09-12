import styled, { useTheme } from "styled-components";
import Button from "./Button";
import PixelIcon from "./PixelIcon";
import {
  pauseIconPixelPositions,
  playIconPixelPositions,
  skipIconPixelPositions,
  stopIconPixelPositions,
} from "../constants";
import { usePixelSize } from "../hooks";

const ControlsBase = styled.div<{ pixelSize: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ pixelSize }) => pixelSize}px;
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
  ...props
}: ControlsProps) {
  const { pixelSize } = usePixelSize();
  const theme = useTheme();
  return (
    <ControlsBase pixelSize={pixelSize}>
      {running ? (
        <Button handleClick={handleTimerToggle} noBorder>
          <PixelIcon
            pixelPositions={pauseIconPixelPositions}
            color={theme.color?.button}
          />
        </Button>
      ) : (
        <Button handleClick={handleTimerToggle} noBorder>
          <PixelIcon
            pixelPositions={playIconPixelPositions}
            color={theme.color?.button}
          />
        </Button>
      )}
      {running ? (
        <Button handleClick={handleTimerStop} noBorder>
          <PixelIcon
            pixelPositions={stopIconPixelPositions}
            color={theme.color?.button}
          />
        </Button>
      ) : (
        <Button handleClick={handleTimerEnd} noBorder>
          <PixelIcon
            pixelPositions={skipIconPixelPositions}
            color={theme.color?.button}
          />
        </Button>
      )}
    </ControlsBase>
  );
}

export default Controls;
