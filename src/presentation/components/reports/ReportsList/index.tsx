import { Layout, List } from '@ui-kitten/components';
import { ReportListItem } from '../ReportsListItem';
import { DataItem } from '../../../../infrastructure/interfaces';
import { globalStyles } from '../../../styles/global.styles';

interface ReportsListProps {
  data: DataItem[];
}

export const ReportsList = ({ data }: ReportsListProps) => {
  return (
    <List
      data={data}
      showsVerticalScrollIndicator={false}
      style={globalStyles.container}
      renderItem={({ item }) => (
        <Layout style={globalStyles.mainBackground}>
          <ReportListItem item={item} />
        </Layout>
      )}
    />
  );
};
