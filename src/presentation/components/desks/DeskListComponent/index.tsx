import { Layout } from '@ui-kitten/components';
import { Desk } from '../../../../core/entities';
import { EmptyListMessage } from '../../ui';
import { DeskList } from '../DeskList';
import { globalStyles } from '../../../styles/global.styles';

interface Props {
  bottom: number;
  desks: Desk[];
}

export const DeskListComponent = ({ bottom, desks }: Props) => {
  return (
    <Layout style={{ ...globalStyles.mainBackground, marginHorizontal: 20, paddingBottom: bottom + 150 }}>
      {(desks.length === 0)
          ?
          <EmptyListMessage heightBy={0.7} text='No hay puestos de trabajo' />
          :
          <DeskList desks={desks} />
      }
    </Layout>
  );
};
