import { useState, FormEvent, FormEventHandler } from "react";

import { Button, FormControlLabel, Checkbox } from "@mui/material";

import reactLogo from "../../assets/logo.svg";
import TextInput from "../../components/TextInput/TextInput";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
    lembrar: false,
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
    
    console.log(`Email: ${formData.email}`);
    console.log(`Senha: ${formData.senha}`);
    console.log(`Lembrar: ${formData.lembrar}`);
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
        <img src={reactLogo} />
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

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              minWidth: "360px",
              font: "500 15px Roboto",
            }}
          >
            <FormControlLabel
              control={<Checkbox value="remember"
                sx={{
                  color: "var(--roxo600)",
                  '&.Mui-checked': {
                    color: "var(--roxo500)",
                  },
                }} />}
              label="Lembrar-me"
              name="lembrar"
              onChange={handleFormOnChange}
              checked={formData.lembrar}
            />
            
            {/* A tag <a> provavelmente irá virar um link do router */}
            <a style={{ color: "#FB344F", cursor: "pointer" }}>Esqueceu a senha</a>
          </div>
        </div>

        <Button
          size="large"
          variant="contained"
          style={{
            backgroundColor: "var(--roxo500)",
            minWidth: "360px",
            minHeight: "45px",
            marginTop: "16px",
            textTransform: "capitalize",
            font: "500 17px Roboto"
          }}
          type="submit"
        >
          Entrar
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
        <p style={{}}>Não tem uma conta? <a style={{ color: "var(--roxo600)", cursor: "pointer" }}>Cadastre-se</a></p>
      </div>
    </>
  )
}

export default Login;