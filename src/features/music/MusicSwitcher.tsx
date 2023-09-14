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
    <Button noBorder handleClick={() => dispatch(setPlaying(!playing))}>
      <PixelIcon
        pixelPositions={notesIconPixelPositions}
        color={
          playing
            ? status === "pomodoro"
              ? theme.color?.primary
              : theme.color?.secondary
            : theme.color?.button
        }
      />
    </Button>
  );
}

export default MusicSwitcher;
