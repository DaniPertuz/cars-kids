import { useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { Layout, List } from '@ui-kitten/components';
import { DesksListItem } from '../DesksListItem';
import { Desk } from '../../../../core/entities';
import { globalStyles } from '../../../styles/global.styles';

export const DeskList = ({ desks }: { desks: Desk[]; }) => {
  const { height: screenHeight } = useWindowDimensions();
  const [contentHeight, setContentHeight] = useState(0);

  const onContentSizeChange = (width: number, height: number) => {
    setContentHeight(height);
  };

  return (
    <List
      data={desks}
      showsVerticalScrollIndicator={false}
      onContentSizeChange={onContentSizeChange}
      scrollEnabled={contentHeight >= screenHeight}
      style={globalStyles.mainBackground}
      renderItem={({ item }) => (
        <Layout style={globalStyles.mainBackground}>
          <DesksListItem desk={item} />
        </Layout>
      )}
    />
  );
};
