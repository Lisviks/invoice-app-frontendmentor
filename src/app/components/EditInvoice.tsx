import ArrowLeft from '@/assets/icon-arrow-left.svg';
import Image from 'next/image';
import styles from '@/app/styles/EditInvoice.module.scss';
import { Invoice } from '../interfaces';
import InvoiceForm from './invoiceForm/InvoiceForm';
import { useEffect, useState } from 'react';

interface Props {
  isOpen: boolean;
  handleCloseEdit: () => void;
  invoice: Invoice;
}

export default function EditInvoice({ isOpen, handleCloseEdit, invoice }: Props) {
  const [transalateX, setTransalateX] = useState('0');
  const openingStyles = { transform: `translateX(${transalateX})` };

  const closeForm = () => {
    setTransalateX('0');
    handleCloseEdit();
  };

  useEffect(() => {
    isOpen ? setTransalateX('50rem') : setTransalateX('0');
  }, [isOpen]);

  return (
    <div className={styles.edit_invoice} style={isOpen ? openingStyles : {}}>
      <div className={styles.go_back} onClick={() => closeForm()}>
        <Image src={ArrowLeft} alt='arrow left' /> Go back
      </div>
      <div className={styles.edit_id}>
        Edit <span>#</span>
        {invoice.id}
      </div>
      <InvoiceForm values={invoice} closeForm={closeForm} />
    </div>
  );
}
