import { useEffect, useState } from "react";
import { Convite } from "../../types/types";
import { Button, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ThemeProvider, createTheme, Box, AlertColor } from "@mui/material";
import TableToolbar from "../TableToolbar/TableToolbar";
import { SpaceBar } from "@mui/icons-material";

export type AdminConviteProps = {
  setAlert: (alert: { message: string; severity: AlertColor | undefined }) => void;
};

function AdminConvites(props: AdminConviteProps) {

  const [convites, setConvites] = useState<Convite[]>();

  const handleAprovarOuNegar = async(convite:Convite, situacao: boolean) => {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
    const sendData = {
      accept: situacao,
      communityId: convite.communityId,
      userEmail: convite.userEmail
    };

    try {
      const token = localStorage.getItem("vigilancia-token");
      const apiRequestUrl = `${apiBaseUrl}/admin`;
      const requestConfig = {
        method: "PUT",
        headers: {
          Authorization: token ?? "",
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sendData),
      };


      const response = await fetch(apiRequestUrl, requestConfig);

      setConvites(convites);

      if (response.ok) {
        setConvites(prev => prev?.filter(c =>
          c.userEmail !== convite.userEmail || c.communityId !== convite.communityId));
        if(situacao){
          props.setAlert({
            message: "Aprovado com sucesso!",
            severity: "success"
          });
        }
        else{
          props.setAlert({
            message: "Negado com sucesso!",
            severity: "success"
          });
        }
        
      } else {
        props.setAlert({
          message: "Erro ao realizar operação!",
          severity: "error",
        });
        return;
        alert(`Erro ao efetuar ação: ${response.statusText}`);
      }
    
    } catch (error) {
      alert(`Erro ao efetuar ação: ${error}`);
    }
  }

  const columns = [
    {
      title: "Id comunidade",
      selector: "communityId",
    },
    {
      title: "Nome comunidade",
      selector: "communityName",
    },
    {
      title: "Nome usuário",
      selector: "userName",
    },
    {
      title: "Email usuário",
      selector: "userEmail",
    },
    {
      title: "Aprovar/Negar",
      selector: "status",
    }
  ];

  useEffect(() => {
    const getConvites = async () => {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
      try {
        const token = localStorage.getItem("vigilancia-token");
        const requestConfig = {
          method: "GET",
          headers: {
            Authorization: token ?? "",
          },
        };

        const requestUrl = `${apiBaseUrl}/admin/invites`;
        const response = await fetch(requestUrl, requestConfig);
        const data = await response.json();

        setConvites(data);

      } catch (error) {
        console.error(error);
      }
    }

    getConvites();
  }, []);

  const theme = createTheme({
    palette: {
      secondary: {
        main: '#3C096C'
      }
    }
  });

  return (
    <TableContainer component={Paper} sx={{ height: "100%" }}>
      {!convites ?
        <ThemeProvider theme={theme}>
          <LinearProgress color="secondary" />
        </ThemeProvider> :
        <>
          <TableToolbar
            title={"Convites pendentes"}
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
              {convites.map(convite => (
                <TableRow key={convite.userEmail}>
                  {columns.map(column => (
                    column.title == "Aprovar/Negar"?
                      <TableCell key={column.title}>
                        <Box>
                          <Button 
                            variant="contained"
                            color="success"
                            onClick={() => handleAprovarOuNegar(convite, true)}
                          >
                            Aprovar
                          </Button>
                          <SpaceBar sx={{ width: 4 }} />
                          <Button 
                            variant="contained"
                            color="error"
                            onClick={() => handleAprovarOuNegar(convite, false)}
                          >
                            Negar
                          </Button>
                        </Box>
                      </TableCell>
                    :
                    <TableCell key={column.title}>{convite[column.selector as keyof Convite]}</TableCell>
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

export default AdminConvites;