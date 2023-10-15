import { Button } from '@mui/material';
import reactLogo from '../../assets/logo.svg';
import TextInput from '../../components/TextInput/TextInput';

function Cadastro() {
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
      >
        <TextInput label="Usuário" placeholder="Digite seu nome de usuário" type="text" />
        <TextInput label="Email" placeholder="Digite seu email" type="email" />
        <TextInput label="Senha" placeholder="Digite sua senha" type="password" />

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
        <p style={{}}>Já possui uma conta? <a style={{color: "var(--roxo600)", cursor: "pointer"}}>Login</a></p>
      </div>
    </>
  )
}

export default Cadastro;