import { Layout } from '@ui-kitten/components';
import { ApiResponse, DateRange } from '../../../../infrastructure/interfaces';
import { TotalListMessage, ListPagination, FAB } from '../../ui';
import { useGeneratePDF } from '../../../hooks';
import { styles } from './styles';

interface Props {
  bottom: number;
  category: string;
  entityData: any;
  lapse: string;
  reportLapse: string;
  range: DateRange;
  fetchNextPage: () => Promise<void>;
  fetchPrevPage: () => Promise<void>;
}

export const ReportsListPagination = ({ bottom, category, entityData, lapse, reportLapse, range, fetchNextPage, fetchPrevPage }: Props) => {
  const { generatePDF } = useGeneratePDF({ category, lapse, reportLapse, range, total: entityData.response.total });
  const isPrintableCategory = category !== 'Usuarios' && category !== 'Presupuestos';

  return (
    <Layout style={styles.container}>
      <TotalListMessage bottom={bottom} item={category} total={entityData?.response.total} />
      <ListPagination<ApiResponse> bottom={bottom} data={entityData?.response} fetchPrevPage={fetchPrevPage} fetchNextPage={fetchNextPage} />
      {isPrintableCategory && <FAB iconName='printer-outline' iconSize={40} style={styles.fab} onPress={generatePDF} />}
    </Layout>
  );
};
