import { Button, Grid, InputLabel, MenuItem, Paper, Select, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Actions } from "../../Actions";

export const SignInForm = (props: {
  changePage: (user_name: string) => void;
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const navigator = useNavigate();

  const onInputChanged = (
    type: String,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (type === "email") setEmail(e.target.value);
    else if (type === "password") setPassword(e.target.value);
  };

  const handleSelectChange = (e: React.ChangeEvent<{ name?: string | undefined; value: unknown; }>) => {
    setUserType(e.target.value as string);
  }
  const onSubmitForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    Actions.SignInAction(email, password, userType)
      .then(() => {
        localStorage.setItem('email', email);
        localStorage.setItem('usertype', userType);
        navigator("/main-page", { replace: true });
      })
      .catch((err: Error) => alert("Sign In failed!"));
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
          height: 350,
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
          variant="standard"
          type="password"
          placeholder="Input your password"
          onChange={(e) => onInputChanged("password", e)}
        />
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          onChange={(e) => handleSelectChange(e)}
          style={{marginBottom: 20}}
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
          Sign In
        </Button>
        <u>Forgot password?</u>
        <Button
          variant="text"
          onClick={(e) => props.changePage("SignUpPage")}
          style={{ float: "right" }}
        >
          Sign Up
        </Button>
      </Paper>
    </div>
  );
};
