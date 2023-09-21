import { Item } from '@/app/interfaces';
import styles from '@/app/styles/MobileSummary.module.scss';

export default function MobileSummary({ items }: { items: Item[] }) {
  return (
    <ul className={styles.items}>
      {items.map((item) => (
        <li key={item.name}>
          <div>
            <p>{item.name}</p>
            <p>
              {Number(item.quantity)} x £ {Number(item.price).toFixed(2)}
            </p>
          </div>
          <p className={styles.total}>£ {item.total}</p>
        </li>
      ))}
    </ul>
  );
}
