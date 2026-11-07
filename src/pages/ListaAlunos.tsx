import React from 'react';
import { useAlunos } from '../hooks/useAlunos';
import { useAppStore } from '../store/useAppStore';

export const ListaAlunos: React.FC = () => {
  const { data: alunos, isLoading, isError } = useAlunos();
  const { mostrarNotificacao } = useAppStore();

  const simularAcao = () => {
    mostrarNotificacao('Ação realizada com sucesso!', 'success');
  };

  if (isLoading) return <p>Carregando alunos...</p>;
  if (isError) return <p>Ocorreu um erro ao carregar os dados.</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Alunos Matriculados</h2>
      
      <button onClick={simularAcao} style={{ marginBottom: '10px' }}>
        Testar Notificação Global
      </button>

      {alunos?.length === 0 ? (
        <p>Nenhum aluno encontrado.</p>
      ) : (
        <ul>
          {alunos?.map((aluno) => (
            <li key={aluno.id}>
              <strong>{aluno.nome}</strong> - {aluno.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};