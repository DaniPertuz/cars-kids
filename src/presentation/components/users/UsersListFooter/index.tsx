import { UsersResponse } from '../../../../infrastructure/interfaces';
import { TotalListMessage, ListPagination, MainLayout } from '../../ui';

interface Props {
  usersData: UsersResponse;
  fetchNextPage: () => void;
  fetchPrevPage: () => void;
}

export const UsersListFooter = ({ usersData, fetchNextPage, fetchPrevPage }: Props) => {
  return (
    <MainLayout>
      <>
        {usersData.total !== 0 &&
          <>
            <TotalListMessage bottom={0} item='usuario' total={usersData.total} />
            <ListPagination<UsersResponse> bottom={0} data={usersData} fetchPrevPage={fetchPrevPage} fetchNextPage={fetchNextPage} />
          </>
        }
      </>
    </MainLayout>
  );
};
