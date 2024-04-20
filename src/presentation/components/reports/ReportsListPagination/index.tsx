import { Layout } from '@ui-kitten/components';
import { ApiResponse } from '../../../../infrastructure/interfaces';
import { TotalListMessage, ListPagination } from '../../ui';
import { globalStyles } from '../../../styles/global.styles';

interface Props {
  bottom: number;
  category: string;
  entityData: any;
  fetchNextPage: () => Promise<void>;
  fetchPrevPage: () => Promise<void>;
}

export const ReportsListPagination = ({ bottom, category, entityData, fetchNextPage, fetchPrevPage }: Props) => {
  return (
    <Layout style={{ ...globalStyles.mainBackground, height: 70 }}>
      <TotalListMessage bottom={bottom} item={category} total={entityData.response.total} />
      <ListPagination<ApiResponse> bottom={bottom} data={entityData.response} fetchPrevPage={fetchPrevPage} fetchNextPage={fetchNextPage} />
    </Layout>
  );
};
