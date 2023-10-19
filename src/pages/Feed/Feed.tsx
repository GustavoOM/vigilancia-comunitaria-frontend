import Postagem from "../../components/Postagem/Postagem";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Stack } from "@mui/material"

function ComponenteExemplo() {
    const postagens = [
        { urlImgPerfil: "https://picsum.photos/40/40", nomeUsuario: "Simone_1", tipo: "Ocorrência - ICMC", descricao: "Árvore tombada na saída da matemática", urlImagem: "https://picsum.photos/1170/720" },
        { urlImgPerfil: "https://picsum.photos/80/80", nomeUsuario: "Fuzeto", tipo: "Alerta - ICMC", descricao: "Sem internet em todo o instituto de matemática e computação, eduroam caiu hoje cedo!", urlImagem: "https://picsum.photos/1171/721" },
        { urlImgPerfil: "https://picsum.photos/120/120", nomeUsuario: "Anônimo", tipo: "Denúncia - ICMC", descricao: "Pessoas estranhas entraram em grupo na noite de 02/10", urlImagem: "https://picsum.photos/1172/722" }
    ]

    return (
        
        <Stack justifyContent="center" alignItems="center" spacing={1}>
            <Header/>
            {postagens.map((postagem, index) => (
                <Postagem
                    key={index}
                    urlImgPerfil={postagem.urlImgPerfil}
                    nomeUsuario={postagem.nomeUsuario}
                    tipo={postagem.tipo}
                    descricao={postagem.descricao}
                    urlImagem={postagem.urlImagem}
                />
            ))}
            <Footer/>
        </Stack>
    )
}

export default ComponenteExemplo;