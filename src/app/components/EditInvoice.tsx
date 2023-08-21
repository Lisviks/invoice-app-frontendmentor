import ArrowLeft from '@/assets/icon-arrow-left.svg';
import Image from 'next/image';
import styles from '@/app/styles/EditInvoice.module.scss';
import { Invoice } from '../interfaces';
import InvoiceForm from './InvoiceForm';

interface Props {
  isOpen: boolean;
  handleCloseEdit: () => void;
  invoice: Invoice;
}

export default function EditInvoice({ isOpen, handleCloseEdit, invoice }: Props) {
  const openingStyles = { transform: 'translateX(20rem)' };

  return (
    <div className={styles.edit_invoice} style={isOpen ? openingStyles : {}}>
      <div onClick={handleCloseEdit}>
        <Image src={ArrowLeft} alt='arrow left' /> Go back
      </div>
      <div>
        Edit <span>#</span>
        {invoice.id}
      </div>
      <InvoiceForm values={invoice} />
    </div>
  );
}
