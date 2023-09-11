import styled from "styled-components";
import BurgerButton from "./BurgerButton";
import { useState } from "react";
import Button from "./Button";
import PixelIcon from "./PixelIcon";
import { moonIconPixelPositions, sunIconPixelPositions } from "../constants";
import PixelSize from "../features/pixelSize/PixelSize";
import { useAppDispatch, useAppSelector } from "../hooks";
import { selectPixelSize } from "../features/pixelSize/pixelSizeSlice";
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
import PixelSizeInput from "./PixelSizeInput";
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
  const pixelSize = useAppSelector(selectPixelSize);
  const { pomodoroTotalSeconds, breakTotalSeconds, started } =
    useAppSelector(selectTimer);
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
          <label>
            FOCUS:{" "}
            <input
              type="number"
              min="0"
              defaultValue={pomodoroTotalSeconds}
              onChange={(e) => changeTotalSeconds("pomodoro", +e.target.value)}
            />
          </label>
          <label>
            BREAK:{" "}
            <input
              type="number"
              min="0"
              defaultValue={breakTotalSeconds}
              onChange={(e) => changeTotalSeconds("break", +e.target.value)}
            />
          </label>
          <InputField>
            <span>Pixel Size</span>
            <PixelSizeInput />
          </InputField>
          <InputField>
            <span>Volume</span>
            <AudioVolumeSlider />
          </InputField>
          <InputField>
            <span>Field</span>
            <QuantityInput />
          </InputField>
        </SettingsMenuOverlay>
      )}
    </SettingsMenuBase>
  );
}

export default SettingsMenu;
