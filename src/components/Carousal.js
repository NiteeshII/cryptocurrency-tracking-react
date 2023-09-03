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
    flexDirection: "row",
    alignItems: "center",
    cursor: "pointer",
    textTransform: "uppercase",
    color: "white",
    marginRight: theme.spacing(2),
  },
}));

const Carousal = () => {
  const [trending, setTrending] = useState([]);
  const classes = useStyles();
  const { currency } = CryptoState();

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
    return (
      <Link className={classes?.carouselItem} to={`/coins/${coins.id}`}>
        <img
          className={classes.image}
          src={coins?.image}
          alt={coins?.name}
          height="80"
          style={{ marginBottom: 10 }}
        />
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
        responsive={responsive}
        autoPlay
        items={items}
      />
    </div>
  );
};

export default Carousal;
