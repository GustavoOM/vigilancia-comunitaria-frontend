import "./App.css"

import Login from "./pages/Login/Login";
import Cadastro from "./pages/Cadastro/Cadastro";
import Feed from "./pages/Feed/Feed";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<h1>Home</h1>} path="/" />
          <Route element={<Login />} path="/login" />
          <Route element={<Cadastro />} path="/cadastro" />
          <Route element={<Feed />} path="/feed" />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
