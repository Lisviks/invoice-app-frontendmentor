import styles from '@/app/styles/InvoiceCard.module.scss';
import Link from 'next/link';
import formatDate from '../util/formatDate';
import { Status } from '../types';
import ArrowRight from '@/assets/icon-arrow-right.svg';
import Image from 'next/image';

interface Props {
  id: string;
  date: string;
  name: string;
  amount: number;
  status: Status;
}

export default function InvoiceCard({ id, date, name, amount, status }: Props) {
  const statusStyle = status === 'paid' ? styles.paid : status === 'pending' ? styles.pending : styles.draft;

  return (
    <Link href={`invoice/${id}`} className={styles.invoice_card}>
      <div className={styles.id}>
        #<span>{id}</span>
      </div>
      <div className={styles.date}>
        Due <span>{formatDate(date)}</span>
      </div>
      <div className={styles.name}>{name}</div>
      <div className={styles.amount}>£ {amount.toFixed(2)}</div>
      <div className={statusStyle}>
        <div></div>
        {status}
      </div>
      <div className={styles.arrow_right}>
        <Image src={ArrowRight} alt='arrow right' />
      </div>
    </Link>
  );
}
