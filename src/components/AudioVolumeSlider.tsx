import { styled } from "styled-components";
import {
  selectAppSettings,
  setVolume,
} from "../features/appSettings/appSettingsSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { selectPixelSize } from "../features/pixelSize/pixelSizeSlice";

const Slider = styled.input<{ pixelSize: number }>`
  -webkit-appearance: none;
  width: 100%;
  max-width: 100px;
  height: ${({ pixelSize }) => pixelSize * 1}px;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
  margin: ${({ pixelSize }) => pixelSize / 2}px 0;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: ${({ pixelSize }) => pixelSize * 2}px;
    height: ${({ pixelSize }) => pixelSize * 2}px;
    background: #04aa6d;
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: ${({ pixelSize }) => pixelSize * 2}px;
    height: ${({ pixelSize }) => pixelSize * 2}px;
    background: #04aa6d;
    cursor: pointer;
  }
`;

function AudioVolumeSlider() {
  const pixelSize = useAppSelector(selectPixelSize);
  const { audioVolume } = useAppSelector(selectAppSettings);
  const dispatch = useAppDispatch();

  return (
    <Slider
      pixelSize={pixelSize}
      type="range"
      min="0"
      max="100"
      value={audioVolume * 100}
      onChange={(e) => dispatch(setVolume(+e.target.value / 100))}
    />
  );
}

export default AudioVolumeSlider;
