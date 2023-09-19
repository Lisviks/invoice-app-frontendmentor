import styles from '@/app/styles/Filter.module.scss';
import useStore from '../store/store';
import { useEffect, useState } from 'react';
import { Status } from '../interfaces';

export default function Filter() {
  const [draft, setDraft] = useState(true);
  const [pending, setPending] = useState(true);
  const [paid, setPaid] = useState(true);
  const { filter, setFilter } = useStore();

  useEffect(() => {
    filter.includes('draft') ? setDraft(true) : setDraft(false);
    filter.includes('pending') ? setPending(true) : setPending(false);
    filter.includes('paid') ? setPaid(true) : setPaid(false);
  }, [filter]);

  const filterFunc = (bool: boolean, filterName: Status) => {
    if (!bool) {
      setFilter(filter.filter((i) => i !== filterName));
    } else if (bool && !filter.includes(filterName)) {
      setFilter(filter.concat([filterName]));
    }
  };

  return (
    <div className={styles.filter}>
      <ul>
        <li>
          <label>
            <input
              type='checkbox'
              checked={draft && true}
              onChange={() => setDraft(!draft)}
              onClick={() => {
                filterFunc(!draft, 'draft');
              }}
            />
            <span></span>
            Draft
          </label>
        </li>
        <li>
          <label>
            <input
              type='checkbox'
              checked={pending && true}
              onChange={() => setPending(!pending)}
              onClick={() => {
                filterFunc(!pending, 'pending');
              }}
            />
            <span></span>
            Pending
          </label>
        </li>
        <li>
          <label>
            <input
              type='checkbox'
              checked={paid && true}
              onChange={() => setPaid(!paid)}
              onClick={() => {
                filterFunc(!paid, 'paid');
              }}
            />
            <span></span>
            Paid
          </label>
        </li>
      </ul>
    </div>
  );
}
