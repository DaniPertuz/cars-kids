import { Layout } from '@ui-kitten/components';
import { Desk } from '../../../../core/entities';
import { useCustomTheme } from '../../../hooks';
import { EmptyListMessage } from '../../ui';
import { DeskList } from '../DeskList';

interface Props {
  desks: Desk[];
}

export const DeskListComponent = ({ desks }: Props) => {
  const { background } = useCustomTheme();
  return (
    <Layout style={[{ marginHorizontal: 20, height: '90%', marginBottom: 15 }, background]}>
      {(desks.length === 0)
          ?
          <EmptyListMessage heightBy={0.9} text='No hay puestos de trabajo' />
          :
          <DeskList desks={desks} />
      }
    </Layout>
  );
};
