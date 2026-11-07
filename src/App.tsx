import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ListaAlunos } from './pages/ListaAlunos';
import { RotaPrivada } from './routes/RotaPrivada';

const Home: React.FC = () => <div><h1>Bem-vindo à FitTrack</h1></div>;
const FormularioAluno: React.FC = () => <div><h2>Cadastro/Edição de Aluno</h2></div>;
const PaginaNaoEncontrada: React.FC = () => <div><h2>404 - Página não existe</h2></div>;

export const App: React.FC = () => {
  return (
    <BrowserRouter>
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