import { Text } from '@ui-kitten/components';
import { globalStyles } from '../../../styles/global.styles';

interface Props {
  text: string;
  onPress?: () => void;
}

export const Footnote = ({ text, onPress }: Props) => <Text category='p1' style={globalStyles.colorSpanishGray} onPress={onPress}>{text}</Text>;
