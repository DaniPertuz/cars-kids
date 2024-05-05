import { useState } from 'react';
import { Layout } from '@ui-kitten/components';
import { FAB } from '../../ui';
import { ProductEntryModal } from '../ProductEntryModal';
import { styles } from './styles';

interface Props {
  top: number;
}

export const ProductAddButton = ({ top }: Props) => {
  const [visible, setVisible] = useState(false);
  return (
    <Layout style={{ marginTop: top, ...styles.container }}>
      <FAB iconName='plus-circle-outline' iconSize={50} onPress={() => setVisible(true)} />
      <ProductEntryModal visible={visible} setVisible={setVisible} />
    </Layout>
  );
};
