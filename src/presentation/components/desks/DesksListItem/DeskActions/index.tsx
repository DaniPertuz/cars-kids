import { Layout } from '@ui-kitten/components';
import { Desk } from '../../../../../core/entities';
import { useCustomTheme } from '../../../../hooks';
import { EditButton, DeleteButton } from '../../../ui';
import { styles } from '../styles';

export const DeskActions = ({ desk }: { desk: Desk; }) => {
  const { platinumItemBackgroundColor } = useCustomTheme();
  return (
    <Layout style={[styles.container, platinumItemBackgroundColor]}>
      <EditButton iconSize={25} updateDesk={desk} />
      <DeleteButton iconName='trash-outline' iconSize={25} desk={desk} />
    </Layout>
  );
};
