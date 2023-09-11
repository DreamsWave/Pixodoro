import { styled } from "styled-components";
import { change, selectPixelSize } from "../features/pixelSize/pixelSizeSlice";
import { useAppSelector, useAppDispatch } from "../hooks";

const PixelSizeInputBase = styled.input<{ pixelSize: number }>`
  background: #3f3f3f;
  // height: ${({ pixelSize }) => pixelSize * 3}px;
  width: ${({ pixelSize }) => pixelSize * 6}px;
  border: none;
  outline: none;
  color: #fff;
  font-size: ${({ pixelSize }) => pixelSize * 2}px;
  padding: ${({ pixelSize }) => pixelSize}px;
  border-bottom: ${({ pixelSize }) => pixelSize}px solid #fff;
`;

function PixelSizeInput() {
  const pixelSize = useAppSelector(selectPixelSize);
  const dispatch = useAppDispatch();

  return (
    <PixelSizeInputBase
      pixelSize={pixelSize}
      type="number"
      value={pixelSize}
      onChange={(e) => dispatch(change(Number(e.target.value)))}
    />
  );
}

export default PixelSizeInput;
