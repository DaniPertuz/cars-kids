import { Icon, IconElement } from '@ui-kitten/components';
import { globalStyles } from '../../../styles/global.styles';

interface Props {
  name: string;
  fillColor?: string;
  size?: { height: number, width: number };
}

export const CustomIcon = ({ name, fillColor, size }: Props): IconElement => <Icon style={!size ? globalStyles.iconSize : size} name={name} fill={fillColor} />;
