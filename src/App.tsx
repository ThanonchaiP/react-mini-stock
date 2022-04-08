import * as React from "react";
import { createTheme, styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "./components/layouts/header/Header";
import Menu from "./components/layouts/menu/Menu";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./components/pages/login/LoginPage";
import RegisterPage from "./components/pages/register/RegisterPage";
import StockPage from "./components/pages/stock/StockPage";
import StockCreate from "./components/pages/stock/create/StockCreate";
import StockEdit from "./components/pages/stock/edit/StockEdit";
import ReportPage from "./components/pages/report/ReportPage";
import AboutUs from "./components/pages/about-us/AboutUs";
import { ThemeProvider } from "@mui/system";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const theme = createTheme({
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          // backgroundImage: "url(/assets/images/bg-01.jpg)",
          // backgroundImage: "url(" + `${process.env.PUBLIC_URL}/images/background_menu.jpg` + ")",
          width: drawerWidth,
        },
      },
    },
  },
  typography: {
    fontFamily: "Roboto",
    // fontWeightLight: 300,
    // fontWeightRegular: 400,
    // fontWeightMedium: 500,
    // fontWeightBold: 600,
  },
  spacing: 8,
  palette: {
    // primary: process.env.REACT_APP_IS_PRODUCTION == "0" ? blue : blueGrey,
    background: {
      default: "#CFD2D6",
    },
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function App() {
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Header open={open} onDrawerOpen={handleDrawerOpen} />
        <Menu open={open} onDrawerClose={handleDrawerClose} />
        <Main open={open}>
          <DrawerHeader />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/stock" element={<StockPage />} />
            <Route path="/stock/create" element={<StockCreate />} />
            <Route path="/stock/:id/edit" element={<StockEdit />} />
            <Route path="/report" element={<ReportPage />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Main>
      </Box>
    </ThemeProvider>
  );
}

const PageNotFound = () => {
  return (
    <>
      <h1>404 - Not Found!</h1>
    </>
  );
};
