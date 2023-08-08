import Actions from './components/Actions';
import Empty from './components/Empty';
import Header from './components/Header';
import InvoiceCard from './components/InvoiceCard';
import data from '@/data.json';

export default function Home() {
  // const data: any = [];
  return (
    <>
      <Header />
      <main>
        <Actions />
        <section className='invoices'>
          {data.length === 0 ? (
            <Empty />
          ) : (
            data.map((i) => {
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
