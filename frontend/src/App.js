import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Route } from "react-router-dom";
import Homepage from "./Screens/Home";
import Chatpage from "./Screens/ChatPage";

function App() {
  return (
    <div className="App">
      <Route path="/" component={Homepage} exact />
      <Route exact path="/chat" component={Chatpage} />
    </div>
  );
}

export default App;
