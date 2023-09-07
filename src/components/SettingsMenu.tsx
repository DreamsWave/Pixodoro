import styled from "styled-components";
import BurgerButton from "./BurgerButton";
import { useState } from "react";
import Button from "./Button";
import PixelIcon from "./PixelIcon";
import { moonIconPixelPositions, sunIconPixelPositions } from "../constants";

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

type SettingsMenuProps = {
  pixelSize: number;
  pomodoroTotalSeconds?: number;
  breakTotalSeconds?: number;
  changeTotalSeconds: (type: "pomodoro" | "break", seconds: number) => void;
};
function SettingsMenu({
  pixelSize = 8,
  pomodoroTotalSeconds = 1 * 60,
  breakTotalSeconds = 0.5 * 60,
  changeTotalSeconds,
}: SettingsMenuProps) {
  const [menuOpened, setMenuOpened] = useState(false);

  function toggleMenu() {
    setMenuOpened(!menuOpened);
  }

  return (
    <SettingsMenuBase>
      <BurgerButton
        pixelSize={pixelSize}
        onClick={toggleMenu}
        opened={menuOpened}
      />
      {menuOpened && (
        <SettingsMenuOverlay>
          <div style={{ display: "flex", gap: pixelSize }}>
            <Button pixelSize={pixelSize}>
              <PixelIcon
                pixelPositions={sunIconPixelPositions}
                color="lightyellow"
              />
            </Button>
            <Button pixelSize={pixelSize}>
              <PixelIcon
                pixelPositions={moonIconPixelPositions}
                color="lightblue"
              />
            </Button>
          </div>
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
        </SettingsMenuOverlay>
      )}
    </SettingsMenuBase>
  );
}

export default SettingsMenu;
