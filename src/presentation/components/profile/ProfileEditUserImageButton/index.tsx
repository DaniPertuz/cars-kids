import { TouchableOpacity } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { CustomIcon } from '../../ui';
import { globalColors } from '../../../theme/globalColors';
import { styles } from './styles';

interface Props {
  onPress: () => void;
}

export const ProfileEditUserImageButton = ({ onPress }: Props) => {
  return (
    <TouchableOpacity activeOpacity={1.0} onPress={onPress}>
      <Layout style={styles.editImageIconBackground}>
        <CustomIcon name='edit-outline' size={styles.editImageIconSize} fillColor={globalColors.dark} />
      </Layout>
    </TouchableOpacity>
  );
};
