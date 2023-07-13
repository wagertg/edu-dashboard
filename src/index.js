import React from "react";
import { createRoot } from "react-dom/client"; // It creates a root for the app and allows the root to be rendered with updates that can interrupt rendering if a higher priority update comes along.
import App from "./App";
import { Provider } from "react-redux"; // The `Provider` makes the Redux store available to any nested components that have been wrapped in the `connect()` function.
import store from "./store";
import { HashRouter } from "react-router-dom"; // Router implementation that uses the URL hash to keep the UI in sync with the URL.

const root = createRoot(document.querySelector("#root"));
root.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
);
