import { useTheme } from "styled-components";
import { useAppDispatch, useAppSelector } from "../../hooks";
import Button from "../../components/Button";
import PixelIcon from "../../components/PixelIcon";
import { notificationIconPixelPositions } from "../../constants";
import { selectTimer } from "../timer/timerSlice";
import { selectNotification, setEnabled } from "./notificationSlice";

function NotificationSwitcher() {
  const { status } = useAppSelector(selectTimer);
  const { enabled } = useAppSelector(selectNotification);
  const dispatch = useAppDispatch();
  const theme = useTheme();

  return (
    <Button handleClick={() => dispatch(setEnabled(!enabled))}>
      <PixelIcon
        pixelPositions={notificationIconPixelPositions}
        color={
          enabled
            ? status === "pomodoro"
              ? theme.colors.primary
              : theme.colors.secondary
            : theme.colors.button
        }
      />
    </Button>
  );
}

export default NotificationSwitcher;
