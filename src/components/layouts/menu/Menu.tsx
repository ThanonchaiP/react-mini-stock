import { styled, useTheme } from "@mui/material/styles";
import * as React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LayersIcon from "@mui/icons-material/Layers";
import BarChartIcon from "@mui/icons-material/BarChart";
import PersonIcon from "@mui/icons-material/Person";
import { NavLink } from "react-router-dom";
import { Stack } from "@mui/material";

const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

type MenuProp = {
  open: boolean;
  onDrawerClose: () => void;
};

export default function Menu({ open, onDrawerClose }: MenuProp) {
  const theme = useTheme();

  const handleDrawerClose = () => {
    onDrawerClose();
  };

  const MyNavLink = React.forwardRef<any, any>((props, ref) => (
    <NavLink
      ref={ref}
      to={props.to}
      className={({ isActive }) => `${props.className} ${isActive ? props.activeClassName : ""}`}
    >
      {props.children}
    </NavLink>
  ));

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <h3 style={{ margin: 0 }}>By HomeCookV2</h3>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </Stack>
      </DrawerHeader>
      <Divider />
      <List>
        {/* Stock */}
        <ListItem button component={MyNavLink} to="/stock" exact activeClassName="Mui-selected">
          <ListItemIcon>
            <LayersIcon />
          </ListItemIcon>
          <ListItemText primary="Stock" />
        </ListItem>

        {/* Report */}
        <ListItem button to="/report" component={MyNavLink} activeClassName="Mui-selected" exact>
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary="Report" />
        </ListItem>

        {/*About us */}
        <ListItem button to="/aboutus" component={MyNavLink} activeClassName="Mui-selected" exact>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="AboutUs" />
        </ListItem>
      </List>
    </Drawer>
  );
}
