import { makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AliceCarousel from "react-alice-carousel";
import { CryptoState } from "../CryptoContext";
import { TrendingCoins } from "../config/api";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  carousel: {
    height: "50%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  carouselItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    textTransform: "uppercase",
    textDecoration: "none",
    color: "White",
    marginRight: theme.spacing(2),
  },
}));

export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const Carousal = () => {
  const [trending, setTrending] = useState([]);
  const classes = useStyles();
  const { currency, symbol } = CryptoState();

  const fetchTrendingCoins = async () => {
    try {
      const { data } = await axios.get(TrendingCoins(currency));
      console.log(data);
      setTrending(data);
    } catch (error) {
      console.log(error);
    }
  };

  const items = trending.map((coins) => {
    let profit = coins?.price_change_percentage_24h >= 0;
    return (
      <Link
        key={coins.id}
        className={classes?.carouselItem}
        to={`/coins/${coins.id}`}
      >
        <img
          className={classes.image}
          src={coins?.image}
          alt={coins.name}
          height="80"
          style={{ marginBottom: 10 }}
        />
        <span>
          {coins?.symbol}&nbsp;
          <span
            style={{
              color: profit > 0 ? "rgb(14, 203 ,129)" : "red",
              fontWeight: 500,
            }}
          >
            {profit && "+"}
            {coins?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>

        <span style={{ fontSize: 18, fontWeight: 500 }}>
          {symbol} {numberWithCommas(coins?.current_price.toFixed(2))}
        </span>
      </Link>
    );
  });

  const responsive = {
    0: {
      items: 1,
    },
    512: {
      items: 4,
    },
  };

  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);

  console.log(trending);

  return (
    <div className={classes.carousel}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
        autoPlay
      />
    </div>
  );
};

export default Carousal;
