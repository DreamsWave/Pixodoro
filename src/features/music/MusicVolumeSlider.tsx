import { styled, useTheme } from "styled-components";
import { setVolume } from "./musicSlice";
import {
  useAppDispatch,
  useAppSelector,
  usePixelSize,
  useTimer,
} from "../../hooks";
import { selectTimer } from "../timer/timerSlice";
import { selectMusic } from "./musicSlice";

const Slider = styled.input<{ pixelSize: number; thumbColor?: string }>`
  -webkit-appearance: none;
  width: 100%;
  max-width: ${({ pixelSize }) => pixelSize * 16}px;
  height: ${({ pixelSize }) => pixelSize * 1}px;
  background: ${({ theme }) => theme.color?.border};
  outline: none;
  opacity: 1;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
  margin: ${({ pixelSize }) => pixelSize / 2}px 0;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: ${({ pixelSize }) => pixelSize * 2}px;
    height: ${({ pixelSize }) => pixelSize * 2}px;
    background: ${({ thumbColor }) => thumbColor ?? "lightyellow"};
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: ${({ pixelSize }) => pixelSize * 2}px;
    height: ${({ pixelSize }) => pixelSize * 2}px;
    background: ${({ thumbColor }) => thumbColor ?? "lightyellow"};
    cursor: pointer;
  }
`;

function MusicVolumeSlider() {
  const { pixelSize } = usePixelSize();
  const { volume } = useAppSelector(selectMusic);
  const dispatch = useAppDispatch();
  const styledTheme = useTheme();
  const { status } = useAppSelector(selectTimer);

  return (
    <Slider
      pixelSize={pixelSize}
      type="range"
      min="0"
      max="100"
      value={volume * 100}
      onChange={(e) => dispatch(setVolume(+e.target.value / 100))}
      thumbColor={
        status === "pomodoro"
          ? styledTheme.color?.primary
          : styledTheme.color?.secondary
      }
    />
  );
}

export default MusicVolumeSlider;
