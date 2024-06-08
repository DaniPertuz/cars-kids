import { Layout } from '@ui-kitten/components';
import { Desk } from '../../../../../core/entities';
import { EditButton, DeleteButton } from '../../../ui';
import { styles } from '../styles';

export const DeskActions = ({ desk }: { desk: Desk }) => {
  return (
    <Layout style={styles.container}>
      <EditButton iconSize={25} desk={desk} />
      <DeleteButton iconName='trash-outline' iconSize={25} desk={desk} />
    </Layout>
  );
};
