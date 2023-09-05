import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactHtmlParser from "react-html-parser";
import { useParams } from "react-router-dom";
import { SingleCoin } from "../config/api";
import { CryptoState } from "../CryptoContext";
import { LinearProgress, Typography, makeStyles } from "@material-ui/core";
import CoinInfo from "./../components/CoinInfo";
import { numberWithCommas } from "../components/Carousal";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  sidebar: {
    width: "30%",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 25,
    borderRight: "2px solid gray",
  },

  heading: {
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "Montesarrat",
  },
  description: {
    width: "100%",
    fontFamily: "Montserrat",
    padding: 25,
    paddingBottom: 15,
    paddingTop: 0,
    textAlign: "justify",
  },
}));

export default function Coinpage() {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const classes = useStyles();
  console.log(useParams());

  const { currency, symbol } = CryptoState();

  const fetchApi = async (id) => {
    try {
      const { data } = await axios.get(SingleCoin(id));
      setCoin(data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(
    coin?.market_data.current_price[currency.toLowerCase()],
    currency.toLowerCase()
  );

  useEffect(() => {
    fetchApi(id);
  }, []);

  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography variant="h3" className={classes.heading}>
          {coin?.name}
        </Typography>
        <Typography variant="subtitle" className={classes.description}>
          {ReactHtmlParser(coin?.description.en)}
        </Typography>
        <div className={classes.marketData}>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Rank :{" "}
            </Typography>
            &nbsp;&nbsp;
            <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
              {coin?.market_cap_rank}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Current Price :{" "}
            </Typography>
            &nbsp;&nbsp;
            <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
              {symbol}
              {""}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Market Cap :{" "}
            </Typography>
            &nbsp;&nbsp;
            <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
              {symbol}
              {""}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
            </Typography>
          </span>
        </div>
      </div>

      <CoinInfo coin={coin} />
    </div>
  );
}
