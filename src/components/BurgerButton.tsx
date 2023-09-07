import styled from "styled-components";
import Button from "./Button";
import PixelIcon from "./PixelIcon";
import {
  burgerIconPixelPositions,
  closeIconPixelPositions,
} from "../constants";

const BurgerButtonBase = styled.div<{ pixelSize: number }>`
  position: fixed;
  top: 0px;
  right: 0px;
  z-index: 15;
  cursor: pointer;
`;

type BurgerButtonProps = {
  pixelSize: number;
  opened?: boolean;
  onClick: () => void;
};
function BurgerButton({
  pixelSize = 8,
  opened = false,
  onClick,
  ...props
}: BurgerButtonProps) {
  return (
    <BurgerButtonBase pixelSize={pixelSize} onClick={onClick} {...props}>
      <Button pixelSize={pixelSize} noBorder={true}>
        {opened ? (
          <PixelIcon pixelPositions={closeIconPixelPositions} color="gray" />
        ) : (
          <PixelIcon pixelPositions={burgerIconPixelPositions} color="gray" />
        )}
      </Button>
    </BurgerButtonBase>
  );
}

export default BurgerButton;
