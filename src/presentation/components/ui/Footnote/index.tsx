import { Text } from '@ui-kitten/components';
import { useCustomTheme } from '../../../hooks';

interface Props {
  text: string;
  onPress?: () => void;
}

export const Footnote = ({ text, onPress }: Props) => {
  const { footnoteColor } = useCustomTheme();
  return (
    <Text category='p1' style={footnoteColor} onPress={onPress}>{text}</Text>
  );
};
