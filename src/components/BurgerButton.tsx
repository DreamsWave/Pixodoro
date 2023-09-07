import styled from "styled-components";
import Button from "./Button";
import PixelIcon from "./PixelIcon";
import {
  burgerIconPixelPositions,
  closeIconPixelPositions,
} from "../constants";
import { useState } from "react";

const BurgerButtonBase = styled.div<{ pixelSize: number }>`
  position: fixed;
  top: ${({ pixelSize }) => pixelSize}px;
  right: ${({ pixelSize }) => pixelSize}px;
  z-index: 10;
  cursor: pointer;
`;

type BurgerButtonProps = {
  pixelSize: number;
};
function BurgerButton({ pixelSize = 8 }: BurgerButtonProps) {
  const [clicked, setClicked] = useState(false);
  return (
    <BurgerButtonBase
      pixelSize={pixelSize}
      onClick={(e) => setClicked(!clicked)}
    >
      <Button pixelSize={pixelSize} borderColor="transparent">
        {clicked ? (
          <PixelIcon pixelPositions={closeIconPixelPositions} color="gray" />
        ) : (
          <PixelIcon pixelPositions={burgerIconPixelPositions} color="gray" />
        )}
      </Button>
    </BurgerButtonBase>
  );
}

export default BurgerButton;
