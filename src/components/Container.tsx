import styled from "styled-components";
import { usePixel } from "../features/pixel/usePixel";

const ContainerWrapper = styled.div<{ pixelSize: number }>`
  width: 100%;
  max-width: ${({ pixelSize }) => pixelSize * 50}px;
  margin: 0 auto;
  position: relative;
`;

type ContainerProps = {
  children: React.ReactNode;
};
function Container({ children }: ContainerProps) {
  const { pixelSize } = usePixel();
  return <ContainerWrapper pixelSize={pixelSize}>{children}</ContainerWrapper>;
}

export default Container;
