import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useStyles } from "./Header.styles";

export const Header = () => {
  const styles = useStyles();
  const navigate = useNavigate();
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography className={styles.title} variant="h6" onClick={() => navigate("/")}>Обучающая система</Typography>
        <Box className={styles.grow}></Box>
        <Box className={styles.headerButtonSection}>
          <IconButton edge="end" onClick={() => navigate("/user-account")}><AccountCircle /></IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};