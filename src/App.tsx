import styled, { ThemeProvider } from "styled-components";
import { useAppSelector, usePixelSize } from "./hooks";
import SettingsMenu from "./components/SettingsMenu";
import Timer from "./features/timer/Timer";
import themes from "./theme";
import { selectAppSettings } from "./features/appSettings/appSettingsSlice";

const Layout = styled.div<{ pixelSize: number }>`
  font-size: ${({ pixelSize }) => pixelSize * 2}px;
  background: ${({ theme }) => theme.color?.background};
  color: ${({ theme }) => theme.color?.text};
  min-height: 100vh;
`;

function App() {
  const { pixelSize } = usePixelSize();
  const { theme } = useAppSelector(selectAppSettings);

  return (
    <ThemeProvider theme={themes[theme]}>
      <Layout pixelSize={pixelSize}>
        <SettingsMenu />
        <Timer />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
