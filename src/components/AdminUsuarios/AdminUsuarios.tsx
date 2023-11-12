import { AlertColor } from "@mui/material";

export type AdminUsuariosProps = {
  setAlert: (alert: { message: string; severity: AlertColor | undefined }) => void;
};

function AdminUsuarios(props: AdminUsuariosProps) {
  return (
    <div style={{ padding: "32px" }}>
      <h2 style={{ fontFamily: "Roboto, sans" }}>Usuários</h2>
    </div>
  );
}

export default AdminUsuarios;