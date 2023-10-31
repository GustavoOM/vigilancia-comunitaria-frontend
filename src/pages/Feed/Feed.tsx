import { Stack } from "@mui/material";
import { Suspense } from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Postagem from "../../components/Postagem/Postagem";
import { fetchData, use } from "../../data/fetchData";

// {
//     "id": 5,
//     "emailAuthor": "simone123@gmail.com",
//     "nameAuthor": "Simone",
//     "idCommunity": 1,
//     "nameCommunity": "USP",
//     "title": "EDU EDU TITLE",
//     "content": "EDU EDU EDU",
//     "type": "ALERTA",
//     "status": "PENDENTE",
//     "images": []
//   },

const getPostagens = () => {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const token = localStorage.getItem("vigilancia-token");
  const requestConfig = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };
  return use(fetchData(`${apiBaseUrl}/post`, requestConfig));
};

function Feed() {
  const postagens = getPostagens();
  console.log(postagens);

  return (
    <Stack justifyContent="center" alignItems="center" spacing={1}>
      <Suspense fallback={<div>Loading...</div>}>
        <Header />
        {!postagens ? (
          <p>Carregando...</p>
        ) : (
          postagens?.map((postagem, index) => (
            <Postagem
              key={index}
              nomeUsuario={postagem.nameAuthor}
              tipo={postagem.type}
              descricao={postagem.content}
              // missing
              urlImgPerfil={
                postagem?.urlImgPerfil ?? "https://picsum.photos/40/40"
              }
              urlImagem={postagem.urlImagem ?? "https://picsum.photos/1172/722"}
            />
          ))
        )}
        <Footer />
      </Suspense>
    </Stack>
  );
}

export default Feed;
