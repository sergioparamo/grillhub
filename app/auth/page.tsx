"use client";
import { useState } from "react";
import {
  Container,
  Box,
  Tabs,
  Tab,
  Typography,
  Paper,
} from "@mui/material";
import AuthComponent from "../components/AuthComponent"; // Import the AuthComponent
import Header from "../components/Header";

const AuthPage = () => {
  const [value, setValue] = useState(0); // State to manage the selected tab

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    
    <Container maxWidth="sm">
      <Header></Header>
      <Paper elevation={3} style={{ padding: "20px", marginTop: "70px" }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Login" />
          <Tab label="Register" />
        </Tabs>

        <TabPanel value={value} index={0}>
          <AuthComponent isRegistering={false} /> {/* Show Login */}
        </TabPanel>
        <TabPanel value={value} index={1}>
          <AuthComponent isRegistering={true} /> {/* Show Register */}
        </TabPanel>
      </Paper>
    </Container>
  );
};

// TabPanel Component for managing visibility of tab content
function TabPanel(props: { children: React.ReactNode; value: number; index: number }) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={'span'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default AuthPage;