import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Comunidade } from "../../types/types";
import { useEffect, useState } from "react";
import { LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ThemeProvider, createTheme } from "@mui/material";
import TableToolbar from "../../components/TableToolbar/TableToolbar";
import LinhaSolicitacaoComunidade from "../../components/LinhaSolicitacaoComunidade/LinhaSolicitacaoComunidade";

type ResponseType = {
  approved: Comunidade[],
  pending: Comunidade[],
  available: Comunidade[],
}

type ComunidadesStatus = Comunidade & { status: string };

function Comunidades() {
  const [comunidades, setComunidades] = useState<ComunidadesStatus[] | undefined>();

  useEffect(() => {
    const getComunidades = async () => {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
      try {
        const token = localStorage.getItem("vigilancia-token");
        const requestConfig = {
          method: "GET",
          headers: {
            Authorization: token ?? "",
          },
        };

        setComunidades(undefined);

        const requestUrl = `${apiBaseUrl}/user/communities-by-status`;
        const response = await fetch(requestUrl, requestConfig);
        const comunidadesData = await response.json();

        console.log(comunidadesData);

        const comunidadesFormatadas: ComunidadesStatus[] = [];

        for (const key in comunidadesData) {
          const status = (() => {
            switch (key) {
              case "approved":
                return "Aprovado";
              case "pending":
                return "Pendente";
              case "available":
                return "Disponível";
              default:
                return "Disponível";
            }
          })();

          comunidadesData[key as keyof ResponseType].forEach((comunidade: Comunidade) => {
            comunidadesFormatadas.push({
              id: comunidade.id,
              name: comunidade.name,
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

      } catch (error) {
        console.error(error);
      }
    }

    getComunidades();
  }, []);

  const theme = createTheme({
    palette: {
      secondary: {
        main: '#3C096C'
      }
    }
  });

  return (
    <div style={{ paddingBottom: "56px", paddingTop: "12px" }}>
      <Header />

      <div>
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