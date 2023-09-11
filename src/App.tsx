import { usePixelSize } from "./hooks";
import SettingsMenu from "./components/SettingsMenu";
import Timer from "./features/timer/Timer";

function App() {
  const { pixelSize } = usePixelSize();

  return (
    <div style={{ fontSize: `${pixelSize * 2}px` }}>
      <SettingsMenu />
      <Timer />
    </div>
  );
}

export default App;
