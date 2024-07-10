import { useState } from 'react';
import { ScrollView, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Layout } from '@ui-kitten/components';

import { LoadingScreen } from '../../LoadingScreen';
import { ProfileHeader, ProfileMenu, ProfileUserImage } from '../../../components/profile';
import { MainLayout } from '../../../components/ui';
import { useUserInfo } from '../../../hooks';
import { IUserRole } from '../../../../infrastructure/interfaces';

export const ProfileScreen = () => {
  const { top } = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const { user } = useUserInfo();
  const [contentHeight, setContentHeight] = useState(0);
  const onContentSizeChange = (width: number, height: number) => {
    setContentHeight(height);
  };

  return (
    <MainLayout>
      {!user
        ?
        <LoadingScreen />
        :
        <Layout style={{ marginTop: user.role === IUserRole.Admin ? top * 0.6 : top * 0.4 }}>
          <ScrollView showsVerticalScrollIndicator={false} onContentSizeChange={onContentSizeChange} scrollEnabled={contentHeight >= height}>
            <ProfileUserImage height={height} />
            <ProfileHeader />
            <ProfileMenu />
          </ScrollView>
        </Layout>
      }
    </MainLayout>
  );
};
