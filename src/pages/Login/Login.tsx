import { Button, Checkbox, FormControlLabel } from "@mui/material";
import { FormEvent, FormEventHandler, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import reactLogo from "../../assets/logo.svg";
import Input from "../../components/Input/Input";

export type LoginProps = {
  setAlert: (alert: { message: string; severity: string | undefined }) => void;
};

function Login(props: LoginProps) {

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const isAuthRequired = searchParams.get('auth') === 'false';

  const token = localStorage.getItem("vigilancia-token");
  if(token){
    window.location.href = "/feed";
  }

  const [formData, setFormData] = useState({
    email: "",
    senha: "",
    lembrar: false,
  });
  const navigate = useNavigate();

  function handleFormOnChange(event: FormEvent) {
    const { name, value, type, checked } = event.target as HTMLInputElement;

    setFormData((prev) => ({
      ...prev,
      [name]: type !== "checkbox" ? value : checked,
    }));
  }

  async function requestLogin() {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

    const params = {
      email: formData.email,
      password: formData.senha,
    };

    try {
      const requestConfig = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      };

      const response = await fetch(`${apiBaseUrl}/auth`, requestConfig);
      const data = await response.json();

      if (response.status !== 200) {
        props.setAlert({
          message: "Erro ao realizar login!",
          severity: "error",
        });
        return;
      }
      console.log(data);

      props.setAlert({
        message: "Login realizado!",
        severity: "success",
      });

      localStorage.setItem("vigilancia-token", `Bearer ${data.token}`);

      setTimeout(() => {
        navigate("/feed");
      }, 1000);
    } catch (error) {
      props.setAlert({
        message: "Erro ao realizar login!",
        severity: "error",
      });

      setFormData({ email: "", senha: "", lembrar: false });

      console.error(error);
    }
  }

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    console.log(`Email: ${formData.email}`);
    console.log(`Senha: ${formData.senha}`);
    console.log(`Lembrar: ${formData.lembrar}`);

    await requestLogin();

    // redirect to /feed
    // navigate("/feed");
  };

  return (
    <>
      {isAuthRequired && (
        <div className="error-message">
          <p>{"Você deve primeiro fazer login!"}</p>
        </div>
      )}
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
              minWidth: "360px",
              font: "500 15px Roboto",
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  value="remember"
                  sx={{
                    color: "var(--roxo600)",
                    "&.Mui-checked": {
                      color: "var(--roxo500)",
                    },
                  }}
                />
              }
              label="Lembrar-me"
              name="lembrar"
              onChange={handleFormOnChange}
              checked={formData.lembrar}
            />
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
            font: "500 17px Roboto",
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
          marginTop: "40px",
        }}
      >
        {/* A tag <a> provavelmente irá virar um link do router */}
        <p style={{}}>
          Não tem uma conta?{" "}
          <a
            style={{ color: "var(--roxo600)", cursor: "pointer" }}
            href={"/cadastro"}
          >
            Cadastre-se
          </a>
        </p>
      </div>
    </>
  );
}

export default Login;
