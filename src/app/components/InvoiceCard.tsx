import styles from '@/app/styles/InvoiceCard.module.scss';

interface Props {
  id: string;
  date: string;
  name: string;
  amount: number;
  status: string;
}

export default function InvoiceCard({ id, date, name, amount, status }: Props) {
  const statusStyle = status === 'paid' ? styles.paid : status === 'pending' ? styles.pending : styles.draft;

  return (
    <div className={styles.invoice_card}>
      <div className={styles.id}>
        #<span>{id}</span>
      </div>
      <div className={styles.date}>
        Due <span>{date}</span>
      </div>
      <div className={styles.name}>{name}</div>
      <div className={styles.amount}>£ {amount.toFixed(2)}</div>
      <div className={statusStyle}>
        <div></div>
        {status}
      </div>
    </div>
  );
}
