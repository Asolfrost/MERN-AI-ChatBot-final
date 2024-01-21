import { Box, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import TypingAnim from "../components/typer/TypingAnim";
import Footer from "../components/footer/Footer";
import NavigationLink from "../components/shared/NavigationLink";
import CustomizedInput from "../components/shared/CustomizedInput";
import LoginLink from "../components/shared/LoginLink";
import Login from "./Login";

const Home = () => {
  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box width={"100%"} height={"100%"}>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "100%",
          flexDirection: "column",
          alignItems: "left",
          mx: "auto",
          marginTop: "17.2vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            //border: 1,
            grid: "auto",
            width: "100%",
            flexDirection: "row",
            alignItems: "top",
            mx: "auto",
          }}
        >
            <Box
              sx={{
                display: "flex",
                //border: 1,
                width: "50%",
                mx: "3vw"
              }}
            >
              <TypingAnim />
            </Box>
            
            <Box 
              sx={{
                display: "flex",
                //border: 1,
                borderRadius: "auto",
                marginTop: "auto",
                marginBottom: "auto",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
            <>
              <Login
              />
              </>
          </Box>


        </Box>
      </Box>
      <Footer />
    </Box>
  );
};



export default Home;
