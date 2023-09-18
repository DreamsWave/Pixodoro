import QuantityInput from "../../components/QuantityInput";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { selectTheme, setPixelSize } from "./themeSlice";

function PixelSize() {
  const { pixelSize } = useAppSelector(selectTheme);
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
