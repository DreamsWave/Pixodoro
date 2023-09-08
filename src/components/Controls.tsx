import styled from "styled-components";
import Button from "./Button";
import PixelIcon from "./PixelIcon";
import {
  pauseIconPixelPositions,
  playIconPixelPositions,
  skipIconPixelPositions,
  stopIconPixelPositions,
} from "../constants";
import { selectPixelSize } from "../features/pixelSize/pixelSizeSlice";
import { useAppSelector } from "../hooks";

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
  const pixelSize = useAppSelector(selectPixelSize);
  return (
    <ControlsBase pixelSize={pixelSize}>
      {running ? (
        <Button handleClick={handleTimerToggle} borderColor="gray">
          <PixelIcon pixelPositions={pauseIconPixelPositions} color="gray" />
        </Button>
      ) : (
        <Button handleClick={handleTimerToggle} borderColor="gray">
          <PixelIcon pixelPositions={playIconPixelPositions} color="gray" />
        </Button>
      )}
      {running ? (
        <Button handleClick={handleTimerStop} borderColor="gray">
          <PixelIcon pixelPositions={stopIconPixelPositions} color="gray" />
        </Button>
      ) : (
        <Button handleClick={handleTimerEnd} borderColor="gray">
          <PixelIcon pixelPositions={skipIconPixelPositions} color="gray" />
        </Button>
      )}
    </ControlsBase>
  );
}

export default Controls;
