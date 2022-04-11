import * as React from "react";
import { createTheme, styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/layouts/header/Header";
import Menu from "./components/layouts/menu/Menu";
import LoginPage from "./components/pages/login/LoginPage";
import RegisterPage from "./components/pages/register/RegisterPage";
import StockPage from "./components/pages/stock/StockPage";
import StockCreate from "./components/pages/stock/create/StockCreate";
import StockEdit from "./components/pages/stock/edit/StockEdit";
import ReportPage from "./components/pages/report/ReportPage";
import AboutUs from "./components/pages/about-us/AboutUs";
import { RootReducers } from "./reducers";
import * as loginAction from "./actions/login.action";
import PublicRoutes from "./router/public.routes";
import ProtectedRoutes from "./router/protected.routes";

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
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(true);
  const loginReducer = useSelector((state: RootReducers) => state.loginReducer);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    dispatch(loginAction.restoreLogin());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        {loginReducer.result && (
          <>
            <Header open={open} onDrawerOpen={handleDrawerOpen} />
            <Menu open={open} onDrawerClose={handleDrawerClose} />
          </>
        )}
        <Main open={open}>
          <DrawerHeader />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<PublicRoutes />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="*" element={<PageNotFound />} />
            </Route>

            {/* Protected Routes */}
            <Route path="/" element={<ProtectedRoutes />}>
              <Route path="/stock" element={<StockPage />} />
              <Route path="/stock/create" element={<StockCreate />} />
              <Route path="/stock/edit/:id" element={<StockEdit />} />
              <Route path="/report" element={<ReportPage />} />
              <Route path="/aboutus" element={<AboutUs />} />
            </Route>
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
