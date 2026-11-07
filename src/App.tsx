import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';

import { ListaAlunos } from './pages/ListaAlunos';
import { FormularioAluno } from './pages/FormularioAluno';
import { RotaPrivada } from './routes/RotaPrivada';
import { NotificacaoGlobal } from './components/NotificacaoGlobal';


const Home: React.FC = () => (
  <Box sx={{ textAlign: 'center', mt: 10 }}>
    <Typography variant="h3" gutterBottom>Bem-vindo à FitTrack</Typography>
    <Typography variant="subtitle1" gutterBottom>Sistema de Gestão de Academia</Typography>
    <Button variant="contained" component={Link} to="/alunos" sx={{ mt: 2 }}>
      Acessar Sistema
    </Button>
  </Box>
);

const PaginaNaoEncontrada: React.FC = () => (
  <Box sx={{ textAlign: 'center', mt: 10 }}>
    <Typography variant="h4">404 - Página não encontrada</Typography>
    <Button variant="outlined" component={Link} to="/" sx={{ mt: 2 }}>Voltar para Home</Button>
  </Box>
);

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <NotificacaoGlobal />
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route 
          path="/alunos" 
          element={
            <RotaPrivada>
              <ListaAlunos />
            </RotaPrivada>
          } 
        />
        <Route 
          path="/alunos/novo" 
          element={
            <RotaPrivada>
              <FormularioAluno />
            </RotaPrivada>
          } 
        />
        <Route 
          path="/alunos/editar/:id" 
          element={
            <RotaPrivada>
              <FormularioAluno />
            </RotaPrivada>
          } 
        />

        <Route path="*" element={<PaginaNaoEncontrada />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;