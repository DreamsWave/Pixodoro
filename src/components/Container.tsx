import styled from "styled-components";

const ContainerWrapper = styled.div`
  width: 100%;
  max-width: ${({ theme: { pixelSize } }) => pixelSize * 50}px;
  margin: 0 auto;
  position: relative;
`;

type ContainerProps = {
  children: React.ReactNode;
};
function Container({ children }: ContainerProps) {
  return <ContainerWrapper>{children}</ContainerWrapper>;
}

export default Container;
