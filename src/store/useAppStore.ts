import { create } from 'zustand';

interface Notificacao {
  aberta: boolean;
  mensagem: string;
  tipo: 'success' | 'error';
}

interface AppState {
  notificacao: Notificacao;
  mostrarNotificacao: (mensagem: string, tipo?: 'success' | 'error') => void;
  fecharNotificacao: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  notificacao: {
    aberta: false,
    mensagem: '',
    tipo: 'success',
  },

  mostrarNotificacao: (mensagem, tipo = 'success') => set((state) => ({
    notificacao: { ...state.notificacao, aberta: true, mensagem, tipo }
  })),

  fecharNotificacao: () => set((state) => ({
    notificacao: { ...state.notificacao, aberta: false }
  })),
}));