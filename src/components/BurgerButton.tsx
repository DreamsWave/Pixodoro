import styled, { useTheme } from "styled-components";
import Button from "./Button";
import PixelIcon from "./PixelIcon";
import {
  burgerIconPixelPositions,
  closeIconPixelPositions,
} from "../constants";

const BurgerButtonBase = styled.div`
  position: absolute;
  top: ${({ theme: { pixelSize } }) => pixelSize}px;
  right: ${({ theme: { pixelSize } }) => pixelSize}px;
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
  const theme = useTheme();
  return (
    <BurgerButtonBase onClick={onClick} {...props}>
      <Button>
        {opened ? (
          <PixelIcon
            pixelPositions={closeIconPixelPositions}
            color={theme.colors.button}
          />
        ) : (
          <PixelIcon
            pixelPositions={burgerIconPixelPositions}
            color={theme.colors.button}
          />
        )}
      </Button>
    </BurgerButtonBase>
  );
}

export default BurgerButton;
