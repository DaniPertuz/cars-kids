import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { useCustomTheme } from '../../../hooks';
import { Product } from '../../../../core/entities/product';
import { Vehicle } from '../../../../core/entities';
import { FAB } from '../../ui';

interface Props {
  Modal: (props: { entity?: Product | Vehicle; visible: boolean; setVisible: (value: boolean) => void; }) => React.JSX.Element;
}

export const AddButton = ({ Modal }: Props) => {
  const [visible, setVisible] = useState(false);
  const { background } = useCustomTheme();
  return (
    <Layout style={[styles.container, background]}>
      <FAB iconName='plus-circle-outline' iconSize={50} onPress={() => setVisible(true)} />
      <Modal visible={visible} setVisible={setVisible} />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 100,
    borderColor: 'transparent'
  }
});
