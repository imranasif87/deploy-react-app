import React, { Component } from "react";
import { Button } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import "./TestDep.css";

class Test extends Component {
  render() {
    return (
      <React.Fragment>
        <h1 className="text">Hello worlds</h1>
        {/* mui buttons */}
        <Button>Primary</Button>
        <Button disabled>Primary disabled</Button>
        <Button disableElevation>Primary disable elevation</Button>
        <Button
          onClick={() => {
            alert("Alert button clicked");
          }}
        >
          On Click Alert
        </Button>
        <Button variant="contained">Contained</Button>
        <Button variant="contained" disabled>
          Contained disabled
        </Button>
        <Button variant="contained" disableElevation>
          Contained disable elevation
        </Button>
        <Button variant="outlined">Outlined</Button>
        <Button variant="text">Text</Button>
        {/* mui icon */}
        <PhotoCamera />
      </React.Fragment>
    );
  }
}

export default Test;
