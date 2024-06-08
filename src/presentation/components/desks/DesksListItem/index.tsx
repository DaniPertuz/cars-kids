import { ListItem } from '@ui-kitten/components';
import { Desk } from '../../../../core/entities';
import { DeskActions } from './DeskActions';
import { DeskTitle } from './DeskTitle';
import { styles } from './styles';

export const DesksListItem = ({ desk }: { desk: Desk; }) => {
  return (
    <ListItem
      style={styles.container}
      title={<DeskTitle desk={desk} />}
      accessoryRight={<DeskActions desk={desk} />}
    />
  );
};
