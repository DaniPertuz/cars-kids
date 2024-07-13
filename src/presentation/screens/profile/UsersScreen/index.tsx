import { useEffect } from 'react';
import { Platform, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Layout } from '@ui-kitten/components';

import { CustomDivider, DataLayout, MainLayout, TopNavigation } from '../../../components/ui';
import { UsersListComponent } from '../../../components/users/UsersListComponent';
import { useUsersData } from '../../../hooks';
import { LoadingScreen } from '../../LoadingScreen';

import { styles } from './styles';

export const UsersScreen = () => {
  const { top } = useSafeAreaInsets();
  const { height } = useWindowDimensions();

  const { usersData, fetchData, fetchNextPage, fetchPrevPage } = useUsersData();

  useEffect(() => {
    fetchData();
  }, [usersData]);

  return (
    <MainLayout>
      <DataLayout paddingTop={Platform.OS === 'ios' ? top + 0 : top + 20}>
        <TopNavigation top={top} title='Usuarios' />
        <CustomDivider />
      </DataLayout>
      <Layout style={{ ...styles.container, marginVertical: height * 0.005 }}>
        {!usersData
          ?
          <LoadingScreen />
          :
          <UsersListComponent usersData={usersData} fetchPrevPage={fetchPrevPage} fetchNextPage={fetchNextPage} />
        }
      </Layout>
    </MainLayout>
  );
};
