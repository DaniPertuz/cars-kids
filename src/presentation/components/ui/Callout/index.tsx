import { Text } from '@ui-kitten/components';
import { globalStyles } from '../../../styles/global.styles';

interface Props {
  text: string;
  textColor?: string;
  onPress?: () => void;
}

export const Callout = ({ text, textColor, onPress }: Props) => <Text category='s1' style={textColor ? { color: textColor } : globalStyles.colorOnyx} onPress={onPress}>{text}</Text>;
