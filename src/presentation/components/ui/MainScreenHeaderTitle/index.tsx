import { StyleSheet } from 'react-native';
import { Layout, Spinner } from '@ui-kitten/components';

import { Desk } from '../../../../core/entities';
import { useCustomTheme } from '../../../hooks';
import { DeskSelect } from '../../desks/DeskSelect';
import { HeaderFive } from '../HeaderFive';
import { globalStyles } from '../../../styles/global.styles';
import { globalColors } from '../../../theme/globalColors';

interface Props {
  desks: Desk[];
  selectedDesk: Desk;
  title: string;
  handleDesk: (value: string) => void;
}

export const MainScreenHeaderTitle = ({ desks, selectedDesk, title, handleDesk }: Props) => {
  const { background } = useCustomTheme();
  const desksNames = desks.map(d => d.name);

  return (
    <Layout style={[styles.container, background]}>
      <HeaderFive text={title} />
      {desks.length === 0
        ?
        <Layout style={styles.loadingContainer}>
          <Spinner size='small' style={{ borderColor: globalColors.primaryRed }} />
        </Layout>
        :
        <DeskSelect desksNames={desksNames} selectedDesk={selectedDesk} handleDesk={handleDesk} />
      }
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 4,
    gap: 10,
    justifyContent: 'space-between',
    marginBottom: 15
  },
  loadingContainer: {
    alignItems: 'center',
    flex: 1,
    ...globalStyles.mainBackground
  }
});
