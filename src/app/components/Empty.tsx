import Image from 'next/image';
import EmptyIllustration from '@/assets/illustration-empty.svg';
import styles from '@/app/styles/Empty.module.scss';

export default function Empty() {
  return (
    <div className={styles.empty}>
      <div>
        <Image src={EmptyIllustration} alt='empty illustration' />
      </div>
      <h3>There is nothing here</h3>
      <p>
        Create an invoice by clicking the <span>New</span> button and get started
      </p>
    </div>
  );
}
