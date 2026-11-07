import React from 'react';
import { Snackbar, Alert } from '@mui/material';
import { useAppStore } from '../store/useAppStore';

export const NotificacaoGlobal: React.FC = () => {
  const { notificacao, fecharNotificacao } = useAppStore();

  return (
    <Snackbar
      open={notificacao.aberta}
      autoHideDuration={4000}
      onClose={fecharNotificacao}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert 
        onClose={fecharNotificacao} 
        severity={notificacao.tipo} 
        variant="filled"
        sx={{ width: '100%' }}
      >
        {notificacao.mensagem}
      </Alert>
    </Snackbar>
  );
};