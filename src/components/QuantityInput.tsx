import styled, { useTheme } from "styled-components";
import { minusIconPixelPositions, plusIconPixelPositions } from "../constants";
import Button from "./Button";
import PixelIcon from "./PixelIcon";
import { useAppSelector } from "../hooks";
import { useEffect, useState } from "react";
import { selectTimer } from "../features/timer/timerSlice";

const QuantityInputBase = styled.div`
  display: flex;
`;

const QuantityInputElement = styled.input<{
  $numberLength: number;
}>`
  max-width: ${({ theme: { pixelSize }, $numberLength }) =>
    pixelSize * 4 * $numberLength}px;
  min-width: ${({ theme: { pixelSize } }) => pixelSize * 4 * 2}px;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  outline: none;
  font-size: ${({ theme: { pixelSize } }) => pixelSize * 3}px;

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

  const theme = useTheme();
  const { status } = useAppSelector(selectTimer);

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
      <Button borderColor={theme.colors.border} handleClick={decreaseValue}>
        <PixelIcon
          pixelPositions={minusIconPixelPositions}
          color={
            atMininum
              ? theme.colors.disabled
              : status === "pomodoro"
              ? theme.colors.primary
              : theme.colors.secondary
          }
        />
      </Button>
      <QuantityInputElement
        type="number"
        min={min}
        max={max}
        value={value}
        name="quantity"
        onChange={(e) => inputChange(+e.target.value)}
        $numberLength={
          value.toString().length < 2 ? 2 : value.toString().length
        }
      />
      <Button borderColor={theme.colors.border} handleClick={increaseValue}>
        <PixelIcon
          pixelPositions={plusIconPixelPositions}
          color={
            atMaximum
              ? theme.colors.disabled
              : status === "pomodoro"
              ? theme.colors.primary
              : theme.colors.secondary
          }
        />
      </Button>
    </QuantityInputBase>
  );
}

export default QuantityInput;
