import { StyleSheet } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { EmptyListMessage } from '../../ui';
import { AnyApiResponse } from '../../../../infrastructure/interfaces';
import { LoadingScreen } from '../../../screens/LoadingScreen';
import { ReportsList } from '../ReportsList';

interface Props {
  data: AnyApiResponse;
}

export const ReportsListComponent = ({ data }: Props) => {
  const isEmpty = data?.total === 0;
  const listData = data?.data || [];

  return (
    <Layout style={styles.container}>
      {(!listData)
        ?
        <LoadingScreen />
        :
        (isEmpty)
          ?
          <EmptyListMessage heightBy={0.5} text='No hay información registrada' />
          :
          <ReportsList data={listData} />
      }
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10
  }
});
