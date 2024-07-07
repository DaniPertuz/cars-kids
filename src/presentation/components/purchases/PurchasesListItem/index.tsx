import { ListItem } from '@ui-kitten/components';
import { Purchase } from '../../../../core/entities';
import { paymentDescriptions } from '../../../../utils';
import { useCustomTheme } from '../../../hooks';
import { TransactionActions } from '../../transactions/TransactionActions';

interface Props {
  purchase: Purchase;
}

export const PurchasesListItem = ({ purchase }: Props) => {
  const { platinumItemBackgroundColor } = useCustomTheme();

  const purchaseDescription = () => {
    const payment = paymentDescriptions[purchase.payment];
    return `Cantidad: ${purchase.quantity}\nPago: ${purchase.price}\nMedio: ${payment}\nPuesto: ${purchase.desk.name}\nUsuario: ${purchase.user?.name}`;
  };

  return (
    <ListItem
      title={purchase.product.name}
      description={purchaseDescription()}
      accessoryRight={<TransactionActions purchase={purchase} />}
      style={[{ borderRadius: 10, margin: 10 }, platinumItemBackgroundColor]}
    />
  );
};
