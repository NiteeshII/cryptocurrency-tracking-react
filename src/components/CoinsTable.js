import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  LinearProgress,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
  makeStyles,
} from "@material-ui/core";
import { Table } from "@material-ui/core";
import { numberWithCommas } from "./Carousal";
import { CoinList } from "./../config/api";
import { CryptoState } from "../CryptoContext";
import { useNavigate } from "react-router-dom";
import { Pagination } from "@material-ui/lab";

const useStyles = makeStyles(() => ({
  row: {
    backgroundColor: "#16171a",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#131111",
    },
    fontFamily: "Montserrat",
  },
  pagination: {
    "& .MuiPaginationItem-root": {
      color: "gold",
    },
  },
}));

const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [pages, setPages] = useState(1);

  const navigate = useNavigate();
  const classes = useStyles();
  const { currency, symbol } = CryptoState();

  const fetchCoins = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(CoinList(currency));
      setCoins(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(coins);

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const darktheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.name.toLowerCase().includes(search)
    );
  };

  return (
    <ThemeProvider theme={darktheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          style={{ margin: 18, fontFamily: "Montserrat" }}
        >
          Cryptocurrency Prices by Market Cap.
        </Typography>
        <TextField
          label="Search For a Crypto Currency.."
          variant="outlined"
          style={{ marginBottom: 20, width: "100%" }}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Container>
      <TableContainer>
        {loading ? (
          <LinearProgress style={{ backgroundColor: "gold" }} />
        ) : (
          <Table>
            <TableHead style={{ backgroundColor: "#EEBC1D" }}>
              <TableRow style={{ backgroundColor: "#EEBC1D" }}>
                {["coins", "price", "24h Change", "market Cap"].map((head) => (
                  <TableCell
                    style={{
                      color: "black",
                      fontWeight: "700",
                      fontFamily: "Montserrat",
                    }}
                    key={head}
                    align={head === "coins" ? " " : "right"}
                  >
                    {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {handleSearch()
                .slice((pages - 1) * 10, (pages - 1) * 10 + 10)
                .map((row) => {
                  const profit = row?.price_change_percentage_24h > 0;

                  return (
                    <TableRow
                      onClick={() => navigate(`/coins/${row.id}`)}
                      className={classes.row}
                      key={row.name}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        style={{
                          display: "flex",
                          gap: 15,
                        }}
                      >
                        <img
                          src={row?.image}
                          alt={row.name}
                          height="50"
                          style={{ marginBottom: 10 }}
                        />
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <span
                            style={{ textTransform: "uppercase", fontSize: 22 }}
                          >
                            {row.symbol}
                          </span>
                          <span style={{ color: "darkgray" }}>{row.name}</span>
                        </div>
                      </TableCell>
                      <TableCell align="right">
                        {symbol}
                        {numberWithCommas(row.current_price.toFixed(2))}
                      </TableCell>
                      <TableCell
                        align="right"
                        style={{
                          color: profit > 0 ? "rgba(14, 203 , 129)" : "red",
                          fontWeight: 500,
                        }}
                      >
                        {profit && "+"}
                        {row?.price_change_percentage_24h.toFixed(2)}%
                      </TableCell>
                      <TableCell align="right">
                        {symbol}{" "}
                        {numberWithCommas(
                          row?.market_cap.toString().slice(0, -6)
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        )}
      </TableContainer>
      <Pagination
        style={{
          padding: 20,
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
        classes={{ ul: classes.pagination }}
        count={(handleSearch()?.length / 10).toFixed(0)}
        variant="outlined"
        onChange={(_, value) => {
          setPages(value);
          window.scroll(0, 450);
        }}
      />
    </ThemeProvider>
  );
};

export default CoinsTable;
