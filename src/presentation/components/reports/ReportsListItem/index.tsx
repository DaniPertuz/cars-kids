import { ListItem } from '@ui-kitten/components';
import { Budget, Purchase, Rental, User } from '../../../../core/entities';
import { DataItem, IPayment, IStatus } from '../../../../infrastructure/interfaces';
import { useFormattedDate } from '../../../hooks';
import { ReportActions } from '../ReportActions';
import { styles } from './styles';

interface Props {
  item: DataItem;
}

export const ReportListItem = ({ item }: Props) => {

  const { formatDateTime } = useFormattedDate();

  const getTitle = (item: DataItem) => {
    switch (true) {
      case (item as User).name !== undefined:
        return (item as User).name;
      case (item as Budget).base !== undefined:
        return `Base: ${(item as Budget).base}`;
      case (item as Rental).client !== undefined:
        return `Cliente: ${(item as Rental).client}`;
      case (item as Purchase).product !== undefined:
        return (item as Purchase).product.name;
      default:
        return 'Información no disponible';
    }
  };

  const getDescription = (item: DataItem) => {
    const safeAccess = (value: any) => value || 'N/A';

    switch (true) {
      case (item as Rental).client !== undefined:
        const rental = item as Rental;
        const paymentDescriptions = {
          [IPayment.Cash]: 'Efectivo',
          [IPayment.Bancolombia]: 'Bancolombia',
          [IPayment.Daviplata]: 'Daviplata',
          [IPayment.Nequi]: 'Nequi'
        };
        const payment = paymentDescriptions[rental.payment];
        return `Tiempo: ${safeAccess(rental.time)}\nPago: ${safeAccess(rental.amount)}\nMedio: ${payment}\nVehículo: ${safeAccess(rental.vehicle?.nickname)}\nFecha: ${formatDateTime(rental.date)}\nUsuario: ${safeAccess(rental.user?.name)}`;

      case (item as Budget).base !== undefined:
        const budget = item as Budget;
        const budgetDate = formatDateTime(budget.date);
        return `Gastos: ${budget.expenses}\nPréstamos: ${budget.loans}\nNómina: ${budget.payroll}\nFecha: ${safeAccess(budgetDate.substring(0, budgetDate.length - 6))}`;

      case (item as Purchase).product !== undefined:
        const purchase = item as Purchase;
        const purchaseDate = formatDateTime(purchase.purchaseDate);
        return `Cantidad: ${safeAccess(purchase.quantity)}\nPago: ${safeAccess(purchase.price)}\nFecha: ${safeAccess(purchaseDate.substring(0, purchaseDate.length - 6))}\nProducto: ${safeAccess(purchase.product?.name)}\nUsuario: ${safeAccess(purchase.user?.name)}`;

      case (item as User).role !== undefined:
        const user = item as User;
        return `Email: ${safeAccess(user.email)}\nRol: ${safeAccess(user.role)}\nEstado: ${user.status === IStatus.Active ? 'Activo' : 'Inactivo'}`;
      default:
        return 'Información no disponible';
    }
  };

  return (
    <ListItem
      style={styles.container}
      title={getTitle(item)}
      description={getDescription(item)}
      accessoryRight={(item as User).email !== undefined ? <ReportActions user={item as User} /> : undefined}
    />
  );
};
