import styled from "styled-components";
import Button from "./Button";
import PixelIcon from "./PixelIcon";
import {
  pauseIconPixelPositions,
  playIconPixelPositions,
  skipIconPixelPositions,
  stopIconPixelPositions,
} from "../constants";

const ControlsBase = styled.div<{ pixelSize: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ pixelSize }) => pixelSize}px;
`;

type ControlsProps = {
  pixelSize: number;
  running?: boolean;
  handleTimerStop: () => void;
  handleTimerEnd: () => void;
  handleTimerToggle: () => void;
};
function Controls({
  pixelSize = 8,
  running = false,
  handleTimerStop,
  handleTimerEnd,
  handleTimerToggle,
  ...props
}: ControlsProps) {
  return (
    <ControlsBase pixelSize={pixelSize}>
      {running ? (
        <Button
          pixelSize={pixelSize}
          handleClick={handleTimerToggle}
          borderColor="gray"
        >
          <PixelIcon
            pixelPositions={pauseIconPixelPositions}
            color="gray"
            pixelSize={pixelSize}
          />
        </Button>
      ) : (
        <Button
          pixelSize={pixelSize}
          handleClick={handleTimerToggle}
          borderColor="gray"
        >
          <PixelIcon
            pixelPositions={playIconPixelPositions}
            color="gray"
            pixelSize={pixelSize}
          />
        </Button>
      )}
      {running ? (
        <Button
          pixelSize={pixelSize}
          handleClick={handleTimerStop}
          borderColor="gray"
        >
          <PixelIcon
            pixelPositions={stopIconPixelPositions}
            color="gray"
            pixelSize={pixelSize}
          />
        </Button>
      ) : (
        <Button
          pixelSize={pixelSize}
          handleClick={handleTimerEnd}
          borderColor="gray"
        >
          <PixelIcon
            pixelPositions={skipIconPixelPositions}
            color="gray"
            pixelSize={pixelSize}
          />
        </Button>
      )}
    </ControlsBase>
  );
}

export default Controls;
