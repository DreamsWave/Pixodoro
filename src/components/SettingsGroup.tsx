import styled from "styled-components";

const SettingsGroupBase = styled.div<{
  direction: "horizontal" | "vertical";
}>`
  display: flex;
  margin: ${({ theme: { pixelSize } }) => pixelSize}px;
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
  return (
    <SettingsGroupBase direction={direction}>{children}</SettingsGroupBase>
  );
}

export default SettingsGroup;
