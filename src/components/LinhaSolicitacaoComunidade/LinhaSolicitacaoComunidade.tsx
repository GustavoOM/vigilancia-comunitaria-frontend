import { Button, Chip, CircularProgress, TableCell, TableRow } from "@mui/material";
import { Comunidade } from "../../types/types";
import { useState } from "react";

type LinhaSolicitacaoComunidadeProps = {
  comunidade: Comunidade & { status: string };
};

function LinhaSolicitacaoComunidade(props: LinhaSolicitacaoComunidadeProps) {
  const [status, setStatus] = useState<string>(props.comunidade.status);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSolicitar = async () => {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
    try {
      const token = localStorage.getItem("vigilancia-token");
      const requestConfig = {
        method: "POST",
        headers: {
          Authorization: token ?? "",
        },
      };

      setLoading(true);
      const requestUrl = `${apiBaseUrl}/user/request-community?communityId=${props.comunidade.id}`;
      const response = await fetch(requestUrl, requestConfig);

      if (response.status === 201) {
        setStatus("Pendente");
      }
    }
    catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <TableRow>
      <TableCell>
        <Chip
          label={status}
          variant="outlined"
          color={
            status === "Disponível" ? "secondary" :
              status === "Pendente" ? "warning" : "success"
          }
        />
      </TableCell>
      <TableCell>{props.comunidade.name}</TableCell>
      <TableCell align="right">
        <Button
          variant="contained"
          size="small"
          sx={{
            backgroundColor: "var(--roxo500)",
            width: "112px",
            height: "30px",
          }}
          disabled={status === "Aprovado" || status === "Pendente"}
          onClick={handleSolicitar}
        >
          {loading ? <CircularProgress sx={{ color: "var(--roxo100)" }} size={16} /> :
            status === "Disponível" ? "Solicitar" :
              status === "Pendente" ? "Solicitado" :
                "Participando"
          }
        </Button>
      </TableCell>
    </TableRow>
  );
}

export default LinhaSolicitacaoComunidade;