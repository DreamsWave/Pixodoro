import styled from "styled-components";
import BurgerButton from "./BurgerButton";
import { useState } from "react";
import ThemeSwitcher from "../features/theme/ThemeSwitcher";
import AudioVolume from "../features/audio/AudioVolume";
import InputField from "./InputField";
import Container from "./Container";
import SettingsGroup from "./SettingsGroup";
import MusicSwitcher from "../features/music/MusicSwitcher";
import PixelSize from "../features/pixel/PixelSize";
import MusicVolume from "../features/music/MusicVolume";
import TimerInput from "../features/timer/TimerInput";
import { usePixel } from "../features/pixel/usePixel";

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
  const { pixelSize } = usePixel();

  function toggleMenu() {
    setMenuOpened(!menuOpened);
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
                <TimerInput type="pomodoro" />
              </InputField>

              <InputField noPaddingRight>
                <span>BREAK</span>
                <TimerInput type="break" />
              </InputField>

              <InputField noPaddingRight>
                <span>SIZE</span>
                <PixelSize />
              </InputField>

              <InputField>
                <span>EFFECTS</span>
                <AudioVolume />
              </InputField>

              <InputField>
                <span>MUSIC</span>
                <MusicVolume />
              </InputField>
            </SettingsGroup>
          </Container>
        </SettingsMenuOverlay>
      )}
    </>
  );
}

export default SettingsMenu;
