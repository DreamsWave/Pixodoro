import { useTheme } from "styled-components";
import { moonIconPixelPositions, sunIconPixelPositions } from "../constants";
import {
  selectAppSettings,
  setTheme,
} from "../features/appSettings/appSettingsSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import Button from "./Button";
import PixelIcon from "./PixelIcon";
import { selectTimer } from "../features/timer/timerSlice";

function ThemeSwitcher() {
  const { theme } = useAppSelector(selectAppSettings);
  const dispatch = useAppDispatch();
  const styledTheme = useTheme();
  const { status } = useAppSelector(selectTimer);

  return (
    <>
      {theme === "dark" && (
        <Button handleClick={() => dispatch(setTheme("light"))} noBorder>
          <PixelIcon
            pixelPositions={sunIconPixelPositions}
            color={
              status === "pomodoro"
                ? styledTheme.color?.primary
                : styledTheme.color?.secondary
            }
          />
        </Button>
      )}
      {theme === "light" && (
        <Button handleClick={() => dispatch(setTheme("dark"))} noBorder>
          <PixelIcon
            pixelPositions={moonIconPixelPositions}
            color={
              status === "pomodoro"
                ? styledTheme.color?.primary
                : styledTheme.color?.secondary
            }
          />
        </Button>
      )}
    </>
  );
}

export default ThemeSwitcher;
