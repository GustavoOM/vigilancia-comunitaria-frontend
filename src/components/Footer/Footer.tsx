import { useState } from "react";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import HomeIcon from "@mui/icons-material/Home";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import ModalCriarPostagem from "../ModalCriarPostagem/ModalCriarPostagem";

function Footer() {
  const [isModalOpen, setModalIsOpen] = useState(false);

  return (
    <>
      {isModalOpen && (
        <ModalCriarPostagem isOpen={isModalOpen} handleClose={setModalIsOpen} />
      )}

      <BottomNavigation
        sx={{
          width: "100%",
          position: "fixed",
          bottom: 0,
          boxShadow: "0px -4px 6px -1px rgba(0,0,0,0.2)",
        }}
      >
        <BottomNavigationAction
          label="Home"
          icon={<HomeIcon color="secondary" />}
        />
        <BottomNavigationAction
          label="Add Post"
          icon={<AddCircleIcon sx={{ fontSize: 40 }} color="secondary" />}
          onClick={() => setModalIsOpen(true)}
        />
        <BottomNavigationAction
          label="Profile"
          icon={<AccountCircleIcon color="secondary" />}
        />
      </BottomNavigation>
    </>
  );
}

export default Footer;
