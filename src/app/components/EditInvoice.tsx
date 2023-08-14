import ArrowLeft from '@/assets/icon-arrow-left.svg';
import Image from 'next/image';
import styles from '@/app/styles/EditInvoice.module.scss';

export default function EditInvoice({ isOpen, handleCloseEdit }: { isOpen: boolean; handleCloseEdit: () => void }) {
  const openingStyles = { transform: 'translateX(20rem)' };

  return (
    <div className={styles.edit_invoice} style={isOpen ? openingStyles : {}}>
      <div onClick={handleCloseEdit}>
        <Image src={ArrowLeft} alt='arrow left' /> Go back
      </div>
      <div>edit invoice</div>
      <div>form</div>
    </div>
  );
}
