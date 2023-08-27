import { create } from 'zustand';
import data from '@/data.json';
import { Invoice } from '../interfaces';

interface State {
  theme: string;
  setTheme: (theme: string) => void;
  invoices: Invoice[];
  filter: string[];
  setFilter: (newFilter: string[]) => void;
  updateInvoice: (invoice: Invoice) => void;
  deleteInvoice: (id: string) => void;
}

const useStore = create<State>()((set) => ({
  theme: 'light',
  setTheme: (theme) => set((state) => ({ ...state, theme: theme })),
  invoices: [],
  filter: ['paid', 'pending', 'draft'],
  setFilter: (newFilter) => set((state) => ({ ...state, filter: newFilter })),
  updateInvoice: (invoice: Invoice) =>
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
  deleteInvoice: (id) => set((state) => ({ ...state, invoices: state.invoices.filter((item) => item.id !== id) })),
}));

(function getState() {
  useStore.setState({ invoices: data });
})();

export default useStore;
