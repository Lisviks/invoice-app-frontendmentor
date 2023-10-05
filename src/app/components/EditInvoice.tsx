import ArrowLeft from '@/assets/icon-arrow-left.svg';
import Image from 'next/image';
import styles from '@/app/styles/EditInvoice.module.scss';
import { Invoice } from '../interfaces';
import InvoiceForm from './invoiceForm/InvoiceForm';
import { useEffect, useRef, useState } from 'react';

interface Props {
  isOpen: boolean;
  handleCloseEdit: () => void;
  invoice?: Invoice;
  newInvoice?: boolean;
}

export default function EditInvoice({ isOpen, handleCloseEdit, invoice, newInvoice }: Props) {
  const [transalateX, setTransalateX] = useState('0');
  const [backgroundOpacity, setBackgroundOpacity] = useState('0');
  const [scrolledToBottom, setScrolledToBottom] = useState(false);
  const openingStyles = { transform: `translateX(${transalateX})` };
  const backgroundOpeningStyles = { opacity: `${backgroundOpacity}` };

  const emptyInvoice: Invoice = {
    id: '',
    createdAt: '',
    paymentDue: '',
    description: '',
    paymentTerms: 1,
    clientName: '',
    clientEmail: '',
    status: 'draft',
    senderAddress: {
      street: '',
      city: '',
      postCode: '',
      country: '',
    },
    clientAddress: {
      street: '',
      city: '',
      postCode: '',
      country: '',
    },
    items: [],
    total: 0,
  };

  const closeForm = () => {
    setTransalateX('0');
    setBackgroundOpacity('0');
    handleCloseEdit();
  };

  useEffect(() => {
    isOpen ? setTransalateX('50rem') : setTransalateX('0');
    isOpen ? setBackgroundOpacity('0.4984') : setBackgroundOpacity('0');
  }, [isOpen]);

  const editInvoiceRef = useRef<HTMLDivElement>(null);
  const editInvoiceBackgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scroll = () => {
      if (editInvoiceRef.current) {
        const editInvoice = editInvoiceRef.current;
        const leftToScroll = Math.abs(editInvoice.scrollHeight - editInvoice.clientHeight - editInvoice.scrollTop);

        leftToScroll < 1 ? setScrolledToBottom(true) : setScrolledToBottom(false);
      }
    };

    if (editInvoiceRef.current) {
      const editInvoice = editInvoiceRef.current;

      if (editInvoiceBackgroundRef.current) {
        editInvoice.style.top = `${window.scrollY}px`;
        editInvoiceBackgroundRef.current.style.top = `${window.scrollY}px`;
      }

      editInvoice.addEventListener('scroll', scroll);

      return () => editInvoice.removeEventListener('scroll', scroll);
    }
  });

  return (
    <>
      <div
        ref={editInvoiceBackgroundRef}
        className={styles.edit_invoice_outside_background}
        style={isOpen ? backgroundOpeningStyles : {}}
        onClick={closeForm}
      ></div>
      <div ref={editInvoiceRef} className={styles.edit_invoice} style={isOpen ? openingStyles : {}}>
        <div className={styles.go_back} onClick={() => closeForm()}>
          <Image src={ArrowLeft} alt='arrow left' /> Go back
        </div>
        {newInvoice ? (
          <div className={styles.edit_id}>New Invoice</div>
        ) : (
          <div className={styles.edit_id}>
            Edit <span>#</span>
            {invoice!.id}
          </div>
        )}

        <InvoiceForm
          values={invoice ? invoice : emptyInvoice}
          closeForm={closeForm}
          newInvoice={newInvoice}
          scrolledToBottom={scrolledToBottom}
        />
      </div>
    </>
  );
}
