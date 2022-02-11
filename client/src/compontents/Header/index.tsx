import React, { useEffect } from "react";
import {  useLocation, useNavigate } from "react-router-dom";
import { Box, Container, Tab, Tabs } from "@mui/material";

export default function Header() {
  const [value, setValue] = React.useState(0);
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === "/groups") setValue(1);
    if (pathname === "/") setValue(0);
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    if (newValue === 0) navigate("/");
    if (newValue === 1) navigate("/groups");
    setValue(newValue);
  };

  const navigate = useNavigate();
  return (
    <header>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Container maxWidth="lg">
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Users" />
            <Tab label="Groups" />
          </Tabs>
        </Container>
      </Box>
    </header>
  );
}
