import { Button, Chip, TableCell, TableRow } from "@mui/material";
import { Comunidade } from "../../types/types";

type LinhaSolicitacaoComunidadeProps = {
    comunidade: Comunidade & { status: string };
};

function LinhaSolicitacaoComunidade(props: LinhaSolicitacaoComunidadeProps) {


    return (
        <TableRow>
            <TableCell>
                <Chip
                    label={props.comunidade.status}
                    variant="outlined"
                    color={
                        props.comunidade.status === "Disponível" ? "secondary" :
                            props.comunidade.status === "Pendente" ? "warning" : "success"
                    }
                />
            </TableCell>
            <TableCell>{props.comunidade.name}</TableCell>
            <TableCell align="right">
                <Button
                    variant="contained"
                    size="small"
                    sx={{
                        backgroundColor: "var(--roxo500)", width: "112px"

                    }}
                    disabled={props.comunidade.status === "Aprovado" || props.comunidade.status === "Pendente"}
                >
                    {props.comunidade.status === "Disponível" ? "Solicitar" :
                        props.comunidade.status === "Pendente" ? "Solicitado" :
                            "Participando"
                    }
                </Button>
            </TableCell>
        </TableRow>
    );
}

export default LinhaSolicitacaoComunidade;