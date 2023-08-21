'use client';

import { Formik, Form, Field, FieldArray } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from '@/app/styles/InvoiceForm.module.scss';
import { Invoice } from '../interfaces';
import { useState } from 'react';
import Image from 'next/image';
import DeleteIcon from '@/assets/icon-delete.svg';

export default function InvoiceForm({ values }: { values: Invoice }) {
  const initialValues: Invoice = values;
  console.log(initialValues.items);
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
              <div className={styles.field}>
                <label htmlFor='senderStreet'>Street Address</label>
                <Field id='senderStreet' name='senderAddress.street' />
              </div>
              <div className={styles.field}>
                <label htmlFor='senderCity'>City</label>
                <Field id='senderCity' name='senderAddress.city' />
              </div>
              <div className={styles.field}>
                <label htmlFor='senderPostCode'>Post Code</label>
                <Field id='senderPostCode' name='senderAddress.postCode' />
              </div>
              <div className={styles.field}>
                <label htmlFor='senderCountry'>Country</label>
                <Field id='senderCountry' name='senderAddress.country' />
              </div>
            </div>
            <p>Bill To</p>
            <div className={styles.client}>
              <div className={styles.field}>
                <label htmlFor='clientName'>Client&apos;s Name</label>
                <Field id='clientName' name='clientName' />
              </div>
              <div className={styles.field}>
                <label htmlFor='clientEmail'>Client&apos;s Email</label>
                <Field id='clientEmail' name='clientEmail' />
              </div>
              <div className={styles.field}>
                <label htmlFor='clientStreet'>Street Address</label>
                <Field id='clientStreet' name='clientAddress.street' />
              </div>
              <div className={styles.field}>
                <label htmlFor='clientCity'>City</label>
                <Field id='clientCity' name='clientAddress.city' />
              </div>
              <div className={styles.field}>
                <label htmlFor='clientPostCode'>Post Code</label>
                <Field id='clientPostCode' name='clientAddress.postCode' />
              </div>
              <div className={styles.field}>
                <label htmlFor='clientCountry'>Country</label>
                <Field id='clientCountry' name='clientAddress.country' />
              </div>
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
                  <option value='Net 30 Days'>Net 30 Days</option>
                  <option value='Net 10 Days'>Net 10 Days</option>
                </select>
              </div>
              <div className={styles.filed}>
                <label htmlFor='projectDescription'>Project Description</label>
                <Field id='projectDescrption' name='description' />
              </div>
            </div>
            <div className={styles.item_list}>
              <FieldArray name='items'>
                {(
                  //https://formik.org/docs/api/fieldarray#fieldarray-helpers
                  { push }: { push: (obj: any) => void }
                ) => (
                  <>
                    {values.items.length > 0 && values.items.map((item, index) => <Item key={index} index={index} />)}
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

function Item({ index }: { index: number }) {
  return (
    <div className={styles.item}>
      <div className={styles.field}>
        <label htmlFor='itemName'>Item Name</label>
        <Field id='itemName' name={`items[${index}].name`} />
      </div>
      <div className={styles.field}>
        <label htmlFor='quantity'>Qty.</label>
        <Field id='quantity' name={`items[${index}].quantity`} />
      </div>
      <div className={styles.field}>
        <label htmlFor='price'>Price</label>
        <Field id='price' name={`items[${index}].price`} />
      </div>
      <div className={styles.field}>
        <label htmlFor='total'>Total</label>
        <Field id='total' name={`items[${index}].total`} disabled />
      </div>
      <Image src={DeleteIcon} alt='delete icon' />
    </div>
  );
}
