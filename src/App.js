import React from "react";
import NavBar from "./containers/NavBar";
import LeftPanel from "./containers/LeftPanel";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faTimes } from "@fortawesome/free-solid-svg-icons";

library.add(faPlus, faMinus, faTimes);

const styles = {
  fontFamily: "sans=",
  display: "flex"
};
const App = () => (
  <div id="appContainer" style={styles}>
    <NavBar />
    <LeftPanel />
  </div>
);

export default App;