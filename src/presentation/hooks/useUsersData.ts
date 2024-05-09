import { useEffect, useState } from 'react';
import * as UsersUseCases from '../../core/use-cases/users';
import { Pagination, UsersResponse } from '../../infrastructure/interfaces';

export const useUsersData = () => {
  const [display, setDisplay] = useState(false);
  const [usersData, setUsersData] = useState<UsersResponse>();
  const [paginationState, setPaginationState] = useState<Pagination>({ page: 1, limit: 10 });

  const fetchData = async () => {
    const data = await UsersUseCases.getUsersUseCase(`users?page=${paginationState.page}&limit=${paginationState.limit}`);
    setUsersData(data.response);
    setDisplay(true);
  };

  useEffect(() => {
    fetchData();
  }, [paginationState]);

  const fetchNextPage = async () => {
    if (usersData?.next) {
      setPaginationState(prevState => ({ ...prevState, page: prevState.page + 1 }));
    }
  };

  const fetchPrevPage = async () => {
    if (usersData?.prev) {
      setPaginationState(prevState => ({ ...prevState, page: prevState.page - 1 }));
    }
  };

  return {
    fetchData,
    fetchNextPage,
    fetchPrevPage,
    setUsersData,
    display,
    usersData
  };
};
