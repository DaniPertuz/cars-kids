import { Layout } from '@ui-kitten/components';
import { Desk } from '../../../../core/entities';
import { useCustomTheme } from '../../../hooks';
import { EmptyListMessage } from '../../ui';
import { DeskList } from '../DeskList';

interface Props {
  bottom: number;
  desks: Desk[];
}

export const DeskListComponent = ({ bottom, desks }: Props) => {
  const { background } = useCustomTheme();
  return (
    <Layout style={[{ marginHorizontal: 20, paddingBottom: bottom + 325 }, background]}>
      {(desks.length === 0)
          ?
          <EmptyListMessage heightBy={0.7} text='No hay puestos de trabajo' />
          :
          <DeskList desks={desks} />
      }
    </Layout>
  );
};
