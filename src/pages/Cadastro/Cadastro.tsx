import { FormEvent, FormEventHandler, useState } from "react";

import reactLogo from "../../assets/logo.svg";
import TextInput from "../../components/TextInput/TextInput";

import { Button } from "@mui/material";

function Cadastro() {
  const [formData, setFormData] = useState({
    usuario: "",
    email: "",
    senha: "",
  });

  function handleFormOnChange(event: FormEvent) {
    const { name, value, type, checked } = event.target as HTMLInputElement;

    setFormData(prev => ({
        ...prev,
        [name]: type !== "checkbox" ? value : checked
    }));
  }

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    
    console.log(`Usuário: ${formData.usuario}`);
    console.log(`Email: ${formData.email}`);
    console.log(`Senha: ${formData.senha}`);
  }

  return (
    <>
      <div
        className='LogoContainer'
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "80px",
        }}
        >
        <img src={reactLogo}/>
      </div>

      <form
        className="FormContainer"
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: "112px",
          flexDirection: "column",
          gap: "16px"
        }}
        onSubmit={handleFormSubmit}
      >
        <TextInput
          label="Usuário"
          placeholder="Digite seu nome de usuário"
          type="text"
          name="usuario"
          value={formData.usuario}
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
          name="senha"
          value={formData.senha}
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
            font: "500 17px Roboto"
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
          marginTop: "40px"
        }}
      >
        {/* A tag <a> provavelmente irá virar um link do router */}
        <p>Já possui uma conta? <a style={{color: "var(--roxo600)", cursor: "pointer"}}>Login</a></p>
      </div>
    </>
  )
}

export default Cadastro;