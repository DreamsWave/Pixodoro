import styled from "styled-components";
import { useAppSelector } from "../hooks";
import { selectPixelSize } from "../features/pixelSize/pixelSizeSlice";

const InputFieldBase = styled.div<{ pixelSize: number }>`
  display: flex;
  width: 100%;
  padding: 0 ${({ pixelSize }) => pixelSize}px;
  justify-content: space-between;
  align-items: center;
  margin-top: ${({ pixelSize }) => pixelSize}px;
`;

function InputField({ children }: { children: React.ReactNode }) {
  const pixelSize = useAppSelector(selectPixelSize);

  return <InputFieldBase pixelSize={pixelSize}>{children}</InputFieldBase>;
}

export default InputField;
