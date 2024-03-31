import { Text } from '@ui-kitten/components';
import { globalStyles } from '../../../styles/global.styles';

interface Props {
  category: 's1' | 's2';
  text: string;
  onPress?: () => void;
}

export const Callout = ({ category, text, onPress }: Props) => <Text category={category} style={globalStyles.colorOnyx} onPress={onPress}>{text}</Text>;
