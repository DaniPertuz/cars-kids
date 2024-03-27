import { Icon } from '@ui-kitten/components';
import { TouchableOpacity } from 'react-native';

interface Props {
  iconSize: number;
  onPress: () => void;
}

export const PrevButton = ({ iconSize, onPress }: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={1.0}
      onPress={onPress}
      style={{ height: iconSize, width: iconSize }}
    >
      <Icon name='arrow-circle-left-outline' />
    </TouchableOpacity>
  );
};
