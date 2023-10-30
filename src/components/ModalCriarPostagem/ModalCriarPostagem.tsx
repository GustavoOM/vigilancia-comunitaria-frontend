import { forwardRef, useImperativeHandle, useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import { Button, FormHelperText, IconButton } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import Select from "@mui/material/Select";
import Input from "../Input/Input";

const comunidades = ["ICMC"];

const tipos = ["Denúcia", "Alerta", "Ocorrência"];

export type ModalCriarPostagemHandles = {
  abrirModal: () => void;
};

const ModalCriarPostagem = forwardRef(function ModalCriarPostagem(props, ref) {
  const [mostrarModalCriarPostagem, setMostrarModalCriarPostagem] =
    useState(false);

  const [formData, setFormData] = useState({
    email: "",
    senha: "",
    lembrar: false,
  });
  function handleFormOnChange(event: FormEvent) {
    const { name, value, type, checked } = event.target as HTMLInputElement;

    setFormData((prev) => ({
      ...prev,
      [name]: type !== "checkbox" ? value : checked,
    }));
  }

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();
  };

  useImperativeHandle(ref, () => ({
    abrirModal() {
      setMostrarModalCriarPostagem(true);
    },
  }));

  return (
    <Dialog
      open={mostrarModalCriarPostagem}
      onClose={() => setMostrarModalCriarPostagem(false)}
      fullWidth
    >
      <form style={{ padding: "32px" }} onSubmit={handleFormSubmit}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "right",
          }}
        >
          <IconButton
            aria-label="close"
            onClick={() => setMostrarModalCriarPostagem(false)}
            sx={{
              marginLeft: "auto",
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </div>

        <FormHelperText
          style={{
            paddingBottom: "8px",
            font: "700 14px Roboto",
            color: "var(--roxo700)",
          }}
        >
          Comunidade
        </FormHelperText>

        <Select
          size="small"
          style={{ width: "100%", marginBottom: "16px" }}
          defaultValue={tipos[0]}
          onChange={handleFormOnChange}
        >
          {comunidades.map((comunidade, index) => (
            <option key={index} value={comunidade} style={{ padding: "8px" }}>
              {comunidade}
            </option>
          ))}
        </Select>

        <FormHelperText
          style={{
            paddingBottom: "8px",
            font: "700 14px Roboto",
            color: "var(--roxo700)",
          }}
        >
          Tipo
        </FormHelperText>

        <Select
          size="small"
          style={{ width: "100%", marginBottom: "16px" }}
          defaultValue={comunidades[0]}
          onChange={handleFormOnChange}
        >
          {tipos.map((tipo, index) => (
            <option key={index} value={tipo} style={{ padding: "8px" }}>
              {tipo}
            </option>
          ))}
        </Select>

        <Input
          handleOnChange={handleFormOnChange}
          label="Descrição"
          name="descricao"
          placeholder="Descrição"
          type="text"
          value={"fads"}
          required={false}
          rows={5}
          width="100%"
        />

        <FormHelperText
          style={{
            paddingBottom: "8px",
            font: "700 14px Roboto",
            color: "var(--roxo700)",
            marginTop: "16px",
          }}
        >
          Imagem
        </FormHelperText>

        {/* Para rever */}
        {/* <OutlinedInput
          placeholder="Enviar imagem"
          style={{
            minWidth: "100%",
            fontWeight: "500",
            fontSize: "",
          }}
          size="small"
          color="secondary"
          endAdornment={ */}

        {/* Não precisamos por agora */}
        {/* <div style={{ display: "flex", alignItems: "center" }}>
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="upload-button"
            multiple
            type="file"
          />
          <label htmlFor="upload-button">
            <FileUploadIcon style={{ color: "var(--roxo600)" }} />
          </label>
        </div> */}
        {/* }
        /> */}

        <Button
          size="large"
          variant="contained"
          style={{
            backgroundColor: "var(--roxo500)",
            width: "100%",
            minHeight: "26px",
            marginTop: "24px",
            textTransform: "capitalize",
            font: "500 17px Roboto",
          }}
          type="submit"
        >
          Enviar
        </Button>
      </form>
    </Dialog>
  );
});

export default ModalCriarPostagem;
