import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Button from "../../todolistComponents/Button";
import { Toaster } from "react-hot-toast";
import AppContent from "../../todolistComponents/AppContent";
import AppHeader from "../../todolistComponents/AppHeader";
import PageTitle from "../../todolistComponents/PageTitle";
import styles from "../../styles/modules/app.module.scss";

const ToDoList = () => {
  const [isLeftMenuActive, setIsLeftMenuActive] = useState(true);

  return (
    <div className="container">
      <PageTitle>TODO List</PageTitle>
      <div className={styles.app__wrapper}>
        <AppHeader />
        <AppContent />
      </div>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            fontSize: "1.4rem",
          },
        }}
      />
    </div>
  );
};

export default ToDoList;
