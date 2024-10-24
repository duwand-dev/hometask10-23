import { Button, MenuItem, Paper, Select, TextField } from "@material-ui/core";
import { Input } from "postcss";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Actions } from "../../Actions";

export const SignUpForm = (props: {
  changePage: (user_name: string) => void;
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const [userType, setUserType] = useState("");
  const navigator = useNavigate();

  const onInputChanged = (
    type: String,
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (type === "email") setEmail(e.target.value);
    else if (type === "password") setPassword(e.target.value);
    else if (type === "repassword") setRePassword(e.target.value);
  };
  const handleSelectChange = (
    e: React.ChangeEvent<{ name?: string | undefined; value: unknown }>
  ) => {
    setUserType(e.target.value as string);
  };
  const onSubmitForm = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (password == "" || password !== repassword) {
      alert("Empty password or password does not match!");
      return;
    }
    Actions.SignUpAction(email, password, userType)
      .then(() => {
        props.changePage("SignInPage");
      })
      .catch((err: Error) => alert("Sign Up failed!"));
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <Paper
        style={{
          width: 200,
          height: 400,
          display: "flex",
          flexDirection: "column",
          padding: 20,
        }}
      >
        <TextField
          style={{ paddingBottom: 20 }}
          label="Email"
          variant="standard"
          placeholder="Input your email"
          onChange={(e) => onInputChanged("email", e)}
        />
        <TextField
          style={{ paddingBottom: 20 }}
          label="Password"
          type="password"
          variant="standard"
          placeholder="Input your password"
          onChange={(e) => onInputChanged("password", e)}
        />
        <TextField
          style={{ paddingBottom: 20 }}
          label="Check Password"
          type="password"
          variant="standard"
          placeholder="Check your password"
          onChange={(e) => onInputChanged("repassword", e)}
        />
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="User type"
          style={{ marginBottom: 20 }}
          onChange={(e) => handleSelectChange(e)}
        >
          <MenuItem value={"User"}>User</MenuItem>
          <MenuItem value={"Interviewer"}>Interviewer</MenuItem>
          <MenuItem value={"Superadmin"}>Super Admin</MenuItem>
        </Select>
        <Button
          style={{ marginBottom: 20 }}
          variant="outlined"
          onClick={(e) => onSubmitForm(e)}
        >
          Sign Up
        </Button>
        <u>Forgot password?</u>
        <Button
          variant="text"
          onClick={(e) => props.changePage("SignInPage")}
          style={{ float: "right" }}
        >
          Sign In
        </Button>
      </Paper>
    </div>
  );
};
