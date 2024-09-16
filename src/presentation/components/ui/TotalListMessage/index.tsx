import { Layout } from '@ui-kitten/components';
import { useCustomTheme } from '../../../hooks';
import { Callout } from '../../ui';
import { styles } from './styles';

interface Props {
  bottom: number;
  item: string;
  total: number;
}

export const TotalListMessage = ({ bottom, item, total }: Props) => {
  const { background } = useCustomTheme();
  const formatItemName = (word: string, count: number) => {
    switch (word) {
      case 'Alquileres':
        return count === 1 ? 'Alquiler' : 'Alquileres';
      case 'Compras':
        return count === 1 ? 'Compra' : 'Compras';
      case 'Presupuestos':
        return count === 1 ? 'Presupuesto' : 'Presupuestos';
      default:
        return count === 1 ? word : `${word}s`;
    }
  };

  return (
    <Layout style={[{ ...styles.container, bottom: bottom + 20 }, background]}>
      <Callout text={`${total} ${formatItemName(item, total)}`} />
    </Layout>
  );
};
