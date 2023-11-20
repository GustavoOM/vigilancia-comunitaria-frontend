import { FormEvent, FormEventHandler, useState } from "react";

import Input from "../Input/Input";

import { AlertColor, Button, IconButton } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { Close } from "@mui/icons-material";

type ModalCriarComunidadeTipo = {
  handleClose: (bool: boolean) => void;
  isOpen: boolean;
  setAlert: (alert: { message: string; severity: AlertColor | undefined }) => void;
  recarregarComunidades: () => Promise<void>;
};

function ModalCriarComunidade(props: ModalCriarComunidadeTipo) {
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

    props.handleClose(false);

    await props.recarregarComunidades();
  };

  return (
    <Dialog
      open={props.isOpen}
      onClose={() => props.handleClose(false)}
      fullWidth
    >
      <form
        className="FormContainer"
        style={{ padding: "32px" }}
        onSubmit={handleFormSubmit}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "right",
          }}
        >
          <IconButton
            aria-label="close"
            onClick={() => props.handleClose(false)}
            sx={{
              marginLeft: "auto",
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <Close />
          </IconButton>
        </div>
        <Input
          label="Nome"
          placeholder="Digite o nome da comunidade"
          type="text"
          name="name"
          value={formData.name}
          required={true}
          handleOnChange={handleFormOnChange}
          width="100%"
        />

        <Button
          size="large"
          variant="contained"
          style={{
            backgroundColor: "var(--roxo500)",
            width: "100%",
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
    </Dialog>
  );
}

export default ModalCriarComunidade;