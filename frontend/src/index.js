import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// 1. import `ChakraProvider` component
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import chatProvider from "./Context/ContextProvider";
// function App({ Component }) {
//   // 2. Use at the root of your app
//   return (
//
//       <Component />
//     </ChakraProvider>
//   )
// }
ReactDOM.render(
  
  <Provider store={store}>
    <ChakraProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ChakraProvider>
  </Provider>,
  document.getElementById("root")
);
