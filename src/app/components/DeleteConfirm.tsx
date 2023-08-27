import styles from '@/app/styles/DeleteConfirm.module.scss';
import { SetStateAction, useEffect, useRef } from 'react';
import useStore from '../store/store';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';

interface Props {
  id: string;
  setDeleteModal: (value: SetStateAction<boolean>) => void;
  router: AppRouterInstance;
}

export default function DeleteConfirm({ id, setDeleteModal, router }: Props) {
  const ref = useRef(null);
  const { deleteInvoice } = useStore();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && ref.current === event.target) {
        setDeleteModal(false);
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  return (
    <div className={styles.modal_wrapper} ref={ref}>
      <div className={styles.modal}>
        <h3>Confirm Deletion</h3>
        <p>Are you sure you want to delete invoice #{id}? This action cannot be undone.</p>
        <div>
          <button className={styles.cancel_btn} onClick={() => setDeleteModal(false)}>
            Cancel
          </button>
          <button
            className={styles.delete_btn}
            onClick={() => {
              router.back();
              setTimeout(() => deleteInvoice(id), 100);
              setDeleteModal(false);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
