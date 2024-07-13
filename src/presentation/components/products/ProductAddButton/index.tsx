import { useState } from 'react';
import { Layout } from '@ui-kitten/components';
import { FAB } from '../../ui';
import { ProductEntryModal } from '../ProductEntryModal';
import { styles } from './styles';

export const ProductAddButton = () => {
  const [visible, setVisible] = useState(false);
  return (
    <Layout style={styles.container}>
      <FAB iconName='plus-circle-outline' iconSize={50} onPress={() => setVisible(true)} />
      <ProductEntryModal visible={visible} setVisible={setVisible} />
    </Layout>
  );
};
