import React from "react";
import {
  AppBar,
  Container,
  MenuItem,
  Select,
  Toolbar,
  Typography,
  makeStyles,
  ThemeProvider,
  createTheme,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../CryptoContext";

const theme = createTheme({
  palette: {
    primary: {
      main: "#008000",
    },
    type: "dark",
  },
});

const useStyles = makeStyles(() => ({
  title: {
    flex: 1,
    color: "gold",
    fontWeight: "bold",
    cursor: "pointer",
    fontFamily: "Montserrat",
  },
}));

export default function Header() {
  const classes = useStyles();
  const navigate = useNavigate();

  const { currency, setCurrency } = CryptoState();
  return (
    <ThemeProvider theme={theme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Typography onClick={() => navigate("/")} className={classes.title}>
              Crypto Hunter
            </Typography>
            <Select
              style={{
                height: 50,
                width: 100,
                marginRight: 15,
              }}
              className={classes.Select}
              variant="outlined"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"INR"}>INR</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}
