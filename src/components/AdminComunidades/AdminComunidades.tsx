import { AlertColor, Button } from "@mui/material";
import Input from "../Input/Input";
import { FormEvent, FormEventHandler, useState } from "react";

export type AdminComunidadesProps = {
  setAlert: (alert: { message: string; severity: AlertColor | undefined }) => void;
};

function AdminComunidades(props: AdminComunidadesProps) {
  const [formData, setFormData] = useState({
    name: "",
  });

  function handleFormOnChange(event: FormEvent) {
    const { name, value, type, checked } = event.target as HTMLInputElement;

    setFormData((prev) => ({
      ...prev,
      [name]: type !== "checkbox" ? value : checked,
    }));
  }

  const requestCriarComunidade = async () => {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
    try {
      const token = localStorage.getItem("vigilancia-token");

      const requestConfig = {
        method: "POST",
        headers: {
          Authorization: token ?? "",
        },
      };

      const requestUrl = `${apiBaseUrl}/community/create`
        + `?name=${formData.name}`;

      const response = await fetch(
        requestUrl,
        requestConfig
      );

      if (response.status !== 201) {
        props.setAlert({
          message: "Erro ao criar comunidade!",
          severity: "error",
        });
        return;
      }

      props.setAlert({
        message: "Comunidade criada!",
        severity: "success",
      });
    } catch (error) {
      console.error(error);
    }
  }


  const handleFormSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    await requestCriarComunidade();
  };

  return (
    <div style={{ padding: "32px" }}>
      <h2 style={{ fontFamily: "Roboto, sans" }}>Comunidades</h2>

      <form
        className="FormContainer"
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: "80px",
          flexDirection: "column",
          gap: "16px",
        }}
        onSubmit={handleFormSubmit}
      >
        <Input
          label="Nome"
          placeholder="Digite o nome da comunidade"
          type="text"
          name="name"
          value={formData.name}
          required={true}
          handleOnChange={handleFormOnChange}
        />

        <Button
          size="large"
          variant="contained"
          style={{
            backgroundColor: "var(--roxo500)",
            minWidth: "360px",
            minHeight: "45px",
            marginTop: "16px",
            textTransform: "capitalize",
            font: "500 17px Roboto",
          }}
          type="submit"
        >
          Criar
        </Button>
      </form>
    </div>
  );
}

export default AdminComunidades;