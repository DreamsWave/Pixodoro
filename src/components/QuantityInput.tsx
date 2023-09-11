import styled from "styled-components";
import { minusIconPixelPositions, plusIconPixelPositions } from "../constants";
import Button from "./Button";
import PixelIcon from "./PixelIcon";
import { usePixelSize } from "../hooks";
import { useEffect, useState } from "react";

const QuantityInputBase = styled.div`
  display: flex;
`;

const QuantityInputElement = styled.input<{
  pixelSize: number;
  noBorder: boolean;
  numberLength: number;
}>`
  max-width: ${({ pixelSize, numberLength }) => pixelSize * 3 * numberLength}px;
  background: transparent;
  border: none;
  ${({ noBorder, pixelSize }) =>
    !noBorder &&
    `border-top: ${pixelSize}px solid gray;
  border-bottom: ${pixelSize}px solid gray;`}
  color: #fff;
  text-align: center;
  outline: none;
  font-size: ${({ pixelSize }) => pixelSize * 3}px;

  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &[type="number"] {
    -moz-appearance: textfield; /* Firefox */
  }
`;

type QuantityInputProps = {
  min?: number;
  max?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  noBorder?: boolean;
};
function QuantityInput({
  min = 0,
  max = 10,
  defaultValue = 5,
  onChange,
  noBorder = false,
}: QuantityInputProps) {
  const [value, setValue] = useState(defaultValue);
  const [atMininum, setAtMininum] = useState(false);
  const [atMaximum, setAtMaximum] = useState(false);
  const { pixelSize } = usePixelSize();

  useEffect(() => {
    if (value === min) {
      setAtMininum(true);
    } else {
      setAtMininum(false);
    }

    if (value === max) {
      setAtMaximum(true);
    } else {
      setAtMaximum(false);
    }

    if (value > max) {
      setValue(max);
    } else if (value < min) {
      setValue(min);
    }

    if (onChange) onChange(value);
  }, [value]);

  function decreaseValue() {
    if (value > min) {
      setValue(value - 1);
    }
  }

  function increaseValue() {
    if (value < max) {
      setValue(value + 1);
    }
  }

  function inputChange(number: number) {
    setValue(number);
  }

  return (
    <QuantityInputBase>
      <Button
        borderColor="gray"
        handleClick={decreaseValue}
        noBorder={noBorder}
      >
        <PixelIcon
          pixelPositions={minusIconPixelPositions}
          color={atMininum ? "gray" : "#fff"}
        />
      </Button>
      <QuantityInputElement
        noBorder={noBorder}
        pixelSize={pixelSize}
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={(e) => inputChange(+e.target.value)}
        numberLength={value.toString().length < 2 ? 2 : value.toString().length}
      />
      <Button
        borderColor="gray"
        handleClick={increaseValue}
        noBorder={noBorder}
      >
        <PixelIcon
          pixelPositions={plusIconPixelPositions}
          color={atMaximum ? "gray" : "#fff"}
        />
      </Button>
    </QuantityInputBase>
  );
}

export default QuantityInput;
