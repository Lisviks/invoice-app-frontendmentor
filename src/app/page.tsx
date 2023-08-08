import Actions from './components/Actions';
import Header from './components/Header';
import InvoiceCard from './components/InvoiceCard';
import data from '@/data.json';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Actions />
        <section className='invoices'>
          {data.map((i) => {
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
          })}
        </section>
      </main>
    </>
  );
}
