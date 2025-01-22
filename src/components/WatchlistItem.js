import React from "react";
import { Box, Typography } from "@mui/material";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { TrendingDown } from "@mui/icons-material";
import Adobe from "../../src/images/adobe.svg";

const WatchlistItem = ({ item }) => {
  const { symbol, name, price, change, percent, icon } = item;
  const isPositive = change > 0;

  return (
    <Box className="watchlist-item" style={{
      backgroundColor: "#1e1e1e",
      display: "flex",
      alignItems: "center",
          }}>            
            <Box
        style={{
          display: "flex",
        }}
      >
        <img src={icon} alt="Icon" 
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%", // Para que sea redondeado
            paddingRight:10
          }}
          onError={ev=>{
            ev.target.src=Adobe
            ev.onerror= null
          }}
        />
        <Box className="left">
        <Typography style={{
          fontWeight:"500"
        }} variant="body1">{symbol}</Typography>
        <Typography color="#6a6c6b" variant="body2">{name}</Typography>
      </Box>
      </Box>
      
      <Box className="right">
        <Typography style={{ textAlign:"right"}}
        variant="body1">{`$${price.toFixed(2)}`}</Typography>
        <Typography
          variant="body2"
          className={isPositive ? "positive" : "negative"}
        >
          {isPositive ? <TrendingUpIcon fontSize="8"/>: <TrendingDown fontSize="8"/>}{`${isPositive ? "+" : ""}${change.toFixed(2)} (${percent.toFixed(
            2
          )}%)`}
        </Typography>
      </Box>
    </Box>
  );
};

export default WatchlistItem;
