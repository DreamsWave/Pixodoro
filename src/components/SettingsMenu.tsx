import styled from "styled-components";
import BurgerButton from "./BurgerButton";
import { useState } from "react";
import Button from "./Button";
import PixelIcon from "./PixelIcon";
import { moonIconPixelPositions, sunIconPixelPositions } from "../constants";
import PixelSize from "../features/pixelSize/PixelSize";
import { useAppSelector } from "../hooks";
import { selectPixelSize } from "../features/pixelSize/pixelSizeSlice";

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
  pomodoroTotalSeconds?: number;
  breakTotalSeconds?: number;
  changeTotalSeconds: (type: "pomodoro" | "break", seconds: number) => void;
};
function SettingsMenu({
  pomodoroTotalSeconds = 1 * 60,
  breakTotalSeconds = 0.5 * 60,
  changeTotalSeconds,
}: SettingsMenuProps) {
  const [menuOpened, setMenuOpened] = useState(false);
  const pixelSize = useAppSelector(selectPixelSize);

  function toggleMenu() {
    setMenuOpened(!menuOpened);
  }

  return (
    <SettingsMenuBase>
      <BurgerButton onClick={toggleMenu} opened={menuOpened} />
      {menuOpened && (
        <SettingsMenuOverlay>
          <div style={{ display: "flex", gap: pixelSize }}>
            <Button>
              <PixelIcon
                pixelPositions={sunIconPixelPositions}
                color="lightyellow"
              />
            </Button>
            <Button>
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
          <PixelSize />
        </SettingsMenuOverlay>
      )}
    </SettingsMenuBase>
  );
}

export default SettingsMenu;
