import { useEffect, useState } from "react";
import { Comunidade, Usuario } from "../../types/types";
import { IconButton, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ThemeProvider, Tooltip, createTheme } from "@mui/material";
import TableToolbar from "../TableToolbar/TableToolbar";
import { ArrowBack } from "@mui/icons-material";

type DetalhesComunidadeTipo = {
  comunidade: Comunidade,
  setComunidadeSelecionada: (state: number | null) => void,
};

function DetalhesComunidade(props: DetalhesComunidadeTipo) {
  const [usuarios, setUsuarios] = useState<Usuario[]>();

  const columns = [
    {
      title: "Nome",
      selector: "name",
    },
    {
      title: "Email",
      selector: "email",
    },
    {
      title: "Nível de Permissão",
      selector: "permission",
    },
  ];


  useEffect(() => {
    const getUsuarios = async () => {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
      try {
        const token = localStorage.getItem("vigilancia-token");
        const requestConfig = {
          method: "GET",
          headers: {
            Authorization: token ?? "",
          },
        };

        const requestUrl = `${apiBaseUrl}/user/by-community/${props.comunidade.id}`;
        const response = await fetch(requestUrl, requestConfig);
        const data = await response.json();

        setUsuarios(data);
      } catch (error) {
        console.error(error);
      }
    }

    getUsuarios();
  }, [props.comunidade.id]);

  const theme = createTheme({
    palette: {
      secondary: {
        main: '#3C096C'
      }
    }
  });

  return (
    <TableContainer component={Paper} sx={{ height: "100%" }}>
      {!usuarios ?
        <ThemeProvider theme={theme}>
          <LinearProgress color="secondary" />
        </ThemeProvider> :
        <>
          <TableToolbar
            title={`Usuários (${props.comunidade.name})`}
            actions={
              <Tooltip title="Voltar">
                <IconButton onClick={() => props.setComunidadeSelecionada(null)}>
                  <ArrowBack sx={{ color: "var(--roxo600)" }} />
                </IconButton>
              </Tooltip>}
          />
          <Table>
            <TableHead>
              <TableRow>
                {columns.map(column => (
                  <TableCell key={column.title}>{column.title}</TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {usuarios.map(usuario => (
                <TableRow key={usuario.email}>
                  {columns.map(column => (
                    <TableCell key={column.title}>{usuario[column.selector as keyof Usuario]}</TableCell>
                  ))}

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      }
    </TableContainer>
  )
}

export default DetalhesComunidade;