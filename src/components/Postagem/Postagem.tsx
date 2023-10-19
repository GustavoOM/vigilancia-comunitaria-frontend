import { Card, CardHeader, CardMedia, Typography, IconButton, Avatar } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
//import styles from "./Postagem.module.css";

interface PostagemProps {
    urlImgPerfil: string,
    nomeUsuario: string;
    tipo: string;
    descricao: string;
    urlImagem: string;
}

function Postagem({ urlImgPerfil, nomeUsuario, tipo, descricao, urlImagem }: PostagemProps) {
    return (
        <Card sx={{ maxWidth: 585, width: "100%" }}>
            <CardHeader
                avatar={<Avatar src={urlImgPerfil} />}
                title={nomeUsuario}
                subheader={tipo}
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
            />
            <Typography variant="subtitle2" pl={2} pr={2} pb={1}>
                {descricao}
            </Typography>
            <CardMedia
                component="img"
                height="100%"
                image={urlImagem}
                alt="Post Image"
            />
        </Card >
    )
}

export default Postagem;