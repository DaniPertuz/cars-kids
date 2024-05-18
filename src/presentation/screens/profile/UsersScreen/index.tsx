import { useEffect } from 'react';
import { useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Divider, Layout } from '@ui-kitten/components';

import { MainLayout, TopNavigation } from '../../../components/ui';
import { UsersListComponent } from '../../../components/users/UsersListComponent';
import { useUsersData } from '../../../hooks';
import { LoadingScreen } from '../../LoadingScreen';

import { globalStyles } from '../../../styles/global.styles';
import { styles } from './styles';

export const UsersScreen = () => {
  const { top } = useSafeAreaInsets();
  const { height } = useWindowDimensions();

  const { usersData, fetchData, fetchNextPage, fetchPrevPage } = useUsersData();

  useEffect(() => {
    fetchData();
  }, [usersData]);

  return (
    <MainLayout paddingTop={top}>
      <TopNavigation top={top} title='Usuarios' />
      <Layout style={{ ...styles.container, marginVertical: height * 0.02 }}>
        <Divider style={globalStyles.divider} />
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
