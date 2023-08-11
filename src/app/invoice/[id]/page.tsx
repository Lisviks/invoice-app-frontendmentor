'use client';

import Header from '@/app/components/Header';
import useStore from '@/app/store/store';
import ArrowLeft from '@/assets/icon-arrow-left.svg';
import Image from 'next/image';
import styles from '@/app/styles/Invoice.module.scss';

export default function ViewInvoice({ params }: { params: { id: string } }) {
  const { invoices } = useStore();
  const invoice = invoices.filter((i) => i.id === params.id)[0];

  return (
    <>
      <Header />
      <section className={styles.invoice}>
        <div className={styles.back}>
          <Image src={ArrowLeft} alt='arrow left' /> Go back
        </div>
        <div className={styles.status}>
          <p>Status</p>
          <div>
            <div></div>
            {invoice.status}
          </div>
        </div>
        <div className={styles.invoice_info}>
          <div className={styles.sender}>
            <div>
              <p>
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
                <p>{invoice.createdAt}</p> {/* TODO: format date */}
              </div>
              <div className={styles.payment_due}>
                <p>Payment Due</p>
                <p>{invoice.paymentDue}</p> {/* TODO: format date */}
              </div>
            </div>
            <div className={styles.bill_to}>
              <p>Bill To</p>
              <p className={styles.name}></p>
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
            <div>
              {invoice.items.map((item) => (
                <div key={item.name}>
                  <div>
                    <p>{item.name}</p>
                    <p>
                      {item.quantity} x {item.price}
                    </p>
                  </div>
                  <p>{item.total}</p>
                </div>
              ))}
            </div>
            <div className={styles.grand_total}>
              <p>Grand Total</p>
              <p className={styles.total}>£ {invoice.total}</p>
            </div>
          </div>
        </div>
      </section>
      <div className={styles.footer}>
        <button className={styles.edit_btn}>Edit</button>
        <button className={styles.delete_btn}>Delete</button>
        <button className={styles.mark_as_paid_btn}>Mark as Paid</button>
      </div>
    </>
  );
}
