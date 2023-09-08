import { useAppDispatch, useAppSelector } from "../../hooks";
import { selectPixelSize, change } from "./pixelSizeSlice";

function PixelSize() {
  const pixelSize = useAppSelector(selectPixelSize);
  const dispatch = useAppDispatch();

  return (
    <>
      <label>
        PIXEL SIZE:
        <input
          type="number"
          value={pixelSize}
          onChange={(e) => dispatch(change(Number(e.target.value)))}
        />
      </label>
    </>
  );
}

export default PixelSize;
