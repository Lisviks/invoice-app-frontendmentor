import { ErrorMessage, Field } from 'formik';
import styles from '@/app/styles/invoiceForm/InputField.module.scss';
import { useCallback, useState } from 'react';

export default function InputField({ id, name, text }: { id: string; name: string; text: string }) {
  const [isError, setIsError] = useState(false);

  const refCallback = useCallback((node: HTMLDivElement | null) => {
    if (node !== null) {
      setIsError(true);
    } else {
      setIsError(false);
    }
  }, []);

  return (
    <div className={styles.field}>
      <label htmlFor={id} style={isError ? { color: 'var(--alert-red)' } : {}}>
        <span>{text}</span>
        <ErrorMessage name={name}>
          {(msg: string) => (
            <div ref={refCallback} className={styles.error_message}>
              {msg}
            </div>
          )}
        </ErrorMessage>
      </label>

      <Field id={id} name={name} style={isError ? { borderColor: 'var(--alert-red)' } : {}} />
    </div>
  );
}
