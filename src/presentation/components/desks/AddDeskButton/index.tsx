import { useState } from 'react';
import { Layout } from '@ui-kitten/components';
import { FAB } from '../../ui';
import { DeskEntryModal } from '../DeskEntryModal';
import { styles } from './styles';

export const AddDeskButton = () => {
  const [visible, setVisible] = useState(false);
  return (
    <Layout style={styles.container}>
      <FAB iconName='plus-circle-outline' iconSize={50} onPress={() => setVisible(true)} />
      <DeskEntryModal visible={visible} setVisible={setVisible} />
    </Layout>
  );
};
