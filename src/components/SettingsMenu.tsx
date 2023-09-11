import styled from "styled-components";
import BurgerButton from "./BurgerButton";
import { useState } from "react";
import { useAppDispatch, useAppSelector, usePixelSize } from "../hooks";
import {
  setPomodoroTotalSeconds,
  setBreakTotalSeconds,
  selectTimer,
  setCurrentPomodoroTotalSeconds,
  setSecondsLeft,
  setCurrentBreakTotalSeconds,
} from "../features/timer/timerSlice";
import ThemeSwitcher from "./ThemeSwitcher";
import AudioVolumeSlider from "./AudioVolumeSlider";
import InputField from "./InputField";
import QuantityInput from "./QuantityInput";
import { setPixelSize } from "../features/appSettings/appSettingsSlice";

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
  const { pomodoroTotalSeconds, breakTotalSeconds, started, status } =
    useAppSelector(selectTimer);
  const { pixelSize } = usePixelSize();
  const dispatch = useAppDispatch();

  function toggleMenu() {
    setMenuOpened(!menuOpened);
  }

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
    if (type === status) {
      dispatch(setSecondsLeft(sec));
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
              onChange={(num) => dispatch(setPixelSize(num))}
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
