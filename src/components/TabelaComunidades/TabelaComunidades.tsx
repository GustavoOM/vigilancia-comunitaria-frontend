import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Comunidade } from "../../types/types";
import { AlertColor, Button, IconButton, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from "@mui/material";
import TableToolbar from "../TableToolbar/TableToolbar";
import { Add } from "@mui/icons-material";
import ModalCriarComunidade from "../ModalCriarComunidade/ModalCriarComunidade";
import { useState } from "react";

type TabelaComunidadesTipo = {
  comunidades: Comunidade[] | undefined,
  setComunidadeSelecionada: (state: number | null) => void,
  setAlert: (alert: { message: string; severity: AlertColor | undefined }) => void;
  recarregarComunidades: () => Promise<void>;
};

function TabelaComunidades(props: TabelaComunidadesTipo) {
  const [isModalCriarComunidadeOpen, setIsModalCriarComunidadeOpen] = useState(false);

  const columns = [
    {
      title: "Identificador",
      selector: "id",
    },
    {
      title: "Nome",
      selector: "name",
    },
  ];

  const theme = createTheme({
    palette: {
      secondary: {
        main: '#3C096C'
      }
    }
  });

  return (
    <>
      {isModalCriarComunidadeOpen &&
        <ModalCriarComunidade
          handleClose={setIsModalCriarComunidadeOpen}
          isOpen={isModalCriarComunidadeOpen}
          setAlert={props.setAlert}
          recarregarComunidades={props.recarregarComunidades}
        />
      }
      <TableContainer component={Paper}>
        {!props.comunidades ?
          <ThemeProvider theme={theme}>
            <LinearProgress color="secondary" />
          </ThemeProvider> :
          <>
            <TableToolbar
              title="Comunidades"
              actions={
                <Tooltip title="Criar comunidade">
                  <IconButton onClick={() => setIsModalCriarComunidadeOpen(true)}>
                    <Add sx={{ color: "var(--roxo600)" }} />
                  </IconButton>
                </Tooltip>}
            />
            <Table>
              <TableHead>
                <TableRow>
                  {columns.map(column => (
                    <TableCell key={column.title}>{column.title}</TableCell>
                  ))}
                  <TableCell />
                </TableRow>
              </TableHead>

              <TableBody>
                {props.comunidades.map(comunidade => (
                  <TableRow key={comunidade.id}>
                    {columns.map(column => (
                      <TableCell key={column.title}>{comunidade[column.selector as keyof Comunidade]}</TableCell>
                    ))}
                    <TableCell align="right">
                      <Button
                        sx={{ color: "var(--roxo500)" }}
                        onClick={() => props.setComunidadeSelecionada(comunidade.id)}
                      >
                        Detalhes
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        }
      </TableContainer>
    </>
  )
}

export default TabelaComunidades;