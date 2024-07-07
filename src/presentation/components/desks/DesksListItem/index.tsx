import { ListItem } from '@ui-kitten/components';
import { Desk } from '../../../../core/entities';
import { useCustomTheme } from '../../../hooks';
import { DeskActions } from './DeskActions';
import { DeskTitle } from './DeskTitle';
import { styles } from './styles';

export const DesksListItem = ({ desk }: { desk: Desk; }) => {
  const { platinumItemBackgroundColor } = useCustomTheme();
  return (
    <ListItem
      style={[styles.container, platinumItemBackgroundColor]}
      title={<DeskTitle desk={desk} />}
      accessoryRight={<DeskActions desk={desk} />}
    />
  );
};
