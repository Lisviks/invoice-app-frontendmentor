'use client';

import Header from '@/app/components/Header';
import useStore from '@/app/store/store';
import ArrowLeft from '@/assets/icon-arrow-left.svg';
import Image from 'next/image';
import styles from '@/app/styles/Invoice.module.scss';
import formatDate from '@/app/util/formatDate';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import EditInvoice from '@/app/components/EditInvoice';

export default function ViewInvoice({ params }: { params: { id: string } }) {
  const [openEditInvoice, setOpenEditInvoice] = useState(false);
  const router = useRouter();
  const { invoices } = useStore();
  const invoice = invoices.filter((i) => i.id === params.id)[0];
  const statusStyle =
    invoice.status === 'paid' ? styles.paid : invoice.status === 'pending' ? styles.pending : styles.draft;

  const handleCloseEdit = () => setOpenEditInvoice(false);

  return (
    <>
      <Header />
      <section className={styles.invoice}>
        <div className={styles.back} onClick={router.back}>
          <Image src={ArrowLeft} alt='arrow left' /> Go back
        </div>
        <div className={styles.status}>
          <p>Status</p>
          <div className={statusStyle}>
            <div></div>
            {invoice.status}
          </div>
        </div>
        <div className={styles.invoice_info}>
          <div className={styles.sender}>
            <div>
              <p className={styles.id}>
                #<span>{invoice.id}</span>
              </p>
              <p className={styles.description}>{invoice.description}</p>
            </div>
            <div className={styles.address}>
              <p>{invoice.senderAddress.street}</p>
              <p>{invoice.senderAddress.city}</p>
              <p>{invoice.senderAddress.postCode}</p>
              <p>{invoice.senderAddress.country}</p>
            </div>
          </div>
          <div className={styles.client}>
            <div className={styles.dates}>
              <div className={styles.invoice_date}>
                <p>Invoice Date</p>
                <p>{formatDate(invoice.createdAt)}</p>
              </div>
              <div className={styles.payment_due}>
                <p>Payment Due</p>
                <p>{formatDate(invoice.paymentDue)}</p>
              </div>
            </div>
            <div className={styles.bill_to}>
              <p>Bill To</p>
              <p className={styles.name}>{invoice.clientName}</p>
              <div className={styles.address}>
                <p>{invoice.clientAddress.street}</p>
                <p>{invoice.clientAddress.city}</p>
                <p>{invoice.clientAddress.postCode}</p>
                <p>{invoice.clientAddress.country}</p>
              </div>
            </div>
            <div className={styles.sent_to}>
              <p>Sent to</p>
              <p>{invoice.clientEmail}</p>
            </div>
          </div>
          <div className={styles.summary}>
            <ul className={styles.items}>
              {invoice.items.map((item) => (
                <li key={item.name}>
                  <div>
                    <p>{item.name}</p>
                    <p>
                      {item.quantity} x £ {item.price}
                    </p>
                  </div>
                  <p className={styles.total}>£ {item.total}</p>
                </li>
              ))}
            </ul>
            <div className={styles.amount_due}>
              <p>Amount Due</p>
              <p className={styles.total}>£ {invoice.total}</p>
            </div>
          </div>
        </div>
      </section>
      <div className={styles.footer}>
        <button
          className={styles.edit_btn}
          onClick={() => {
            setOpenEditInvoice((state) => !state);
          }}
        >
          Edit
        </button>
        <button className={styles.delete_btn}>Delete</button>
        <button className={styles.mark_as_paid_btn}>Mark as Paid</button>
      </div>
      <EditInvoice isOpen={openEditInvoice} handleCloseEdit={handleCloseEdit} />
    </>
  );
}
