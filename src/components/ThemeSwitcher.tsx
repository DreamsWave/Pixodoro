import { moonIconPixelPositions, sunIconPixelPositions } from "../constants";
import {
  selectAppSettings,
  toggleTheme,
} from "../features/appSettings/appSettingsSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import Button from "./Button";
import PixelIcon from "./PixelIcon";

function ThemeSwitcher() {
  const { darkTheme } = useAppSelector(selectAppSettings);
  const dispatch = useAppDispatch();

  return (
    <>
      {darkTheme ? (
        <Button handleClick={() => dispatch(toggleTheme())} noBorder>
          <PixelIcon
            pixelPositions={sunIconPixelPositions}
            color="lightyellow"
          />
        </Button>
      ) : (
        <Button handleClick={() => dispatch(toggleTheme())} noBorder>
          <PixelIcon
            pixelPositions={moonIconPixelPositions}
            color="lightblue"
          />
        </Button>
      )}
    </>
  );
}

export default ThemeSwitcher;
