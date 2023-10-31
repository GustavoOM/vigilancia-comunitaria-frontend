import Postagem from "../../components/Postagem/Postagem";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useEffect, useState } from 'react';
import { Stack } from "@mui/material"

function Feed() {
    const postagensMock = [
        { urlImgPerfil: "https://picsum.photos/40/40", nameAuthor: "Simone_1", type: "Ocorrência - ICMC", content: "Árvore tombada na saída da matemática", images: "https://picsum.photos/1170/720" },
        { urlImgPerfil: "https://picsum.photos/80/80", nameAuthor: "Fuzeto", type: "Alerta - ICMC", content: "Sem internet em todo o instituto de matemática e computação, eduroam caiu hoje cedo!", images: "https://picsum.photos/1171/721" },
        { urlImgPerfil: "https://picsum.photos/120/120", nameAuthor: "Anônimo", type: "Denúncia - ICMC", content: "Pessoas estranhas entraram em grupo na noite de 02/10", images: "https://picsum.photos/1172/722" }
    ]

    const [postagens, setPostagensa] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
            const requestConfig = {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem('vigilancia-token'),
                    "Content-Type": "application/json"
                },
            };

            const response = await fetch(`${apiBaseUrl}/post`, requestConfig);
            const result = await response.json();

            setPostagensa(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    return (

        <Stack justifyContent="center" alignItems="center" spacing={1}>
            <Header />
            {postagens.map((postagem, index) => (
                <Postagem
                    key={index}
                    urlImgPerfil={/*postagem['urlImgPerfil'] */ "https://picsum.photos/120/120"}
                    nomeUsuario={postagem['nameAuthor']}
                    tipo={postagem['type']}
                    descricao={postagem['content']}
                    urlImagem={/*postagem['images']*/"https://picsum.photos/1170/720"}
                />
            ))}
            <Footer />
        </Stack>
    )
}

export default Feed;