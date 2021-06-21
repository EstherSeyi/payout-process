import React from "react";
import ReactDOM from "react-dom";
import { QueryClientProvider } from "react-query";
import queryClient from "./utils/query-client";

import "./index.css";
import App from "./App";
import CustomToast from "./component/Toast";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <CustomToast />
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
