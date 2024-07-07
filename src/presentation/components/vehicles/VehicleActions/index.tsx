import { Layout } from '@ui-kitten/components';
import { Vehicle } from '../../../../core/entities';
import { useCustomTheme } from '../../../hooks';
import { DeleteButton, EditButton } from '../../ui';
import { styles } from './styles';

export const VehicleActions = ({ vehicle }: { vehicle: Vehicle; }) => {
  const { platinumItemBackgroundColor } = useCustomTheme();
  return (
    <Layout style={[styles.container, platinumItemBackgroundColor]}>
      <EditButton iconSize={25} vehicle={vehicle} />
      <DeleteButton iconName='trash-outline' iconSize={25} vehicle={vehicle} />
    </Layout>
  );
};
