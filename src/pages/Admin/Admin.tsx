import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import AdminUsuarios from "../../components/AdminUsuarios/AdminUsuarios";
import AdminComunidades from "../../components/AdminComunidades/AdminComunidades";
import AdminConvites from "../../components/AdminConvites/AdminConvites";

import logo from "../../assets/logoWhite.svg";

import { AlertColor, Button, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Groups, Logout, Person, Mail } from "@mui/icons-material";

const drawerWidth = 218;

type SetAlertType = (alert: {
  message: string;
  severity: AlertColor | undefined;
}) => void;

const tabs = [
  {
    nome: "Usuários",
    icone: <Person sx={{ color: "white" }} />,
    componente: (key: string, setAlert: SetAlertType) => <AdminUsuarios key={key} setAlert={setAlert} />
  },
  {
    nome: "Comunidades",
    icone: <Groups sx={{ color: "white" }} />,
    componente: (key: string, setAlert: SetAlertType) => <AdminComunidades key={key} setAlert={setAlert} />
  },
  {
    nome: "Convites",
    icone: <Mail sx={{ color: "white" }} />,
    componente: (key: string, setAlert: SetAlertType) => <AdminConvites key={key} setAlert={setAlert} />
  }
];

type AdminProps = {
  setAlert: SetAlertType;
};

function Admin(props: AdminProps) {
  const { setAlert } = props;
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("vigilancia-token");
    if(!token){
      setAlert({ message: "Você deve primeiro fazer login!", severity: "warning" });
      navigate("/login");
      return;
    }

    const user = localStorage.getItem("vigilancia-user");
    if (user !== "admin") {
      navigate("/feed");
      setAlert({ message: "Não autorizado.", severity: "warning" });
      return;
    }
  }, [navigate, setAlert]);

  const [selectedTab, setSelectedTab] = useState("Comunidades");

  return (
    <>
      <Drawer
        open={false}
        variant="permanent"
        sx={{
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "var(--roxo700)"
          },
        }}
      >
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "24px",
          width: "100%",
          height: "100%"
        }}>
          <img src={logo} alt="Logo" style={{ height: 30 }} />
          <Divider sx={{ backgroundColor: "rgba(248,249,251, 0.3) ", width: "100%", marginTop: "20px" }} />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              height: "100%",
              justifyContent: "space-between"
            }}
          >
            <List style={{ width: "100%" }}>
              {tabs.map((tab) => (
                <ListItem
                  key={tab.nome}
                  disablePadding
                  style={{
                    color: "white",
                    backgroundColor: selectedTab === tab.nome ? "#303750" : ""
                  }}
                  onClick={() => setSelectedTab(tab.nome)}
                >
                  <ListItemButton>
                    <ListItemIcon>
                      {tab.icone}
                    </ListItemIcon>
                    <ListItemText primary={tab.nome} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>

            <div style={{ marginBottom: "8px" }}>
              <Divider sx={{ backgroundColor: "rgba(248,249,251, 0.3) ", width: "100%", marginBottom: "8px" }} />
              <Button
                sx={{ color: "white" }}
                fullWidth
                startIcon={<Logout />}
                onClick={() => {
                  localStorage.removeItem("vigilancia-token");
                  localStorage.removeItem("vigilancia-user");
                  navigate("/login");
                }}
              >
                Sair
              </Button>
            </div>
          </div>

        </div>
      </Drawer>

      <div style={{ marginLeft: drawerWidth, height: "100%" }}>

        <header style={{
          boxShadow: "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
          height: "73px",
          display: "flex",
          alignItems: "center",
          paddingLeft: "32px",
        }}>
          <h1
            style={{
              font: "500 22px Roboto, sans",
            }}
          >
            Painel de Administrador</h1>
        </header>

        {
          tabs.map(tab => {
            return selectedTab == tab.nome && tab.componente(tab.nome, setAlert)
          })
        }
      </div>
    </>
  );
}

export default Admin;
