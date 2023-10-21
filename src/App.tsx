import "./App.css"

import { useState } from "react";

import Login from "./pages/Login/Login";
import Cadastro from "./pages/Cadastro/Cadastro";
import Feed from "./pages/Feed/Feed";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Alert, { AlertColor } from '@mui/material/Alert';
import Fade from '@mui/material/Fade';

function App() {
  type AlertType = { message: string; severity: AlertColor | undefined; };
  const [alert, setAlert] = useState<AlertType>({ message: "", severity: undefined });

  return (
    <>
      <BrowserRouter>
        <Fade in={alert.message !== ""}>
          <Alert
            variant="outlined"
            severity={alert.severity}
            style={{
              width: "80vw",
              maxWidth: "360px",
              marginTop: "16px",
              position: "absolute",
              left: "50%",
              transform: "translate(-50%)",
            }}
            onClose={() => { setAlert(prev => ({ ...prev, message: "" })) }}
          >
            {alert.message}
          </Alert>
        </Fade>

        <Routes>
          <Route element={<h1>Home</h1>} path="/" />
          <Route element={<Login />} path="/login" />
          <Route element={<Cadastro setAlert={setAlert} />} path="/cadastro" />
          <Route element={<Feed />} path="/feed" />
        </Routes>
      </BrowserRouter >
    </>
  )
}

export default App
