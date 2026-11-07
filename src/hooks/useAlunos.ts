import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';


export interface Aluno {
  id: string;
  nome: string;
  email: string;
}

const fetchAlunos = async (): Promise<Aluno[]> => {
  const response = await api.get<Aluno[]>('/alunos');
  return response.data;
};

export const useAlunos = () => {
  return useQuery({
    queryKey: ['alunos'],
    queryFn: fetchAlunos,
    staleTime: 1000 * 60 * 5,
  });
};