import styled from "styled-components";
import Button from "./Button";
import PixelIcon from "./PixelIcon";
import {
  burgerIconPixelPositions,
  closeIconPixelPositions,
} from "../constants";
import { useAppSelector } from "../hooks";
import { selectPixelSize } from "../features/pixelSize/pixelSizeSlice";

const BurgerButtonBase = styled.div<{ pixelSize: number }>`
  position: fixed;
  top: 0px;
  right: 0px;
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
  const pixelSize = useAppSelector(selectPixelSize);
  return (
    <BurgerButtonBase pixelSize={pixelSize} onClick={onClick} {...props}>
      <Button noBorder={true}>
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
