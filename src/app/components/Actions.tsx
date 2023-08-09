import Image from 'next/image';
import ArrowIcon from '@/assets/icon-arrow-down.svg';
import PlusIcon from '@/assets/icon-plus.svg';
import styles from '@/app/styles/Actions.module.scss';
import useStore from '../store/store';
import Filter from './Filter';
import { useState } from 'react';

export default function Actions() {
  const { invoices, filter } = useStore();

  const filteredInvoices = invoices.filter((i) => {
    if (filter.includes(i.status)) return i;
  });

  const [showFilter, setShowFilter] = useState(false);

  return (
    <div className={styles.actions}>
      <div className={styles.invoices}>
        <h2>Invoices</h2>
        <p>{filteredInvoices.length} invoices</p>
      </div>
      <div className={showFilter ? styles.show_filter : styles.filter}>
        <div onClick={() => setShowFilter((state) => !state)}>
          Filter <Image src={ArrowIcon} alt='arrow icon' />
        </div>
        {showFilter && <Filter />}
      </div>
      <div className={styles.new_invoice}>
        <div>
          <Image src={PlusIcon} alt='plus icon' />
        </div>
        New
      </div>
    </div>
  );
}
