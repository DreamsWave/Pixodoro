import styled from "styled-components";
import { usePixelSize } from "../hooks";

type ButtonBaseProps = {
  fontColor: string;
  pixelSize: number;
  fontSize: number;
};

const ButtonBase = styled.button<ButtonBaseProps>`
  position: relative;
  background: transparent;
  color: ${({ fontColor }) => fontColor};
  padding: ${({ pixelSize }) => pixelSize}px;
  border: none;
  cursor: pointer;
  font-family: PressStart2P, Inter, Avenir, Helvetica, Arial, sans-serif;
  font-size: ${({ fontSize }) => fontSize}px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

type ButtonProps = {
  primaryColor?: string;
  borderColor?: string;
  fontColor?: string;
  fontSize?: number;
  uppercase?: boolean;
  children: React.ReactNode;
  handleClick?: () => void;
};

function Button({
  primaryColor = "#2f2f2f",
  borderColor = "#fff",
  fontColor = "#fff",
  fontSize = 24,
  uppercase = true,
  handleClick,
  children,
  ...props
}: ButtonProps) {
  const { pixelSize } = usePixelSize();
  return (
    <ButtonBase
      onClick={handleClick}
      fontColor={fontColor}
      pixelSize={pixelSize}
      fontSize={fontSize}
      {...props}
    >
      {children}
    </ButtonBase>
  );
}

export default Button;
