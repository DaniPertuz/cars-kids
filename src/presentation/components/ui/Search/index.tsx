import { TouchableOpacity } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { CustomIcon } from '../CustomIcon';
import { globalColors } from '../../../theme/globalColors';
import { styles } from './styles';

interface Props {
  top: number;
  onPress: () => void;
}

export const Search = ({ top, onPress }: Props) => {
  return (
    <Layout style={{ ...styles.container, top: top }}>
      <TouchableOpacity
        activeOpacity={1.0}
        onPress={onPress}
      >
        <CustomIcon name='search-outline' fillColor={globalColors.dark} size={styles.iconSize} />
      </TouchableOpacity>
    </Layout>
  );
};
