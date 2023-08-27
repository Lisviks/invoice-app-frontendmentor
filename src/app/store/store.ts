import { create } from 'zustand';
import data from '@/data.json';
import { Invoice } from '../interfaces';

interface State {
  invoices: Invoice[];
  filter: string[];
  setFilter: (newFilter: string[]) => void;
  updateForm: (invoice: Invoice) => void;
}

const useStore = create<State>()((set) => ({
  invoices: [],
  filter: ['paid', 'pending', 'draft'],
  setFilter: (newFilter) => set((state) => ({ ...state, filter: newFilter })),
  updateForm: (invoice: Invoice) =>
    set((state) => {
      return {
        ...state,
        invoices: state.invoices.map((item) => {
          if (item.id === invoice.id) {
            return invoice;
          } else {
            return item;
          }
        }),
      };
    }),
}));

(function getState() {
  useStore.setState({ invoices: data });
})();

export default useStore;
