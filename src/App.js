import "./App.css";
import * as React from "react";
import HeaderBar from "./Components/HeaderBar";
import DrawerMenu from "./Components/DrawerMenu";
import Home from "./Components/Home";
import About from "./Components/About";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
const darkTheme = createTheme({
  palette: {
    mode: "light",
  },
});
function App() {
  
  const [page, setPage] = React.useState("Home");
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  return (
    
    <ThemeProvider theme={darkTheme}>
      {/* <CssBaseline /> */}
      <HeaderBar setDrawerOpen={setDrawerOpen} />
      <div>
        <DrawerMenu drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
        {page === "Home" ? <Home /> : <About />}
      </div>
    </ThemeProvider>
  );
}

export default App;
