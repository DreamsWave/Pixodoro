import { useTheme } from "styled-components";
import { useAppDispatch, useAppSelector } from "../../hooks";
import Button from "../../components/Button";
import PixelIcon from "../../components/PixelIcon";
import { notesIconPixelPositions } from "../../constants";
import { selectTimer } from "../timer/timerSlice";
import { selectMusic, setPlaying } from "./musicSlice";

function MusicSwitcher() {
  const { status } = useAppSelector(selectTimer);
  const { playing } = useAppSelector(selectMusic);
  const dispatch = useAppDispatch();
  const theme = useTheme();

  return (
    <Button handleClick={() => dispatch(setPlaying(!playing))}>
      <PixelIcon
        pixelPositions={notesIconPixelPositions}
        color={
          playing
            ? status === "pomodoro"
              ? theme.colors.primary
              : theme.colors.secondary
            : theme.colors.button
        }
      />
    </Button>
  );
}

export default MusicSwitcher;
