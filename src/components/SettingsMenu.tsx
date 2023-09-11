import styled from "styled-components";
import BurgerButton from "./BurgerButton";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { change, selectPixelSize } from "../features/pixelSize/pixelSizeSlice";
import {
  setPomodoroTotalSeconds,
  setBreakTotalSeconds,
  selectTimer,
  setCurrentPomodoroTotalSeconds,
  setSecondsLeft,
} from "../features/timer/timerSlice";
import ThemeSwitcher from "./ThemeSwitcher";
import AudioVolumeSlider from "./AudioVolumeSlider";
import InputField from "./InputField";
import QuantityInput from "./QuantityInput";

const SettingsMenuBase = styled.div``;

const SettingsMenuOverlay = styled.div`
  background: #2f2f2f;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  z-index: 10;
`;

type SettingsMenuProps = {};
function SettingsMenu({}: SettingsMenuProps) {
  const [menuOpened, setMenuOpened] = useState(false);
  const { pomodoroTotalSeconds, breakTotalSeconds, started } =
    useAppSelector(selectTimer);
  const pixelSize = useAppSelector(selectPixelSize);
  const dispatch = useAppDispatch();

  function toggleMenu() {
    setMenuOpened(!menuOpened);
  }

  function changeTotalSeconds(type: "pomodoro" | "break", sec: number) {
    if (type === "pomodoro") {
      dispatch(setPomodoroTotalSeconds(sec));
      if (!started) {
        dispatch(setCurrentPomodoroTotalSeconds(sec));
        dispatch(setSecondsLeft(sec));
      }
    } else {
      dispatch(setBreakTotalSeconds(sec));
    }
  }

  return (
    <SettingsMenuBase>
      <BurgerButton onClick={toggleMenu} opened={menuOpened} />
      {menuOpened && (
        <SettingsMenuOverlay>
          <ThemeSwitcher />

          <InputField>
            <span>Focus</span>
            <QuantityInput
              min={1}
              max={120}
              defaultValue={pomodoroTotalSeconds / 60}
              onChange={(number) => changeTotalSeconds("pomodoro", number * 60)}
              noBorder
            />
          </InputField>

          <InputField>
            <span>Break</span>
            <QuantityInput
              min={1}
              max={120}
              defaultValue={breakTotalSeconds / 60}
              onChange={(number) => changeTotalSeconds("break", number * 60)}
              noBorder
            />
          </InputField>

          <InputField>
            <span>Pixel Size</span>
            <QuantityInput
              min={4}
              max={8}
              defaultValue={pixelSize}
              onChange={(num) => dispatch(change(num))}
              noBorder
            />
          </InputField>

          <InputField>
            <span>Volume</span>
            <AudioVolumeSlider />
          </InputField>
        </SettingsMenuOverlay>
      )}
    </SettingsMenuBase>
  );
}

export default SettingsMenu;
