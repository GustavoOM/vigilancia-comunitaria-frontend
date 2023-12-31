import { FormEvent, FormEventHandler, useEffect, useState } from "react";

import reactLogo from "../../assets/logo.svg";
import Input from "../../components/Input/Input";

import { AlertColor, Button, CircularProgress } from "@mui/material";

import { useNavigate } from "react-router-dom";

type CadastroProps = {
  setAlert: (alert: {
    message: string;
    severity: AlertColor | undefined;
  }) => void;
};

function Cadastro(props: CadastroProps) {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("vigilancia-token");
    const user = localStorage.getItem("vigilancia-user");

    if (token) {
      navigate(user === "admin" ? "/admin" : "/feed");
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  function handleFormOnChange(event: FormEvent) {
    const { name, value, type, checked } = event.target as HTMLInputElement;

    setFormData((prev) => ({
      ...prev,
      [name]: type !== "checkbox" ? value : checked,
    }));
  }

  async function requestCadastro() {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

    try {
      const requestConfig = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      };

      setLoading(true);

      const response = await fetch(`${apiBaseUrl}/auth/signup`, requestConfig);
      const data = await response.json();

      if (data.code === "SUCESSO") {
        props.setAlert({
          message: "Usuário cadastrado com sucesso!",
          severity: "success",
        });
        navigate("/login");
      } else {
        // Posteriormente pode ser feito o tratamento para respostas diferentes da api (ex: pk duplicada).
        props.setAlert({
          message: "Erro ao realizar cadastro!",
          severity: "error",
        });

        setFormData({ name: "", email: "", password: "" });
      }
    } catch (error) {
      props.setAlert({
        message: "Erro ao realizar cadastro!",
        severity: "error",
      });

      setFormData({ name: "", email: "", password: "" });

      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    requestCadastro();
  };

  return (
    <>
      <div
        className="LogoContainer"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "80px",
        }}
      >
        <img src={reactLogo} />
      </div>

      <form
        className="FormContainer"
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: "80px",
          flexDirection: "column",
          gap: "16px",
        }}
        onSubmit={handleFormSubmit}
      >
        <Input
          label="Usuário"
          placeholder="Digite seu nome de usuário"
          type="text"
          name="name"
          value={formData.name}
          required={true}
          handleOnChange={handleFormOnChange}
        />
        <Input
          label="Email"
          placeholder="Digite seu email"
          type="email"
          name="email"
          value={formData.email}
          required={true}
          handleOnChange={handleFormOnChange}
        />
        <Input
          label="Senha"
          placeholder="Digite sua senha"
          type="password"
          name="password"
          value={formData.password}
          required={true}
          handleOnChange={handleFormOnChange}
        />

        <Button
          size="large"
          variant="contained"
          style={{
            backgroundColor: "var(--roxo500)",
            minWidth: "360px",
            minHeight: "45px",
            marginTop: "32px",
            textTransform: "capitalize",
            font: "500 17px Roboto",
          }}
          type="submit"
          disabled={loading}
        >
          {loading ? <CircularProgress sx={{ color: "var(--roxo100)" }} size={16} /> :
            "Cadastrar"
          }
        </Button>
      </form>

      <div
        style={{
          font: "500 15px Roboto",
          color: "var(--cinzaEscuro)",
          textAlign: "center",
          marginTop: "40px",
        }}
      >
        {/* A tag <a> provavelmente irá virar um link do router */}
        <p>
          Já possui uma conta?{" "}
          <a
            style={{ color: "var(--roxo600)", cursor: "pointer" }}
            href={"/login"}
          >
            Login
          </a>
        </p>
      </div>
    </>
  );
}

export default Cadastro;
