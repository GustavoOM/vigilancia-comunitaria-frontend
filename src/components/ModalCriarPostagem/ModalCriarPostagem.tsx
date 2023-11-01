import { useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { Button, FormHelperText, IconButton } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import Select from "@mui/material/Select";
import Input from "../Input/Input";
const comunidades = ["ICMC"];

const tipos = ["OCORRENCIA", "ALERTA", "DENUNCIA"];
const status = ["PENDENTE", "APROVADO", "REPROVADO"];

export type ModalCriarPostagemHandles = {
  handleClose: (bool: boolean) => void;
  isOpen: boolean;
};

const ModalCriarPostagem = function ModalCriarPostagem(
  props: ModalCriarPostagemHandles
) {
  const [formData, setFormData] = useState({
    content: "",
    idCommunity: 1,
    status: status[0],
    title: "teste",
    type: "ALERTA",
  });

  function handleFormOnChange(event) {
    const { name, value, type, checked } = event.target as HTMLInputElement;

    setFormData((prev) => ({
      ...prev,
      [name]: type !== "checkbox" ? value : checked,
    }));
  }

  async function requestCreatePostagem() {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
    console.log({ formData });
    try {
      const token = localStorage.getItem("vigilancia-token");

      const requestConfig = {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      };

      const response = await fetch(
        `${apiBaseUrl}/post/create-post`,
        requestConfig
      );
      const data = await response.json();

      console.log({ data });

      // if (response.status !== 200) {
      //   props.setAlert({
      //     message: "Erro ao realizar login!",
      //     severity: "error",
      //   });
      //   return;
      // }
      // console.log(data);

      // props.setAlert({
      //   message: "Login realizado!",
      //   severity: "success",
      // });

      // setTimeout(() => {
      //   navigate("/feed");
      // }, 1000);
    } catch (error) {
      // props.setAlert({
      //   message: "Erro ao realizar login!",
      //   severity: "error",
      // });

      // setFormData({ email: "", senha: "", lembrar: false });

      console.error(error);
    }
  }

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();

    await requestCreatePostagem();
  };

  return (
    <Dialog
      open={props.isOpen}
      onClose={() => props.handleClose(false)}
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
            onClick={() => props.handleClose(false)}
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
          name="comunidades"
          style={{ width: "100%", marginBottom: "16px" }}
          defaultValue={comunidades[0]}
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
          name="type"
          style={{ width: "100%", marginBottom: "16px" }}
          defaultValue={tipos[0]}
          onChange={handleFormOnChange}
        >
          {tipos.map((tipo, index) => (
            <option key={index} value={tipo} style={{ padding: "8px" }}>
              {tipo}
            </option>
          ))}
        </Select>

        <Input
          label="Descrição"
          placeholder="Digite a descrição do seu post"
          type="text"
          name="content"
          value={formData.content}
          required={false}
          rows={5}
          width="100%"
          handleOnChange={handleFormOnChange}
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

        {/* Não precisamos por agora */}
        <div style={{ display: "flex", alignItems: "center" }}>
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
        </div>
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
};

export default ModalCriarPostagem;
