import { Text } from '@ui-kitten/components';
import { useCustomTheme } from '../../../hooks';

interface Props {
  text: string;
  textColor?: string;
  onPress?: () => void;
}

export const Title = ({ text, textColor, onPress }: Props) => {
  const { defaultColor } = useCustomTheme();
  return (
    <Text category='h1' style={{ color: textColor ? textColor : defaultColor.color }} onPress={onPress}>{text}</Text>
  );
};
