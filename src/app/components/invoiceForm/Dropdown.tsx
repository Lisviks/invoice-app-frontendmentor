import { useState, useRef, useEffect, Dispatch, SetStateAction } from 'react';
import styles from '@/app/styles/invoiceForm/Dropdown.module.scss';
import ArrowDown from '@/assets/icon-arrow-down.svg';
import Image from 'next/image';

export default function Dropdown({
  paymentTerm,
  setPaymentTerm,
}: {
  paymentTerm: number;
  setPaymentTerm: Dispatch<SetStateAction<number>>;
}) {
  const wrapperRef = useRef<HTMLUListElement>(null);

  const paymentTerms = [1, 7, 14, 30];
  const [isOpen, setIsOpen] = useState(false);
  const [scale, setScale] = useState(0);
  const listStyle = { transform: `scale(${scale})` };

  const open = () => {
    setIsOpen(true);
    setTimeout(() => setScale(1));
  };

  const close = () => {
    setScale(0);
    setTimeout(() => setIsOpen(false), 300);
  };

  const handleTriggerClick = () => (isOpen ? close() : open());

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        close();
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, wrapperRef]);

  return (
    <div className={styles.dropdown}>
      <div className={!isOpen ? styles.dropdown_trigger : styles.dropdown_trigger_open} onClick={handleTriggerClick}>
        <input
          name='paymentTerms'
          id='paymentTerms'
          type='button'
          value={`Net ${paymentTerm} Days`}
          style={{ textAlign: 'left' }}
        />
        <Image src={ArrowDown} alt='' />
      </div>
      {isOpen && (
        <div className={styles.list_wrapper}>
          <ul className={styles.list} ref={wrapperRef} style={listStyle}>
            {paymentTerms.map((i) => (
              <li
                className={i === paymentTerm ? styles.list_item_active : styles.list_item}
                key={i}
                onClick={(e) => {
                  setPaymentTerm(i);
                  close();
                }}
              >
                {`Net ${i} Days`}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
