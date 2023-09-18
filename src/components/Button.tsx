import styled from "styled-components";

type ButtonBaseProps = {
  fontColor: string;
  fontSize: number;
};

const ButtonBase = styled.button<ButtonBaseProps>`
  position: relative;
  background: transparent;
  color: ${({ fontColor }) => fontColor};
  padding: ${({ theme: { pixelSize } }) => pixelSize}px;
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
  return (
    <ButtonBase
      onClick={handleClick}
      fontColor={fontColor}
      fontSize={fontSize}
      {...props}
    >
      {children}
    </ButtonBase>
  );
}

export default Button;
