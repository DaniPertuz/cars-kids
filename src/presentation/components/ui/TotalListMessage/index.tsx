import { Layout } from '@ui-kitten/components';
import { Callout } from '../../ui';
import { styles } from './styles';

interface Props {
  bottom: number;
  item: string;
  total: number;
}

export const TotalListMessage = ({ bottom, item, total }: Props) => {
  return (
    <Layout style={{ ...styles.container, bottom: bottom + 20 }}>
      <Callout text={`${total} ${total === 1 ? (item === 'Alquileres' ? 'Alquiler' : item.slice(0, -1)) : (item === 'Alquileres' ? 'Alquileres' : `${item}s`)}`} />
    </Layout>
  );
};
