'use client';

import { Formik, Form, FieldArray } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from '@/app/styles/invoiceForm/InvoiceForm.module.scss';
import { Invoice } from '../../interfaces';
import { useState } from 'react';
import InputField from './InputField';
import Item from './Item';

export default function InvoiceForm({ values }: { values: Invoice }) {
  const initialValues: Invoice = values;
  const [startDate, setStartDate] = useState(new Date());

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        actions.setSubmitting(false);
        console.log(values);
      }}
    >
      {(formik) => {
        const { values } = formik;

        return (
          <Form>
            <p>Bill From</p>
            <div className={styles.sender}>
              <InputField id='senderStreet' name='senderAddress.street' text='Street Address' />
              <InputField id='senderCity' name='senderAddress.city' text='City' />
              <InputField id='senderPostCode' name='senderAddress.postCode' text='Post Code' />
              <InputField id='senderCountry' name='senderAddress.country' text='Country' />
            </div>
            <p>Bill To</p>
            <div className={styles.client}>
              <InputField id='clientName' name='clientName' text="Client's Name" />
              <InputField id='clientEmail' name='clientEmail' text="Client's Email" />
              <InputField id='clientStreet' name='clientAddress.street' text='Street Address' />
              <InputField id='clientCity' name='clientAddress.city' text='City' />
              <InputField id='clientPostCode' name='clientAddress.postCode' text='Post Code' />
              <InputField id='clientCountry' name='clientAddress.country' text='Country' />
            </div>
            <div className={styles.date}>
              <div className={styles.field}>
                <label htmlFor='invoiceDate'>Invoice Date</label>
                <DatePicker
                  id='invoiceDate'
                  name='createdAt'
                  selected={new Date(initialValues.createdAt)}
                  onChange={(date: Date) => setStartDate(date)}
                />
              </div>
              <div className={styles.field}>
                <label htmlFor='paymentTerms'>Payment Terms</label>
                <select name='paymentTerms' id='paymentTerms'>
                  <option value='Net 1 Days'>Net 1 Days</option>
                  <option value='Net 7 Days'>Net 7 Days</option>
                  <option value='Net 14 Days'>Net 14 Days</option>
                  <option value='Net 30 Days'>Net 30 Days</option>
                </select>
              </div>
              <InputField id='projectDescription' name='description' text='Project Description' />
            </div>
            <div className={styles.item_list}>
              <FieldArray name='items'>
                {(
                  //https://formik.org/docs/api/fieldarray#fieldarray-helpers
                  { push, remove }: { push: (obj: any) => void; remove<T>(index: number): T | undefined }
                ) => (
                  <>
                    {values.items.length > 0 &&
                      values.items.map((item, index) => <Item key={index} index={index} remove={remove} />)}
                    <button
                      className={styles.add_new_item_btn}
                      type='button'
                      onClick={() => push({ name: '', quantity: 0, price: 0, total: 0 })}
                    >
                      + Add New Item
                    </button>
                  </>
                )}
              </FieldArray>
            </div>
            <div className={styles.actions}>
              <button className={styles.cancel_btn} type='button'>
                Cancel
              </button>
              <button className={styles.submit_btn} type='submit'>
                Submit
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}