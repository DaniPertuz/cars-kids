import { Transaction } from '../../../../infrastructure/interfaces';
import { Purchase, Rental } from '../../../../core/entities';
import { getCashPaymentTotal, getTransferPaymentTotal } from '../../../../utils';
import { TransactionTotalMessageBody } from './TransactionTotalMessageBody';

interface Props {
  entity: Transaction;
  purchases: Purchase[];
  rentals: Rental[];
}

export const TransactionTotalMessage = ({ purchases, rentals, entity }: Props) => {
  const purchasesCount = purchases.length;
  const totalCashPurchases = getCashPaymentTotal(purchases).total;
  const totalTransferPurchases = getTransferPaymentTotal(purchases).total;
  const totalPurchases = getCashPaymentTotal(purchases).total + getTransferPaymentTotal(purchases).total;

  const rentalsCount = rentals.length;
  const totalCashRentals = getCashPaymentTotal(rentals).total;
  const totalTransferRentals = getTransferPaymentTotal(rentals).total;
  const totalRentals = getCashPaymentTotal(rentals).total + getTransferPaymentTotal(rentals).total;

  return (
    <>
      {entity === 'Purchase' && purchases.length > 0 && <TransactionTotalMessageBody cashTotal={totalCashPurchases} count={purchasesCount} total={totalPurchases} transferTotal={totalTransferPurchases} />}
      {entity === 'Rental' && rentals.length > 0 && <TransactionTotalMessageBody cashTotal={totalCashRentals} count={rentalsCount} total={totalRentals} transferTotal={totalTransferRentals} />}
    </>
  );
};
