import React, { useEffect, useContext, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { UserContext } from "./js/contexts/user.context.jsx";
import Home from "./js/routes/home.components.jsx";
import ViewInvoice from "./js/mainDisplay/viewInvoice.components.jsx";
import MenuBar from "./js/menu/menuBar.component.jsx";
import Authentication from "./js/routes/authentication.component.jsx";
import "./styles/main.scss";

const App = () => {
  const { setCurrentUser, setIsLoggedIn } = useContext(UserContext);
  const [openingRoutePath, setOpeningRoutePath] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
      setOpeningRoutePath("/home");
    } else {
      setOpeningRoutePath("/auth");
    }
    const isDarkMode = localStorage.getItem("isDarkMode");
    if (isDarkMode === "true") {
      document.body.classList.add("dark-mode");
    }
  }, [setCurrentUser, setIsLoggedIn]);

  return (
    <Routes>
      <Route path="/" element={<MenuBar />}>
        <Route path="/home" element={<Home />} />
        <Route path="/auth" element={<Authentication />} />
        <Route path="/invoices/:invoiceId" element={<ViewInvoice />} />
        <Route index element={<Navigate to={openingRoutePath} />} />
      </Route>
    </Routes>
  );
};

export default App;
