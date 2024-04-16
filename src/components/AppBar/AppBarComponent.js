import { useState, useContext } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Avatar,
  Typography,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import WorkIcon from "@mui/icons-material/Work";
import ContactsIcon from "@mui/icons-material/Contacts";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ArticleIcon from "@mui/icons-material/Article";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import GroupIcon from "@mui/icons-material/Group";
import VerifiedIcon from "@mui/icons-material/Verified";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { AuthContext } from "../AuthProvider";
import { Link, useNavigate, NavLink } from "react-router-dom";
import {
  deleteTokenCookie,
  setAdminStateCookie,
  setLoginStateCookie,
} from "../cookieUtils";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AppBarComponent() {
  const {
    loggedin,
    amAdmin,
    setAmAdmin,
    setLoggedin,
    setUsername,
    setProjectsContext,
    setUsersContext,
    setStaffsContext,
    setAdminsContext,
    setTokenContext,
    setProfile,
  } = useContext(AuthContext);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navigate = useNavigate();

  // Function to handle toggle of drawer
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  // Function to handle login button click
  const handleLoginClick = () => {
    navigate("/login");
  };

  // Function to handle logout button click
  const handleLogout = async () => {
    setLoginStateCookie(false);
    setAdminStateCookie(false);
    await setLoggedin(false);
    await setUsername(false);
    await setProfile(null);
    await setAmAdmin(false);
    await setTokenContext("");
    await setProjectsContext([]);
    await setUsersContext([]);
    await setStaffsContext([]);
    await setAdminsContext([]);
    deleteTokenCookie();

    toast.success("Logged Out Successfully!", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
      onClose: () => {
        navigate("/login");
      },
    });
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{ background: "#202731", height: "3.7rem" }}
      >
        <Toolbar>
          {/* Hamburger icon on the left */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          {/* Title in the center */}
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              textAlign: "center",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            Ewabey Controls
          </Typography>

          {/* Login button with circular profile icon on the right */}
          {loggedin ? (
            <Button color="inherit" onClick={handleLogout}>
              <Avatar sx={{ width: 24, height: 24, marginRight: 1 }}>
                <AccountCircleIcon />
              </Avatar>
              Logout
            </Button>
          ) : (
            <Button color="inherit" onClick={handleLoginClick}>
              <Avatar sx={{ width: 24, height: 24, marginRight: 1 }}>
                <AccountCircleIcon />
              </Avatar>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer component */}
      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
        <List>
          <ListItemButton
            key="home"
            component={NavLink}
            to="/"
            style={({ isActive }) => {
              return {
                backgroundColor: isActive ? "#1976d2" : "inherit",
                color: isActive ? "white" : "inherit",
              };
            }}
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
          {loggedin &&(
            <>
          <Divider />
          <ListItemButton
            key="projects"
            component={NavLink}
            to="/projects"
            style={({ isActive }) => {
              return {
                backgroundColor: isActive ? "#1976d2" : "inherit",
                color: isActive ? "white" : "inherit",
              };
            }}
          >
            <ListItemIcon>
              <WorkIcon />
            </ListItemIcon>
            <ListItemText primary="Projects" />
          </ListItemButton>
          </>
          )}
          {loggedin &&(
            <>
          <Divider />
          <ListItemButton
            key="users"
            component={NavLink}
            to="/users"
            style={({ isActive }) => {
              return {
                backgroundColor: isActive ? "#1976d2" : "inherit",
                color: isActive ? "white" : "inherit",
              };
            }}
          >
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary="users" />
          </ListItemButton>
          </>
          )}
          {loggedin && amAdmin && (
            <ListItemButton
              key="staffs"
              component={NavLink}
              to="/staffs"
              style={({ isActive }) => {
                return {
                  backgroundColor: isActive ? "#1976d2" : "inherit",
                  color: isActive ? "white" : "inherit",
                };
              }}
            >
              <ListItemIcon>
                <VerifiedIcon />
              </ListItemIcon>
              <ListItemText primary="staffs" />
            </ListItemButton>
          )}
          {loggedin && amAdmin && (
            <ListItemButton
              key="admins"
              component={NavLink}
              to="/admins"
              style={({ isActive }) => {
                return {
                  backgroundColor: isActive ? "#1976d2" : "inherit",
                  color: isActive ? "white" : "inherit",
                };
              }}
            >
              <ListItemIcon>
                <AdminPanelSettingsIcon />
              </ListItemIcon>
              <ListItemText primary="admins" />
            </ListItemButton>
          )}
          {loggedin &&(
            <>
          <Divider />
          <ListItemButton
            key="contacts"
            component={NavLink}
            to="/contacts"
            style={({ isActive }) => {
              return {
                backgroundColor: isActive ? "#1976d2" : "inherit",
                color: isActive ? "white" : "inherit",
              };
            }}
          >
            <ListItemIcon>
              <ContactsIcon />
            </ListItemIcon>
            <ListItemText primary="Contacts" />
          </ListItemButton>
          </>
          )}
          {loggedin && amAdmin && (
            <>
              <Divider />
              <ListItemButton
                key="upload-files"
                component={NavLink}
                to="/upload-files"
                style={({ isActive }) => {
                  return {
                    backgroundColor: isActive ? "#1976d2" : "inherit",
                    color: isActive ? "white" : "inherit",
                  };
                }}
              >
                <ListItemIcon>
                  <CloudUploadIcon />
                </ListItemIcon>
                <ListItemText primary="Upload Files" />
              </ListItemButton>
            </>
          )}
          {loggedin &&(
            <>
          <Divider />
          <ListItemButton
            key="docs"
            component={NavLink}
            to="/docs"
            style={({ isActive }) => {
              return {
                backgroundColor: isActive ? "#1976d2" : "inherit",
                color: isActive ? "white" : "inherit",
              };
            }}
          >
            <ListItemIcon>
              <ArticleIcon />
            </ListItemIcon>
            <ListItemText primary="Docs" />
          </ListItemButton>
          </>
          )}
          {loggedin && amAdmin && (
            <>
              <Divider />
              <ListItemButton
                key="create-staff"
                component={NavLink}
                to="/create-staff"
                style={({ isActive }) => {
                  return {
                    backgroundColor: isActive ? "#1976d2" : "inherit",
                    color: isActive ? "white" : "inherit",
                  };
                }}
              >
                <ListItemIcon>
                  <AddCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Create a new staff" />
              </ListItemButton>
              <ListItemButton
                key="create-admin"
                component={NavLink}
                to="/create-admin"
                style={({ isActive }) => {
                  return {
                    backgroundColor: isActive ? "#1976d2" : "inherit",
                    color: isActive ? "white" : "inherit",
                  };
                }}
              >
                <ListItemIcon>
                  <HealthAndSafetyIcon />
                </ListItemIcon>
                <ListItemText primary="Create a new admin" />
              </ListItemButton>
            </>
          )}
          {loggedin &&(
            <>
          <Divider />
          <ListItemButton
            key="settings"
            component={NavLink}
            to="/settings"
            style={({ isActive }) => {
              return {
                backgroundColor: isActive ? "#1976d2" : "inherit",
                color: isActive ? "white" : "inherit",
              };
            }}
          >
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
          </>
          )}
          <Divider />
          {loggedin ? (
            <ListItemButton key="logout" onClick={handleLogout}>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          ) : (
            <ListItemButton
              key="login"
              component={NavLink}
              to="/login"
              style={({ isActive }) => {
                return {
                  backgroundColor: isActive ? "#1976d2" : "inherit",
                  color: isActive ? "white" : "inherit",
                };
              }}
            >
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Login" />
            </ListItemButton>
          )}
        </List>
      </Drawer>
      <ToastContainer />
    </>
  );
}
