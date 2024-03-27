import { Layout } from '@ui-kitten/components';
import { CustomIcon } from '../CustomIcon';
import { globalColors } from '../../../theme/globalColors';
import { styles } from './styles';

interface Props {
  iconSize: number;
}

export const DeleteButton = ({ iconSize }: Props) => {
  return (
    <Layout style={styles.container}>
      <CustomIcon name='trash-outline' style={{ height: iconSize, width: iconSize }} fillColor={globalColors.white} />
    </Layout>
  );
};
