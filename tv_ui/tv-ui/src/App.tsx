import React from "react";

import Routes from "./Routes";
import { BrowserRouter } from "react-router-dom";
import store from "./store/store";

import "./App.css";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter basename="tv">
        <Routes />
        <Toaster position={"top-center"} />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
