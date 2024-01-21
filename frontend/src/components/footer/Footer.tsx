import { useMediaQuery,useTheme } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <footer>
      <div
        style={{
          display: "flex",
          width: "100%",
          minHeight: "10vh",
          maxHeight: "30vh",
          marginTop: "25vh",
        }}
      >
        <div
          style={{
            width: "100%",
            minHeight: "10vh",
            padding: "auto",
            maxHeight: "30vh",
          }}
        >
          <p style={{ fontSize: "20px", textAlign: "center"}}>
            Built by
            <span>
              <Link
                style={{ color: "white" }}
                className="nav-link"
                to={"https://github.com/omercanozturk1628/ENS491_LLM_Group_162"}
              >
              Group 162
              </Link>
            </span>
            <img
                src="SU_logo.png"
                alt="SU"
                style={{
                  width: "4vw",
                  borderRadius: "auto",
                  marginBottom: "auto",
                  marginRight: "auto",
                }}
              />
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
