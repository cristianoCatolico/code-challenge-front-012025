import React, { useState, useEffect } from "react";
import { Box, Typography, IconButton, Divider } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import WatchlistItem from "./WatchlistItem";
import "../styles/Dashboard.css";
import {
  ArrowForward,
  MoreHoriz,
  SwapHorizOutlined,
} from "@mui/icons-material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import Spotify from "../../src/images/spotify.png";
import Apple from "../../src/images/apple.svg";
import Adobe from "../../src/images/adobe.svg";
import Lyft from "../../src/images/lyft.svg";
import { ReactComponent as HomeSvg } from "../../src/images/home.svg";
import { ReactComponent as Widget } from "../../src/images/widget.svg";

import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import { useTickers } from "../api";
import { useInView } from "react-intersection-observer";

const Dashboard = () => {
  const [ref, inView] = useInView();
  
  const {
    data, // InfiniteQueryData<Page>
    error, // Error
    fetchNextPage,
    hasNextPage, // boolean
    isError, 
    isFetching, // boolean
    isFetchingNextPage,
  } = useTickers()
  
  const [activeTab, setActiveTab] = useState("Tranding");

  const tabs = ["Tranding", "Top Gainers", "Top Losers"];

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <Box className="dashboard">
      {/* Total Investing */}
      <Box className="header">
        <Box className="header-left">
          <Typography
            style={{
              display: "flex",
              alignItems: "center",
              gap: 3,
              fontSize: 12.5,
              letterSpacing: 1,
            }}
            variant="subtitle2"
            className="header-subtitle"
          >
            TOTAL INVESTING
          </Typography>
          <Typography
            variant="subtitle2"
            style={{
              fontSize: 38,
              letterSpacing: 1,
              display: "flex",
              alignItems: "center",
            }}
            className="total"
          >
            $12,535.00
            <IconButton>
              <VisibilityOffOutlinedIcon
                style={{
                  backgroundColor: "rgba(38, 39, 38, 0.61)",
                  borderRadius: 38,
                  color: "#837d7d",
                  padding: 5,
                }}
              />
            </IconButton>
          </Typography>
          <Box>
            <Typography
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
              variant="subtitle1"
              className="growth"
            >
              <TrendingUpIcon style={{ fontSize: "19" }} /> +$32.5 (0.48%){" "}
              <HelpOutlineOutlinedIcon
                style={{ fontSize: "19" }}
                htmlColor="#837d7d"
              />
            </Typography>
          </Box>
        </Box>
      </Box>

      <Divider />

      {/* Buying Power */}
      <Box className="buying-power">
        <Box>
          <Typography
            style={{
              display: "flex",
              alignItems: "center",
              gap: 3,
              fontSize: 12.5,
              letterSpacing: 1,
            }}
            variant="button"
            className="buying-power-title"
          >
            BUYING POWER{" "}
            <HelpOutlineOutlinedIcon
              htmlColor="#837d7d"
              style={{ fontSize: "18" }}
            />
          </Typography>
          <Typography style={{ fontSize: 22, fontWeight: "400" }}>
            $840.50
          </Typography>
        </Box>
        <Box className="deposit">
          <AddIcon style={{ fontSize: 20, paddingRight: 8 }} />
          <Typography>Deposit</Typography>
        </Box>
      </Box>

      {/* Watchlist */}
      <Box className="watchlist" >
        <Box
          style={{
            backgroundColor: "#1e1e1e",
            paddingTop: "18px",
            paddingBottom: "5px",
            paddingLeft: "16px",
            paddingRight: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="body1"
            style={{
              color: "white",
              fontSize: 20,
              letterSpacing: 1.2,
            }}
          >
            Watchlist
          </Typography>
          <Box style={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="h6"
              style={{ color: "#6a6c6b", marginRight: "8px", fontSize: 15 }}
            >
              All
            </Typography>
            <ArrowForward style={{ color: "#6a6c6b" }} />
          </Box>
        </Box>
        {
        isFetching ? (<div>Loading...</div>)
        : isError
          ? (<div>{error}</div>)
          :
          data.pages.map((page, pageNum) => (
            <React.Fragment key={pageNum}>
            {
            page.data.map((item, index) => (
              <WatchlistItem key={index} item={item} />
            ))
            } 
            </React.Fragment>
          ))
        }
        <div>
        <button
          ref={ref}
          disabled={!hasNextPage || isFetchingNextPage}
          onClick={() => fetchNextPage()}
        >
          {isFetchingNextPage
            ? "Fetching next page"
            : hasNextPage
            ? "Fetch More Data"
            : "No more data"
          }
        </button>
      </div>
      </Box>
 

      {/* TopMovers */}
      <Box className="top-movers" style={{
        paddingTop:20
      }}>
        <Box
          style={{
            paddingLeft: "16px",
            paddingRight: "16px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="body1"
            style={{
              color: "white",
              fontSize: 21,
              letterSpacing: 1.2,
            }}
          >
            Top Movers
          </Typography>
          <Box style={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="h6"
              style={{ color: "#6a6c6b", marginRight: "8px", fontSize: 15 }}
            >
              All
            </Typography>
            <ArrowForward style={{ color: "#6a6c6b" }} />
          </Box>
        </Box>
        <Box
      style={{
        display: "flex",
        justifyContent: "space-around",
        width: "100%",
        alignItems: "center",
        padding: "16px 0",
      }}
    >
      {tabs.map((tab) => (
        <Typography
          key={tab}
          onClick={() => setActiveTab(tab)}
          style={{
            cursor: "pointer",
            padding: "8px 16px",
            borderRadius: "20px",
            backgroundColor: activeTab === tab ? "#1e1e1e" : "transparent",
            color: activeTab === tab ? "#babebd" : "#837d7d",
            fontWeight: activeTab === tab ? "bold" : "normal",
            transition: "all 0.3s ease", 
          }}
        >
          {tab}
        </Typography>
      ))}
    </Box>
      </Box>

      {/* Footer */}
      <Box className="footer">
        <Box className="footer-item">
          <HomeSvg />
          <Typography
            style={{
              fontSize: 12,
              color: "#535457",
            }}
          >
            Home
          </Typography>
        </Box>
        <Box className="footer-item">
          <Widget />
          <Typography
            style={{
              fontSize: 12,
              color: "#535457",
            }}
          >
            Markets
          </Typography>
        </Box>
        <Box className="footer-item">
          <SwapHorizOutlined
            className="meddleBoton"
            style={{
              backgroundColor: "rgba(38, 39, 38, 0.61)",
              borderRadius: "50%",
              color: "#535457",
              padding: 8,
            }}
          />
        </Box>
        <Box className="footer-item">
          <AccountBalanceWalletOutlinedIcon />
          <Typography
            style={{
              fontSize: 12,
              color: "#535457",
            }}
          >
            Portfolio
          </Typography>
        </Box>
        <Box className="footer-item">
          <MoreHoriz />
          <Typography
            style={{
              fontSize: 12,
              color: "#535457",
            }}
          >
            More
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
