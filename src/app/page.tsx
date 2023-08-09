'use client';

import Actions from './components/Actions';
import Empty from './components/Empty';
import Header from './components/Header';
import InvoiceCard from './components/InvoiceCard';
import useStore from './store/store';

export default function Home() {
  const { invoices, filter } = useStore();

  const filteredInvoices = invoices.map((i) => {
    if (filter.includes(i.status)) {
      return (
        <InvoiceCard key={i.id} id={i.id} date={i.paymentDue} name={i.clientName} amount={i.total} status={i.status} />
      );
    }
  });

  return (
    <>
      <Header />
      <main>
        <Actions />
        <section className='invoices'>
          {filteredInvoices.filter((i) => i).length === 0 ? <Empty /> : filteredInvoices}
        </section>
      </main>
    </>
  );
}
