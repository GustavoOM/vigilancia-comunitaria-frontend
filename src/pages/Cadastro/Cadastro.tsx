import { FormEvent, FormEventHandler, useState } from "react";

import reactLogo from "../../assets/logo.svg";
import TextInput from "../../components/TextInput/TextInput";

import { AlertColor, Button } from "@mui/material";

import { useNavigate } from "react-router";

type CadastroProps = {
  setAlert: (alert: { message: string, severity: AlertColor | undefined }) => void,
};

function Cadastro(props: CadastroProps) {
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

  const navigate = useNavigate();

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

      const response = await fetch(`${apiBaseUrl}/auth/signup`, requestConfig);
      const data = await response.json();

      if (data.code === "SUCESSO") {
        props.setAlert({
          message: "Usuário cadastrado com sucesso!",
          severity: "success",
        });
        navigate("/login");
      }
      else {
        // Posteriormente pode ser feito o tratamento para respostas diferentes da api (ex: pk duplicada).
        props.setAlert({
          message: "Erro ao realizar cadastro!",
          severity: "error",
        });

        setFormData({ name: "", email: "", password: "" });
      }
    }
    catch (error) {
      props.setAlert({
        message: "Erro ao realizar cadastro!",
        severity: "error",
      });

      setFormData({ name: "", email: "", password: "" });

      console.error(error);
    }
  }

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    requestCadastro();

  }

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
        <TextInput
          label="Usuário"
          placeholder="Digite seu nome de usuário"
          type="text"
          name="name"
          value={formData.name}
          required={true}
          handleOnChange={handleFormOnChange}
        />
        <TextInput
          label="Email"
          placeholder="Digite seu email"
          type="email"
          name="email"
          value={formData.email}
          required={true}
          handleOnChange={handleFormOnChange}
        />
        <TextInput
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
        >
          Cadastrar
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
