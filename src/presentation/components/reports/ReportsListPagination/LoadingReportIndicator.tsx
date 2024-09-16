import { StyleSheet } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { LoadingIndicator } from '../../ui';
import { globalColors } from '../../../theme/globalColors';

export const LoadingReportIndicator = () => {
  return (
    <Layout style={styles.container}>
      <LoadingIndicator size='small' color={globalColors.primaryRed} />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 35,
    bottom: 35
  }
});
