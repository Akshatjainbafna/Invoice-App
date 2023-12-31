import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../header/header.components.jsx";
import Directory from "../mainDisplay/directory.component.jsx";
import InvoiceForm from "../invoice-forms/invoiceForm.component.jsx";
import { InvoicesContext } from "../contexts/invoices.context.jsx";
import "../../styles/main.scss";
const Home = () => {
  const { invoiceForDisplay } = useContext(InvoicesContext);
  const [showInvoiceForm, setShowInvoiceForm] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (!storedUser) {
      navigate("/auth");
    }
  });

  const toggleInvoiceForm = () => {
    setShowInvoiceForm(!showInvoiceForm);
  };

  return (
    <div className="container">
      {showInvoiceForm && <div className="overlay"></div>}
      <Header
        invoices={invoiceForDisplay}
        onNewInvoiceClick={toggleInvoiceForm}
      />
      <Directory invoices={invoiceForDisplay} />
      {showInvoiceForm && <InvoiceForm onCloseClick={toggleInvoiceForm} />}
    </div>
  );
};

export default Home;
