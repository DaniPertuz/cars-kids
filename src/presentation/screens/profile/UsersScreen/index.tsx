import { useEffect } from 'react';
import { useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Divider } from '@ui-kitten/components';

import { DataLayout, MainLayout, TopNavigation } from '../../../components/ui';
import { UsersList } from '../../../components/users/UsersList';
import { UserListFooter } from '../../../components/users/UsersListFooter';
import { useUsersData } from '../../../hooks';
import { LoadingScreen } from '../../LoadingScreen';

import { globalStyles } from '../../../styles/global.styles';

export const UsersScreen = () => {
  const { top } = useSafeAreaInsets();
  const { height } = useWindowDimensions();

  const { usersData, fetchData, fetchNextPage, fetchPrevPage } = useUsersData();

  useEffect(() => {
    fetchData();
  }, [usersData]);

  return (
    <MainLayout>
      {!usersData
        ?
        <LoadingScreen />
        :
        <DataLayout paddingTop={height * 0.042}>
          <TopNavigation top={top} title='Usuarios' />
          <Divider style={globalStyles.divider} />
          <UsersList usersData={usersData} />
          <UserListFooter usersData={usersData} fetchNextPage={fetchNextPage} fetchPrevPage={fetchPrevPage} />
        </DataLayout>
      }
    </MainLayout>
  );
};
