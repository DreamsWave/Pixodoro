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
import Container from "./Container";
import SettingsGroup from "./SettingsGroup";
import MusicSwitcher from "../features/music/MusicSwitcher";
import MusicVolumeSlider from "../features/music/MusicVolumeSlider";

const SettingsMenuOverlay = styled.div<{ pixelSize: number }>`
  background: ${({ theme }) => theme.color?.background};
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  z-index: 10;
  font-size: ${({ pixelSize }) => pixelSize * 2.5}px;
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
    if (type === status && !started) {
      dispatch(setSecondsLeft(sec));
    }
  }

  return (
    <>
      <Container>
        <BurgerButton onClick={toggleMenu} opened={menuOpened} />
      </Container>
      {menuOpened && (
        <SettingsMenuOverlay pixelSize={pixelSize}>
          <Container>
            <SettingsGroup direction="horizontal">
              <ThemeSwitcher />
              <MusicSwitcher />
            </SettingsGroup>

            <SettingsGroup>
              <InputField noPaddingRight>
                <span>FOCUS</span>
                <QuantityInput
                  min={1}
                  max={120}
                  defaultValue={pomodoroTotalSeconds / 60}
                  onChange={(number) =>
                    changeTotalSeconds("pomodoro", number * 60)
                  }
                  noBorder
                />
              </InputField>

              <InputField noPaddingRight>
                <span>BREAK</span>
                <QuantityInput
                  min={1}
                  max={120}
                  defaultValue={breakTotalSeconds / 60}
                  onChange={(number) =>
                    changeTotalSeconds("break", number * 60)
                  }
                  noBorder
                />
              </InputField>

              <InputField noPaddingRight>
                <span>SIZE</span>
                <QuantityInput
                  min={4}
                  max={8}
                  defaultValue={pixelSize}
                  onChange={(num) => dispatch(setPixelSize(num))}
                  noBorder
                />
              </InputField>

              <InputField>
                <span>EFFECTS</span>
                <AudioVolumeSlider />
              </InputField>

              <InputField>
                <span>MUSIC</span>
                <MusicVolumeSlider />
              </InputField>
            </SettingsGroup>
          </Container>
        </SettingsMenuOverlay>
      )}
    </>
  );
}

export default SettingsMenu;
