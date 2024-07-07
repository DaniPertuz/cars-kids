import { Layout, List } from '@ui-kitten/components';
import { ReportListItem } from '../ReportsListItem';
import { DataItem } from '../../../../infrastructure/interfaces';
import { useCustomTheme } from '../../../hooks';

interface ReportsListProps {
  data: DataItem[];
}

export const ReportsList = ({ data }: ReportsListProps) => {
  const { background } = useCustomTheme();
  return (
    <List
      data={data}
      showsVerticalScrollIndicator={false}
      style={background}
      renderItem={({ item }) => (
        <Layout style={background}>
          <ReportListItem item={item} />
        </Layout>
      )}
    />
  );
};
