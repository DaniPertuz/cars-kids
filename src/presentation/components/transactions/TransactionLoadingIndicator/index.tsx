import { StyleSheet } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { useCustomTheme } from '../../../hooks';
import { LoadingIndicator } from '../../ui';
import { globalColors } from '../../../theme/globalColors';

export const TransactionLoadingIndicator = () => {
  const { background } = useCustomTheme();
  return (
    <Layout style={[background, styles.container]}>
      <LoadingIndicator color={globalColors.primaryRed} />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' }
});
