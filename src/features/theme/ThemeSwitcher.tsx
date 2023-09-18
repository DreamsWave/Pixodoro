import { useTheme } from "styled-components";
import { moonIconPixelPositions, sunIconPixelPositions } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../hooks";
import Button from "../../components/Button";
import PixelIcon from "../../components/PixelIcon";
import { selectTimer } from "../timer/timerSlice";
import { selectTheme, setDarkTheme, setLightTheme } from "./themeSlice";

function ThemeSwitcher() {
  const { darkmode } = useAppSelector(selectTheme);
  const dispatch = useAppDispatch();
  const styledTheme = useTheme();
  const { status } = useAppSelector(selectTimer);

  return (
    <>
      {darkmode && (
        <Button handleClick={() => dispatch(setLightTheme())}>
          <PixelIcon
            pixelPositions={sunIconPixelPositions}
            color={
              status === "pomodoro"
                ? styledTheme.colors.primary
                : styledTheme.colors.secondary
            }
          />
        </Button>
      )}
      {!darkmode && (
        <Button handleClick={() => dispatch(setDarkTheme())}>
          <PixelIcon
            pixelPositions={moonIconPixelPositions}
            color={
              status === "pomodoro"
                ? styledTheme.colors.primary
                : styledTheme.colors.secondary
            }
          />
        </Button>
      )}
    </>
  );
}

export default ThemeSwitcher;
