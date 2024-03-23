import { Text } from '@ui-kitten/components';

interface Props {
  text: string;
  textColor: { color: string; };
  onPress?: () => void;
}

export const Headline = ({ text, textColor, onPress }: Props) => <Text category='h3' style={textColor} onPress={onPress}>{text}</Text>;
