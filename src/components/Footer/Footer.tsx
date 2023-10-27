import { useRef } from 'react';

import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ModalCriarPostagem, { ModalCriarPostagemHandles } from '../ModalCriarPostagem/ModalCriarPostagem';

function Footer() {
  const refModalCriarPostagem = useRef<ModalCriarPostagemHandles>(null);

  return (
    <>
      <ModalCriarPostagem ref={refModalCriarPostagem} />

      <BottomNavigation
        sx={{
          width: '100%',
          position: 'fixed',
          bottom: 0,
          boxShadow: '0px -4px 6px -1px rgba(0,0,0,0.2)',
        }}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon color='secondary' />} />
        <BottomNavigationAction
          label="Add Post"
          icon={<AddCircleIcon sx={{ fontSize: 40 }} color='secondary' />}
          onClick={() => refModalCriarPostagem.current?.abrirModal()}
        />
        <BottomNavigationAction label="Profile" icon={<AccountCircleIcon color='secondary' />} />
      </BottomNavigation>
    </>
  );
}

export default Footer;
