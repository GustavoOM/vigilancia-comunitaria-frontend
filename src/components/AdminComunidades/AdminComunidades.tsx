import { AlertColor } from "@mui/material";
import { useEffect, useState } from "react";
import { Comunidade } from "../../types/types";
import TabelaComunidades from "../TabelaComunidades/TabelaComunidades";
import DetalhesComunidade from "../DetalhesComunidade/DetalhesComunidade";

export type AdminComunidadesProps = {
  setAlert: (alert: { message: string; severity: AlertColor | undefined }) => void;
};

function AdminComunidades(props: AdminComunidadesProps) {
  const [comunidades, setComunidades] = useState<Comunidade[]>();
  const [comunidadeSelecionada, setComunidadeSelecionada] = useState<number | null>(null);

  const getCommunities = async () => {
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

      const requestUrl = `${apiBaseUrl}/community`;
      const response = await fetch(requestUrl, requestConfig);
      const comunidadesData = await response.json();

      setComunidades(comunidadesData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCommunities()
  }, []);

  return (
    <div style={{ padding: "32px" }}>
      {comunidadeSelecionada === null &&
        <TabelaComunidades
          comunidades={comunidades}
          setComunidadeSelecionada={setComunidadeSelecionada}
          setAlert={props.setAlert}
          recarregarComunidades={getCommunities}
        />
      }
      {comunidades && comunidades.map(comunidade => (
        comunidadeSelecionada === comunidade.id &&
        <DetalhesComunidade
          key={comunidade.id}
          comunidade={comunidade}
          setComunidadeSelecionada={setComunidadeSelecionada}
        />
      ))}
    </div>
  );
}

export default AdminComunidades;