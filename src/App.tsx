import "./App.css";

import { useState } from "react";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Cadastro from "./pages/Cadastro/Cadastro";
import Feed from "./pages/Feed/Feed";
import Login from "./pages/Login/Login";
import Admin from "./pages/Admin/Admin";

import Alert, { AlertColor } from "@mui/material/Alert";
import Fade from "@mui/material/Fade";
import Comunidades from "./pages/Comunidades/Comunidades";

function App() {
  type AlertType = { message: string; severity: AlertColor | undefined };
  const [alert, setAlert] = useState<AlertType>({
    message: "",
    severity: undefined,
  });

  return (
    <>
      <BrowserRouter>
        <Fade in={alert.message !== ""}>
          <Alert
            variant="outlined"
            severity={alert.severity}
            style={{
              backgroundColor: "white",
              width: "80vw",
              maxWidth: "360px",
              marginTop: "8px",
              position: "absolute",
              left: "50%",
              transform: "translate(-50%)",
              zIndex: "999999999999999999999",
            }}
            onClose={() => {
              setAlert((prev) => ({ ...prev, message: "" }));
            }}
          >
            {alert.message}
          </Alert>
        </Fade>

        <Routes>
          <Route element={<Navigate to="/login" />} path="/" />
          <Route element={<Login setAlert={setAlert}/>} path="/login" />
          <Route element={<Cadastro setAlert={setAlert} />} path="/cadastro" />
          <Route element={<Feed setAlert={setAlert} />} path="/feed" />
          <Route element={<Admin setAlert={setAlert} />} path="/admin" />
          <Route element={<Comunidades />} path="/comunidades" />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
