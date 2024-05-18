import { Text } from '@ui-kitten/components';
import { globalStyles } from '../../../styles/global.styles';

interface Props {
  text: string;
  textColor?: string;
}

export const HeaderFive = ({ text, textColor }: Props) => <Text category='h5' style={textColor ? { color: textColor } : globalStyles.colorOnyx}>{text}</Text>;
