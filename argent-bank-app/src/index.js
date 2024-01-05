import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store, { persistor } from "./store/store";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Footer, Header, ProtectedRoute } from "./components";
import { Home, Profile, Signin } from "./pages";
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Signin />} />

          <Route element={<ProtectedRoute fallbackPath="/login" />}>
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route path="*" element={<Home />} />
        </Routes>
        <Footer />
      </Router>
    </PersistGate>
  </Provider>,
  // </React.StrictMode>,
);
