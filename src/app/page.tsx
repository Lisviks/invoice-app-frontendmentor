'use client';

import Actions from './components/Actions';
import Empty from './components/Empty';
import Header from './components/Header';
import InvoiceCard from './components/InvoiceCard';
import useStore from './store/store';

export default function Home() {
  const { invoices } = useStore();

  return (
    <>
      <Header />
      <main>
        <Actions />
        <section className='invoices'>
          {invoices.length === 0 ? (
            <Empty />
          ) : (
            invoices.map((i) => {
              return (
                <InvoiceCard
                  key={i.id}
                  id={i.id}
                  date={i.paymentDue}
                  name={i.clientName}
                  amount={i.total}
                  status={i.status}
                />
              );
            })
          )}
        </section>
      </main>
    </>
  );
}
