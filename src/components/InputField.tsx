import styled from "styled-components";

const InputFieldBase = styled.div<{
  $noPaddingRight: boolean;
}>`
  display: flex;
  width: 100%;
  padding: 0 ${({ theme: { pixelSize } }) => pixelSize}px;
  justify-content: space-between;
  align-items: center;
  margin-top: ${({ theme: { pixelSize } }) => pixelSize}px;
  ${({ $noPaddingRight }) => $noPaddingRight && `padding-right: 0;`}
  min-height: ${({ theme: { pixelSize } }) => pixelSize * 5}px;
`;

type InputFieldProps = { children: React.ReactNode; noPaddingRight?: boolean };

function InputField({ children, noPaddingRight = false }: InputFieldProps) {
  return (
    <InputFieldBase $noPaddingRight={noPaddingRight}>{children}</InputFieldBase>
  );
}

export default InputField;
