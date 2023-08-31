import { useState } from "react";
import "./App.css";
import Button from "./components/Button";
import PixelCircle from "./components/PixelCircle";

function App() {
  const [pixelSize, setPixelSize] = useState<number>(8);
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Button pixelSize={pixelSize}>My button</Button>
        <PixelCircle pixelSize={pixelSize} />
      </div>
    </>
  );
}

export default App;
