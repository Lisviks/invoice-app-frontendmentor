import { Field } from 'formik';
import styles from '@/app/styles/invoiceForm/InputField.module.scss';

export default function InputField({ id, name, text }: { id: string; name: string; text: string }) {
  return (
    <div className={styles.field}>
      <label htmlFor={id}>{text}</label>
      <Field id={id} name={name} />
    </div>
  );
}
