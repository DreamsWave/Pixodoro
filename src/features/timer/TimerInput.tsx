import QuantityInput from "../../components/QuantityInput";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  selectTimer,
  setBreakTotalSeconds,
  setCurrentBreakTotalSeconds,
  setCurrentPomodoroTotalSeconds,
  setPomodoroTotalSeconds,
  setSecondsLeft,
} from "./timerSlice";

type TimerInputProps = {
  type: "pomodoro" | "break";
};
function TimerInput({ type = "pomodoro" }: TimerInputProps) {
  const { pomodoroTotalSeconds, breakTotalSeconds, started, status } =
    useAppSelector(selectTimer);
  const dispatch = useAppDispatch();
  function changeTotalSeconds(type: "pomodoro" | "break", sec: number) {
    if (type === "pomodoro") {
      dispatch(setPomodoroTotalSeconds(sec));
      if (!started) {
        dispatch(setCurrentPomodoroTotalSeconds(sec));
      }
    } else if (type === "break") {
      dispatch(setBreakTotalSeconds(sec));
      if (!started) {
        dispatch(setCurrentBreakTotalSeconds(sec));
      }
    }
    if (type === status && !started) {
      dispatch(setSecondsLeft(sec));
    }
  }
  return (
    <>
      <QuantityInput
        min={type === "pomodoro" ? 1 : 0}
        max={120}
        defaultValue={
          type === "pomodoro"
            ? pomodoroTotalSeconds / 60
            : breakTotalSeconds / 60
        }
        onChange={(number: number) => changeTotalSeconds(type, number * 60)}
      />
    </>
  );
}

export default TimerInput;
