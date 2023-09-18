import styled from "styled-components";
import { usePixel } from "../features/pixel/usePixel";

const InputFieldBase = styled.div<{
  pixelSize: number;
  noPaddingRight: boolean;
}>`
  display: flex;
  width: 100%;
  padding: 0 ${({ pixelSize }) => pixelSize}px;
  justify-content: space-between;
  align-items: center;
  margin-top: ${({ pixelSize }) => pixelSize}px;
  ${({ noPaddingRight }) => noPaddingRight && `padding-right: 0;`}
  min-height: ${({ pixelSize }) => pixelSize * 5}px;
`;

type InputFieldProps = { children: React.ReactNode; noPaddingRight?: boolean };

function InputField({ children, noPaddingRight = false }: InputFieldProps) {
  const { pixelSize } = usePixel();

  return (
    <InputFieldBase pixelSize={pixelSize} noPaddingRight={noPaddingRight}>
      {children}
    </InputFieldBase>
  );
}

export default InputField;
