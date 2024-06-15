import { StyleSheet } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { Purchase } from '../../../../core/entities';
import { HeaderSix, CustomIcon } from '..';
import { globalStyles } from '../../../styles/global.styles';
import { globalColors } from '../../../theme/globalColors';

export const ModalTitle = ({ purchase }: { purchase?: Purchase; }) => {
  return (
    <Layout style={styles.container}>
      <HeaderSix text={`${purchase ? 'Editar' : 'Nueva'} compra`} />
      <CustomIcon name='shopping-cart-outline' size={{ height: 35, width: 35 }} fillColor={globalColors.secondaryRed} />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    ...globalStyles.mainBackground
  }
});
