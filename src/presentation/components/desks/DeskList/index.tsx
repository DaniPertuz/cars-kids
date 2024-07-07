import { useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { Layout, List } from '@ui-kitten/components';
import { DesksListItem } from '../DesksListItem';
import { Desk } from '../../../../core/entities';
import { useCustomTheme } from '../../../hooks';

export const DeskList = ({ desks }: { desks: Desk[]; }) => {
  const { background } = useCustomTheme();
  const [contentHeight, setContentHeight] = useState(0);
  const { height: screenHeight } = useWindowDimensions();

  const onContentSizeChange = (width: number, height: number) => {
    setContentHeight(height);
  };

  return (
    <List
      data={desks}
      showsVerticalScrollIndicator={false}
      onContentSizeChange={onContentSizeChange}
      scrollEnabled={contentHeight >= screenHeight}
      style={background}
      renderItem={({ item }) => (
        <Layout style={background}>
          <DesksListItem desk={item} />
        </Layout>
      )}
    />
  );
};
