import InputField from './InputField';
import TotalField from './TotalField';
import styles from '@/app/styles/invoiceForm/Item.module.scss';
import DeleteIconSvg from './DeleteIconSvg';

export default function Item({ index, remove }: { index: number; remove<T>(index: number): T | undefined }) {
  return (
    <div className={styles.item}>
      <InputField id='itemName' name={`items[${index}].name`} text='Item Name' />
      <InputField id='quantity' name={`items[${index}].quantity`} text='Qty.' />
      <InputField id='price' name={`items[${index}].price`} text='Price' />
      <div className={styles.total_field}>
        <label htmlFor='total'>Total</label>
        <TotalField index={index} name={`items[${index}].total`} disabled />
        <DeleteIconSvg />
      </div>
    </div>
  );
}
