import { useAppSelector } from "./hooks";
import SettingsMenu from "./components/SettingsMenu";
import { selectPixelSize } from "./features/pixelSize/pixelSizeSlice";
import Timer from "./features/timer/Timer";

function App() {
  const pixelSize = useAppSelector(selectPixelSize);

  return (
    <div style={{ fontSize: `${pixelSize * 2}px` }}>
      <SettingsMenu />
      <Timer />
    </div>
  );
}

export default App;
