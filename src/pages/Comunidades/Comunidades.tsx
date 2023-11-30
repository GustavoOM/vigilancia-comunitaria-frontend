import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Comunidade } from "../../types/types";
import { useEffect, useState } from "react";
import { LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ThemeProvider, createTheme } from "@mui/material";
import TableToolbar from "../../components/TableToolbar/TableToolbar";
import LinhaSolicitacaoComunidade from "../../components/LinhaSolicitacaoComunidade/LinhaSolicitacaoComunidade";

type ResponseCommunityType = {
    communityId: number,
    communityName: string,
}

type ResponseType = {
    participating: ResponseCommunityType[],
    pendingInvitation: ResponseCommunityType[],
    others: ResponseCommunityType[],
}

const response: ResponseType = {
    participating: [
        {
            communityId: 1,
            communityName: "ICMC",
        },
        {
            communityId: 2,
            communityName: "USP",
        },
    ],
    pendingInvitation: [
        {
            communityId: 3,
            communityName: "Unicamp",
        },
        {
            communityId: 4,
            communityName: "UFSCar",
        },
    ],
    others: [
        {
            communityId: 5,
            communityName: "Unesp",
        },
        {
            communityId: 6,
            communityName: "IME",
        },
    ]
}

type ComunidadesStatus = Comunidade & { status: string };

function Comunidades() {
    const [comunidades, setComunidades] = useState<ComunidadesStatus[]>([]);

    useEffect(() => {
        const comunidadesFormatadas: ComunidadesStatus[] = [];

        for (const key in response) {
            const status = (() => {
                switch (key) {
                    case "participating":
                        return "Aprovado";
                    case "pendingInvitation":
                        return "Pendente";
                    case "others":
                        return "Disponível";
                    default:
                        return "Disponível";
                }
            })();

            response[key as keyof ResponseType].forEach((comunidade: ResponseCommunityType) => {
                comunidadesFormatadas.push({
                    id: comunidade.communityId,
                    name: comunidade.communityName,
                    status
                });
            });
        }

        setComunidades(comunidadesFormatadas.sort((a, b) => {
            if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) {
                return -1;
            }
            if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
                return 1;
            }
            return 0;
        }));
    }, []);

    const theme = createTheme({
        palette: {
            secondary: {
                main: '#3C096C'
            }
        }
    });

    return (
        <div style={{ paddingBottom: "56px" }}>
            <Header />

            <div style={{ padding: "8px" }}>
                <TableContainer sx={{ boxShadow: "none" }} component={Paper}>
                    {!comunidades ?
                        <ThemeProvider theme={theme}>
                            <LinearProgress color="secondary" />
                        </ThemeProvider> :
                        <>
                            <TableToolbar title="Comunidades" />
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Nome</TableCell>
                                        <TableCell align="right">Solicitar Entrada</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {comunidades.map((comunidade) => (
                                        <LinhaSolicitacaoComunidade key={comunidade.id} comunidade={comunidade} />
                                    ))}
                                </TableBody>
                            </Table>
                        </>
                    }
                </TableContainer>
            </div>

            <Footer />
        </div >
    );
}

export default Comunidades;