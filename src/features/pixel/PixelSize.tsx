import QuantityInput from "../../components/QuantityInput";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { selectPixel, setPixelSize } from "./pixelSlice";

function PixelSize() {
  const { pixelSize } = useAppSelector(selectPixel);
  const dispatch = useAppDispatch();

  return (
    <>
      <QuantityInput
        min={4}
        max={8}
        defaultValue={pixelSize}
        onChange={(num) => dispatch(setPixelSize(num))}
      />
    </>
  );
}

export default PixelSize;
