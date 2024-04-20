import { Layout, List } from '@ui-kitten/components';
import { ReportListItem } from '../ReportsListItem';
import { DataItem } from '../../../../infrastructure/interfaces';
import { globalStyles } from '../../../styles/global.styles';

interface ReportsListProps {
  data: DataItem[];
  category: string;
}

export const ReportsList = ({ data, category }: ReportsListProps) => {
  return (
    <List
      data={data}
      showsVerticalScrollIndicator={false}
      style={{ ...globalStyles.mainBackground, height: category === 'Usuarios' ? 590 : 480 }}
      renderItem={({ item }) => (
        <Layout style={globalStyles.mainBackground}>
          <ReportListItem item={item} />
        </Layout>
      )}
    />
  );
};
