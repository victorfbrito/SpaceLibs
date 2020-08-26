import React from "react";
import StorageService from "~/service/storage";
import { history } from "~/router";

export default function HeaderComponent() {
  const doLogout = () => {
    StorageService.reset("auth");
    history.push("/");
  };
  return (
    <div className="header-main">
      <h2>Welcome aboard</h2>
      <button onClick={(e) => doLogout()}>LOGOUT</button>
    </div>
  );
}
