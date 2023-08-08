import Actions from './components/Actions';
import Header from './components/Header';
import InvoiceCard from './components/InvoiceCard';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Actions />
        <section className='invoices'>
          <InvoiceCard id='RT3080' date='19 Aug 2021' name='Jensen Huang' amount={1800.9} status='paid' />
        </section>
      </main>
    </>
  );
}
