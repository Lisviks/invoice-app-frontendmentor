import { create } from 'zustand';
import data from '@/data.json';
import { Invoice } from '../interfaces';

interface State {
  invoices: Invoice[];
  filter: string[];
  setFilter: (newFilter: string[]) => void;
}

const useStore = create<State>()((set) => ({
  invoices: [],
  filter: ['paid', 'pending', 'draft'],
  setFilter: (newFilter) => set((state) => ({ ...state, filter: newFilter })),
}));

(function getState() {
  useStore.setState({ invoices: data });
})();

export default useStore;
