import { Item } from '@/app/interfaces';
import styles from '@/app/styles/TabletSummary.module.scss';

export default function TabletSummary({ items }: { items: Item[] }) {
  return (
    <table className={styles.items_table}>
      <thead className={styles.header}>
        <tr>
          <th className={styles.cell}>Item Name</th>
          <th className={styles.cell}>QTY.</th>
          <th className={styles.cell}>Price</th>
          <th className={styles.cell}>Total</th>
        </tr>
      </thead>
      <tbody className={styles.items_list}>
        {items.map((item) => (
          <tr key={item.name} className={styles.tr}>
            <td className={styles.cell}>{item.name}</td>
            <td className={styles.cell}>{Number(item.quantity)}</td>
            <td className={styles.cell}>£ {Number(item.price).toFixed(2)}</td>
            <td className={styles.cell}>£ {Number(item.total).toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
