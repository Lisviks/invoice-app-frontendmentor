import Image from 'next/image';
import ArrowIcon from '@/assets/icon-arrow-down.svg';
import PlusIcon from '@/assets/icon-plus.svg';
import styles from '@/app/styles/Actions.module.scss';

export default function Actions() {
  return (
    <div className={styles.actions}>
      <div className={styles.invoices}>
        <h2>Invoices</h2>
        <p>7 invoices</p>
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
