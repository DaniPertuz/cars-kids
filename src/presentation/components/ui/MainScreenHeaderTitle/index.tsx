import { StyleSheet } from 'react-native';
import { Layout } from '@ui-kitten/components';

import { Desk } from '../../../../core/entities';
import { DeskSelect } from '../../desks/DeskSelect';
import { HeaderFive } from '../HeaderFive';
import { globalStyles } from '../../../styles/global.styles';

interface Props {
  desks: Desk[];
  selectedDesk: Desk;
  title: string;
  handleDesk: (value: string) => void
}

export const MainScreenHeaderTitle = ({ desks, selectedDesk, title, handleDesk }: Props) => {

  const desksNames = desks.map(d => d.name);

  return (
    <Layout style={styles.container}>
      <HeaderFive text={title} />
      <DeskSelect desksNames={desksNames} selectedDesk={selectedDesk} handleDesk={handleDesk} />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 4,
    gap: 10,
    justifyContent: 'space-between',
    marginBottom: 15,
    ...globalStyles.mainBackground
  }
});
