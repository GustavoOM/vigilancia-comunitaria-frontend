import { Card, CardHeader, CardMedia, Typography, IconButton, Avatar } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PersonIcon from '@mui/icons-material/Person';
//import styles from "./Postagem.module.css";

interface PostagemProps {
    urlImgPerfil: string,
    nomeUsuario: string;
    tipo: string;
    nomeComunidade: string;
    descricao: string;
    criadoEm: Date;
    urlImagem: string;
}

function Postagem({ urlImgPerfil, nomeUsuario, tipo, nomeComunidade, descricao, criadoEm, urlImagem }: PostagemProps) {
    function stringToColor(string: string) {
        let hash = 0;
        let i;

        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */

        return color;
    }

    function stringAvatar(name: string) {
        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: `${name[0]}`,
        };
    }

    function handleType(tipoPostagem: string) {
        return tipoPostagem == "DENUNCIA" ? "DENÚNCIA" : tipoPostagem == "OCORRENCIA" ? "OCORRÊNCIA" : "ALERTA";
    }

    function handleDate(criadoEm: Date) {
        const postDate = new Date(criadoEm);
        const now = new Date();
        const timeDifference = now - postDate;

        // Calcular diferença em segundos, minutos, horas, etc.
        const seconds = Math.floor(timeDifference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) {
            return `${days}d`;
        } else if (hours > 0) {
            return `${hours}h`;
        } else if (minutes > 0) {
            return `${minutes}m`;
        } else {
            return `${seconds}s`;
        }
    }



    return (
        <Card sx={{ maxWidth: 585, width: "100%" }}>
            <CardHeader
                avatar={tipo === "DENUNCIA" ?
                    <Avatar sx={{ bgcolor: "var(--roxo600)" }}>
                        <PersonIcon />
                    </Avatar>
                    : <Avatar {...stringAvatar(nomeUsuario)} />
                }
                title={tipo === "DENUNCIA" ? "Anônimo" : nomeUsuario}
                subheader={`${handleType(tipo)} - ${nomeComunidade}`}
                action={
                    <>
                        <Typography variant="body2" color="text.secondary" style={{ marginRight: 16, display: "inline-flex" }}>
                            {handleDate(criadoEm)}
                        </Typography>

                        < IconButton aria-label="settings" >
                            <MoreVertIcon />
                        </IconButton >
                    </>
                }
            />
            {
                urlImagem ?
                    <Typography variant="subtitle2" pl={2} pr={2} pb={1}>
                        {descricao}
                    </Typography>
                    :
                    <Typography variant="h4" pl={4} pr={4} pb={2} pt={2} bgcolor={"var(--roxo400)"}>
                        {descricao}
                    </Typography>
            }

            {
                urlImagem &&
                <CardMedia
                    component="img"
                    height="100%"
                    image={urlImagem}
                    alt="Post Image"
                />
            }
        </Card >
    )
}

export default Postagem;