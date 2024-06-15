import { Purchase } from '../../../../core/entities';
import { EmptyListMessage } from '../../ui';
import { PurchasesList } from '../PurchasesList';

export const PurchasesListContent = ({ purchases }: { purchases: Purchase[]; }) => {
  return (
    <>
      {purchases.length === 0
        ?
        <EmptyListMessage heightBy={0.75} text='No hay compras' />
        :
        <PurchasesList purchases={purchases} />
      }
    </>
  );
};
