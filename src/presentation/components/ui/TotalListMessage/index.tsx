import { Layout } from '@ui-kitten/components';
import { Callout } from '../../ui';
import { styles } from './styles';

interface Props {
  bottom: number;
  item: string;
  total: number;
}

export const TotalListMessage = ({ bottom, item, total }: Props) => {
  const formatItemName = (word: string, count: number) => {
    switch (word) {
      case 'Alquileres':
        return count === 1 ? 'Alquiler' : 'Alquileres';
      case 'Compras':
        return count === 1 ? 'Compra' : 'Compras';
      case 'Presupuestos':
        return count === 1 ? 'Presupuesto' : 'Presupuestos';
      case 'Usuarios':
        return count === 1 ? 'Usuario' : 'Usuarios';
      default:
        return count === 1 ? word.slice(0, -1) : `${word}s`;
    }
  };

  return (
    <Layout style={{ ...styles.container, bottom: bottom + 20 }}>
      <Callout text={`${total} ${formatItemName(item, total)}`} />
    </Layout>
  );
};
