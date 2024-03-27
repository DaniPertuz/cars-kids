import { TouchableOpacity } from 'react-native';
import { Icon } from '@ui-kitten/components';

interface Props {
  iconSize: number;
  onPress: () => void;
}

export const AddButton = ({ iconSize, onPress }: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={1.0}
      onPress={onPress}
      style={{ height: iconSize, width: iconSize }}
    >
      <Icon name='plus-circle-outline' />
    </TouchableOpacity>
  );
};
