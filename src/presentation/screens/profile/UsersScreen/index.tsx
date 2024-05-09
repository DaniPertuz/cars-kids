import { useEffect } from 'react';
import { useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Divider, Layout } from '@ui-kitten/components';

import { Back, TitleHeader } from '../../../components/ui';
import { UsersList } from '../../../components/users/UsersList';
import { UserListFooter } from '../../../components/users/UsersListFooter';
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
    <Layout style={{ paddingTop: top, ...globalStyles.container }}>
      <Back top={top} />
      <TitleHeader text='Usuarios' />
      <Layout style={{ ...styles.container, ...globalStyles.mainBackground, marginVertical: height * 0.02 }}>
        {!usersData
          ?
          <LoadingScreen />
          :
          <Layout style={globalStyles.container}>
            <Divider style={globalStyles.divider} />
            <UsersList usersData={usersData} />
            <UserListFooter usersData={usersData} fetchNextPage={fetchNextPage} fetchPrevPage={fetchPrevPage} />
          </Layout>
        }
      </Layout>
    </Layout>
  );
};
