import { TouchableOpacity, Platform } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { useCustomTheme } from '../../../hooks';
import { CustomIcon } from '../CustomIcon';
import { styles } from './styles';

interface Props {
  top: number;
  onPress: () => void;
}

export const Search = ({ top, onPress }: Props) => {
  const { background, customFillColor } = useCustomTheme();
  return (
    <Layout style={{ ...styles.container, top: Platform.OS === 'android' ? top + 20 : top }}>
      <TouchableOpacity
        activeOpacity={1.0}
        onPress={onPress}
        style={background}
      >
        <CustomIcon name='search-outline' fillColor={customFillColor.fillColor} size={styles.iconSize} />
      </TouchableOpacity>
    </Layout>
  );
};
