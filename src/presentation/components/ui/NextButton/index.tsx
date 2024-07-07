import { TouchableOpacity } from 'react-native';
import { Icon } from '@ui-kitten/components';
import { useCustomTheme } from '../../../hooks';

interface Props {
  iconSize: number;
  nextUrl: string | null;
  onPress: () => void;
}

export const NextButton = ({ iconSize, nextUrl, onPress }: Props) => {
  const { disabledColor, defaultBasicDisabledColor } = useCustomTheme();
  return (
    <TouchableOpacity
      activeOpacity={1.0}
      disabled={!nextUrl}
      onPress={onPress}
      style={{ height: iconSize, width: iconSize }}
    >
      <Icon name='arrow-circle-right-outline' fill={nextUrl ? disabledColor : defaultBasicDisabledColor} />
    </TouchableOpacity>
  );
};
