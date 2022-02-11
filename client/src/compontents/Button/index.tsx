import { Button as ButtonMui } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import React from "react";

const Button: React.FC<{
  buttonType: "default" | "Edit" | "Delete" | "Add";
  text: string;
  onClick?: Function;
  type?: "submit";
  style?: any;
}> = ({ children, buttonType, text, onClick, type, style }) => {
  let Icon = null;
  switch (buttonType) {
    case "Edit":
      Icon = <EditIcon />;
      break;
    case "Delete":
      Icon = <DeleteIcon />;
      break;
    case "Add":
      Icon = <AddIcon />;
      break;
    case "default":
      break;
  }

  return (
    <ButtonMui
      variant="outlined"
      startIcon={Icon}
      onClick={onClick ? () => onClick() : undefined}
      type={type ? type : undefined}
      sx={style}
    >
      {text}
    </ButtonMui>
  );
};

export default Button;
