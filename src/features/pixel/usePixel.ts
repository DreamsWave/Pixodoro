import { selectPixel, setPixelSize } from "./pixelSlice";
import { useAppSelector, useAppDispatch } from "../../hooks";

export const usePixel = () => {
  const { pixelSize } = useAppSelector(selectPixel);
  const dispatch = useAppDispatch();

  function setPixel(newPixelSize: number) {
    dispatch(setPixelSize(newPixelSize));
  }

  return { pixelSize, setPixel };
};
