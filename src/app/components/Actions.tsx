import Image from 'next/image';
import ArrowIcon from '@/assets/icon-arrow-down.svg';
import PlusIcon from '@/assets/icon-plus.svg';
import styles from '@/app/styles/Actions.module.scss';
import useStore from '../store/store';

export default function Actions() {
  const { invoices } = useStore();

  return (
    <div className={styles.actions}>
      <div className={styles.invoices}>
        <h2>Invoices</h2>
        <p>{invoices.length} invoices</p>
      </div>
      <div className={styles.filter}>
        Filter <Image src={ArrowIcon} alt='arrow icon' />
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
