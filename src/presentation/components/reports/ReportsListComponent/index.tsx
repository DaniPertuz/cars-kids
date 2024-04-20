import { Layout } from '@ui-kitten/components';
import { EmptyListMessage } from '../../ui';
import { AnyApiResponse } from '../../../../infrastructure/interfaces';
import { LoadingScreen } from '../../../screens/LoadingScreen';
import { ReportsList } from '../ReportsList';
import { globalStyles } from '../../../styles/global.styles';

interface Props {
  data: AnyApiResponse;
  category: string;
}

export const ReportsListComponent = ({ data, category }: Props) => {
  const isEmpty = data?.total === 0;
  const listData = data?.data || [];

  return (
    <Layout style={{ ...globalStyles.mainBackground, marginTop: 10 }}>
      {(!data)
        ?
        <LoadingScreen />
        :
        (isEmpty)
          ?
          <EmptyListMessage heightBy={0.2} text='No hay información registrada' />
          :
          <ReportsList data={listData} category={category} />
      }
    </Layout>
  );
};
