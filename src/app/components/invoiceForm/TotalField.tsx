import { Invoice } from '@/app/interfaces';
import { useField, useFormikContext } from 'formik';
import { useEffect } from 'react';

export default function TotalField(props: any) {
  const index: number = props.index;
  const {
    values: { items },
    setFieldValue,
  } = useFormikContext<Invoice>();
  const [field, meta] = useField(props);
  const { quantity, price } = items[index];

  useEffect(() => {
    if (quantity > 0 && price > 0) {
      setFieldValue(props.name, `${(quantity * price).toFixed(2)}`);
    }
  }, [quantity, price, setFieldValue, props.name]);

  return (
    <>
      <input {...props} {...field} />
      {!!meta.touched && !!meta.error && <div>{meta.error}</div>}
    </>
  );
}
