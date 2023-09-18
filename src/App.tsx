import styled, { ThemeProvider } from "styled-components";
import { useAppSelector } from "./hooks";
import SettingsMenu from "./components/SettingsMenu";
import Timer from "./features/timer/Timer";
import themes from "./theme";
import Music from "./features/music/Music";
import { selectTheme } from "./features/theme/themeSlice";
import { usePixel } from "./features/pixel/usePixel";

const Layout = styled.div<{ pixelSize: number }>`
  font-size: ${({ pixelSize }) => pixelSize * 2}px;
  background: ${({ theme }) => theme.color?.background};
  color: ${({ theme }) => theme.color?.text};
  min-height: 100vh;
`;

function App() {
  const { pixelSize } = usePixel();
  const { theme } = useAppSelector(selectTheme);

  return (
    <ThemeProvider theme={themes[theme]}>
      <Layout pixelSize={pixelSize}>
        <SettingsMenu />
        <Timer />
        <Music />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
