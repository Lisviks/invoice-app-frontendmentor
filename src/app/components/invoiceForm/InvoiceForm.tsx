'use client';

import { Formik, Form, FieldArray } from 'formik';
import { object, string, number, array } from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from '@/app/styles/invoiceForm/InvoiceForm.module.scss';
import { Invoice } from '@/app/interfaces';
import { useEffect, useState } from 'react';
import InputField from './InputField';
import Item from './Item';
import Dropdown from './Dropdown';
import CalendarIcon from '@/assets/icon-calendar.svg';
import Image from 'next/image';
import useStore from '@/app/store/store';

const emptyMessage = "can't be empty";
const schema = object({
  description: string().required(emptyMessage),
  clientName: string().required(emptyMessage),
  clientEmail: string().required(emptyMessage),
  senderAddress: object({
    street: string().required(emptyMessage),
    city: string().required(emptyMessage),
    postCode: string().required(emptyMessage),
    country: string().required(emptyMessage),
  }),
  clientAddress: object({
    street: string().required(emptyMessage),
    city: string().required(emptyMessage),
    postCode: string().required(emptyMessage),
    country: string().required(emptyMessage),
  }),
  items: array()
    .of(
      object({
        name: string().required(emptyMessage),
        quantity: number().typeError(' ').required(' '),
        price: number().typeError(' ').required(' '),
      })
    )
    .min(1, 'An item must be added'),
});

interface Props {
  values: Invoice;
  closeForm: () => void;
  newInvoice?: boolean;
  scrolledToBottom: boolean;
}

export default function InvoiceForm({ values, closeForm, newInvoice = false, scrolledToBottom }: Props) {
  const initialValues = values;
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [paymentTerm, setPaymentTerm] = useState(1);
  const { updateInvoice, createInvoice } = useStore();

  const [showEmptyFieldsError, setShowEmptyFieldsError] = useState(false);
  const [showMissingItemError, setShowMissingItemError] = useState(false);

  const setPaymentDue = (date: string) => {
    const dateCopy = new Date(date ? date : startDate || new Date());
    dateCopy.setDate(dateCopy.getDate() + paymentTerm);
    const year = dateCopy.getFullYear();
    const month = dateCopy.getMonth();
    const day = dateCopy.getDate();
    return new Date(year, month, day);
  };

  const saveDraft = (values: Invoice) => {
    values.paymentTerms = paymentTerm;
    values.total = values.items.reduce((acc, val) => Number(val.total) + acc, 0);
    values.paymentDue = setPaymentDue(values.createdAt).toString();

    values.id = Date.now().toString();
    values.status = 'pending';
    values.createdAt = startDate?.toString() || new Date().toString();
    values.status = 'draft';
    createInvoice(values);
    closeForm();
  };

  useEffect(() => {
    setPaymentTerm(initialValues.paymentTerms);
  }, [setPaymentTerm, initialValues]);

  useEffect(() => {
    if (newInvoice) {
      setStartDate(new Date());
    } else {
      setStartDate(new Date(initialValues.createdAt));
    }
  }, [initialValues, setStartDate, newInvoice]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={(values, actions) => {
        values.paymentTerms = paymentTerm;
        values.total = values.items.reduce((acc, val) => Number(val.total) + acc, 0);
        values.paymentDue = setPaymentDue(values.createdAt).toString();

        if (newInvoice) {
          values.id = Date.now().toString();
          values.status = 'pending';
          values.createdAt = startDate?.toString() || new Date().toString();
          createInvoice(values);
        } else {
          updateInvoice(values);
        }
        closeForm();
      }}
    >
      {(formik) => {
        const { errors, values } = formik;

        const checkErrors = () => {
          const hasIndividualFieldErrors = Object.keys(errors).some((key) => key !== 'items');
          setShowEmptyFieldsError(hasIndividualFieldErrors || (Array.isArray(errors.items) && errors.items.length > 0));
          setShowMissingItemError(!Array.isArray(errors.items) && errors.items !== undefined);
        };

        return (
          <Form className={styles.form}>
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
              <InputField
                id='clientEmail'
                name='clientEmail'
                text="Client's Email"
                placeholder='e.g. email@example.com'
              />
              <InputField id='clientStreet' name='clientAddress.street' text='Street Address' />
              <InputField id='clientCity' name='clientAddress.city' text='City' />
              <InputField id='clientPostCode' name='clientAddress.postCode' text='Post Code' />
              <InputField id='clientCountry' name='clientAddress.country' text='Country' />
            </div>
            <div className={styles.date}>
              <div className={styles.field}>
                <label htmlFor='invoiceDate' className={!newInvoice ? styles.disabled : ''}>
                  Invoice Date
                </label>
                <div className={styles.datepicker}>
                  <DatePicker
                    id='invoiceDate'
                    name='createdAt'
                    selected={startDate}
                    onChange={(date: Date) => setStartDate(date)}
                    dateFormat='d MMM y'
                    disabled={!newInvoice}
                  />
                  <Image src={CalendarIcon} alt='calendar icon' />
                </div>
              </div>
              <div className={styles.field}>
                <label htmlFor='paymentTerms'>Payment Terms</label>
                <Dropdown paymentTerm={paymentTerm} setPaymentTerm={setPaymentTerm} />
              </div>
              <InputField
                id='projectDescription'
                name='description'
                text='Project Description'
                placeholder='e.g. Graphic Design Service'
              />
            </div>
            <div className={styles.item_list}>
              <p>Item List</p>
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
            <ul className={styles.error_messages}>
              {showEmptyFieldsError && <li>- All fields must be added</li>}
              {showMissingItemError && <li>- An item must be added</li>}
            </ul>
            <div className={styles.shadow} style={{ opacity: `${scrolledToBottom ? 0 : 1}` }}></div>
            <div className={styles.spacer}></div>
            <div className={styles.actions}>
              <button
                className={newInvoice ? styles.discard_btn : styles.cancel_btn}
                onClick={closeForm}
                type='button'
                style={newInvoice ? { width: '5.25rem' } : { width: '6rem' }}
              >
                {newInvoice ? 'Discard' : 'Cancel'}
              </button>
              {newInvoice && (
                <button className={styles.draft_btn} onClick={() => saveDraft(values)} type='button'>
                  Save as Draft
                </button>
              )}
              <button
                className={styles.submit_btn}
                onClick={checkErrors}
                type='submit'
                style={newInvoice ? { width: '7rem' } : { width: '8.625rem' }}
              >
                {newInvoice ? 'Save & Send' : 'Save Changes'}
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
