import React from "react";
import { Typography } from '@material-ui/core'
import CopyrightIcon from '@material-ui/icons/Copyright';


export default function Footer() {
  return (

    <footer style={{
      textAlign: "center",
      backgroundColor: "#454256",
      height: 150,
      width: "100%",
      padding: 10

    }}>
      <Typography style={{ color: "white" }}>
        Pecas-Projects
        <CopyrightIcon style={{ color: "white" }} />
      </Typography>

      <br />

      <Typography style={{ color: "white", fontSize: '14px' }}>Instagram - @PecasProjects</Typography>
      <Typography style={{ color: "white", fontSize: '14px' }}>Email - PecasProjects@gmail.com</Typography>
      <Typography style={{ color: "white", fontSize: '14px' }}>Github - https://github.com/Pecas-Projects</Typography>

    </footer>
  );
}
