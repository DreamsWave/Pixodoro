import styled, { useTheme } from "styled-components";
import Button from "./Button";
import PixelIcon from "./PixelIcon";
import {
  burgerIconPixelPositions,
  closeIconPixelPositions,
} from "../constants";
import { usePixelSize } from "../hooks";

const BurgerButtonBase = styled.div<{ pixelSize: number }>`
  position: absolute;
  top: ${({ pixelSize }) => pixelSize}px;
  right: ${({ pixelSize }) => pixelSize}px;
  z-index: 15;
  cursor: pointer;
`;

type BurgerButtonProps = {
  opened?: boolean;
  onClick: () => void;
};
function BurgerButton({
  opened = false,
  onClick,
  ...props
}: BurgerButtonProps) {
  const { pixelSize } = usePixelSize();
  const theme = useTheme();
  return (
    <BurgerButtonBase pixelSize={pixelSize} onClick={onClick} {...props}>
      <Button>
        {opened ? (
          <PixelIcon
            pixelPositions={closeIconPixelPositions}
            color={theme.color?.button}
          />
        ) : (
          <PixelIcon
            pixelPositions={burgerIconPixelPositions}
            color={theme.color?.button}
          />
        )}
      </Button>
    </BurgerButtonBase>
  );
}

export default BurgerButton;
