import { Button, FormControlLabel, Checkbox } from '@mui/material';
import reactLogo from '../../assets/logo.svg';
import TextInput from '../../components/TextInput/TextInput';

function Login() {
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
      >
        <TextInput label="Email" placeholder="Digite seu email" type="email" />
        <TextInput label="Senha" placeholder="Digite sua senha" type="password" />

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
            />                                      {/* A tag <a> provavelmente irá virar um link do router */}
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