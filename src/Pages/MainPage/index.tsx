import { Paper } from "@material-ui/core";
import React, { useState } from "react";
import { InterviewerPanel } from "./InterviewerPanel";
import { UserPanel } from "./UserPanel";
import { SuperAdminPanel } from "./SuperAdminPanel";

export const MainPage = () => {
  const userType = localStorage.getItem("usertype");
  return userType == "User" ? (
    <UserPanel />
  ) : userType == "Interviewer" ? (
    <InterviewerPanel />
  ) : (
    <SuperAdminPanel />
  );
};
