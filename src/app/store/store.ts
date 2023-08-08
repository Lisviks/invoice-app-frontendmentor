import { create } from 'zustand';
import data from '@/data.json';

interface Address {
  street: string;
  city: string;
  postCode: string;
  country: string;
}

interface Item {
  name: string;
  quantity: number;
  price: number;
  total: number;
}

interface Invoice {
  id: string;
  createdAt: string;
  paymentDue: string;
  description: string;
  paymentTerms: number;
  clientName: string;
  clientEmail: string;
  status: string;
  senderAddress: Address;
  clientAddress: Address;
  items: Item[];
  total: number;
}

interface State {
  invoices: Invoice[];
}

const useStore = create<State>()((set) => ({
  invoices: [],
}));

(function getState() {
  useStore.setState({ invoices: data });
})();

export default useStore;
