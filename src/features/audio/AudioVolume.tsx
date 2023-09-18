import { styled, useTheme } from "styled-components";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { selectTimer } from "../timer/timerSlice";
import { selectAudio, setVolume } from "./audioSlice";

const Slider = styled.input<{ thumbColor?: string }>`
  -webkit-appearance: none;
  width: 100%;
  max-width: ${({ theme: { pixelSize } }) => pixelSize * 16}px;
  height: ${({ theme: { pixelSize } }) => pixelSize * 1}px;
  background: ${({ theme }) => theme.colors.border};
  outline: none;
  opacity: 1;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
  margin: ${({ theme: { pixelSize } }) => pixelSize / 2}px 0;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: ${({ theme: { pixelSize } }) => pixelSize * 2}px;
    height: ${({ theme: { pixelSize } }) => pixelSize * 2}px;
    background: ${({ thumbColor }) => thumbColor ?? "lightyellow"};
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: ${({ theme: { pixelSize } }) => pixelSize * 2}px;
    height: ${({ theme: { pixelSize } }) => pixelSize * 2}px;
    background: ${({ thumbColor }) => thumbColor ?? "lightyellow"};
    cursor: pointer;
  }
`;

function AudioVolume() {
  const { volume } = useAppSelector(selectAudio);
  const dispatch = useAppDispatch();
  const styledTheme = useTheme();
  const { status } = useAppSelector(selectTimer);

  return (
    <Slider
      type="range"
      min="0"
      max="100"
      value={volume * 100}
      onChange={(e) => dispatch(setVolume(+e.target.value / 100))}
      thumbColor={
        status === "pomodoro"
          ? styledTheme.colors.primary
          : styledTheme.colors.secondary
      }
    />
  );
}

export default AudioVolume;
