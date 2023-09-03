import { useState } from "react";
import "./App.css";
import Button from "./components/Button";
import PixelCircle from "./components/PixelCircle";
import { useTimer } from "./hooks/useTimer";

function App() {
  const [pixelSize, setPixelSize] = useState<number>(8);
  const { seconds, start, pause, reset, running, stop } = useTimer();
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <PixelCircle pixelSize={pixelSize} progress={(seconds / 60) * 100} />
        <Button
          pixelSize={pixelSize}
          handleClick={() => (running ? pause() : start())}
        >
          {running ? "pause" : "start"}
        </Button>
        <Button pixelSize={pixelSize} handleClick={() => reset()}>
          reset
        </Button>
      </div>
    </>
  );
}

export default App;
