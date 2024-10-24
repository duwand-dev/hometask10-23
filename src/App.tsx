import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthPage } from "./Pages/Auth";
import { MainPage } from "./Pages/MainPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/auth" Component={AuthPage} />
        <Route index path="/main-page" Component={MainPage} />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
