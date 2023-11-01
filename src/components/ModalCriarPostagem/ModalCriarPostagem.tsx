import { FormEvent, useState } from "react";

import Input from "../Input/Input";

import { Button, Chip, FormHelperText, IconButton, MenuItem } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import CloseIcon from "@mui/icons-material/Close";
import ClearIcon from '@mui/icons-material/Clear';
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { styled } from '@mui/material/styles';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const comunidades = [{ id: 1, nome: "ICMC" }];
const comunidade_padrao = comunidades[0].id;

const tipos = ["OCORRENCIA", "ALERTA", "DENUNCIA"];
const tipo_padrao = tipos[0];

const status = ["PENDENTE", "APROVADO", "REPROVADO"];
const status_padrao = status[0];

export type ModalCriarPostagemHandles = {
  handleClose: (bool: boolean) => void;
  isOpen: boolean;
};

const ModalCriarPostagem = function ModalCriarPostagem(
  props: ModalCriarPostagemHandles
) {
  const [formData, setFormData] = useState({
    content: "",
    idCommunity: comunidade_padrao,
    status: status_padrao,
    type: tipo_padrao,
    image: null as File | null,
  });

  function handleFormOnChange(event: (FormEvent | SelectChangeEvent<string | number>)) {
    const { name, value, type, checked } = event.target as HTMLInputElement;

    setFormData((prev) => ({
      ...prev,
      [name]: type !== "checkbox" ? value : checked,
    }));
  }

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();

    await requestCreatePostagem();
    props.handleClose(false);
    window.location.reload();
  };

  const handleRemoveImage = () => {
    setFormData(prev => ({
      ...prev,
      image: null
    }));
  }

  async function requestCreatePostagem() {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
    
    console.log({ formData });

    try {
      const token = localStorage.getItem("vigilancia-token");

      const imageFormData = new FormData();
      imageFormData.append("image", formData.image as Blob);

      const requestConfig = {
        method: "POST",
        headers: {
          Authorization: token ?? "",
        },
        body: formData.image ? imageFormData : null,
      };

      const requestUrl = `${apiBaseUrl}/post/create-post`
        + `?idCommunity=${formData.idCommunity}`
        + `&status=${formData.status}`
        + `&content=${formData.content}`
        + `&type=${formData.type}`;

      const response = await fetch(
        requestUrl,
        requestConfig
      );

      const data = await response.json();
      console.log({ data });
    } catch (error) {
      console.error(error);
    }
  }

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
          name="idCommunity"
          style={{ width: "100%", marginBottom: "16px" }}
          value={formData.idCommunity}
          onChange={handleFormOnChange}
        >
          {comunidades.map((comunidade, index) => (
            <MenuItem key={index} value={comunidade.id} style={{ padding: "8px" }}>
              {comunidade.nome}
            </MenuItem>
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
          value={formData.type}
          onChange={handleFormOnChange}
        >
          {tipos.map((tipo, index) => (
            <MenuItem key={index} value={tipo} style={{ padding: "8px" }}>
              {tipo}
            </MenuItem>
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

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <IconButton component="label">
            <FileUploadIcon style={{ color: "var(--roxo600)" }} />
            <VisuallyHiddenInput type="file" accept="image/*" onChange={(event) => {
              setFormData(prev => ({
                ...prev,
                image: event.target.files && event.target.files[0]}
              ));
            }} />
          </IconButton>

          { formData.image
            ? 
              <Chip
                sx={{
                  color: "var(--roxo500)",
                  height: "30px",
                  fontSize: "13px",
                  fontWeight: "bold",
                  padding: "6px",
                  borderWidth: "1px",
                  borderColor: "var(--roxo500)"
                }}
                variant="outlined"
                deleteIcon={<ClearIcon style={{color: "var(--roxo500)", fontSize: "18px"}} />}
                label={formData.image?.name}
                onDelete={handleRemoveImage}
              />
            : <p
                style={{
                  color: "var(--roxo500)",
                  fontFamily: "Roboto",
                  fontSize: "13px",
                  fontWeight: "bold",
                }}
              >
                Nenhuma imagem selecionada
              </p>
          }
        </div>

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
