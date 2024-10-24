import React, { useState } from "react";
import { SignInForm } from "./SignInForm";
import { SignUpForm } from "./SignUpForm";

export const AuthPage = () => {
  const [page, setPage] = useState<String>("SignInPage");

  const changePage = (page_name: String) => {
    setPage(page_name);
  }

  return (
    page === "SignInPage" ?
    <SignInForm changePage={changePage} /> :
    <SignUpForm changePage={changePage} />
  );
};
