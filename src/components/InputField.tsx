import styled from "styled-components";
import { usePixelSize } from "../hooks";

const InputFieldBase = styled.div<{ pixelSize: number }>`
  display: flex;
  width: 100%;
  padding: 0 ${({ pixelSize }) => pixelSize}px;
  justify-content: space-between;
  align-items: center;
  margin-top: ${({ pixelSize }) => pixelSize}px;
`;

function InputField({ children }: { children: React.ReactNode }) {
  const { pixelSize } = usePixelSize();

  return <InputFieldBase pixelSize={pixelSize}>{children}</InputFieldBase>;
}

export default InputField;
