import Image from 'next/image';
import InputField from './InputField';
import TotalField from './TotalField';
import styles from '@/app/styles/invoiceForm/Item.module.scss';
import DeleteIcon from '@/assets/icon-delete.svg';

export default function Item({ index, remove }: { index: number; remove<T>(index: number): T | undefined }) {
  return (
    <div className={styles.item}>
      <InputField id='itemName' name={`items[${index}].name`} text='Item Name' />
      <InputField id='quantity' name={`items[${index}].quantity`} text='Qty.' />
      <InputField id='price' name={`items[${index}].price`} text='Price' />
      <div className={styles.field}>
        <label htmlFor='total'>Total</label>
        <TotalField index={index} name={`items[${index}].total`} disabled />
      </div>
      <Image src={DeleteIcon} alt='delete icon' onClick={() => remove(index)} />
    </div>
  );
}
