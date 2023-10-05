import Image from 'next/image';
import ArrowIcon from '@/assets/icon-arrow-down.svg';
import PlusIcon from '@/assets/icon-plus.svg';
import styles from '@/app/styles/Actions.module.scss';
import useStore from '../store/store';
import Filter from './Filter';
import { useState } from 'react';
import EditInvoice from './EditInvoice';
import useWindowWidth from '../hooks/useWindowSize';
import useDisableScroll from '../hooks/useDisableScroll';

export default function Actions() {
  const [openEditInvoice, setOpenEditInvoice] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const { invoices, filter } = useStore();
  const handleCloseEdit = () => setTimeout(() => setOpenEditInvoice(false), 300);
  const filteredInvoices = invoices.filter((i) => {
    if (filter.includes(i.status)) return i;
  });
  const screenWidth = useWindowWidth();

  useDisableScroll(openEditInvoice);

  return (
    <>
      <div className={styles.actions}>
        <div className={styles.invoices}>
          <h2>Invoices</h2>
          <p>
            {filteredInvoices.length === 0
              ? 'No invoices'
              : screenWidth < 768
              ? `${filteredInvoices.length} invoices`
              : `There are ${filteredInvoices.length} total invoices`}
          </p>
        </div>
        <div className={showFilter ? styles.show_filter : styles.filter}>
          <div onClick={() => setShowFilter((state) => !state)}>
            {screenWidth < 768 ? 'Filter' : 'Filter by status'} <Image src={ArrowIcon} alt='arrow icon' />
          </div>
          {showFilter && <Filter />}
        </div>
        <div className={styles.new_invoice} onClick={() => setOpenEditInvoice((state) => !state)}>
          <div>
            <Image src={PlusIcon} alt='plus icon' />
          </div>
          {screenWidth < 768 ? 'New' : 'New Invoice'}
        </div>
      </div>
      {openEditInvoice && <EditInvoice isOpen={openEditInvoice} handleCloseEdit={handleCloseEdit} newInvoice={true} />}
    </>
  );
}
