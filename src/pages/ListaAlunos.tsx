import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, Button, IconButton, Typography, Box, CircularProgress 
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

import { useAlunos } from '../hooks/useAlunos';
import { api } from '../services/api';
import { useAppStore } from '../store/useAppStore';

export const ListaAlunos: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  const { mostrarNotificacao } = useAppStore();
  const { data: alunos, isLoading, isError } = useAlunos();

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/alunos/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alunos'] });
      mostrarNotificacao('Aluno excluído com sucesso!', 'success');
    },
    onError: () => {
      mostrarNotificacao('Erro ao excluir aluno.', 'error');
    }
  });

  const handleDelete = (id: string, nome: string) => {
    if (window.confirm(`Tem certeza que deseja excluir a matrícula de ${nome}?`)) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}><CircularProgress /></Box>;
  if (isError) return <Typography color="error">Erro ao carregar os dados. Verifique sua conexão com a API.</Typography>;

  return (
    <Box sx={{ maxWidth: 800, margin: '40px auto', p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Alunos Matriculados
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddIcon />}
          onClick={() => navigate('/alunos/novo')}
        >
          Novo Aluno
        </Button>
      </Box>

      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell><strong>ID</strong></TableCell>
              <TableCell><strong>Nome</strong></TableCell>
              <TableCell><strong>E-mail</strong></TableCell>
              <TableCell align="center"><strong>Ações</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {alunos?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">Nenhum aluno cadastrado.</TableCell>
              </TableRow>
            ) : (
              alunos?.map((aluno) => (
                <TableRow key={aluno.id} hover>
                  <TableCell>{aluno.id}</TableCell>
                  <TableCell>{aluno.nome}</TableCell>
                  <TableCell>{aluno.email}</TableCell>
                  <TableCell align="center">
                    <IconButton 
                      color="primary" 
                      onClick={() => navigate(`/alunos/editar/${aluno.id}`)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton 
                      color="error" 
                      onClick={() => handleDelete(aluno.id, aluno.nome)}
                      disabled={deleteMutation.isPending}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};