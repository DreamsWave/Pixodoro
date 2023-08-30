import { useState } from "react";
import "./App.css";
import Button from "./components/Button";

function App() {
  const [pixelSize, setPixelSize] = useState<number>(4);
  return (
    <>
      <Button pixelSize={pixelSize}>My button</Button>
    </>
  );
}

export default App;
