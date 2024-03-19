import { Icon, IconElement } from '@ui-kitten/components';
import { globalStyles } from '../../../styles/global.styles';

interface Props {
  name: string;
  fillColor?: string;
}

export const CustomIcon = ({ name, fillColor }: Props): IconElement => <Icon style={globalStyles.iconSize} name={name} fill={fillColor} />;
