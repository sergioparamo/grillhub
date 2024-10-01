"use client";
import {
  Box,
  List,
  ListItemButton, // Cambiado de ListItem a ListItemButton
  ListItemText,
  Button,
  ListItemIcon,
  Tooltip,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";

const Sidebar = ({
  handleLogout,
  setSidebarWidth,
}: {
  email: string;
  handleLogout: () => Promise<void>;
  setSidebarWidth: (width: string) => void;
}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    setSidebarWidth(isOpen ? "4%" : "15%");
  };

  return (
    <>
      <Box
        sx={{
          width: isOpen ? "15%" : "4%",
          bgcolor: "background.paper",
          transition: "width 0.3s ease",
          overflow: "hidden",
          height: "calc(100vh - 64px)",
          position: "fixed",
          top: "90px",
          zIndex: 1000,
        }}
      >
        <Button
          onClick={toggleSidebar}
          sx={{
            position: "absolute",
            right: "-1px",
            top: "50%",
            transform: "translateY(-50%)",
            minWidth: "40px",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            bgcolor: "white",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          {isOpen ? <ArrowBackIosIcon /> : <ArrowForwardIosIcon />}
        </Button>

        {/* Lista del Sidebar */}
        <List>
          {/* Opción de perfil */}
          <ListItemButton onClick={() => router.push("/profile")}>
            <Tooltip
              title="Profile"
              placement="right"
              disableHoverListener={isOpen}
            >
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
            </Tooltip>
            {isOpen && <ListItemText primary="Profile" />}
          </ListItemButton>

          {/* Opción de logout */}
          <ListItemButton onClick={handleLogout}>
            <Tooltip
              title="Logout"
              placement="right"
              disableHoverListener={isOpen}
            >
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
            </Tooltip>
            {isOpen && <ListItemText primary="Logout" />}
          </ListItemButton>
        </List>
      </Box>
    </>
  );
};

export default Sidebar;