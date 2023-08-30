import styled from "styled-components";

type ButtonBaseProps = {
  fontColor: string;
  pixelSize: number;
  fontSize: number;
};

const ButtonBase = styled.button<ButtonBaseProps>`
  position: relative;
  background: transparent;
  color: ${({ fontColor }) => fontColor};
  padding: ${({ pixelSize }) => pixelSize * 2}px;
  border: none;
  cursor: pointer;
  font-family: PressStart2P, Inter, Avenir, Helvetica, Arial, sans-serif;
  font-size: ${({ fontSize }) => fontSize}px;
`;

const Border = styled.div`
  position: absolute;
  inset: 0;
`;

type BorderSideProps = {
  pixelSize: number;
  color: string;
};

const BorderTop = styled.span<BorderSideProps>`
  position: absolute;
  top: 0;
  left: ${({ pixelSize }) => pixelSize}px;
  height: ${({ pixelSize }) => pixelSize}px;
  width: calc(100% - ${({ pixelSize }) => pixelSize * 2}px);
  background-color: ${({ color }) => color};
`;
const BorderRight = styled.span<BorderSideProps>`
  position: absolute;
  top: ${({ pixelSize }) => pixelSize}px;
  right: 0;
  height: calc(100% - ${({ pixelSize }) => pixelSize * 2}px);
  width: ${({ pixelSize }) => pixelSize}px;
  background-color: ${({ color }) => color};
`;
const BorderBottom = styled.span<BorderSideProps>`
  position: absolute;
  bottom: 0;
  left: ${({ pixelSize }) => pixelSize}px;
  height: ${({ pixelSize }) => pixelSize}px;
  width: calc(100% - ${({ pixelSize }) => pixelSize * 2}px);
  background-color: ${({ color }) => color};
`;
const BorderLeft = styled.span<BorderSideProps>`
  position: absolute;
  top: ${({ pixelSize }) => pixelSize}px;
  left: 0;
  height: calc(100% - ${({ pixelSize }) => pixelSize * 2}px);
  width: ${({ pixelSize }) => pixelSize}px;
  background-color: ${({ color }) => color};
`;

type ButtonProps = {
  primaryColor?: string;
  borderColor?: string;
  fontColor?: string;
  fontSize?: number;
  uppercase?: boolean;
  pixelSize?: number;
  children: React.ReactNode;
};

function Button({
  primaryColor = "#2f2f2f",
  borderColor = "#fff",
  fontColor = "#fff",
  fontSize = 24,
  uppercase = true,
  pixelSize = 4,
  children,
}: ButtonProps) {
  return (
    <ButtonBase fontColor={fontColor} pixelSize={pixelSize} fontSize={fontSize}>
      <Border>
        <BorderTop pixelSize={pixelSize} color={borderColor} />
        <BorderRight pixelSize={pixelSize} color={borderColor} />
        <BorderBottom pixelSize={pixelSize} color={borderColor} />
        <BorderLeft pixelSize={pixelSize} color={borderColor} />
      </Border>
      {children}
    </ButtonBase>
  );
}

export default Button;
