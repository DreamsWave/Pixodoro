import styled from "styled-components";
import BurgerButton from "./BurgerButton";
import { useState } from "react";
import ThemeSwitcher from "../features/theme/ThemeSwitcher";
import AudioVolume from "../features/audio/AudioVolume";
import InputField from "./InputField";
import Container from "./Container";
import SettingsGroup from "./SettingsGroup";
import MusicSwitcher from "../features/music/MusicSwitcher";
import PixelSize from "../features/theme/PixelSize";
import MusicVolume from "../features/music/MusicVolume";
import TimerInput from "../features/timer/TimerInput";
import AutoModeSwitcher from "../features/timer/AutoModeSwitcher";
import NotificationSwitcher from "../features/notification/NotificationSwitcher";

const SettingsMenuOverlay = styled.div`
  background: ${({ theme }) => theme.colors.background};
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  z-index: 10;
  font-size: ${({ theme: { pixelSize } }) => pixelSize * 2.5}px;
`;

type SettingsMenuProps = {};
function SettingsMenu({}: SettingsMenuProps) {
  const [menuOpened, setMenuOpened] = useState(false);

  function toggleMenu() {
    setMenuOpened(!menuOpened);
  }

  return (
    <>
      <Container>
        <BurgerButton onClick={toggleMenu} opened={menuOpened} />
      </Container>
      {menuOpened && (
        <SettingsMenuOverlay>
          <Container>
            <SettingsGroup direction="horizontal">
              <ThemeSwitcher />
              <MusicSwitcher />
              <AutoModeSwitcher />
              <NotificationSwitcher />
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
