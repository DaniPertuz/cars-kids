import { Layout } from '@ui-kitten/components';
import { CustomIcon } from '../CustomIcon';
import { globalColors } from '../../../theme/globalColors';
import { styles } from './styles';

interface Props {
  iconSize: number;
}

export const EditButton = ({ iconSize }: Props) => {
  return (
    <Layout style={styles.container}>
      <CustomIcon name='edit-outline' size={{ height: iconSize, width: iconSize }} fillColor={globalColors.white} />
    </Layout>
  );
};
