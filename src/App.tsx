import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

const Home = () => <div><h1>Gestão de Academia (FitTrack)</h1><Link to="/alunos">Ver Alunos</Link></div>;
const ListaAlunos = () => <div><h2>Lista de Alunos</h2><Link to="/">Voltar</Link></div>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/alunos" element={<ListaAlunos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;