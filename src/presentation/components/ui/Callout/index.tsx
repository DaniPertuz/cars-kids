import { Text } from '@ui-kitten/components';
import { globalStyles } from '../../../styles/global.styles';

interface Props {
  text: string;
  onPress?: () => void;
}

export const Callout = ({ text, onPress }: Props) => <Text category='s1' style={globalStyles.colorOnyx} onPress={onPress}>{text}</Text>;
