import { useTheme } from "styled-components";
import { moonIconPixelPositions, sunIconPixelPositions } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../hooks";
import Button from "../../components/Button";
import PixelIcon from "../../components/PixelIcon";
import { selectTimer } from "../timer/timerSlice";
import { selectTheme, setTheme } from "./themeSlice";

function ThemeSwitcher() {
  const { theme } = useAppSelector(selectTheme);
  const dispatch = useAppDispatch();
  const styledTheme = useTheme();
  const { status } = useAppSelector(selectTimer);

  return (
    <>
      {theme === "dark" && (
        <Button handleClick={() => dispatch(setTheme("light"))}>
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
        <Button handleClick={() => dispatch(setTheme("dark"))}>
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
