import { Text } from '@ui-kitten/components';

interface Props {
  text: string;
  textColor: { color: string; };
  onPress?: () => void;
}

export const Caption = ({ text, textColor, onPress }: Props) => <Text category='p2' style={textColor} onPress={onPress}>{text}</Text>;
