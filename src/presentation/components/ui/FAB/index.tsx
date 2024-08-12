import { Layout } from '@ui-kitten/components';
import { TouchableOpacity } from 'react-native';
import { useCustomTheme } from '../../../hooks';
import { CustomIcon } from '../CustomIcon';
import { styles } from './styles';

interface Props {
  onPress: () => void;
  iconSize: number;
  iconName: string;
}

export const FAB = ({ iconName, iconSize, onPress }: Props) => {
  const { background, customFillColor } = useCustomTheme();
  return (
    <Layout style={styles.container}>
      <TouchableOpacity
        activeOpacity={1.0}
        onPress={onPress}
        style={background}
      >
        <CustomIcon name={iconName} fillColor={customFillColor.fillColor} size={{ height: iconSize, width: iconSize }} />
      </TouchableOpacity>
    </Layout>
  );
};
