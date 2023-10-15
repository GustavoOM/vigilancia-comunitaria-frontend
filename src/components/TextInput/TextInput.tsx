import { FormHelperText, IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { FormEvent, useState } from "react";

type TextInputProps = {
  label: string,
  placeholder: string,
  type: string,
  name: string,
  value: string | boolean,
  required: boolean,
  handleOnChange: (event: FormEvent) => void,
}

function TextInput(props: TextInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <FormHelperText
        style={{
          paddingBottom: "8px",
          font: "700 14px Roboto",
          color: "var(--roxo700)"
        }}
      >
        { props.label }
      </FormHelperText>

      <OutlinedInput
        name={props.name}
        value={props.value}
        onChange={props.handleOnChange}
        type={
          props.type !== "password"
            ? props.type
            : showPassword === true
              ? "text"
              : "password"
        }
        required={props.required}
        placeholder={props.placeholder}
        style={{
          minWidth: "360px",
          fontWeight: "500",
          fontSize: "",
        }}
        size="small"
        color="secondary"
        endAdornment={props.type === "password" &&
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setShowPassword(prev => !prev)}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
    </div>
  )
}

export default TextInput;