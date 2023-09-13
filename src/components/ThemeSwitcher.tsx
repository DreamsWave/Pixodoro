import { useTheme } from "styled-components";
import { moonIconPixelPositions, sunIconPixelPositions } from "../constants";
import {
  selectAppSettings,
  setTheme,
} from "../features/appSettings/appSettingsSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import Button from "./Button";
import PixelIcon from "./PixelIcon";

function ThemeSwitcher() {
  const { theme } = useAppSelector(selectAppSettings);
  const dispatch = useAppDispatch();
  const styledTheme = useTheme();

  return (
    <>
      {theme === "dark" && (
        <Button handleClick={() => dispatch(setTheme("light"))} noBorder>
          <PixelIcon
            pixelPositions={sunIconPixelPositions}
            color={styledTheme.color?.sunColor}
          />
        </Button>
      )}
      {theme === "light" && (
        <Button handleClick={() => dispatch(setTheme("dark"))} noBorder>
          <PixelIcon
            pixelPositions={moonIconPixelPositions}
            color={styledTheme.color?.moonColor}
          />
        </Button>
      )}
    </>
  );
}

export default ThemeSwitcher;
