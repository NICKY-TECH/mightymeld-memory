import { useState} from "react";
import { StartScreen, PlayScreen } from "./Screens";
import {ThemeProvider} from 'styled-components'
import {useDarkMode } from './styles/darkMode';
import {GlobalStyles,lightTheme,darkTheme} from "./styles/global"

function App() {
  const [gameState, setGameState] = useState("start");
  const [theme,toggleTheme] = useDarkMode() ;
  const localTheme = localStorage.getItem("theme");
  theme === localTheme ? localTheme :theme;
  let themeMode = theme ==="light"?lightTheme:darkTheme
  switch (gameState) {
    case "start":
      return<ThemeProvider theme ={themeMode}>
        <GlobalStyles/>
         <StartScreen start={() => setGameState("play")} theme={theme} toggleTheme={toggleTheme}/>
</ThemeProvider> ;
    case "play":
      return <ThemeProvider theme={themeMode}>
        <GlobalStyles/>
        <PlayScreen end={() => setGameState("start")} theme={theme} toggleTheme={toggleTheme}/>
</ThemeProvider>;
    default:
      throw new Error("Invalid game state " + gameState);
  }
}

export default App;
