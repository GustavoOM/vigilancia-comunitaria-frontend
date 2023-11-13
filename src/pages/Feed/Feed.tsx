import { AlertColor, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Postagem from "../../components/Postagem/Postagem";
import { useNavigate } from "react-router-dom";

export type FeedProps = {
  setAlert: (alert: { message: string; severity: AlertColor | undefined }) => void;
};

function Feed(props: FeedProps) {
  const { setAlert } = props;

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("vigilancia-token");
    if (!token) {
      setAlert({ message: "Você deve primeiro fazer login!", severity: "warning" });
      navigate("/login");
    }
  }, [navigate, setAlert]);

  const [postagens, setPostagens] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);


  const fetchData = async () => {
    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
      const requestConfig = {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("vigilancia-token") ?? "",
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(`${apiBaseUrl}/post`, requestConfig);
      const result = await response.json();

      setPostagens(result);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  console.log(postagens);

  return (
    <div style={{ marginBottom: "56px" }}>
      <Header />

      {postagens?.length > 0 ? (
        <Stack justifyContent="center" alignItems="center" spacing={1}>
          {postagens.map((postagem, index) => (
            <Postagem
              key={index}
              urlImgPerfil={
                /*postagem['urlImgPerfil'] */ "https://picsum.photos/120/120"
              }
              nomeUsuario={postagem["nameAuthor"]}
              tipo={postagem["type"]}
              descricao={postagem["content"]}
              urlImagem={
                postagem['images'][0]
              }
            />
          ))}
        </Stack>
      ) : (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h6> Não há postagens. Crie a sua!</h6>
        </div>
      )
      }

      <Footer />
    </div >
  );
}

export default Feed;
