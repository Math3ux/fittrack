import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { TextField, Button, Box, Typography, Paper, CircularProgress } from '@mui/material';
import * as yup from 'yup'; // Importação do Yup
import { api } from '../services/api';
import { useAppStore } from '../store/useAppStore';

interface AlunoFormData {
  nome: string;
  email: string;
}

const alunoSchema = yup.object().shape({
  nome: yup.string()
    .required('O nome é obrigatório.')
    .min(3, 'O nome deve ter no mínimo 3 caracteres.'),
  email: yup.string()
    .email('Digite um formato de e-mail válido.')
    .required('O e-mail é obrigatório.')
});

export const FormularioAluno: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mostrarNotificacao } = useAppStore();
  
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState<AlunoFormData>({
    nome: '',
    email: '',
  });

  const { data: alunoEdit, isLoading: isLoadingFetch } = useQuery({
    queryKey: ['aluno', id],
    queryFn: async () => {
      const response = await api.get(`/alunos/${id}`);
      return response.data;
    },
    enabled: isEditMode,
  });

  useEffect(() => {
    if (alunoEdit) {
      setFormData({
        nome: alunoEdit.nome,
        email: alunoEdit.email,
      });
    }
  }, [alunoEdit]);

  const mutation = useMutation({
    mutationFn: async (dados: AlunoFormData) => {
      if (isEditMode) {
        const response = await api.put(`/alunos/${id}`, dados);
        return response.data;
      } else {
        const response = await api.post('/alunos', dados);
        return response.data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alunos'] });
      mostrarNotificacao(
        `Aluno ${isEditMode ? 'atualizado' : 'cadastrado'} com sucesso!`, 
        'success'
      );
      navigate('/alunos');
    },
    onError: () => {
      mostrarNotificacao('Erro ao salvar aluno. Tente novamente.', 'error');
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await alunoSchema.validate(formData);
      
      mutation.mutate(formData);
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        mostrarNotificacao(error.message, 'error');
      }
    }
  };

  if (isLoadingFetch) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}><CircularProgress /></Box>;
  }

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 500, margin: '40px auto' }}>
      <Typography variant="h5" component="h1" gutterBottom>
        {isEditMode ? 'Editar Aluno' : 'Cadastrar Novo Aluno'}
      </Typography>
      
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 2 }}>
        <TextField
          label="Nome Completo"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          fullWidth
          variant="outlined"
        />
        
        <TextField
          label="E-mail"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          variant="outlined"
        />
        
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
          <Button variant="outlined" color="secondary" onClick={() => navigate('/alunos')}>
            Cancelar
          </Button>
          <Button type="submit" variant="contained" color="primary" disabled={mutation.isPending}>
            {mutation.isPending ? 'Salvando...' : (isEditMode ? 'Salvar Alterações' : 'Salvar Aluno')}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};