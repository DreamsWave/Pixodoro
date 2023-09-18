import styled from "styled-components";
import { usePixel } from "../features/pixel/usePixel";

const SettingsGroupBase = styled.div<{
  pixelSize: number;
  direction: "horizontal" | "vertical";
}>`
  display: flex;
  margin: ${({ pixelSize }) => pixelSize}px;
  flex-direction: ${({ direction }) =>
    direction === "vertical" ? "column" : "row"};
`;

type SettingsGroupProps = {
  children: React.ReactNode;
  direction?: "horizontal" | "vertical";
};
function SettingsGroup({
  children,
  direction = "vertical",
}: SettingsGroupProps) {
  const { pixelSize } = usePixel();
  return (
    <SettingsGroupBase pixelSize={pixelSize} direction={direction}>
      {children}
    </SettingsGroupBase>
  );
}

export default SettingsGroup;
