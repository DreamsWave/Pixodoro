import styled, { ThemeProvider } from "styled-components";
import { useAppSelector } from "./hooks";
import SettingsMenu from "./components/SettingsMenu";
import Timer from "./features/timer/Timer";
import Music from "./features/music/Music";
import { selectTheme } from "./features/theme/themeSlice";

const Layout = styled.div`
  font-size: ${({ theme }) => theme.pixelSize * 2}px;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  min-height: 100vh;
`;

function App() {
  const theme = useAppSelector(selectTheme);

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <SettingsMenu />
        <Timer />
        <Music />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
