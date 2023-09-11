import styled from "styled-components";
import { minusIconPixelPositions, plusIconPixelPositions } from "../constants";
import Button from "./Button";
import PixelIcon from "./PixelIcon";
import { useAppSelector } from "../hooks";
import { selectPixelSize } from "../features/pixelSize/pixelSizeSlice";
import { useEffect, useState } from "react";

const QuantityInputBase = styled.div`
  display: flex;
`;

const QuantityInputElement = styled.input<{ pixelSize: number }>`
  max-width: ${({ pixelSize }) => pixelSize * 12}px;
  background: transparent;
  border: none;
  border-top: ${({ pixelSize }) => pixelSize}px solid gray;
  border-bottom: ${({ pixelSize }) => pixelSize}px solid gray;
  color: #fff;
  text-align: center;
  outline: none;
  font-size: ${({ pixelSize }) => pixelSize * 3}px;
  margin-left: -8px;
  margin-right: -8px;
  padding-left: 8px;
  padding-right: 8px;

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
};
function QuantityInput({
  min = 0,
  max = 10,
  defaultValue = 5,
  onChange,
}: QuantityInputProps) {
  const [value, setValue] = useState(defaultValue);
  const [atMininum, setAtMininum] = useState(false);
  const [atMaximum, setAtMaximum] = useState(false);
  const pixelSize = useAppSelector(selectPixelSize);

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
    console.log(number);
    setValue(number);
  }

  return (
    <QuantityInputBase>
      <Button borderColor="gray" handleClick={decreaseValue}>
        <PixelIcon
          pixelPositions={minusIconPixelPositions}
          color={atMininum ? "gray" : "#fff"}
        />
      </Button>
      <QuantityInputElement
        pixelSize={pixelSize}
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={(e) => inputChange(+e.target.value)}
      />
      <Button borderColor="gray" handleClick={increaseValue}>
        <PixelIcon
          pixelPositions={plusIconPixelPositions}
          color={atMaximum ? "gray" : "#fff"}
        />
      </Button>
    </QuantityInputBase>
  );
}

export default QuantityInput;
