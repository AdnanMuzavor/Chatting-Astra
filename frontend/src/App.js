import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Route } from "react-router-dom";
import Homepage from "./Screens/Home";
import Chatpage from "./Screens/ChatPage";
import ChattingScrren from "./Screens/ChattingScrren";



function App() {
  return (
    <div className="App">
      {/* {UserInfo.name ? <SideDrawer /> : null} */}

      <Route path="/" component={Homepage} exact />
      <Route exact path="/chat" component={Chatpage} />
      <Route exact path="/chatting" component={ChattingScrren} />
    
    </div>
  );
}

export default App;
