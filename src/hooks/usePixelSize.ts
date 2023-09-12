import {
  selectAppSettings,
  setPixelSize,
} from "../features/appSettings/appSettingsSlice";
import { useAppSelector, useAppDispatch } from "../hooks";

export const usePixelSize = () => {
  const { pixelSize } = useAppSelector(selectAppSettings);
  const dispatch = useAppDispatch();

  function setPixel(newPixelSize: number) {
    dispatch(setPixelSize(newPixelSize));
  }

  return { pixelSize, setPixel };
};
