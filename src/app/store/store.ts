import { create } from 'zustand';
import data from '@/data.json';
import { Invoice, Status } from '../interfaces';

interface State {
  theme: string;
  setTheme: (theme: string) => void;
  invoices: Invoice[];
  filter: Status[];
  setFilter: (newFilter: Status[]) => void;
  updateInvoice: (invoice: Invoice) => void;
  deleteInvoice: (id: string) => void;
  createInvoice: (invoice: Invoice) => void;
}

const useStore = create<State>()((set) => ({
  theme: 'light',
  setTheme: (theme) => set((state) => ({ ...state, theme: theme })),
  invoices: [],
  filter: ['paid', 'pending', 'draft'],
  setFilter: (newFilter) => set((state) => ({ ...state, filter: newFilter })),
  updateInvoice: (invoice) =>
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
  createInvoice: (invoice) => set((state) => ({ ...state, invoices: state.invoices.concat(invoice) })),
}));

const invoicesFromData = data.map((invoice) => ({ ...invoice, status: invoice.status as Status }));

(function getState() {
  useStore.setState({ invoices: invoicesFromData });
})();

export default useStore;
