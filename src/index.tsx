import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
//redux
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { createStore, applyMiddleware, Middleware } from "redux";
import reducers from "./reducers";

let middlewares: Middleware[] = [thunk];

if (true || process.env.REACT_APP_IS_PRODUCTION !== "1") {
  middlewares.push(logger);
}

const store = createStore(reducers, applyMiddleware(...middlewares));

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

reportWebVitals();
