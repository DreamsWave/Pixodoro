import { ThemeProvider } from "styled-components";
import { useAppSelector, usePixelSize } from "./hooks";
import SettingsMenu from "./components/SettingsMenu";
import Timer from "./features/timer/Timer";
import themes from "./theme";
import { selectAppSettings } from "./features/appSettings/appSettingsSlice";

function App() {
  const { pixelSize } = usePixelSize();
  const { theme } = useAppSelector(selectAppSettings);

  return (
    <ThemeProvider theme={themes[theme]}>
      <div style={{ fontSize: `${pixelSize * 2}px` }}>
        <SettingsMenu />
        <Timer />
      </div>
    </ThemeProvider>
  );
}

export default App;
