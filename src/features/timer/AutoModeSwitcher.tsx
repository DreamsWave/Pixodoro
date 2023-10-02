import { useTheme } from "styled-components";
import { useAppDispatch, useAppSelector } from "../../hooks";
import Button from "../../components/Button";
import PixelIcon from "../../components/PixelIcon";
import { autoModeIconPixelPositions } from "../../constants";
import { selectTimer, setAutoMode } from "../timer/timerSlice";

function AutoModeSwitcher() {
  const { autoMode } = useAppSelector(selectTimer);
  const { status } = useAppSelector(selectTimer);
  const dispatch = useAppDispatch();
  const theme = useTheme();

  return (
    <Button handleClick={() => dispatch(setAutoMode(!autoMode))}>
      <PixelIcon
        pixelPositions={autoModeIconPixelPositions}
        color={
          autoMode
            ? status === "pomodoro"
              ? theme.colors.primary
              : theme.colors.secondary
            : theme.colors.button
        }
      />
    </Button>
  );
}

export default AutoModeSwitcher;
