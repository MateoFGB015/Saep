//este es el menu y header en un solo codigo

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { useAuthActions } from "../../api/useAuthActions";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  CssBaseline,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  People as PeopleIcon,
  CalendarToday as CalendarIcon,
  Assignment as AssignmentIcon,
  Logout as LogoutIcon,
  Notifications as NotificationsIcon,
  AccountCircle as AccountCircleIcon,
} from "@mui/icons-material";

const drawerWidth = 250;

const Navbar = ({ children }) => {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const { logout } = useAuthActions();
  const theme = useTheme();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <CssBaseline />

      {/* 🔹 Barra Superior */}
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#71277a",
          zIndex: open ? theme.zIndex.drawer - 1 : theme.zIndex.drawer + 1, // 🔹 Debajo del Drawer cuando está abierto
          width: "100%",
          boxShadow: "none",
        }}
      >
        <Toolbar>
          {/* 🔹 Icono del Menú (Siempre visible y por encima de todo) */}
          <IconButton
            edge="start"
            color="inherit"
            onClick={toggleDrawer}
            sx={{
              position: "relative",
              zIndex: theme.zIndex.drawer + 2, // 🔹 Siempre visible
            }}
          >
            <MenuIcon />
          </IconButton>

          {/* 🔹 Título */}
          <Typography variant="h6" sx={{ flexGrow: 1, fontSize: "1rem", ml: 1 }}>
            SISTEMA SAEP
          </Typography>

          {/* 🔹 Nombre del usuario */}
          <Typography
            variant="body2"
            sx={{
              fontSize: "0.90rem",
              mr: 1,
              textAlign: "end",
              display: { xs: "none", sm: "block" },
            }}
          >
            {user?.nombre || "Nombre de usuario"}
          </Typography>

          <IconButton color="inherit">
            <AccountCircleIcon />
          </IconButton>
          <IconButton color="inherit">
            <NotificationsIcon />
          </IconButton>
          <IconButton color="inherit" onClick={logout}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* 🔹 Sidebar (Drawer) */}
      <Drawer
        variant="temporary"
        open={open}
        onClose={toggleDrawer}
        sx={{
          zIndex: theme.zIndex.drawer + 1, // 🔹 Más alto que la AppBar
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            backgroundColor: "#71277a",
            overflowX: "hidden",
            position: "fixed",
          },
        }}
      >
        <Box sx={{ width: drawerWidth, height: "100%", color: "white" }}>
          {/* 🔹 Botón de Cerrar Menú (Usando el mismo botón de menú) */}
          <Box
          sx={{
            ml:2,
            width:"85%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "8px 1px",
            borderBottom: "2px solid white",
          }}
        >
            {/* 🔹 Icono del Menú */}
            <IconButton onClick={toggleDrawer} sx={{ color: "white" }}>
              <MenuIcon />
            </IconButton>

            {/* 🔹 Rol del Usuario */}
            <Typography
              variant="subtitle1"
              sx={{
                color: "white",
                fontWeight: "bold",
                textAlign: "center",
                mr:5,
                flexGrow: 1,
              }}
            >
              {user?.rol || "Rol"}
            </Typography>
          </Box>

          {/* 🔹 Menú de opciones */}
          <List>
            {[
              { text: "Inicio", icon: <HomeIcon />, route: "/inicio" },
              { text: "Usuarios", icon: <PeopleIcon />, route: "/usuarios" },
              { text: "Fichas", icon: <AssignmentIcon />, route: "/fichas" },
              { text: "Agendamientos", icon: <CalendarIcon />, route: "/agendamientos" },
              { text: "Seguimiento y control", icon: <AssignmentIcon />, route: "/seguimiento" },
            ].map(({ text, icon, route }) => (
              <ListItemButton key={text} component={Link} to={route}>
                <ListItemIcon sx={{ color: "white", minWidth: "40px" }}>{icon}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* 🔹 Contenido Principal */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pl:"5%",
          pr: "5%",
          mt: 13,
          width: "100%",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Navbar;
